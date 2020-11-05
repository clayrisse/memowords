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


  //mang changes of input 'email'
  handleEmailInput = (event) => {
    const email = event.target.value;

    //remember:validate input email text
    validator.validateValidEmail(email);

    const errors = validator.getErrors();

    //if name of email is valid
    if (!errors.invalidEmailError) {
      //check if email is unique
      validator.validateUniqueEmail(email);
    }
    this.setErrorMessages();
  }


  //mang changes of input  'password'
  handlePasswordInput = (event) => {
    const password = event.target.value;
    const passwordRepeat = this.repeatPasswordInput.value;

    //remember: validate input password text
    validator.validatePassword(password);
    validator.validatePasswordRepeat(password, passwordRepeat);

    this.setErrorMessages();
  }


  //manage changes of input  'repeat-password'
  handleRepeatPasswordInput = (event) => {
    const passwordRepeat = event.target.value;
    const password = this.passwordInput.value;

    //remember:validate input Password tex
    //remember:validate input repeatPassword text
    validator.validatePassword(password);
    validator.validatePasswordRepeat(password, passwordRepeat);

    this.setErrorMessages();
  }


  //manage data sending 'submit'
  saveData = (event) => {
    //we do this to prevent the linked to "a database" cause we dont have one for this project
    // we cancel it so it doen no load
    event.preventDefault();
    //takes the value of each input
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const repeatPassword = this.repeatPasswordInput.value;

    const newUser = new User(name,  email, password);

     //save new user in our "database" (cause our database will be simulated;)
    db.saveNewUser( newUser );

    //empty the form
    this.nameInput.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.repeatPasswordInput.value = "";

    this.showSuccessMessage();
    this.removeMessages();
    this.redirect()
  }

 
  showSuccessMessage = () => {
    // show errors so they dont add up
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
    //empties all errors so they dont add
    this.errorsWrapper.innerHTML = "";
    
    const errorsObj = validator.getErrors();

    //conver object to array of strings
    const errorsStringsArr = Object.values(errorsObj);

    errorsStringsArr.forEach( (errorStr) => {
      const errorMessageP = document.createElement('p');
      errorMessageP.innerHTML = errorStr;

      this.errorsWrapper.appendChild(errorMessageP);
    })
  }
  redirect = () => {
      setTimeout( ()=> location.assign('index.html'), 2000);
    }

   //register functions for each input/field
   addListeners = () => {
    //listens to text changes when we type
    this.emailInput.addEventListener("input", this.handleEmailInput );
    this.passwordInput.addEventListener("input", this.handlePasswordInput);
    this.repeatPasswordInput.addEventListener("input", this.handleRepeatPasswordInput);
    this.buttonInput.addEventListener("click", this.saveData);
  }
  
}


//create a new instance for the Signup (object)
const signup = new Signup();

window.addEventListener("load", signup.addListeners );