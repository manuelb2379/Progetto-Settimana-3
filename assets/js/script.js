let videoteca = [
    {
        nome: "Space Jam",
        id: 1,
        completato: 'visto',
        genere: "fantasy",
    },
    {
        nome: "Sword Art Online",
        id: 2,
        completato: 'da vedere',
        genere: "fantasy",
    },
    {
        nome: "The last of us",
        id: 3,
        completato: 'da vedere',
        genere: "azione",
    },
    {
        nome: "Il ciclone",
        id: 4,
        completato: 'visto',
        genere: "comico",
    },
]

let prossimoId = 5;
let timerNotifica;
let modificaTitolo = null;

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
const notificaDiv = document.querySelector('#notifica');

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

/* notifica quando si modifica, aggiunge o elimina un elemento*/
function mostraNotifica(testo, tipo = "aggiunto") {
    notificaDiv.textContent = testo;
    notificaDiv.style.display = "block";

    // se c'era già una notifica in corso, annullo il suo timer
    clearTimeout(timerNotifica);

    // dopo 3 secondi nasconde la notifica
    timerNotifica = setTimeout(() => {
        notificaDiv.style.display = "none";
    }, 3000);
}


// contatori e barra di avanzamento visione

function aggiornaContatori() {
    const totale = videoteca.length;
    const visti = videoteca.filter((video) => video.completato === 'visto').length;
    const daVedere = videoteca.filter((video) => video.completato === 'da vedere').length;


    contTotale.textContent = totale;
    contVisti.textContent = visti;
    contDaVedere.textContent = daVedere;

    let percentuale = 0;
    if (totale > 0) {
        percentuale = (visti / totale) * 100;
    }
    barraRiempita.style.width = percentuale + '%';
}


// le card
function mostraCard() {
    listaCard.innerHTML = '';

    const testoCercato = ricerca.value.trim().toLowerCase();
    const visibili = videoteca.filter((video) => video.nome.toLowerCase().includes(testoCercato));

    if (visibili.length === 0) {
        const vuoto = document.createElement('p');
        vuoto.classList.add('nessunRisultato');
        vuoto.textContent = 'Nessun risultato trovato!';
        listaCard.appendChild(vuoto);
    }

    // div per l'inserimento card
    visibili.forEach((singolo) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = singolo.id;

        // parte sinistra delle card con h4 e p
        const sinistra = document.createElement('div');
        sinistra.classList.add('cardSinistra');

        const titolo = document.createElement('h4');
        titolo.textContent = singolo.nome;

        const testoGenere = document.createElement('p');
        testoGenere.textContent = singolo.genere;

        if (singolo.id === modificaTitolo) {
            const campo = document.createElement('input');
            campo.type = 'text';
            campo.value = singolo.nome;
            campo.id = singolo.id
            campo.classList.add('campoModifica');
            sinistra.appendChild(campo);
        } else {
            sinistra.appendChild(titolo);
        }
        sinistra.appendChild(testoGenere)

        //parte destra delle card con i button e badge che cambia con il button

        const destra = document.createElement('div');
        destra.classList.add('cardDestra');

        const badge = document.createElement('span');
        badge.classList.add('badge');

        const cambioBadge = document.createElement('button');
        cambioBadge.type = 'button';


        if (singolo.completato === 'visto') {
            card.classList.add('visto')
            badge.classList.add('visto');
            badge.textContent = 'Visto';
            cambioBadge.textContent = 'Da vedere';
        } else {
            card.classList.add('davedere')
            badge.classList.add('davedere');
            badge.textContent = 'Da vedere';
            cambioBadge.textContent = 'Visto';

        }


        cambioBadge.addEventListener('click', () => {
            if (singolo.completato === 'visto') {
                singolo.completato = 'da vedere';
            } else {
                singolo.completato = 'visto';
            }
            mostraCard();
        });

        // button per modificare h4
        const modifica = document.createElement('button');
        modifica.type = 'button';
        modifica.classList.add('modifica');
        modifica.value = singolo.id;
        modifica.textContent = 'Modifica';

        const elimina = document.createElement('button');
        elimina.type = 'button';
        elimina.classList.add('elimina');
        elimina.value = singolo.id;
        elimina.textContent = 'Elimina';

        destra.appendChild(badge);
        destra.appendChild(cambioBadge);
        destra.appendChild(modifica);
        destra.appendChild(elimina);

        card.appendChild(sinistra);
        card.appendChild(destra);
        listaCard.appendChild(card);
    });

    aggiornaContatori();
}

function salvaModifica(campo) {
    if (modificaTitolo === null) return;

    const id = Number(campo.id);
    const nuovoNome = campo.value.trim();
    const elemento = videoteca.find((v) => v.id === id);

    if (nuovoNome !== '') {
        mostraNotifica('Hai modificato ' + elemento.nome + ' in ' + nuovoNome);
        elemento.nome = nuovoNome;
    }
    modificaTitolo = null;
    mostraCard();
}

listaCard.addEventListener('click', (event) => {
    if (event.target.classList.contains('elimina')) {
        const id = Number(event.target.value);
        const elemento = videoteca.find((v) => v.id === id);
        mostraNotifica('Hai eliminato ' + elemento.nome + ' dalla lista');
        videoteca = videoteca.filter((v) => v.id !== id);
        mostraCard();
    }

    if (event.target.classList.contains('modifica')) {
        modificaTitolo = Number(event.target.value);
        mostraCard();
        document.querySelector('.campoModifica').focus();
    }
});

// conferma la modifica con Invio
listaCard.addEventListener('keydown', (event) => {
    if (event.target.classList.contains('campoModifica') && event.key === 'Enter') {
        salvaModifica(event.target);
    }
});

//conferma la modifica uscendo dal campo
listaCard.addEventListener('blur', (event) => {
    if (event.target.classList.contains('campoModifica')) {
        salvaModifica(event.target);
    }
});

listaCard.addEventListener('focusout', (event) => {
    if (event.target.classList.contains('campoModifica')) {
        salvaModifica(event.target);
    }
});


bottoneAggiungi.addEventListener('click', () => {
    const valore = nuovoTitolo.value.trim();

    if (valore === '' || genere.value === '' || stato.value === '') {
        alert('Ti preghiamo di completare tutti i campi per inserire correttamente il nuovo film, serie tv o anime!');
        nuovoTitolo.value = '';
        genere.value = '';
        stato.value = '';
        return;
    }

    videoteca.push({
        nome: valore,
        id: prossimoId,
        genere: genere.value,
        completato: stato.value
    });
    mostraNotifica('Hai aggiunto ' + valore + ' alla lista');
    prossimoId++;
    nuovoTitolo.value = '';
    mostraCard();
});

ricerca.addEventListener('input', mostraCard);



mostraCard();
