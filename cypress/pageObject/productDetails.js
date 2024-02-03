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

    writeValuesInJsonFile() {
        const header = dataMap.get('pageHeaderNames')
        const category = dataMap.get('categoryName')
        const brand = dataMap.get('brandName')
        const subCategoryWomen = dataMap.get('Women')
        const subCategoryMen = dataMap.get('Men')
        const subCategoryKids = dataMap.get('Kids')
        cy.writeFile('src/fixtures/writeFile.json',
            {
                header: header,
                category: category,
                brand: brand,
                Women: subCategoryWomen,
                Men: subCategoryMen,
                Kids: subCategoryKids
            })
    }

    readTheHeaderValuesFromStoredJsonFile() {
        cy.readFile('src/fixtures/writeFile.json').then((headerValues) => {
            const header = headerValues.header
            console.log(header);
            for (let i = 0; i < header.length; i++) {
                cy.xpath(SharedFunctions.getXPathValue('pageHeader')).eq(i).should('have.text', header[i])
            }
        })
    }


    readTheCategoryValuesFromStoredJsonFile() {
        cy.readFile('src/fixtures/writeFile.json').then((categoryValues) => {
            const category = categoryValues.category
            for (let index = 0; index < category.length; index++) {
                cy.verifyTextContains(SharedFunctions.getXPathValue('categoryName'), index, category[index])
                const subCategories = categoryValues[category[index]]
                console.log('category==>' + subCategories);
                cy.xpath(SharedFunctions.getXPathValue('categoryIcon')).eq(index).should('be.visible').click({ force: true })
                subCategories.forEach((subCategory) => {
                    cy.xpath("//div[@id='" + category[index] + "']//a[contains(text(),'" + subCategory + "')]").should('be.visible')
                        .and('contain', subCategory)
                });
                cy.reload();
            }
        });
    }

    readTheBrandValuesFromStoredJsonFile() {
        cy.readFile('src/fixtures/writeFile.json').then((brandValues) => {
            const brands = brandValues.brand
            for (let index = 0; index < brands.length; index++) {
                cy.verifyTextContains(SharedFunctions.getXPathValue('brandName'), index, brands[index])
            }
        })
    }

    grabAllCartNamePrice() {
        const cartName = []
        const cartPrice = []
        cy.xpathIsVisible(SharedFunctions.getXPathValue('singleCartXpath')).then((attrCount) => {
            for (let i = 0; i < attrCount.length; i++) {
                cy.xpath(SharedFunctions.getXPathValue('productName')).eq(i).should('be.visible').invoke('text').then((name) => {
                    cy.xpath(SharedFunctions.getXPathValue('productPrice')).eq(i).should('be.visible').invoke('text').then((price) => {
                        cartName.push(name)
                        cartPrice.push(price)
                    });
                });
            }
            cy.writeFile('src/fixtures/writeFile.json',
                {
                    count: attrCount.length,
                    itemName: cartName,
                    itemPrice: cartPrice
                })
        })
    }

    getCartNamePriceRandomly() {
        cy.readFile('src/fixtures/writeFile.json').then((val) => {
            const count = val.count
            const cartName = val.itemName
            const cartPrice = val.itemPrice
            this.randomNumbers(count).then((randNum) => {
                randNum.forEach((num) => {
                    cy.xpath(SharedFunctions.getXPathValue('singleCartXpath')).eq(num).should('be.visible')
                        .and('contain', cartName[num], cartPrice[num]).contains('Add to cart').click({ force: true })
                    this.firstCartAdded();
                    this.continueShoppingButton();
                })
                dataMap.set('randomNumber', randNum)
            })
        })
    }

    cartPageIsVisible() {
        cy.url().should('include', 'https://automationexercise.com/view_cart')
    }

    verifyCartNamePriceTotalAmount() {
        const randNum = dataMap.get('randomNumber')
        const repeatedValues = randNum.filter((value, index, array) => array.indexOf(value) !== index);
        console.log('repeatedValues===>' + repeatedValues);
        cy.readFile('src/fixtures/writeFile.json').then((jsonVal) => {
            const itemName = jsonVal.itemName
            const itemPrice = jsonVal.itemPrice
            randNum.forEach((num, index) => {
                cy.xpathIsVisible("//table[@id='cart_info_table']//tr/td//h4//a").eq(index).should('have.text', itemName[num])
                cy.xpathIsVisible("//table[@id='cart_info_table']//tr/td[@class='cart_price']//p").eq(index).should('have.text', itemPrice[num])
            })
        })
    }

    verifyAddressDetails(text) {
        if(text == 'delivery address'){
            cy.xpath(SharedFunctions.getXPathValue('addressDetails')).should('be.visible')
            .and('contain', Cypress.env('address').yourAddress)
        cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
            .should('be.visible').and('contain', Cypress.env('address').name)
        cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
            .should('be.visible').and('contain', Cypress.env('address').address1)
        cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
            .should('be.visible').contains( Cypress.env('address').cityState)
        cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
            .should('be.visible').and('contain', Cypress.env('address').country)
        cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
            .should('be.visible').and('contain', Cypress.env('address').contactNo)
        } else {
            cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails')).should('be.visible')
            .and('contain', Cypress.env('addressInvoice').yourAddress)
        cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
            .should('be.visible').and('contain', Cypress.env('addressInvoice').name)
        cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
            .should('be.visible').and('contain', Cypress.env('addressInvoice').address1)
        cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
            .should('be.visible').contains( Cypress.env('addressInvoice').cityState)
        cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
            .should('be.visible').and('contain', Cypress.env('addressInvoice').country)
        cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
            .should('be.visible').and('contain', Cypress.env('addressInvoice').contactNo)
        }
    }


}

export default productDetails