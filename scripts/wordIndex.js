
function sendSetings() {

    const boardSizeImput = document.querySelector("#boardsize").value
    const levelChoiseImput = document.querySelector("#levelchoise").value
    
    setTimeout( ()=> location.assign(`memowords.html?boardSizeImput=${boardSizeImput}&levelChoiseImput=${levelChoiseImput}`), 500);
} 

const setSettingBtn = document.querySelector('#btnseting') //change button name

window.addEventListener('load', () => {
    setSettingBtn.addEventListener('click', sendSetings)
})

