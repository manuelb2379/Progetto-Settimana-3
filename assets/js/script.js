let videoteca = [
   {
      nome: "Space Jam",
      id: 1,
      completato: true,
      genere: "fantasy",
   },
   {
      nome: "Sword Art Online",
      id: 2,
      completato: false,
      genere: "fantasy",
   },
   {
      nome: "The last of us",
      id: 3,
      completato: true,
      genere: "azione",
   },
   {
      nome: "Il ciclone",
      id: 4,
      completato: false,
      genere: "comico",
   },
]

const ricerca = document.querySelector('#ricerca');
const nuovoTitolo = document.querySelector('#nuovoTitolo');
const genere = document.querySelector('#genere');
const stato = document.querySelector('#stato');
const bottoneAggiungi = document.querySelector('#bottoneAggiungi');
const contTotale = document.querySelector('#contTotale');
const contVisti = document.querySelector('#contVisti');
const contDaVedere = document.querySelector('#contDaVedere');
const barraRiempita = document.querySelector('#barraRiempita');
const listaCard = document.querySelector('#listaCard');

const themeToggleBtn = document.querySelector('#themeToggle');

// aggiungo il click al bottone tema scuro e chiaro
themeToggleBtn.addEventListener('click', function () {
    // alterna la classe 'dark-mode' sul body
    document.body.classList.toggle('dark-mode');

    // cambia il testo e l'icona dentro il bottone
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Tema Chiaro';
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Tema Scuro';
    }
});

