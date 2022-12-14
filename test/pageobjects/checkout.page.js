// You added Radiant Tee to your shopping cart.
// failed to add to car url: https://magento.softwaretestingboard.com/breathe-easy-tank.html

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutPage extends Page {
    /**
     * define selectors using getter methods
     */
    get txtFirstName () {
        return $('input[name="firstname"]');
    }

    get txtLastName () {
        return $('input[name="lastname"]');
    }

    get txtStreet () {
        return $('input[name="street[0]"]');
    }
    get txtStreet1 () {
        return $('input[name="street[1]"]');
    }
    get txtStreet2 () {
        return $('input[name="street[2]"]');
    }

    get txtCity () {
        return $('input[name="city"]');
    }

    get txtState () {
        return $('input[name="region"]');
    }

    get selectState () {
        return $('select[name="region_id"]');
    }

    get txtZip () {
        return $('input[name="postcode"]');
    }

    get selectCountry () {
        return $('select[name="country_id"]');
    }

    get txtPhone () {
        return $('input[name="telephone"]');
    }

    get alert () {
        return $('.messages[role="alert"]');
    }

    get btnNext () {
        return $('button.continue[type=submit]');
    }

    get txtOrderNumber () {
        return $('.order-number');
    }

    get btnCheckout () {
        return $('button.checkout[type=submit]');
    }

    // Hande shipping method page used selected shipping address
    // if availabe. Adds shipping address if none exist 
    async chooseShipping(Street, City, State, Zip, Country, Phone) {
        let noAddressAvailable = false;
        // wait for clickable will throw error if element isn't found
        // we use this to determine if the address for is on the page 
        // if not the page should have shipping address selected 
        try{
            await this.selectCountry.waitForClickable();
            noAddressAvailable = await this.selectCountry.isExisting();
        }catch (error) {
            console.error(error);
        }
        
        if(noAddressAvailable){
            await this.fillShippingAddress(Street, City, State, Zip, Country, Phone);
        }

        await this.btnNext.waitForClickable({timeout: 10000});
        await this.btnNext.click();
    }

    // Fill out shipping address
    async fillShippingAddress(Street, City, State, Zip, Country, Phone){
        await this.selectCountry.selectByAttribute('value', Country);
        await this.txtZip.setValue(Zip);

        await this.txtState.waitForClickable({timeout: 10000});
        // TODO: switch between text and select for state based on country  
        await this.txtState.setValue(State);
        // await this.selectState.setValue(State);
        await this.txtStreet.setValue(Street);
        await this.txtCity.setValue(City);
        await this.txtPhone.setValue(State);
    }

    // Click checkout button to finalise purchase
    async checkout(){
        await this.btnCheckout.click();
        this.orderId = await this.txtOrderNumber.getText();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
         return super.open('checkout/cart/');
    }

}

module.exports = new CheckoutPage();
