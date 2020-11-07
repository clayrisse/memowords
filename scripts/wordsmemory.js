//-----------T H E  G A M E---------------
let pick1
let pick2
let flipCardStatus = false
let isPairPlayingOut = false
let pairCounter = 0

function flipCard() {

    if (isPairPlayingOut) return

    //ADD CLASS "PICKED" TO this. CARD witch is what ever clicks it listens
    this.classList.add('picked');
    
    //CHECK if IT HAS BEEN FLIPED 
        //IF NOT, CHANGE FLIPSTATUS AND ASIGN PICK1 AND GET OUT OF FUNCTION
        if (flipCardStatus === false){
            pick1 = this;
            console.log("pieck1", pick1)
            flipCardStatus = true;
            return // return to get out a wait fro click n2
        } else if (pick1===this) return
        
        //ELSE TURN BACK FLIPSTATUS AND ASIGN PICK2 AND RUN FUNCTION TO CHECK IF IT MATCHES
        pick2 = this;
        flipCardStatus = false;
        console.log("pieck2", pick2)

        return checkPair()
}

checkPair = () => {
  console.log("hello from checkpair", pick1.dataset.pair, pick2.dataset.pair)
  
    //CHECK IF .dataset.  PAIR(data-pair) match
    if (pick1.dataset.pair===pick2.dataset.pair ){ //IF PAIRED P1=P2? DISABLE PICKED : TURNOROUND CARDS
        //IF THEY DO, REMOVE EVENT LISTENERS AND RETURN 
        pick1.removeEventListener('click', flipCard)
        pick2.removeEventListener('click', flipCard)
        pairCounter += 1
        if (pairCounter == boardSize/2 ) return endMessage()
        console.log("pairCounter:", pairCounter)
        return
    }

    //ELSE TURN CARDS BACK AGAIN unflip  AND REMOVE "PICKED"CLASS WITH SOME TIMEOUT
    //turn around card after some time to be able to see it
    isPairPlayingOut = true
    let flipedTime = 4500
    if (pick2.classList[1] === "word"){
        flipedTime = 3000    //shorter time if they are just the "word"
    }
    setTimeout(() => {
        pick1.classList.remove('picked');
        pick2.classList.remove('picked');
        isPairPlayingOut = false
      
        console.log("-------",isPairPlayingOut, flipCardStatus, pick1, pick2)
    }, flipedTime);
}

endMessage = () => {
    const messageBox = document.querySelector('#endmessage')
    messageBox .setAttribute("class", `endmessage`)

    const message = document.createElement('div');
    message.innerHTML= `<h2>Congrats dude! You get less dumb every day ; )</h2>`;
    
    messageBox.appendChild(message) 
}
 
