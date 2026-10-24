
//array di oggetti con i titoli di partenza
//ogni oggetto contiente nome, id, genere e lo stato(completato)
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
//id da dare al prossimo titolo aggiunto
let prossimoId = 5;
//usato per annullare il primo timer nel caso in cui parta una nuova notifica entro 3 sec
let timerNotifica;
// id della card in modifica (null = nessuna card in modifica al momento)
let modificaTitolo = null;

//elementi presi dalla pagina html
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
    //scrivo il testo nel div e lo rendo visibile
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
    //usato per contare quanti titoli ci sono in totale, quanti visti e quanti da vedere
    const totale = videoteca.length;
    const visti = videoteca.filter((video) => video.completato === 'visto').length;
    const daVedere = videoteca.filter((video) => video.completato === 'da vedere').length;

    //scrivo i numeri nei contatori
    contTotale.textContent = totale;
    contVisti.textContent = visti;
    contDaVedere.textContent = daVedere;

    //calcolo la percentuale dei visti rispetto al totale(se il totale è 0 rimane 0, così da non dividere per 0)
    let percentuale = 0;
    if (totale > 0) {
        percentuale = (visti / totale) * 100;
    }
    barraRiempita.style.width = percentuale + '%';
}


// le card
//svuoto il contenitore e riscrivo tutte le card in base all'array
function mostraCard() {
    listaCard.innerHTML = '';

    //filtro i titoli in base a quello scritto nella barra di ricerca
    const testoCercato = ricerca.value.trim().toLowerCase();
    const visibili = videoteca.filter((video) => video.nome.toLowerCase().includes(testoCercato));

    //se la barra non trova un risultato corrispondente manda a video 'Nessun risultato trovato!'
    if (visibili.length === 0) {
        const vuoto = document.createElement('p');
        vuoto.classList.add('nessunRisultato');
        vuoto.textContent = 'Nessun risultato trovato!';
        listaCard.appendChild(vuoto);
    }

    // div per l'inserimento card
    //per ogni titolo visibile creo una card
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

        //se la card a cui mi riferisco è quella in modifica, al posto dell'h4 va un input di inserimento
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

        //badge, bordo della card che cambiano n base allo stato
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

        //al click si inverte lo stato (visto -> da vedere e viceversa) e ridisegna la card
        cambioBadge.addEventListener('click', () => {
            if (singolo.completato === 'visto') {
                singolo.completato = 'da vedere';
            } else {
                singolo.completato = 'visto';
            }
            mostraCard();
        });

        // button per modificare h4
        // il value contiente l'id così il listener saprà quale titolo modificare
        const modifica = document.createElement('button');
        modifica.type = 'button';
        modifica.classList.add('modifica');
        modifica.value = singolo.id;
        modifica.textContent = 'Modifica';

        // il value contiene l'id, così il listener saprà quale titolo eliminare
        const elimina = document.createElement('button');
        elimina.type = 'button';
        elimina.classList.add('elimina');
        elimina.value = singolo.id;
        elimina.textContent = 'Elimina';

        //bottoni e badge appesi alla parte desta
        destra.appendChild(badge);
        destra.appendChild(cambioBadge);
        destra.appendChild(modifica);
        destra.appendChild(elimina);

        //parte destra e sinista appesi alla lista
        card.appendChild(sinistra);
        card.appendChild(destra);
        listaCard.appendChild(card);
    });

    //dopo aver disegnato le card aggiorna i contatori
    aggiornaContatori();
}

// salva il nuovo nome scritto nell'input
function salvaModifica(campo) {
    // se non c'è nessuna modifica in corso esco (evita il doppio salvataggio)
    if (modificaTitolo === null) return;

    const id = Number(campo.id);
    const nuovoNome = campo.value.trim();
    // cerco nell'array il titolo con quell'id
    const elemento = videoteca.find((v) => v.id === id);

    // se il campo non è vuoto aggiorno il nome e mostro la notifica
    if (nuovoNome !== '') {
        mostraNotifica('Hai modificato ' + elemento.nome + ' in ' + nuovoNome);
        elemento.nome = nuovoNome;
    }
    // a modifica finita, ridisegno le card
    modificaTitolo = null;
    mostraCard();
}

// un solo listener sul contenitore per i bottoni Elimina e Modifica
listaCard.addEventListener('click', (event) => {
    // click su Elimina: tolgo il titolo dall'array e mostro la notifica
    if (event.target.classList.contains('elimina')) {
        const id = Number(event.target.value);
        const elemento = videoteca.find((v) => v.id === id);
        mostraNotifica('Hai eliminato ' + elemento.nome + ' dalla lista');
        videoteca = videoteca.filter((v) => v.id !== id);
        mostraCard();
    }

     // click su Modifica: salvo l'id della card, ridisegno e metto il cursore nell'input
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

// aggiunta di un nuovo titolo
bottoneAggiungi.addEventListener('click', () => {
    const valore = nuovoTitolo.value.trim();

     // se manca un campo mostra l'alert, svuota i campi e fermati con return
    if (valore === '' || genere.value === '' || stato.value === '') {
        alert('Ti preghiamo di completare tutti i campi per inserire correttamente il nuovo film, serie tv o anime!');
        nuovoTitolo.value = '';
        genere.value = '';
        stato.value = '';
        return;
    }

     // aggiunta del nuovo oggetto all'array
    videoteca.push({
        nome: valore,
        id: prossimoId,
        genere: genere.value,
        completato: stato.value
    });
    mostraNotifica('Hai aggiunto ' + valore + ' alla lista');
     // prepara l'id per il prossimo titolo e svuota il campo del titolo
    prossimoId++;
    nuovoTitolo.value = '';
    mostraCard();
});
// la ricerca si aggiorna mentre scrivo
ricerca.addEventListener('input', mostraCard);

// chiamata iniziale: disegna le card appena si apre la pagina
mostraCard();
