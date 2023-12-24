/// <reference types="cypress" />
import homepage from "../pageObject/homePage.js"
const homePage = new homepage();

beforeEach(() => {
    cy.loginWithSession('aravindmathi93@gmail.com', 'aravind03')
    cy.visit('/')
});

describe('Validate each cart with database values', () => {
    it('Each cart with values get from DB', () => {
        homePage.dbTesting();
    })
})
