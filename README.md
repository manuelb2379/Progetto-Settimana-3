# Progetto-Settimana-3

Questo è il mio progetto per la terza settimana del corso che sto percorrendo con Epicode.
# La tua videoteca personale

Ho creato questa pagina web per tenere traccia di film, serie tv e anime che ho visto o che ho intenzione di vedere.

## Cosa si può fare con questa pagina

- Possibilità di cambiare fra il tema scuro e il tema chiaro
- Cercare un titolo inserito nella barra di ricerca
- Aggiungere un nuovo titolo scegliendone il genere e lo stato (se da vedere oppure già visto)
- Una volta inserito il titolo creerà una card autonoma con un badge dello stato indicato
- Possibilità di cambiare il badge da visto a da vedere e viceversa, possibilità di modificare il titolo se inserito non in modo corretto e possibilità di eliminare un titolo
- Un contatore terrà traccia del totale inserito, titoli visti e da vedere, questo dato sarà visibile non solo numericamente ma anche tramite la barra
che tiene conto della percentuale dei libri letti rispetto al totale
- Quando si inserirà, eliminerà o modificherà un titolo si avrà un notifica nel lato destro dello schermo della durata di 3 secondi

## I file 

- `index.html`: troverai struttura della pagina (header, ricerca, inserimento, contatori, card, footer)
- `assets/css/style.css`: troverai lo stile della pagina con i rispettivi commenti
- `assets/js/script.js`: troverai il funzionamento logico della pagina

## Il js

I titoli sono salvati in un array di oggetti rinominato `videoteca`. Ogni volta che l'array cambia, la funzione `mostraCard()` svuota il contenitore e ridisegna tutte le card.

## Autore

Manuel Burgalassi, studente Epicode