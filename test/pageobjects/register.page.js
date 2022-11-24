

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegisterPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputFirstname () {
        return $('#firstname');
    }

    get inputLastname () {
        return $('#lastname');
    }

    get inputEmail () {
        return $('#email_address');
    }

    get inputPassword () {
        return $('#password');
    }

    get inputPasswordConfirm () {
        return $('#password-confirmation');
    }

    get errorFirstname () {
        return $('#firstname-error');
    }

    get errorLastname () {
        return $('#lastname-error');
    }

    get errorEmail () {
        return $('#email_address-error');
    }

    get errorPassword () {
        return $('#password-error');
    }

    get errorPasswordConfirm () {
        return $('#password-confirmation-error');
    }

    get btnSubmit () {
        return $('button.submit[type=submit]');
    }

    get alert () {
        return $('.messages[role="alert"]');
    }

    get welcomeMessage () {
        return $('.panel.header > .header.links li.welcome');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async register (firstname="", lastname="", email="", password="", passwordConfirmation="") {

        await this.inputFirstname.setValue(firstname);

        await this.inputLastname.setValue(lastname);

        await this.inputEmail.setValue(email);

        await this.inputPassword.setValue(password);

        await this.inputPasswordConfirm.setValue(passwordConfirmation);

        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('customer/account/create/');
    }
}

module.exports = new RegisterPage();
