const HomePage = require('../pageobjects/home.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const LoginPage = require('../pageobjects/login.page');
const OrderHistoryPage = require('../pageobjects/orderhistory.page');

describe("Order history", function(){
	beforeEach(async function(){
		await LoginPage.open();
		await LoginPage.login("email1@qualityw.jm","P@ssword1");
	});
	it("Verify that puchase is added to order history", async function(){
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


		await CheckoutPage.chooseShipping("faker.address.street", "Kingston", "Kingston", "00000", "JM");
		await CheckoutPage.checkout();

		await OrderHistoryPage.open();
		await expect(OrderHistoryPage.txtOrderId).toHaveTextContaining(CheckoutPage.orderId);
	});
});