// You added Radiant Tee to your shopping cart.
// failed to add to car url: https://magento.softwaretestingboard.com/breathe-easy-tank.html

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OrderHistoryPage extends Page {
    /**
     * define selectors using getter methods
     */
    get txtOrderId () {
        return $('.table-order-items tbody tr:nth-child(1) td.id');
    }

    get viewOrderLink () {
        return $('.table-order-items tbody tr:nth-child(1) td.actions .view');
    }

    get reOrderLink () {
        return $('.table-order-items tbody tr:nth-child(1) td.actions .order');
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('sales/order/history/');
    }

}

module.exports = new OrderHistoryPage();
