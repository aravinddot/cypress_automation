import SharedFunctions from "./sharedFunction";

export class utility {

    clickFirstCart(index=0) {
        return cy.xpath(SharedFunctions.getXPathValue('cart1')).eq(index).contains('Add to cart').should('be.visible').click({ force: true });
    }

    clickSecondCart(index=1) {
        return cy.xpath(SharedFunctions.getXPathValue('cart2')).eq(index).contains('Add to cart').should('be.visible').click({ force: true });
    }

    firstCartAdded() {
        return cy.xpath(SharedFunctions.getXPathValue('cart1Text')).should('have.text', 'Added!')
    }

    continueShoppingButton() {
        return cy.xpath(SharedFunctions.getXPathValue('continueShoppingBtn1')).contains('Continue Shopping').should('be.visible').click({ force: true })
    }

    secondCartAdded() {
        return cy.xpath(SharedFunctions.getXPathValue('cart2Text')).should('have.text', 'Added!')
    }

    continueShoppingButtonSecond() {
        return cy.xpath(SharedFunctions.getXPathValue('continueShoppingBtn2')).contains('Continue Shopping').should('be.visible').click({ force: true })
    }

    cartButtonIsVisible() {
        return cy.xpath(SharedFunctions.getXPathValue('cartBtn')).should('be.visible').click({ force: true });
    }

    addedCartOneIsVisible(index=0) {
        return cy.xpath(SharedFunctions.getXPathValue('addedCart1')).eq(index).should('be.visible').click({ force: true });
    }

    addedCartTwoIsVisible(index=1) {
        return cy.xpath(SharedFunctions.getXPathValue('addedCart2')).eq(index).should('be.visible').click({ force: true });
    }

    cartIsEmpty() {
        return cy.xpath(SharedFunctions.getXPathValue('cartIsEmptyText')).contains('Cart is empty!').should('be.visible');
    }

    clickHomePage() {
        return cy.xpath(SharedFunctions.getXPathValue('clickHomePage')).contains('Home').click({ force: true });
    }

    clickProduct(index = '') {
       return cy.xpath(SharedFunctions.getXPathValue('clickProduct')).eq(index).contains('View Product').should('be.visible').click({ force: true });

    }

}

export default utility