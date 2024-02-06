import SharedFunctions from "./sharedFunction";

export class utility {

    clickFirstCart(index = 0) {
        return cy.xpath(SharedFunctions.getXPathValue('cart1')).eq(index).contains('Add to cart').should('be.visible').click({ force: true });
    }

    clickSecondCart(index = 1) {
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

    addedCartOneIsVisible(index = 0) {
        return cy.xpath(SharedFunctions.getXPathValue('addedCart1')).eq(index).should('be.visible').click({ force: true });
    }

    addedCartTwoIsVisible(index = 1) {
        return cy.xpath(SharedFunctions.getXPathValue('addedCart2')).eq(index).should('be.visible').click({ force: true });
    }

    clickHomePage() {
        return cy.xpath(SharedFunctions.getXPathValue('clickHomePage')).contains('Home').click({ force: true });
    }

    clickProduct(index = '') {
        return cy.xpath(SharedFunctions.getXPathValue('clickProduct')).eq(index).contains('View Product').should('be.visible').click({ force: true });

    }

    clickHeaderText(text) {
        return cy.xpath(SharedFunctions.getXPathValue('headersCommonXpath')).contains(text).should('be.visible').click({ force: true })
    }

    proceedToCheckoutBtn() {
        cy.xpathIsVisible(SharedFunctions.getXPathValue('proceedToCheckoutBtn')).should('have.text', 'Proceed To Checkout').click({ force: true })
    }

    cartPageIsVisible() {
        cy.url().should('include', 'https://automationexercise.com/view_cart')
    }

    verifyCartIsEmpty() {
        return cy.xpath(SharedFunctions.getXPathValue('cartIsEmptyText')).contains('Cart is empty!').should('be.visible');
    }

    randomNumbers(count, howManyCarts) {
        return cy.wrap(null).then(() => {
            const randomNumber = []
            for (let i = 0; i < howManyCarts; i++) {
                let randNum = Math.floor(Math.random() * count); // Generates a random number between 0 and 34
                randomNumber.push(randNum)
            }
            return randomNumber
        })
    }

    cartIsEmpty() {
        return cy.ifXPathExist("//tbody//td[@class='cart_product']").then((exist) => {
            if (exist) {
                cy.xpathIsVisible("//tbody//td[@class='cart_product']").then((attr) => {
                    const attrCount = attr.length
                    console.log(attrCount);
                    for (let index = 0; index < attrCount; index++) {
                        cy.wait(2000)
                        cy.xpathIsVisible("//tbody//td[@class='cart_delete']//i").first().click({ force: true })
                    }
                })
            } else {
                return cy.xpath(SharedFunctions.getXPathValue('cartIsEmptyText')).contains('Cart is empty!').should('be.visible');
            }
            cy.xpath(SharedFunctions.getXPathValue('cartIsEmptyText')).contains('Cart is empty!').should('be.visible');
        })
    }

}

export default utility