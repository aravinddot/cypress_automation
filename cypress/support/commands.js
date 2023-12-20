// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getTextValue', (xpath)=> {
    cy.xpath(xpath).should('be.visible').invoke('text').then((text)=>{
        return text;
    })
})

Cypress.Commands.add('xpathIsVisible', (xpath)=>{
    cy.xpath(xpath).should('be.visible').then((xpathVisible)=>{
        return xpathVisible;
    })
})

Cypress.Commands.add('clickOnXpath', (xpath)=>{
    cy.xpath(xpath).should('be.visible').click().then((clickOnXpath)=>{
        return clickOnXpath;
    })
})

Cypress.Commands.add('getApiResponse', ()=>{
    cy.request('https://automationexercise.com/api/productsList').as('comments');
        cy.get('@comments').then((apiResponse) => {
            return apiResponse;
        });
});

Cypress.Commands.add('loginWithSession', (userName, passWord) => {
    cy.session([userName, passWord], () =>{
        cy.visit('/login')
        cy.xpath("//input[@data-qa='login-email']").should('be.visible').type(userName)
        cy.xpath("//input[@data-qa='login-password']").should('be.visible').type(passWord)
        cy.xpath("//button[@data-qa='login-button']").should('be.visible').click({force:true})
    })
})