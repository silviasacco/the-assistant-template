// ============================================
// LA TUA OFFERTA — Il bot risponde SOLO usando quello che scrivi qui.
// Più è chiaro e completo, più le risposte saranno precise.
// Non serve scrivere in inglese o in modo tecnico: scrivi come parleresti a una cliente.
// ============================================

module.exports = {

  // Il nome con cui il bot si presenta e il tono che deve usare.
  business: {
    name: 'Il tuo nome o brand',
    toneNotes: 'Diretta, calda, mai formale. Frasi brevi. Niente linguaggio da azienda.'
  },

  // Le tue offerte. Aggiungine quante ne vuoi, con questo stesso schema.
  offerings: [
    {
      name: 'Nome del prodotto o servizio',
      price: '€ 0',
      whatIncludes: 'Cosa include, in poche righe.',
      forWho: 'Per chi è pensato — che problema risolve.'
    }
  ],

  // Domande che ricevi spesso, con la risposta che daresti tu.
  // Il bot le userà come esempio del tuo modo di rispondere.
  faq: [
    {
      q: 'Domanda frequente che ricevi',
      a: 'La risposta che daresti tu, con le tue parole.'
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
