import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import sanityTesting from "../../cypress/pageObject/sanity.js"

const sanityTest = new sanityTesting();

Given('Verify each cart css background colour and get the each cart overlayed content',  ()=>{
    sanityTest.setTheHoveredContentText();
});

Given('Verify the overlayed content with actual cart name, cart price and add to cart option',  ()=>{
    sanityTest.verifyTheOverlayedContentTextInActualCart();
});

Given('Verify the heading in showing correctly',  ()=>{
    sanityTest.verifyHeadingHomepage();
});

When('Verify the sub heading is showing correctly',  ()=>{
    sanityTest.verifySubHeadingHomepage();
});

When('Verify the paragraph is showing correctly',  ()=>{
    sanityTest.verifyParagraphHomepage();
});

Then('Verify the button is visible and the text contains {string}',  (text)=>{
    sanityTest.verifyTheButtonTextHomepage(text);
});
