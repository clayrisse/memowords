const testSection = document.querySelector("#test");
console.log(testSection)
let wordListRaw = wD1.split("\n")
let wordListClean = wordListRaw.map(x=>x.split(" ")[0])
let randomIndex = Math.floor(Math.random()*wordListClean.length)
console.log(randomIndex, "dddddddddddddddddd")

console.log("wordListClean---------------->",wordListClean)
const articleTest = document.createElement('article');
articleTest.innerHTML = `<h1 id="wordtest">${wordListClean[randomIndex]}</h1>`;
        
        console.log(articleTest)
        testSection.appendChild(articleTest);