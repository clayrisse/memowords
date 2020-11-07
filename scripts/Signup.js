'use strict';

class Signup {
  constructor () {
    this.nameInput = document.querySelector("#name");
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");
    this.repeatPasswordInput = document.querySelector("#repeat-password");
   
    this.buttonInput = document.querySelector("#signup-button");
    this.errorsWrapper = document.querySelector(".message-container");
  }

  handleEmailInput = (event) => {
    const email = event.target.value;
    validator.validateValidEmail(email);
    const errors = validator.getErrors();
    
    if (!errors.invalidEmailError) {
      validator.validateUniqueEmail(email);
    }
    this.setErrorMessages();
  }

  handlePasswordInput = (event) => {
    const password = event.target.value;
    const passwordRepeat = this.repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validatePasswordRepeat(password, passwordRepeat);

    this.setErrorMessages();
  }

  handleRepeatPasswordInput = (event) => {
    const passwordRepeat = event.target.value;
    const password = this.passwordInput.value;

    validator.validatePassword(password);
    validator.validatePasswordRepeat(password, passwordRepeat);

    this.setErrorMessages();
  }

  saveData = (event) => {
    //we do this to prevent the linked to "a database" cause we dont have one for this project. we cancel it so it doesnt no load
    event.preventDefault();
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const repeatPassword = this.repeatPasswordInput.value;

    const newUser = new User(name,  email, password);

    db.saveNewUser( newUser ); // (our database will be simulated;)

    this.nameInput.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.repeatPasswordInput.value = "";

    this.showSuccessMessage();
    this.removeMessages();
    this.redirect()
  }
 
  showSuccessMessage = () => {
    this.errorsWrapper.innerHTML = "";
    const errorsObj = validator.getErrors();
    // convert  object in an array of strings
    const errorsStringsArr = Object.values(errorsObj);

    if (errorsStringsArr.length > 1) {
      return;
    }

    const successMessageP = document.createElement('p');
    successMessageP.innerHTML = "La cuenta ha sido creada con exito";

    this.errorsWrapper.appendChild(successMessageP);
  }

  removeMessages = () => {
    setTimeout( () => {
      this.errorsWrapper.innerHTML = "";
    }, 2000)
  }

  setErrorMessages = () => {
    this.errorsWrapper.innerHTML = "";
    const errorsObj = validator.getErrors();
    const errorsStringsArr = Object.values(errorsObj);//conver object to array of strings

    errorsStringsArr.forEach( (errorStr) => {
      const errorMessageP = document.createElement('p');
      errorMessageP.innerHTML = errorStr;
      this.errorsWrapper.appendChild(errorMessageP);
    })
  }

  redirect = () => {
      setTimeout( ()=> location.assign('index.html'), 2000);
  }

  addListeners = () => {
    this.emailInput.addEventListener("input", this.handleEmailInput );
    this.passwordInput.addEventListener("input", this.handlePasswordInput);
    this.repeatPasswordInput.addEventListener("input", this.handleRepeatPasswordInput);
    this.buttonInput.addEventListener("click", this.saveData);
  }
}

const signup = new Signup();

window.addEventListener("load", signup.addListeners );