import { dataMap } from "./newHomePage.js";
import productDetails from "./productDetails.js";
import SharedFunctions from "./sharedFunction.js";
import "cypress-real-events";

export class sanityTesting extends productDetails {

    addTwoCartsAndRemove() {
        this.clickFirstCart();
        this.firstCartAdded();
        this.continueShoppingButton();
        this.clickSecondCart();
        this.secondCartAdded();
        this.continueShoppingButtonSecond();
        this.cartButtonIsVisible();
        this.grabPageHeaderNames();
        this.verifyPageHeaderNames();
        this.addedCartOneIsVisible();
        this.addedCartTwoIsVisible();
        this.verifyCartIsEmpty();
        this.clickHomePage();
    }

    hoverEachCartAndVerifyHoverColour(index) {
        return cy.xpath(SharedFunctions.getXPathValue('hoverSingleCartXpath')).eq(index).realHover().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    }

    getEachCartHoveredContentText(index) {
        return cy.xpath(SharedFunctions.getXPathValue('hoveredContentXpath')).eq(index).should('be.visible').invoke('text').then((text) => {
            const cleanedText = text.trim().split('\n').map(item => item.trim()).filter(item => item !== '');
            return cleanedText
        })

    }

    setTheHoveredContentText() {
        const HoveredCartContextText = []
        cy.wrap(null).then(() => {
            cy.xpathIsVisible(SharedFunctions.getXPathValue('singleCartXpath')).then((attr) => {
                let count = attr.length
                for (let index = 0; index < count; index++) {
                    this.hoverEachCartAndVerifyHoverColour(index)
                    this.getEachCartHoveredContentText(index).then((text) => {
                        HoveredCartContextText.push(text)
                    })
                }
                dataMap.set('HoveredCartContextText', HoveredCartContextText)
            });
        });
    }

    verifyTheOverlayedContentTextInActualCart() {
        const verifyContextText = dataMap.get('HoveredCartContextText')
        verifyContextText.forEach((verifyTextArray, index) => {
            cy.xpath(SharedFunctions.getXPathValue('productPrice')).eq(index).should('be.visible').should('have.text', verifyTextArray[0])
            cy.xpath(SharedFunctions.getXPathValue('productName')).eq(index).should('be.visible').should('have.text', verifyTextArray[1])
            cy.xpath(SharedFunctions.getXPathValue('addToCartText')).eq(index).should('be.visible').should('contain', verifyTextArray[2])
        })
    }

    verifyHeadingHomepage() {
        cy.xpath("//div[@class='carousel-inner']//div//div//h1").should('be.visible')
            .and('contain', SharedFunctions.getTextValue('headingHomepage'))
    }

    verifySubHeadingHomepage() {
        cy.xpath("//div[@class='carousel-inner']//div//div//h2").should('be.visible')
            .and('contain', SharedFunctions.getTextValue('subHeadingHomepage'))
    }

    verifyParagraphHomepage() {
        cy.xpath("//div[@class='carousel-inner']//div//div//p").should('be.visible')
            .and('contain', SharedFunctions.getTextValue('paragraphHomepage'))
    }

    verifyTheButtonTextHomepage(text) {
        cy.xpath("//div[@class='carousel-inner']//div//div//a//button").should('be.visible')
            .and('contain', text)

    }

}

export default sanityTesting