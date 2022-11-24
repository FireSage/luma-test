const { faker } = require("@faker-js/faker");

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

        await RegisterPage.register("first", "name", "email", "P@ssword1", "P@ssword1");

        await expect(RegisterPage.errorEmail).toBeExisting();
        await expect(RegisterPage.errorEmail).toHaveTextContaining(
        'Please enter a valid email address (Ex: johndoe@domain.com).');
    });

    it('Should not register user with invalid password', async function(){
        await RegisterPage.open();

        await RegisterPage.register("first", "name", "email", "P@", "P@");

        await expect(RegisterPage.errorPassword).toBeExisting();
        await expect(RegisterPage.errorPassword).toHaveTextContaining(
        'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.');
    });

    it('Should not register user with invalid confirmation password', async function(){
        await RegisterPage.open();

        await RegisterPage.register("first", "name", "email@qualityw.jm", "P@ssword1", "P@assword2");

        await expect(RegisterPage.errorPasswordConfirm).toBeExisting();
        await expect(RegisterPage.errorPasswordConfirm).toHaveTextContaining(
        'Please enter the same value again.');
    });


    it('Should register user with valid information', async function(){
        await RegisterPage.open();
        let firstname = faker.name.firstName();
        let lastname = faker.name.lastName();
        let email = faker.internet.email();

        await RegisterPage.register(firstname, lastname, email, "P@ssword1", "P@ssword1");
        // await RegisterPage.register("first", "name", "email@qualityw.jm", "P@ssword1", "P@assword1");

        
        await expect(browser).toHaveUrl('https://magento.softwaretestingboard.com/customer/account/');
        
        await expect(RegisterPage.alert).toBeExisting();
        
        await expect(RegisterPage.alert).toHaveTextContaining(
        'Thank you for registering with Fake Online Clothing Store.');
        
        await expect(RegisterPage.welcomeMessage).toBeExisting();
        await expect(RegisterPage.welcomeMessage).toHaveTextContaining(
        `Welcome, ${firstname} ${lastname}!`);
    });
    

});


