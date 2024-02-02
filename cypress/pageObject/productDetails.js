import SharedFunctions from "../pageObject/sharedFunction.js";
import newPage, { dataMap } from "../pageObject/newHomePage.js";


export class productDetails extends newPage {


    getApiResponseValue() {

        return new Cypress.Promise((resolve, reject) => {
            cy.getApiResponse().then((response) => {
                let resBody = response.body;
                resBody = JSON.parse(resBody);
                let resProducts = resBody.products;
                resolve(resProducts)
            })
        })
    }

    getCartNamePriceCategory() {
        const cartName = [];
        const cartPrice = [];
        const categoryNames = []
        this.getApiResponseValue().then((response) => {
            for (let id in response) {
                let resAllVal = response[id];
                const itemName = resAllVal.name;
                const itemPrice = resAllVal.price;
                let catUserType = resAllVal.category.usertype.usertype;
                let categoryName = resAllVal.category.category;
                let categories = catUserType + " > " + categoryName
                categories = "Category: " + categories;
                cartName.push(itemName)
                cartPrice.push(itemPrice)
                categoryNames.push(categories)
            }
            dataMap.set('cartName', cartName)
            dataMap.set('cartPrice', cartPrice)
            dataMap.set('categoryNames', categoryNames)
        })
    }

    validateCartNamePriceCategory() {
        const cartName = dataMap.get('cartName')
        const cartPrice = dataMap.get('cartPrice')
        const category = dataMap.get('categoryNames')
        cartName.forEach((itemName, index) => {
            const itemPrice = cartPrice[index]
            const categoryItem = category[index]
            this.clickProduct(index)
            this.verifyHeadingHomepage();
            this.verifyCategoryNameHomePage();
            this.verifyBrandHomePage();
            cy.xpath(SharedFunctions.getXPathValue('itemName')).should('be.visible').should('have.text', itemName);
            cy.xpath(SharedFunctions.getXPathValue('itemPrice')).should('be.visible').should('have.text', itemPrice);
            cy.xpath(SharedFunctions.getXPathValue('itemCategory')).should('be.visible').contains(categoryItem)
            cy.xpath(SharedFunctions.getXPathValue('clickHomePage')).contains('Home').click({ force: true });
        })
    }

    verifyEachCartValidationInHomePage() {
        for (let i = 0; i <= 33; i++) {
            cy.xpath(SharedFunctions.getXPathValue('productName')).eq(i).should('be.visible').invoke('text').then((cartName) => {
                cy.xpath(SharedFunctions.getXPathValue('productPrice')).eq(i).should('be.visible').invoke('text').then((cartPrice) => {
                    this.clickProduct(i)
                    this.verifyHeadingHomepage();
                    this.verifyCategoryNameHomePage();
                    this.verifyBrandHomePage();
                    cy.xpathIsVisible(SharedFunctions.getXPathValue('itemName')).should('have.text', cartName);
                    cy.xpathIsVisible(SharedFunctions.getXPathValue('itemPrice')).should('have.text', cartPrice);
                    cy.xpath(SharedFunctions.getXPathValue('clickHomePage')).contains('Home').click({ force: true });
                });
            });
        }
    }

    verifySearchProduct() {
        let jsonKey = Object.keys(Cypress.env('searchProduct'));
        for (let i = 0; i < jsonKey.length; i++) {
            const randomKey = jsonKey[Math.floor(Math.random() * jsonKey.length)];
            const searchValue = Cypress.env('searchProduct')[randomKey]
            console.log(searchValue);
            cy.clickOnText(SharedFunctions.getXPathValue('productBtn'), 'Products')
            cy.enterValue(SharedFunctions.getIdValue('searchProduct'), searchValue)
            cy.clickOnButton(SharedFunctions.getIdValue('submitSearch'))
            cy.xpathIsVisible(SharedFunctions.getXPathValue('singleCartXpath')).then((attrCount) => {
                for (let i = 0; i <= attrCount.length; i++) {
                    console.log(i);
                    cy.xpath(SharedFunctions.getXPathValue('productName')).eq(i - 1).should('be.visible').contains(searchValue, { matchCase: false })
                }
            });
        }
    }

    getSearchProductNameRandomly() {
        const searchValuesArray = []
        let jsonKey = Object.keys(Cypress.env('searchProduct'));
        for (let i = 0; i < jsonKey.length; i++) {
            const randomKey = jsonKey[Math.floor(Math.random() * jsonKey.length)];
            const searchValueRandom = Cypress.env('searchProduct')[randomKey]
            searchValuesArray.push(searchValueRandom)
        }
        dataMap.set('searchValue', searchValuesArray)
    }

    validateSearchProductRandomly() {
        const searchValues = dataMap.get('searchValue')
        searchValues.forEach((searchValue) => {
            cy.clickOnText(SharedFunctions.getXPathValue('productBtn'), 'Products')
            cy.enterValue(SharedFunctions.getIdValue('searchProduct'), searchValue)
            cy.clickOnButton(SharedFunctions.getIdValue('submitSearch'))
            cy.xpathIsVisible(SharedFunctions.getXPathValue('singleCartXpath')).then((attrCount) => {
                for (let i = 0; i <= attrCount.length; i++) {
                    console.log(i);
                    cy.xpath(SharedFunctions.getXPathValue('productName')).eq(i - 1).should('be.visible').contains(searchValue, { matchCase: false })
                }
            });
        })
    }

    brandCount() {
        let count = null
        const brandName = dataMap.get('brandName')
        console.log(brandName);
        brandName.forEach((brandNames, index) => {
            cy.clickOnText(SharedFunctions.getXPathValue('brandName'), brandNames)
            cy.xpathIsVisible(SharedFunctions.getXPathValue('singleCartXpath')).then((attrCount) => {
                for (let i = 0; i <= attrCount.length; i++) {
                    count = "(" + i + ")"
                }
                console.log(count);
                cy.xpath(SharedFunctions.getXPathValue('brandCount')).eq(index).should('be.visible').and('have.text', count)
            });
        })
    }

}

export default productDetails