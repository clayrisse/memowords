'use strict';


class Validator {
  constructor() {
  //predetermin messages
  this.invalidEmailError = '*Introduce valid email';
  this.emailExistsError = '*This email is already register';
  this.passwordError = '*Introduce a 6 character or more, password';
  this.repeatPasswordError = '*The characters do not match';
  
  //obj whith "errors" that we are going to show the user
    this.errors = {
    invalidEmailError: this.invalidEmailError,
    passwordError: this.passwordError,
    repeatPasswordError: this.repeatPasswordError,
    } 
  }    
    
    // validate  email name
  validateValidEmail = (email) => {
    //if is valid, the function takes out the "error". Else, it'll show
    if (this.emailIsValid(email)) {
      delete this.errors.invalidEmailError; 
    } else {

      this.errors.invalidEmailError = this.invalidEmailError;
    }
  }

     //validate mail isn't taken 
     //auxiliar function of 'validateEmail 
  emailIsValid = (email)=> {
    //RegEx 
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    //'test' method tests if the string obey the rules
    // returns true or false
    const isValid = emailRegEx.test(email);

    return isValid;
  }

  //validate mail isn't taken
  validateUniqueEmail = (newEmail) => {
    const usersDB = db.getAllUsers();

    let emailUnique = true;

    if(usersDB.length > 0) {
        usersDB.forEach( (userObj) => {
            //if email is taken, changes value of variable to 'false'
            if (userObj.email === newEmail) {
                emailUnique = false;
            }
        })

        if(emailUnique) {
            //takes out message error
            delete this.errors.emailExistsError;
        } else {
            //if email is unique
            this.errors.emailExistsError = this.emailExistsError;
        }

    }
  }

    //validate password length 
  validatePassword = (password) => {
    if (password.length > 5) {
      //takes the error message
      delete this.errors.passwordError;
    
    } else {
      //if the passwors has less than 5 characters, shows message
      this.errors.passwordError = this.passwordError;
    }
  }

    //validate if password y repeat-password match
  validatePasswordRepeat = (password, passwordRepeat) => {
    if (password === passwordRepeat) {
      // if the 2 passwords match, takes error out
      delete this.errors.repeatPasswordError;
    
    } else {
      // if they dont match, shows message
      this.errors.repeatPasswordError = this.repeatPasswordError
    }
  }
    
  //gets the object with the errors to sho the user in signup page
  getErrors = () => {
    return this.errors;
  }

  //restarts shown errors for next Signup
  resetValidator = () => { 
    this.errors = {
      invalidEmailError: this.invalidEmailError,
      passwordError: this.passwordError,
      repeatPasswordError: this.repeatPasswordError,
    }
  }
}

const validator = new Validator();