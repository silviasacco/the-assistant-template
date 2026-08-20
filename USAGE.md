# THE ASSISTANT — Guida all'attivazione

Tempo stimato: 20-25 minuti. Un passaggio in più rispetto alla versione base:
oltre al bot Telegram, serve una chiave API di Anthropic (il modello che genera
le risposte).

## 1. Crea il tuo bot Telegram

1. Apri Telegram, cerca **@BotFather**
2. Scrivi `/newbot`, segui le istruzioni (nome + username che finisca in "bot")
3. Copia il **token** che ti dà

## 2. Crea la tua chiave Anthropic

1. Vai su [console.anthropic.com](https://console.anthropic.com) e crea un account (se non ce l'hai già)
2. Vai su **API Keys** → **Create Key**
3. Copia la chiave (inizia con `sk-ant-...`)
4. Aggiungi un metodo di pagamento in **Billing** — l'uso di un bot personale a basso volume costa
   tipicamente pochi centesimi al mese, non è un abbonamento fisso

## 3. Attiva

1. Apri il link/pulsante di attivazione che hai ricevuto insieme a questa guida
2. Accedi con GitHub e Netlify (gratuiti, pochi click)
3. Quando richiesto, incolla:
   - **TELEGRAM_BOT_TOKEN** → il token dal Passo 1
   - **ANTHROPIC_API_KEY** → la chiave dal Passo 2
4. Attendi il completamento del deploy — Netlify a questo punto crea una **copia tutta tua** del
   progetto, con un nome tipo `the-assistant-template-xxxxx`

## 4. Collega il bot

Apri questo link nel browser, sostituendo i tuoi dati:

```
https://api.telegram.org/bot<IL_TUO_TOKEN>/setWebhook?url=https://<IL_TUO_SITO>.netlify.app/.netlify/functions/telegram-webhook
```

Se vedi `"ok":true`, sei attiva.

## 5. Scrivi la tua offerta

> ⚠️ **Importante — leggi questo prima di scrivere**
> A questo punto hai la **tua copia personale** del progetto (quella creata al Passo 3, non quella
> da cui sei partita). Apri il file **offerta.js** proprio in quella copia — la trovi tra i tuoi
> repository su GitHub, con lo stesso nome del sito che hai appena attivato. Scrivere altrove non
> farà funzionare nulla.

Compila ogni sezione con parole tue: i tuoi prodotti/servizi, le domande che ricevi spesso, i tuoi
link. Più è chiaro, più il bot risponderà bene. Non serve nessuna competenza tecnica — è solo testo
dentro le virgolette. Ogni salvataggio ("Commit changes") aggiorna il bot in pochi secondi.

## Come funziona da qui in poi

- Il bot risponde SOLO usando quello che hai scritto in `offerta.js` — non inventa prezzi o dettagli
- Se non trova la risposta, o la domanda è delicata (sconti, lamentele, trattative), manda sempre
  il messaggio che hai scelto tu in `escalation.message` — mai una risposta improvvisata
- Puoi aggiornare `offerta.js` quando vuoi: ogni salvataggio su GitHub aggiorna il bot in pochi secondi

## Domande frequenti

**Quanto mi costa l'uso della chiave Anthropic?** Dipende dal volume di messaggi, ma per un bot
personale con traffico normale è tipicamente pochi centesimi al mese — molto meno di un abbonamento fisso.

**Il bot può dire qualcosa di sbagliato?** Risponde solo con le informazioni che tu stessa scrivi in
`offerta.js`. Se non trova la risposta lì, non inventa: usa il messaggio di escalation che hai scelto tu.

**Posso vedere cosa risponde il bot?** Sì, puoi controllare la cronologia direttamente nella chat
Telegram del tuo bot in qualsiasi momento.

**Ho scritto la mia offerta ma il bot non cambia risposta.** Controlla di aver modificato il file
`offerta.js` nella tua copia personale (creata al Passo 3), non nel repository originale da cui hai
attivato il bot — sono due posti diversi.
