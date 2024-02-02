import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SharedFunctions from "../../cypress/pageObject/sharedFunction.js";
import newPage from "../../cypress/pageObject/newHomePage.js";
import login from "../../cypress/pageObject/login.js";
import productDetails from "../../cypress/pageObject/productDetails.js"
import sanityTesting from "../../cypress/pageObject/sanity.js"

const newPageHome = new newPage();
const ProductDetails = new productDetails();
const sanityTest = new sanityTesting();
const Login = new login();

beforeEach(() => {
    cy.visit('/')
    cy.getApiData();
});

before(() => {
    SharedFunctions.loadXPathValues();
    SharedFunctions.loadIdValues();
    Login.loginPage('ThirdUser');
})

Given('Verify each cart css background colour and get the each cart overlayed content',  ()=>{
    sanityTest.setTheHoveredContentText();
});

Given('Verify the overlayed content with actual cart name, cart price and add to cart option',  ()=>{
    sanityTest.verifyTheOverlayedContentTextInActualCart();
});