// ============================================
// LA TUA OFFERTA — Il bot risponde SOLO usando quello che scrivi qui.
// Più è chiaro e completo, più le risposte saranno precise.
// Non serve scrivere in inglese o in modo tecnico: scrivi come parleresti a una cliente.
// ============================================

module.exports = {

  // Il nome con cui il bot si presenta e il tono che deve usare.
  business: {
    name: 'Silvia NeuroBranding',
    toneNotes: 'Diretta, calda, mai formale. Frasi brevi. Niente linguaggio da azienda.'
  },

  // Le tue offerte. Aggiungine quante ne vuoi, con questo stesso schema.
  offerings: [
    {
      name: 'THE ASSISTANT',
      price: '€ 37',
      whatIncludes: 'Il mio assistente personale per quando voglio staccare ma mi serve qualcuno che segua le chat per me mentre io faccio altro.',
      forWho: 'È pensato per chi non ha tempo per gestire le chat e le domande ripetitive. È il tuo assistente personale.'
    },
     {
      name: 'THE GLITCH',
      price: '€ 297',
      whatIncludes: 'Il mio Best seller, il corso registrato che copre tutto ciò che devi sapere per mandare al massimo il tuo business sfruttando neuroscienze, pattern inconsci, marketing radicato e automazioni.',
      forWho: 'È pensato per chi vuole ricostruire il suo brand da zero o vuole uscire dal burnout e ottenere finalmente un business che funziona senza impazzire.'
    }
  ],

  // Domande che ricevi spesso, con la risposta che daresti tu.
  // Il bot le userà come esempio del tuo modo di rispondere.
  faq: [
    {
      q: 'Quanto costa THE ASSISTANT?',
      a: 'Solo 37€ e potrai automatizzare tutta la tua attività di chat clienti.'
    }
  ],

  // I link che il bot può suggerire quando ha senso farlo.
  links: {
    booking: 'https://calendly.com/tuonome/call',
    freebie: 'https://tuosito.com/freebie',
    payment: 'https://buy.stripe.com/xxxxx'
  },

  // Cosa fare quando il bot NON sa rispondere, o la domanda richiede te personalmente
  // (sconti, lamentele, richieste molto specifiche, trattative).
  escalation: {
    message: 'Grazie per il messaggio! Questa è una domanda a cui voglio risponderti di persona — ti scrivo appena posso 💛',
    notes: 'Il bot userà questo messaggio ogni volta che non trova la risposta nella tua offerta o nelle FAQ, o quando la domanda riguarda sconti, lamentele, o richieste molto personali.'
  },

  // Fascia oraria "offline" — puoi lasciarla vuota se vuoi che il bot risponda sempre, a qualsiasi ora.
  offlineHours: {
    enabled: true,
    timezone: 'Europe/Rome',
    startHour: 19,
    endHour: 9,
    weekendOffline: true,
    prefixMessage: 'Sono offline in questo momento, ma ecco una risposta veloce:'
  }
};
