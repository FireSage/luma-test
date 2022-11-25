const { faker } = require("@faker-js/faker");

const userData = require('../data/user.data');
const urlData = require('../data/url.data');
const RegisterPage = require('../pageobjects/register.page');


describe('Luma Registration function', () => {

    it('Should not register user with required fields empty', async () => {
        await RegisterPage.open();

        await RegisterPage.register();
        await expect(RegisterPage.errorFirstname).toBeExisting();
        await expect(RegisterPage.errorFirstname).toHaveTextContaining(
            'This is a required field.');
        await expect(RegisterPage.errorLastname).toBeExisting();
        await expect(RegisterPage.errorLastname).toHaveTextContaining(
            'This is a required field.');
        await expect(RegisterPage.errorEmail).toBeExisting();
        await expect(RegisterPage.errorEmail).toHaveTextContaining(
            'This is a required field.');
        await expect(RegisterPage.errorPassword).toBeExisting();
        await expect(RegisterPage.errorPassword).toHaveTextContaining(
            'This is a required field.');
        await expect(RegisterPage.errorPasswordConfirm).toBeExisting();
        await expect(RegisterPage.errorPasswordConfirm).toHaveTextContaining(
            'This is a required field.');
    });

    it('Should not register user with invalid email', async function(){
        await RegisterPage.open();

        await RegisterPage.register(faker.name.firstName(), faker.name.lastName(), "email", userData.password, userData.password);

        await expect(RegisterPage.errorEmail).toBeExisting();
        await expect(RegisterPage.errorEmail).toHaveTextContaining(
        'Please enter a valid email address (Ex: johndoe@domain.com).');
    });

    it('Should not register user with invalid password', async function(){
        await RegisterPage.open();

        await RegisterPage.register(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), "P@", "P@");

        await expect(RegisterPage.errorPassword).toBeExisting();
        await expect(RegisterPage.errorPassword).toHaveTextContaining(
        'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.');
    });

    it('Should not register user with invalid confirmation password', async function(){
        
        await RegisterPage.open();

        await RegisterPage.register(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), userData.password, "P@assword2");

        await expect(RegisterPage.errorPasswordConfirm).toBeExisting();
        await expect(RegisterPage.errorPasswordConfirm).toHaveTextContaining(
        'Please enter the same value again.');
    });


    it('Should register user with valid information', async function(){
        const email = faker.internet.email();
        const password = faker.internet.password(20, false, /[a-zA-Z0-9_+#!]/);

        await RegisterPage.open();

        await RegisterPage.register(userData.firstname, userData.lastname, email, password, password);

        
        await expect(browser).toHaveUrl(urlData.user_account);
        
        await expect(RegisterPage.alert).toBeExisting();
        
        await expect(RegisterPage.alert).toHaveTextContaining(
        'Thank you for registering with Fake Online Clothing Store.');
        
        await expect(RegisterPage.welcomeMessage).toBeExisting();
        await expect(RegisterPage.welcomeMessage).toHaveTextContaining(
        `Welcome, ${userData.firstname} ${userData.lastname}!`);

        RegisterPage.saveLoginInfo(email, password);
    });
    

});


