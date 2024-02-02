import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SharedFunctions from "../../cypress/pageObject/sharedFunction.js";
import newPage from "../../cypress/pageObject/newHomePage.js";
import login from "../../cypress/pageObject/login.js";

const newPageHome = new newPage();
const Login = new login();

beforeEach(() => {
    Login.loginPage('ThirdUser');
    cy.visit('/')
    cy.getApiData();
});

before(() => {
    SharedFunctions.loadXPathValues();
    SharedFunctions.loadIdValues();
    SharedFunctions.loadTextValues();
})

    Given('Verify the logged in name in homepage', () => {
        newPageHome.verifyHomePage()
    });

    Then('Verify the homepage section', ()=>{
        newPageHome.verifyHomepageSection();
    });

    
    