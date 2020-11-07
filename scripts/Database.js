"use strict";

class Database {
  getAllUsers() {
    const usersStr = localStorage.getItem("users");
    const usersArr = JSON.parse(usersStr); 
    return usersStr === null ? [] : usersArr;
  };

  saveNewUser(newUser) {
    const usersArr = this.getAllUsers();
    const updatedUsersArr = [...usersArr, newUser];
    // or usersArr.push(newUser);
    const updatedUsersStr = JSON.stringify(updatedUsersArr);
    localStorage.setItem("users", updatedUsersStr);
  };
}

const db = new Database();
