//-----------T H E  G A M E---------------
let pick1
let pick2
let flipCardStatus = false
function flipCard() {
    console.log("memowords--", memoWords)
    //ADD CLASS "PICKED" TO this. CARD witch is what ever clicks it listens
    this.classList.add('picked');
    
    //CHECK if IT HAS BEEN FLIPED 
        //IF NOT, CHANGE FLIPSTATUS AND ASIGN PICK1 AND GET OUT OF FUNCTION
        if (flipCardStatus === false){
            pick1 = this;
            flipCardStatus = true;
        }
        //ELSE TURN BACK FLIPSTATUS AND ASIGN PICK2 AND RUN FUNCTION TO CHECK IF IT MATCHES
        pick2 = this;
        flipCardStatus = false;

        checkPair()
}

// let superS = document.querySelector('.supersuper') 
// console.log("claaaaaaaaaaaaaas",superS.getAttribute('class'))
// let superX=superS.getAttribute('class')
// console.log(superX.split(" ").includes("big"))

function resetPick() {
    //has to reser p1 ,p2 and flip status before each hand
}

function checkPair() {
  console.log("hello")
    //CHECK IF .dataset.  PAIR(data-pair) match
    if (pick1.dataset.pair===pick2.dataset.pair){ //IF PAIRED P1=P2? DISABLE PICKED : TURNOROUND CARDS
        //IF THEY DO, REMOVE EVENT LISTENERS AND RETURN 
        pick1.removeEventListener('click', flipCard)
        pick2.removeEventListener('click', flipCard)
        return

    }
    let ee = pick1.setAttribute("class", "memocard");
    console.log(ee)
    pick2.setAttribute("class", "memocard");
      
  
    
    //ELSE TURN CARDS BACK AGAIN unflip  AND REMOVE "PICKED"CLASS WITH SOME TIMEOUT

    

    //turn around card
    setTimeout(() => {
        //pick1//remove flip class side
        //pick//remove flip class side
    }, 1000);
}

