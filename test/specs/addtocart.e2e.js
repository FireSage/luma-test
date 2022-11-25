const HomePage = require('../pageobjects/home.page');

describe("Add to cart functionalty", async function(){
	it("Add an item to the cart sucessfully with all options selected", async function(){
		// open webpage
		await HomePage.open();
		
		// add item to cart
		let product = await HomePage.addItemToCart();

		// check for success message
		await expect(HomePage.alert).toBeExisting();
		await expect(HomePage.alert).toHaveTextContaining("You added Radiant Tee to your shopping cart.");
		await HomePage.txtMiniCartName.waitForExist({timeout: 3000});
		await HomePage.btnMiniCartShow.click();

		// check minicart count
        // TODO:: check cart count
        // let cart_count = Number(await this.cartCounter.getText());
        // expect(cart_count). 

		// verify item is in mini cart
		await expect(HomePage.txtMiniCartName).toHaveTextContaining(product.name);
        await expect(HomePage.txtMiniCartPrice).toHaveTextContaining(product.price);
	});

	it("Should NOT add an item to the cart without size selected", async function(){
		// open webpage
		await HomePage.open();
		
		// add item to cart
		let product = await HomePage.addItemToCart(0, 1);

		// // check for success message
		await expect(HomePage.alert).toBeExisting();
		await expect(HomePage.alert).toHaveTextContaining("You need to choose options for your item.");
		// await HomePage.txtMiniCartName.waitForExist({timeout: 3000});
	});

	it("Should NOT add an item to the cart without color selected", async function(){
		// open webpage
		await HomePage.open();
		
		// add item to cart
		let product = await HomePage.addItemToCart(1, 0);

		// // check for success message
		await expect(HomePage.alert).toBeExisting();
		await expect(HomePage.alert).toHaveTextContaining("You need to choose options for your item.");
		// await HomePage.txtMiniCartName.waitForExist({timeout: 3000});
	});

});