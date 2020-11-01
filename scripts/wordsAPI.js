let memoWords = []
let fillOrder = []
let numberOrder = []
let shuffleOrder = []
let cardArr = []
let levelChoise = ""
let boardSize = 0

// console.log("values-->",levelChoise, boardSizeImput)

const testSection = document.querySelector("#test");
getRandomIndex = (arr) => Math.floor(Math.random()*arr.length)

function getArraysSetUp() { // 
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
        testSection.appendChild(divTest)
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
        
        word.setAttribute("data-key", `${(i*2)-2}`)
        word.setAttribute("class", `textword`)
        definition.setAttribute("data-key", `${(i*2)-1}`)
        definition.setAttribute("class", `textdefinition`)
        
        word.textContent = `pipi${(i*2)-2}`;
        definition.textContent = `pipi${(i*2)-1}`;
        
        keyWord.appendChild(word) 
        keyDefi.appendChild(definition) 
        
    }
}
// printShuffleOrderTesting() // PRENDER SOLO PARA HACER TEST DEL LOOP EN EL FETCH

function getWordFromApi() {    
    // console.log(levelChoise)
    let wordListRaw = levelChoise.split("\n")    
    let wordListClean = wordListRaw.map(x=>x.split(" ")[0])
    // console.log(wordListClean)
   
    for (let i = 1; i <= boardSize/2; i++){   //----- LOOP to get as many words user set on inputsd
    let randomIndex = getRandomIndex(wordListClean)
       
        fetch(`https://wordsapiv1.p.rapidapi.com/words/${wordListClean[randomIndex]}`, {
            "method": "GET",
            "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "e5347b3dabmsh48cbe08706d1f47p19e89ajsne6f06070bcd7"
            }
        })
        .then(response => { 
            return response.json(); // response.json() es tambien una operacion asincrona
        })
        .then((data) => {
            // console.log(data)
            let randomePick = getRandomIndex(data.results);
            
            //-------selection creation and appendind of elements or words and definition
            const keyWord = document.querySelector(`[data-key="${shuffleOrder[i*2-2]}"]`);
            const keyDefi = document.querySelector(`[data-key="${shuffleOrder[i*2-1]}"]`);
            
            const word = document.createElement('p');
            const definition = document.createElement('p');
            
            word.setAttribute("data-key", `${(i*2)-2}`)
            word.setAttribute("class", `textword`)
            definition.setAttribute("data-key", `${(i*2)-1}`)
            definition.setAttribute("class", `textdefinition`)
            
            word.textContent = `word: ${data.word}`;
            definition.textContent = `definition: ${data.results[randomePick].definition}`;
            
            keyWord.appendChild(word) 
            keyDefi.appendChild(definition)         
            
            keyWord.addEventListener('click', audioTesting)
            keyDefi.addEventListener('click', audioTesting)
        })
        .catch(err => {
            console.log(err);
        });        
    }
        
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

    // console.log("boardSize", boardSize)
    // console.log("values------>", boardSizeImput, levelChoiseImput)
    // console.log(typeof levelChoiseImput)
    // console.log("values------>",boardSize,)
    // console.log("values------>", levelChoise)
    
    getArraysSetUp();   // console.log("cardArr:", cardArr, "numberOrder:",numberOrder);
    shuffle();          // console.log("shuffleOrder:",shuffleOrder)
    getBoardStarted();  // console.log(testSection)

    getWordFromApi();   // O N / o f f  of .fetch call and asignment of "cards" place
} 

window.addEventListener('load', () => {
    const setSettingBtn = document.querySelector('#btnseting')
    // console.log("creaaaaaaaaaaaaaate", setSettingBtn)
    setSettingBtn.addEventListener('click', setSetings )

})
    