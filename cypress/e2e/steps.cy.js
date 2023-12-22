/// <reference types="cypress" />
import homepage from "../pageObject/homePage.js"

const homePage = new homepage();

beforeEach(() => {
    cy.loginWithSession('aravindmathi93@gmail.com', 'aravind03')
    cy.visit('/')
});


describe('Sign Up', () => {

    it('add two carts', () => {
        cy.fixture('xpath.json').then((xpathVal) => {
            // cy.xpath("//a[normalize-space()='Signup / Login']").should('be.visible').click({force:true})
            // cy.xpath("//input[@data-qa='login-email']").should('be.visible').type('aravindmathi93@gmail.com')
            // cy.xpath("//input[@data-qa='login-password']").should('be.visible').type('aravind03')
            cy.xpath(xpathVal.cart1).eq(0).contains('Add to cart').should('be.visible').click({ force: true });
            cy.xpath(xpathVal.cart1Text).should('have.text', 'Added!')
            cy.xpath(xpathVal.continueShoppingBtn1).contains('Continue Shopping').should('be.visible').click({ force: true })
            cy.xpath(xpathVal.cart2).eq(1).contains('Add to cart').should('be.visible').click({ force: true });
            cy.xpath(xpathVal.cart2Text).should('have.text', 'Added!')
            cy.xpath(xpathVal.continueShoppingBtn2).contains('Continue Shopping').should('be.visible').click({ force: true })
        })
    })

    it('remove cart and logout', () => {
        cy.fixture('xpath.json').then((xpathVal) => {
            cy.xpath(xpathVal.cartBtn).should('be.visible').click({ force: true });
            cy.xpath(xpathVal.addedCart1).eq(0).should('be.visible').click({ force: true });
            cy.xpath(xpathVal.addedCart2).eq(1).should('be.visible').click({ force: true });
            cy.xpath(xpathVal.cartIsEmptyText).contains('Cart is empty!').should('be.visible');
            //cy.xpath(xpathVal.logout).should('be.visible').click({ force: true })
        })
    })

    it('Validate cart name and price', () => {
        homePage.getApiResponse();
    });

    it('validate each cart producat name and product price', () => {
        homePage.validateEachCart();
    })

    it('verify each cart and validate', () => {
        homePage.verifyEachCart();
   })

    // it('Validate cart name and cart price from DB', () => {

    //    cy.task("select * from productDetails").then((dbResult)=>{
    //     console.log(dbResult);
    //    })
    // });

})

