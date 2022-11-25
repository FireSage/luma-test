const fs = require('fs')


const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputEmail () {
        return $('#email');
    }

    get errorEmail () {
        return $('#email-error');
    }

    get inputPassword () {
        return $('#pass');
    }

    get errorPassword () {
        return $('#pass-error');
    }

    get btnSubmit () {
        return $('button.login[type="submit"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    // Loads a random username-password pair from the login data file
    loadRandomLoginInfo(){
        const path = "\\..\\data\\login.data.json";

        const fileEncoding = "utf8"

        let users = JSON.parse(fs.readFileSync(__dirname+path));

        const user = users[Math.floor( Math.random() * (users.length-1) )];

        return user;
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('customer/account/login/');
    }
}

module.exports = new LoginPage();
