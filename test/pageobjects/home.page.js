// You added Radiant Tee to your shopping cart.
// failed to add to car url: https://magento.softwaretestingboard.com/breathe-easy-tank.html

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get txtName () {
        return $('.product-items .product-item:nth-child(1)  .product-item-name');
    }

    get txtPrice () {
        return $('.product-items .product-item:nth-child(1)  .price-final_price .price');
    }

    get btnAddToCart () {
        return $('.product-items .product-item:nth-child(1)  button[type=submit]');
    }

    get btnSize () {
        return $('.product-items .product-item:nth-child(1)  .size .swatch-option:nth-child(1)');
    }

    get btnColor () {
        return $('.product-items .product-item:nth-child(1)  .color .swatch-option:nth-child(1)');
    }

    get alert () {
        return $('.messages[role="alert"]');
    }

    get cartCounter () {
        return $('.minicart-wrapper .counter-number');
    }

    get btnMiniCartShow () {
        return $('.showcart');
    }

    get btnMiniCartCheckout () {
        return $('#top-cart-btn-checkout');
    }

    get txtMiniCartName () {
        return $('#mini-cart .item:nth-child(1) .product-item-name a');
    }

    get txtMiniCartPrice () {
        return $('#mini-cart .item:nth-child(1) .price');
    }


    async addItemToCart(size = 1, color = 1){
        // get product name
        let product_name = await this.txtName.getText();
        let product_price = await this.txtPrice.getText();
        let initial_cart_count = Number(await this.cartCounter.getText());

        // select size
        if(size){
            await this.btnSize.click();
        }

        // select the color
        if(color){
            await this.btnColor.click();
        }
        
        // click add to cart
        await this.btnAddToCart.waitForClickable();
        await this.btnAddToCart.click();

        return {name: product_name, price: product_price, initial_cart_count: initial_cart_count}
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    // open () {
    //     return super.open('');
    // }

}

module.exports = new HomePage();
