//--------------------------F() to get a random word just in case
let randomWord = "";
function getRandomWordFromApi() {
    const testSection = document.querySelector("#test");
    console.log(testSection)
    
    fetch(`https://wordsapiv1.p.rapidapi.com/words/?random=true`, {
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
        console.log("data-------->", data)
       
        randomWord = data.word;
        const articleTest = document.createElement('article');
        articleTest.innerHTML = `<h1 id="wordtest">${randomWord}</h1>`;
                
        console.log(randomWord)
        testSection.appendChild(articleTest)
    })
    .catch(err => {
        console.log(err);
    })
}
   
// getRandomWordFromApi()
    




let memoWords = []
let fillOrder = []
let numberOrder = []
let shuffleOrder = []
let cardArr = []
let boardSize = 4

const testSection = document.querySelector("#test");
getRandomIndex = (arr) => Math.floor(Math.random()*arr.length)

for (let i = 1; i<=boardSize; i++) {
    cardArr.push("","")
    numberOrder.push((i*2)-2, (i*2)-1)
}
// console.log(numberOrder, shuffleOrder);

function shuffle() {
    for (let i = 1; i<=boardSize; i++) {
        let indexOut = getRandomIndex(numberOrder)
        shuffleOrder.push(numberOrder[indexOut])
        numberOrder.splice(indexOut,1)
        // console.log("spliced", numberOrder, "shuffleOrder", shuffleOrder);
    }     
}

function getBoradStarted() {
    for (let i = 1; i<=boardSize; i++) {
        const divTest = document.createElement('div');
        divTest.setAttribute("data-key", `${i-1}`)
        divTest.setAttribute("class", `wordbox`)
        divTest.innerHTML = `<p class="wordtest" data-key="w${i-1}">hello${i-1}</p>`
        
        // <p id="wordtest" data-key="${i*2-1}">hello${i*2-1}</p>`;
                
        console.log(divTest)
        testSection.appendChild(divTest)
    }
}
getBoradStarted()
shuffle()


function getWordFromApi() {    
    // console.log(testSection)
    let wordListRaw = wD1.split("\n")
    let wordListClean = wordListRaw.map(x=>x.split(" ")[0])
  
    for (let i = 1; i <= boardSize/4; i++){
    let randomIndex = getRandomIndex(wordListClean)
    // console.log("wordFunction-------------->", wordListClean[randomIndex])
       
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
            let randomePick = getRandomIndex(data.results);
            // console.log("round-->",i , "word-->", data.word, "randomIndex-->",randomePick);
            // let newWord = {
            //     word: data.word,
            //     definition: data.results[randomePick].definition,
            //     // partOfSpeech: data.results[randomePick].partOfSpeech,
            //     // typeOf: data.results[randomePick].typeOf,
            //     // synonyms: data.results[randomePick].synonyms
            // }
            // memoWords.push(newWord) 
            // fillOrder.push([
            //     i, "word", data.word
            // ], [
            //     i, "result", 
            //     data.results[randomePick].definition, 
            //     data.results[randomePick].partOfSpeech
            //     // data.results[randomePick].typeOf,
            //     // data.results[randomePick].synonyms
            // ])
            // const articleTest = document.createElement('article');
            // articleTest.innerHTML = `<h1 id="wordtest">${data.word}</h1>`;
                    
            // console.log(articleTest)
            // testSection.appendChild(articleTest)
            console.log(shuffleOrder)
            console.log(shuffleOrder[i*2-2])

            const keySection1 = document.querySelector(`[data-key="${shuffleOrder[i*2-2]}"]`);
            const keySection2 = document.querySelector(`[data-key="${shuffleOrder[i*2-1]}"]`);
            console.log(keySection1)
            console.log(keySection2)
            keySection1.innerHTML = `<p class="wordtest word" color="blue">${data.word}</p>`;
            keySection1.innerHTML = `<p class="wordtest def">${data.results[randomePick].definition}</p>`;
            // textSection1.appendChild(keySection1)
        
        })
      
        .catch(err => {
            console.log(err);
        });        
    }
        
                            // -----------------------why does this throws undifine?????
                            for (let k = 0; k < shuffleOrder.length; k++) {
                                console.log(k, fillOrder, shuffleOrder )
                                cardArr[shuffleOrder[k]]=fillOrder[k]
                            }
                            console.log(cardArr)
                            //------------------------whyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

    // console.log(`BIG ARRAY--->`,memoWords[1], memoWords); //WHY IS UNDEFINED
    // nemoWords.forEach(elem => fillOrder.push(elem.word, elem.results[randomePick].definition))
    // console.log("fillOrder", fillOrder)
};

// getWordFromApi();
 



    