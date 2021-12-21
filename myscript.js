var correctPlays = 0; /*contatore del punteggio del giocatore */
let field = document.getElementById("play-field");
let fieldDimensions = 0;
let gameIsOn = 0;

function fetchDifficulty(){ /* recupera la difficoltà desiderata */
    const difficulty= document.getElementById("difficulty").value;
    return difficulty;
}

function genField(n){ /* genera un campo di dimensioni n*n */
    field.innerHTML = ""; /* rimuove il contenuto precedente */
    for (let i=0; i<n;i++){
        field.innerHTML += `<div class="row"></div>`; /* crea n righe */
        let row = document.querySelectorAll(".row")[i];
        for (let j=0; j<n;j++){ /* su ogni riga crea n quadrati */
            row.innerHTML += `<div class="square point" onclick="clickColor(event)">` + (i*n + j +1) + `</div>`;
        }
    }
}

function genBombs(number,sup){ /* crea una lista di numeri interi unici tra 0 e (sup-1) e poi li scrive sulla corrispettiva cella in HTML*/
    let ar = [];
    while (ar.length<number){
        let n = Math.floor(Math.random()*sup) /* crea un numero intero tra 0 e 99 */
        let nIsUnique = true; /* indicatore di unicità del numero creato */
        for (let i=0; i<ar.length; i++){
            if (ar[i] == n){ /* test di unicità */
                nIsUnique = false;
                i = ar.length; /* chiude il ciclo appena si sa che il numero non è unico */
            }
        }
        if (nIsUnique){
            ar.push(n); /* se il numero passa il test di unicità uniscilo alla lista */
        }
    }
    let cellsArray=document.querySelectorAll(".square"); /* seleziona tutte le celle */
    for (let i=0; i<ar.length;i++){ 
        cellsArray[ar[i]].classList.add("bomb"); /* prende uno ad uno i numeri della lista e crea una bomba sulle corrispettive celle in HTML */
    }
}

function genBoard(difficulty){ /* a seconda della difficoltà scelta crea un campo differente */
    gameIsOn = 1;
    correctPlays = 0; /* azzera il punteggio del giocatore */
    if (difficulty == 1){
        genField(10);
        genBombs(16,100);
        fieldDimensions = 100
    }
    else if (difficulty == 2){
        genField(9);
        genBombs(16,81);
        fieldDimensions = 81
    }
    else if (difficulty == 3){
        genField(7);
        genBombs(16,49);
        fieldDimensions = 49
    }
}

function createGame(){
    genBoard(fetchDifficulty());  
}

function endGame(){
    gameisOn = 0;
    let squares = document.querySelectorAll(".square")
    for (let i=0; i<squares.length; i++){
        squares[i].classList.remove("point");  /*togli il pointer da tutte le caselle */
    }
    let bombArray = document.querySelectorAll(".bomb"); /* crea una lista di tutte le celle con una bomba */
    for (let i=0; i<bombArray.length; i++){
        bombArray[i].classList.add("bomb-clicked"); /* colora di rosso tutte le celle con una bomba */
    }
}

function clickColor(event){ 
    if(gameIsOn == 1){
        if (event.target.classList.contains("bomb")){ /* caso in cui si clicca una cella che contiene una bomba */
            field.innerHTML += `<h3>Hai perso! Il tuo punteggio finale è ` + correctPlays + `. Ritenta!</h3>`;
            endGame();
        }
        else{
            if (!(event.target.classList.contains("safe-clicked"))){ /* controlla che non si clicchi più volte la stessa casella sicura */
                correctPlays ++; /* aumenta di 1 il punteggio del giocatore */
            }
            event.target.classList.add("safe-clicked"); /* identifica il quadrato cliccato e lo colora di blu*/
            event.target.classList.remove("point"); /* togli il pointer dall'elemento cliccato */
            if (correctPlays == fieldDimensions -16){ /* controlla se il giocatore ha cliccato tutte le caselle tranne quelle in cui ci sono bombe */
                field.innerHTML += `<h3>Hai vinto la partita!</h3>`;
                endGame();
            }
        }
    }
}