import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SharedFunctions from "../../cypress/pageObject/sharedFunction.js";
import newPage from "../../cypress/pageObject/newHomePage.js";
import login from "../../cypress/pageObject/login.js";
import productDetails from "../../cypress/pageObject/productDetails.js";
import sanityTesting from "../../cypress/pageObject/sanity.js";
import utility from "../../cypress/pageObject/utility.js";

const newPageHome = new newPage();
const ProductDetails = new productDetails();
const sanityTest = new sanityTesting();
const Login = new login();
const util = new utility();

beforeEach(() => {
    cy.visit('/')
    cy.getApiData();
});

before(() => {
    SharedFunctions.loadXPathValues();
    SharedFunctions.loadIdValues();
    SharedFunctions.loadTextValues();
})

Given('Get the stored datamap values and write the values in json file', ()=>{
    ProductDetails.writeValuesInJsonFile();
});

Given('Read the header stored values from json file and validating headers', ()=>{
    ProductDetails.readTheHeaderValuesFromStoredJsonFile();
});

When('Read the category and sub category stored values from json file and validating categories', ()=>{
    ProductDetails.readTheCategoryValuesFromStoredJsonFile();
});

When('Read the brand stored values from json file and validating brand', ()=>{
    ProductDetails.readTheBrandValuesFromStoredJsonFile();
});

When('Click on the {string} option in homepage', (text)=>{
    util.clickHeaderText(text);
});

Given('Grab the all cart name and cart price in products page and store the values', ()=>{
    ProductDetails.grabAllCartNamePrice();
});

When('Get the cart name and price values from json file and perform add to cart', ()=>{
    ProductDetails.getCartNamePriceRandomly();
});


When('Verify the cart page is visible properly', ()=>{
    util.cartPageIsVisible();
});

When('Verify the cart names, cart price and total amount', ()=>{
    ProductDetails.verifyCartNamePriceTotalAmount();
});

When('Click on procced to checkout', ()=>{
    ProductDetails.proceedToCheckoutBtn();
});

When('Verify the cart is empty in cart page', ()=>{
    util.cartIsEmpty();
});

When('Verify the {string} details', (text)=>{
    ProductDetails.verifyAddressDetails(text);
});

