
function sendSetings() {

    const boardSizeImput = document.querySelector("#boardsize").value
    const levelChoiseImput = document.querySelector("#levelchoise").value
    const levelGod = document.querySelector("#levelgod").value
    
    if (boardSizeImput>=18) {
        setTimeout( ()=> location.assign(`login.html`), 500);
    } else if (boardSizeImput<18) {
        setTimeout( ()=> location.assign(`memowords.html?boardSizeImput=${boardSizeImput}&levelChoiseImput=${levelChoiseImput}&levelGod=${levelGod}`), 500);
    }
   
} 

const setSettingBtn = document.querySelector('#btnseting') //change button name

window.addEventListener('load', () => {
    setSettingBtn.addEventListener('click', sendSetings)
})

