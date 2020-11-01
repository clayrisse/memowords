let memoWords = []
let fillOrder = []
let numberOrder = []
let shuffleOrder = []
let cardArr = []
let levelChoise = ""
let boardSize = 0

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
    for (let i = 1; i<=boardSize; i++) {
        const divTest = document.createElement('div');
        divTest.setAttribute("data-key", `${i-1}`)
        divTest.setAttribute("class", `wordbox`)
        // divTest.innerHTML = `<p class="wordtest" data-key="w${i-1}">hello${i-1}</p>`
        // <p id="wordtest" data-key="${i*2-1}">hello${i*2-1}</p>`;
        boardSection.appendChild(divTest)
    }
}

function audioTesting(){ //test to see if addlistener are active
    console.log("im listening")
}

function printShuffleOrderTesting() { //NOT TO USE. 

    for (let i = 1; i <= boardSize/2; i++){
        const keyWord = document.querySelector(`[data-key="${shuffleOrder[i*2-2]}"]`);
        const keyDefi = document.querySelector(`[data-key="${shuffleOrder[i*2-1]}"]`);
        const word = document.createElement('p');
        const definition = document.createElement('p');
        
        word.setAttribute("data-word", `${(i*2)-2}`)
        word.setAttribute("class", `textword id${i}`)
        // word.setAttribute("value", `${i}`)
        definition.setAttribute("data-def", `${(i*2)-1}`)
        definition.setAttribute("class", `textdefinition`)
        // definition.setAttribute("value", `${i}`)
        
        word.textContent = `pipi${(i*2)-2}`;
        definition.textContent = `pipi${(i*2)-1}`;
        
        keyWord.appendChild(word) 
        keyDefi.appendChild(definition) 
        console.log(keyWord, keyDefi)
        // console.log(word.data-word)

        keyWord.addEventListener('click', audioTesting)
        keyDefi.addEventListener('click', audioTesting)
    }

}
// printShuffleOrderTesting() // PRENDER SOLO PARA HACER TEST DEL LOOP EN EL FETCH

let wordsArr = []
function makeArrOfWordsToFetch(levelChoise) {
    let wordListRaw = levelChoise.split("\n")    
    let wordListClean = wordListRaw.map(x=>x.split(" ")[0])
 
    for (let i = 1; i <= boardSize/2; i++) {
        const randomWord = wordListClean[getRandomIndex(wordListClean)]
        wordsArr.push(randomWord)
    }
    return wordsArr
}

function getWordFromApi() {    
       
    let requests = wordsArr.map(word => fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
        "method": "GET",
        "headers": {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "e5347b3dabmsh48cbe08706d1f47p19e89ajsne6f06070bcd7"
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
        console.log(res)
        return res.json()
    }))) // all JSON answers are parsed: "users" is the array of them
    .then(wordInfo => wordInfo.forEach(wordObj => {
        console.log("word:", wordObj.word)
        memoWords.push(wordObj)
        return memoWords
        // return alert(word.name)
    }))
    .then(arr=>{
        console.log("arr--------", arr)
        console.log("memowords--", memoWords[0])
    })
    .catch(err => {
        console.log(err);
    }); 

};

function setSetings() {
    const boardSizeImput = document.querySelector("#boardsize").value
    const levelChoiseImput = document.querySelector("#levelchoise").value
    boardSize = boardSizeImput
    switch (levelChoiseImput){
        case "wA1": levelChoise = level.wA1; break;
        case "wA2": levelChoise = level.wA2; break;
        case "wB1": levelChoise = level.wB1; break;
        case "wB2": levelChoise = level.wB2; break;
        case "wC1": levelChoise = level.wC1; break;
        case "wC2": levelChoise = level.wC2; break;
        case "wD1": levelChoise = level.wD1; break;
        }

    getArraysSetUp();   // console.log("cardArr:", cardArr, "numberOrder:",numberOrder);
    shuffle();          // console.log("shuffleOrder:",shuffleOrder)
    getBoardStarted();  // console.log(boardSection)

    makeArrOfWordsToFetch(levelChoise)
    console.log("wordsArr", wordsArr)

    // printShuffleOrderTesting() // PRENDER SOLO PARA HACER TEST DEL LOOP EN EL FETCH
    // getWordFromApi();   // O N / o f f  of .fetch call and asignment of "cards" place

    setSettingBtn.removeEventListener('click', setSetings)
} 


const setSettingBtn = document.querySelector('#btnseting')


// window.addEventListener('load', setSetings)

window.addEventListener('load', () => {
    setSettingBtn.addEventListener('click', setSetings)
})