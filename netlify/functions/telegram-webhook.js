// THE ASSISTANT — funzione Netlify che riceve i messaggi Telegram e risponde
// usando l'API di Claude (Anthropic), con il contesto definito in offerta.js.
//
// Il bot risponde SOLO usando le informazioni presenti in offerta.js.
// Se non trova la risposta, o la domanda richiede un tocco personale (sconti,
// lamentele, trattative), usa sempre il messaggio di escalation configurato —
// mai una risposta improvvisata dal modello.
//
// Variabili d'ambiente richieste:
//   TELEGRAM_BOT_TOKEN   → dal tuo bot creato con BotFather
//   ANTHROPIC_API_KEY    → dalla tua Anthropic Console (console.anthropic.com)

const offerta = require('../../offerta');

const ESCALATE_MARKER = '[[ESCALATE]]';

function isOfflineNow(cfg) {
  if (!cfg.enabled) return false;
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: cfg.timezone })
  );
  const hour = now.getHours();
  const day = now.getDay();

  if (cfg.weekendOffline && (day === 0 || day === 6)) return true;

  if (cfg.startHour > cfg.endHour) {
    return hour >= cfg.startHour || hour < cfg.endHour;
  }
  return hour >= cfg.startHour && hour < cfg.endHour;
}

function buildSystemPrompt(o) {
  const offeringsText = o.offerings
    .map(
      (item) =>
        `- ${item.name} (${item.price}): ${item.whatIncludes} — Per chi: ${item.forWho}`
    )
    .join('\n');

  const faqText = o.faq.map((f) => `D: ${f.q}\nR: ${f.a}`).join('\n\n');

  return `Sei l'assistente che risponde ai messaggi per conto di ${o.business.name} su Telegram.

TONO DI VOCE:
${o.business.toneNotes}

LE TUE OFFERTE (usa solo queste informazioni, non inventare mai prezzi o dettagli non presenti qui):
${offeringsText}

DOMANDE FREQUENTI E COME RISPONDERE (usale come esempio del tono):
${faqText}

LINK DISPONIBILI (usali solo se pertinenti alla domanda):
- Prenotazione: ${o.links.booking}
- Risorsa gratuita: ${o.links.freebie}
- Pagamento: ${o.links.payment}

REGOLE FONDAMENTALI:
1. Rispondi SOLO con informazioni presenti sopra. Non inventare mai prezzi, dettagli o promesse non scritte qui.
2. Se la domanda riguarda sconti, lamentele, richieste molto personali o trattative sul prezzo, oppure se non trovi la risposta nelle informazioni sopra, rispondi ESATTAMENTE con questo testo e nient'altro: ${ESCALATE_MARKER}
3. Mantieni le risposte brevi — 2-4 frasi al massimo, come si scrive su Telegram, non come un'email.
4. Non firmarti, non aggiungere saluti finali eccessivi.`;
}

async function askClaude(userMessage, systemPrompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY mancante nelle variabili d\'ambiente.');
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    })
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Errore API Anthropic: ${res.status} ${errBody}`);
  }

  const data = await res.json();
  const textBlock = (data.content || []).find((b) => b.type === 'text');
  return textBlock ? textBlock.text.trim() : '';
}

async function sendTelegramMessage(chatId, text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN mancante nelle variabili d\'ambiente.');
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Errore invio messaggio Telegram: ${res.status} ${errBody}`);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, body: 'THE ASSISTANT è attivo e in ascolto.' };
  }

  let update;
  try {
    update = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Richiesta non valida' };
  }

  const message = update.message;
  if (!message || !message.text || !message.chat) {
    return { statusCode: 200, body: 'ok' };
  }

  try {
    const systemPrompt = buildSystemPrompt(offerta);
    let replyText = await askClaude(message.text, systemPrompt);

    // Se il modello non trova la risposta, usiamo SEMPRE il testo configurato
    // da chi possiede il bot — mai una frase improvvisata dal modello.
    if (!replyText || replyText.includes(ESCALATE_MARKER)) {
      replyText = offerta.escalation.message;
    } else if (isOfflineNow(offerta.offlineHours)) {
      replyText = `${offerta.offlineHours.prefixMessage}\n\n${replyText}`;
    }

    await sendTelegramMessage(message.chat.id, replyText);
    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.error(err);
    return { statusCode: 200, body: 'errore gestito internamente' };
  }
};
