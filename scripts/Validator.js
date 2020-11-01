"use strict"; //literally from Uros

// Validation
// manage the errors to be shown to the user

// email:
// email syntax (@ , .com)
// call to db to check if email is available

// password:
// the length of the password
// if the password and repeat-password are matching

class Validator {
  constructor() {
    // predetermined error messages
    this.invalidEmailError = "Enter a valid email address";
    this.emailExistsError = "The entered email address is already taken.";
    this.passwordError = "Password must be at least 6 characters long";
    this.repeatPasswordError = "Password and reapeat password must match!";


    
    // object with all the current errors that are shown to the user
    this.errors = {
      invalidEmailError: this.invalidEmailError,
      passwordError: this.passwordError,
      repeatPasswordError: this.repeatPasswordError,
    };
  }


  // validate if email syntax is valid
  validateValidEmail = (email) => {
    if (this.emailSyntaxIsValid(email)) {
      // don't show the email error message - remove it from the errors to show
      delete this.errors.invalidEmailError;
    } else {
      // if the email is not valid, set the error that will be shown
      this.errors.invalidEmailError = this.invalidEmailError;
    }
  };


  // helper function for `validateValidEmail`
  emailSyntaxIsValid = (email) => {
    // RegEx object - it contains the regex pattern used to test if email is valid
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    // emailRegEx.test is used to checki if the string fulfills the rules
    // we set in the pattern. It returns `true` or `false`
    const emailIsValid = emailRegEx.test(email);
    return emailIsValid;
  };


  // validate if email is taken
  validateUniqueEmail = (newEmail) => {
    const users = db.getAllUsers(); //

    let emailUnique = true;

    users.forEach((userObj) => {
      if (userObj.email === newEmail) {
        // Check email of each user
        emailUnique = false; // set emailUnique to `false` if email is already taken
      }
    });

    // if email is unique (if it is not taken) - remove the error message
    if (emailUnique) {
      delete this.errors.emailExistsError;
    } else {
      // if the email is taken, set the error to be shown
      this.errors.emailExistsError = this.emailExistsError;
    }
  };


  //validate the password length
  validatePassword = (password) => {
    if (password.length >= 6) {
      // remove the error message
      delete this.errors.passwordError;
    } else {
      // if password has less than 6 characters, set the error to be shown
      this.errors.passwordError = this.passwordError;
    }
  };


  // validate if password and repeat-password are matching
  validateRepeatPassword = (password, repeatPassword) => {
    if (password === repeatPassword) {
      // remove the error message
      delete this.errors.repeatPasswordError;
    } else {
      // if passwords are not matching, set the error to be shown
      this.errors.repeatPasswordError = this.repeatPasswordError;
    }
  };


  // get the errors to show them to the user on the Signup page
  getErrors = () => {
    return this.errors;
  };
}

const validator = new Validator();