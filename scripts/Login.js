'use strict';

class Login {
  constructor() {
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");

    this.loginButton = document.querySelector("#login-button");
    this.messageContainer = document.querySelector(".message-container");
  }

  // gestionar el envio de los datos (evento "submit")
  submit = (event) => {
    event.preventDefault();

    const usersDB = db.getAllUsers();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    // Intentar encontrar el usuario
    const user = usersDB.find( (userObj) => {
      if (userObj.email === email && userObj.password === password) {
        return true;
      }
    })


    this.showMessage(user);
  }

  // mostrar el mensaje de error o mensaje de exito
  showMessage = (user) => {
    // eliminar el mensaje previo
    this.messageContainer.innerHTML = "";

    const message = document.createElement('p');

    if (user) {
      // si el usuario inicia la sesion con exito
      // agrega la clase para cambiar el color y sobrescribir el estilo anterior
      message.innerHTML = `hola, ${user.email}`;
      message.classList.add("correct-message");
    }
    else {
      // si el inicio de sesión no se ha realizado correctamente
      message.innerHTML = 'el email o/y password son incorectos';
    }

    this.messageContainer.appendChild(message);

    if (user) this.redirect();
  }

  redirect = () => {
    setTimeout( ()=> location.assign('index.html'), 2000);
  }

}


const login = new Login();

login.loginButton.addEventListener("click", login.submit);


// Creating methods in a class block:
  // arrow methods:   they will be created on the new object, on the instance
  //                  When updating, we must update every instance.


  // regular methods: they are created on the class prototype (e.g. Login.prototype)
  //                  and instances can access it via inheritance.
  //                  Easier to update and change later (change in one place)