const { faker } = require("@faker-js/faker");
const userData = require('../data/user.data');

const HomePage = require('../pageobjects/home.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const LoginPage = require('../pageobjects/login.page');


describe("Checkout functionalty", async function(){
	beforeEach(async function(){
		await LoginPage.open();
		// --------------Test with predefined test user
		await LoginPage.login(userData.email, userData.password);

		// --------------Test with random user generated during registration test
		// const user = await LoginPage.loadRandomLoginInfo();
		// await LoginPage.login(user.email, user.password);
	});

	it("Should checkout with valid shipping details", async function(){
		// open webpage
		await HomePage.open();
		
		// add item to cart
		let product = await HomePage.addItemToCart();

		// wait for item to be added to mini cart
		await expect(HomePage.alert).toBeExisting();
		await expect(HomePage.alert).toHaveTextContaining("You added Radiant Tee to your shopping cart.");
		await HomePage.txtMiniCartName.waitForExist({timeout: 10000});
		await HomePage.btnMiniCartShow.click();
		await HomePage.btnMiniCartCheckout.waitForClickable({timeout: 10000});
		await HomePage.btnMiniCartCheckout.click();

		await CheckoutPage.chooseShipping(userData.shipping_address.street, 
			userData.shipping_address.city, 
			userData.shipping_address.state, 
			userData.shipping_address.zip, 
			userData.shipping_address.country.id,
			userData.shipping_address.phone
			);
		await CheckoutPage.checkout();

	});
/*
	it("Should not checkout with invalid shipping", async function(){
		// open webpage
		await HomePage.open();
		
		// add item to cart
		let product = await HomePage.addItemToCart(0, 1);

		// // check for success message
		await expect(HomePage.alert).toBeExisting();
		await expect(HomePage.alert).toHaveTextContaining("You need to choose options for your item.");
		// await HomePage.txtMiniCartName.waitForExist({timeout: 3000});
	});
	*/

});