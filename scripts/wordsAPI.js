let memoWords = []
getRandomIndex = (arr) => Math.floor(Math.random()*arr.length)

function getWordFromApi() {
   
    const testSection = document.querySelector("#test");
    console.log(testSection)
    let wordListRaw = wD1.split("\n")
    let wordListClean = wordListRaw.map(x=>x.split(" ")[0])
  
    for (let i = 1; i <= 8; i++){
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
            console.log("round---->",i , "data---->", data.word);
            let randomePick = getRandomIndex(data.results);
            console.log(randomePick);
            let newWord = {
                word: data.word,
                definition: data.results[randomePick].definition,
                partOfSpeech: data.results[randomePick].partOfSpeech,
                typeOf: data.results[randomePick].typeOf,
                synonyms: data.results[randomePick].synonyms
            }
            memoWords.push(newWord)
            const articleTest = document.createElement('article');
        articleTest.innerHTML = `<h1 id="wordtest">${data.word}</h1>`;
                
        console.log(articleTest)
        testSection.appendChild(articleTest)
    
        })
        .catch(err => {
            console.log(err);
        });
   
    }
    console.log(`BIG ARRAY
            `,memoWords);
};

// getWordFromApi();
 

//-------------------------------------F() to get a random word just in case
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
    

    