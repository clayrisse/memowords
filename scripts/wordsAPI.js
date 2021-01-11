// require('dotenv').config();

let memoWords = [];
let fillOrder = [];
let numberOrder = [];
let shuffleOrder = [];
let cardArr = [];
let wordsArr = []

const palette = ["#fcc5c8","#fce5b1","#a7dccc","#c9dfb9","#fbd19d","#bfcdd9"]

const urlParams = new URLSearchParams(window.location.search);
const boardSizeImput = urlParams.get('boardSizeImput');
const levelChoiseImput = urlParams.get('levelChoiseImput');
const levelGod = urlParams.get('levelGod');

let boardSize = boardSizeImput;
let gameMaxCss = document.querySelector('#game')
gameMaxCss.classList.add(`b${boardSize}`); 

let levelChoise = "";
    switch (levelChoiseImput){
        case "wA1": levelChoise = level.wA1; break;
        case "wA2": levelChoise = level.wA2; break;
        case "wB1": levelChoise = level.wB1; break;
        case "wB2": levelChoise = level.wB2; break;
        case "wC1": levelChoise = level.wC1; break;
        case "wC2": levelChoise = level.wC2; break;
        case "wD1": levelChoise = level.wD1; break;
    }

const boardSection = document.querySelector("#board");
getRandomIndex = (arr) => Math.floor(Math.random()*arr.length)

function getArraysSetUp() { //creates 1arr with empty positions & a 2arr with numbers to be shuffle  
    for (let i = 1; i<=boardSize/2; i++) {
        cardArr.push("","")
        numberOrder.push((i*2)-2, (i*2)-1)
    }
}

function shuffle() { //makes an array of the shuffle or to later sellect by index an asign in order
    for (let i = 1; i<=boardSize; i++) {
        let indexOut = getRandomIndex(numberOrder)
        shuffleOrder.push(numberOrder[indexOut])
        numberOrder.splice(indexOut,1)
        // console.log("spliced", numberOrder, "shuffleOrder", shuffleOrder);
    }     
}

function getBoardStarted() { // Loop to list tag elem to asign later by data-key in shuffleOrder
    for (let i = 1; i<=boardSize/2; i++) {
        const divWord = document.createElement('div');
        const divDefi = document.createElement('div');

        divWord.setAttribute("data-key", (i*2)-1)
        divWord.setAttribute("class", `memocard`)
        divDefi.setAttribute("data-key", (i*2)-2)
        divDefi.setAttribute("class", `memocard`)
 
        boardSection.appendChild(divWord)
        boardSection.appendChild(divDefi)
    }
}

function audioTesting(){ //test to see if addlistener are active
    console.log("im listening")
}

function makeArrOfWordsToFetch(levelChoise) {
    let wordListRaw = levelChoise.split("\n")    
    let wordListClean = wordListRaw.map(x=>x.split(" ")[0])
 
    for (let i = 1; i <= boardSize/2; i++) {
        const randomWord = wordListClean[getRandomIndex(wordListClean)]
        wordsArr.push(randomWord)
    }
    return wordsArr
}

function printShuffleOrderTesting() { // shows cards without api

    for (let i = 1; i <= boardSize/2; i++){
        const keyWord = document.querySelector(`[data-key="${shuffleOrder[i*2-2]}"]`);
        const keyDefi = document.querySelector(`[data-key="${shuffleOrder[i*2-1]}"]`);
        
        keyWord.setAttribute("data-pair", `${i}`)
        keyWord.classList.add('word')
        keyDefi.setAttribute("data-pair", `${i}`)

        const word = document.createElement('p');
        const definition = document.createElement('p');
        
        word.setAttribute("data-word", `${(i*2)-2}`)
        word.setAttribute("class", `front tile`)
        definition.setAttribute("data-def", `${(i*2)-1}`)
        definition.setAttribute("class", `front tile`)
        
        if (levelGod) {
            // console.log("levelGod4", levelGod)
            word.style.backgroundColor = `${palette[(i-1)%6]}`
            definition.style.backgroundColor = `${palette[(i-1)%6]}`
        }
        
        word.textContent = `pipi${(i*2)-2}`;
        definition.textContent = `pipi${(i*2)-1}`;
        
        keyWord.appendChild(word) 
        keyDefi.appendChild(definition) 

        keyWord.addEventListener('click', flipCard)
        keyDefi.addEventListener('click', flipCard)

    }
} // printShuffleOrderTesting() // PRENDER SOLO PARA HACER TEST DEL LOOP EN EL FETCH

function getWordFromApi() {    
       
    let requests = wordsArr.map(word => fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": apiConfig.RAPIDAPI_HOST,
            "x-rapidapi-key": apiConfig.RAPIDAPI_KEY
            // "x-rapidapi-host": process.env.RAPID_API_HOST,
            // "x-rapidapi-key": process.env.RAPID_API_KEY
            // "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            // "x-rapidapi-key": "e5347b3dabmsh48cbe08706d1f47p19e89ajsne6f06070bcd7"
        }
    }))

    Promise.all(requests)
    .then(responses => { // all responses are resolved successfully
        for (let response of responses) {
        // alert(`${response.url}: ${response.status}`); 
        }
        return responses;
    }) // map array of responses into an array of response.json() to read their content
    .then(responses => Promise.all(responses.map(res => {
        // console.log(res)
        return res.json()
    }))) // all JSON answers are parsed: "users" is the array of them
    .then(wordInfo => {
        wordInfo.forEach(wordObj => {
        console.log("word:", wordObj.word)
        memoWords.push(wordObj)
        return memoWords
        })
            // console.log("object", memoWords)    
        //-------selection creation and appendind of elements or words and definition
        for (let i = 1; i <= boardSize/2; i++){
            let randomePick = getRandomIndex(wordInfo[i-1].results)
     

            const keyWord = document.querySelector(`[data-key="${shuffleOrder[i*2-2]}"]`);
            keyWord.setAttribute("data-pair", `${i}`)
            keyWord.classList.add('word')
            const keyDefi = document.querySelector(`[data-key="${shuffleOrder[i*2-1]}"]`);
            keyDefi.setAttribute("data-pair", `${i}`)
            
            const word = document.createElement('p');
            const definition = document.createElement('p');
            
            word.setAttribute("data-word", `${(i*2)-2}`)
            word.setAttribute("class", `front tile`)
            definition.setAttribute("data-def", `${(i*2)-1}`)
            definition.setAttribute("class", `front tile`)
            
            if (levelGod) {
                // console.log("levelGod4", levelGod)
                word.style.backgroundColor = `${palette[(i-1)%6]}`
                definition.style.backgroundColor = `${palette[(i-1)%6]}`
            }
            
            word.textContent = `${wordInfo[i-1].word}`;
            definition.textContent = `${wordInfo[i-1].results[randomePick].definition}`;
            
            keyWord.appendChild(word) 
            keyDefi.appendChild(definition)         
            
            keyWord.addEventListener('click', flipCard)
            keyDefi.addEventListener('click', flipCard)
        }
        console.log("wordInfo---", wordInfo, "memowords--", memoWords)
    })
    .catch(err => {
        console.log(err);
    })
}

function setSetings() { // to check functions, csl the comment
    getArraysSetUp();   // console.log("cardArr:", cardArr, "numberOrder:",numberOrder);
    shuffle();          // console.log("shuffleOrder:",shuffleOrder)
    getBoardStarted();  // console.log(boardSection)
    makeArrOfWordsToFetch(levelChoise)  // console.log("wordsArr", wordsArr)

    // printShuffleOrderTesting() // turn ON to test cards without API fetch
    getWordFromApi();   // O N / o f f  of .fetch call and asignment of "cards" place
} 

window.addEventListener('load', setSetings)


