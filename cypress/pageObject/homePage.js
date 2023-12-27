

export class homepage {

    getApiResponse() {
        cy.getApiResponse().then((apiResponse) => {
            const productName = [];
            const productPrice = [];
            let apiRes = apiResponse.body
            apiRes = JSON.parse(apiRes)
            let productRes = apiRes.products
            for (let i in productRes) {
                let productRes1 = productRes[i]
                productName.push(productRes1.name);
                productPrice.push(productRes1.price);
            }
            cy.fixture('xpath.json').then((xpathValue) => {
                productName.forEach(cartName => {
                    cy.xpathIsVisible(xpathValue.productName).contains(cartName);
                });
                productPrice.forEach((cartPrice) => {
                    cy.xpathIsVisible(xpathValue.productPrice).contains(cartPrice);
                });
            });
        });
    }

    validateEachCart() {
        cy.getApiResponse().then((response) => {
            let resBody = response.body;
            resBody = JSON.parse(resBody);
            let resProducts = resBody.products;
            for (let id in resProducts) {
                let resAllVal = resProducts[id];
                const resIdVal = resAllVal.id;
                const itemName = resAllVal.name;
                const itemPrice = resAllVal.price;
                let catUserType = resAllVal.category.usertype.usertype;
                let categoryName = resAllVal.category.category;
                let categories = catUserType + " > " + categoryName
                categories = "Category: " + categories;
                cy.fixture('xpath.json').then((xpathVal) => {
                    cy.xpath(xpathVal.clickProduct).eq(id).contains('View Product').should('be.visible').click({ force: true });
                    cy.xpath(xpathVal.itemName).should('be.visible').should('have.text', itemName);
                    cy.xpath(xpathVal.itemPrice).should('be.visible').should('have.text', itemPrice);
                    cy.xpath(xpathVal.itemCategory).should('be.visible').contains(categories)
                    cy.xpath(xpathVal.clickHomePage).contains('Home').click({ force: true });
                });
            }
        });
    }

    verifyEachCart() {
        cy.fixture('xpath.json').then((xpathVal) => {
            for (let i = 0; i <= 33; i++) {
                cy.xpath(xpathVal.productName).eq(i).should('be.visible').invoke('text').then((cartName) => {
                    cy.xpath(xpathVal.productPrice).eq(i).should('be.visible').invoke('text').then((cartPrice) => {
                        cy.xpath(xpathVal.clickProduct).eq(i).contains('View Product').should('be.visible').click({ force: true });
                        cy.xpathIsVisible(xpathVal.itemName).should('have.text', cartName);
                        cy.xpathIsVisible(xpathVal.itemPrice).should('have.text', cartPrice);
                        cy.xpath(xpathVal.clickHomePage).contains('Home').click({ force: true });
                    });
                });
            }
        });
    }

    dbTesting() {
        cy.task("queryDb", "select * from mydemo.cartDetails;").then(dbVal => {
            let DbValues = dbVal
            console.log(DbValues);
            DbValues.forEach(objectValues => {
                const ids = objectValues.id
                const cartName = objectValues.cartName
                const cartPrice = objectValues.cartPrice
                cy.fixture('xpath.json').then((xpathVal) => {
                    cy.xpath(xpathVal.clickProduct).eq(ids-1).contains('View Product').should('be.visible').click({ force: true });
                    cy.xpath(xpathVal.itemName).should('be.visible').should('have.text', cartName);
                    cy.xpath(xpathVal.itemPrice).should('be.visible').should('have.text', cartPrice);
                    cy.xpath(xpathVal.clickHomePage).contains('Home').click({ force: true });
                })
            })
        });
    }








}

export default homepage;