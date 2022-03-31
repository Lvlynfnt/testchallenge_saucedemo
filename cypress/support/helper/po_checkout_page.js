const { faker } = require('@faker-js/faker');

var filename = 'cypress/fixtures/item_descriptions.json'

class CheckoutPage {

firstNameInput = '[data-test="firstName"]'
lastNameInput ='[data-test="lastName"]'
postalInput = '[data-test="postalCode"]'
continueBtn = '[data-test="continue"]'

    elements = {

        firstName: () => cy.get(this.firstNameInput),
        lastName: () => cy.get(this.lastNameInput),
        postalCode: () => cy.get(this.postalInput),
        continue: () => cy.get(this.continueBtn)

    }

    enterCheckoutInfo() {
        this.elements.firstName().type(faker.name.firstName())
        this.elements.lastName().type(faker.name.lastName())
        this.elements.postalCode().type(faker.address.zipCode())
        
    }

    continue() {
        this.elements.continue().click()
    }

    checkCheckoutOverview() {

        cy.readFile(filename).then((getData) => {
            cy.get('.inventory_item_desc').each(($el, index) => {
                cy.wrap($el).should('contain.text', getData.items[index].desc)
            })
        })

    }

    checkComputation() {

        var pricesArr = []

        cy.get('.inventory_item_price').each(($el) => {

            cy.wrap($el).invoke('text').then((price) => {

                var parsedPrice = Number(price.replace(/[^0-9.-]+/g,""))

                pricesArr.push(parsedPrice)

                cy.log(pricesArr)
                console.log(pricesArr)

                

            })
        })
        cy.writeFile('cypress/fixtures/pricesInArr.json', pricesArr)
        cy.readFile('cypress/fixtures/pricesInArr.json').then((get) => {
            var sumAmount = get.reduce((a, b) => a + b, 0)
            cy.log(sumAmount)
            cy.get('.summary_subtotal_label').should('contain.text', sumAmount)
            cy.get('.summary_tax_label').invoke('text').then((getTax) => {

                var parsedTax = Number(getTax.replace(/[^0-9.-]+/g,""))
                var overall = sumAmount + parsedTax

                cy.get('.summary_total_label').should('contain.text', overall)
            })
        })

       

        
    }

    finish() {
        cy.get('[data-test="finish"]').click()
        cy.url().should('include', '/checkout-complete') 
        cy.get('.complete-header').should('contain.text', 'THANK YOU FOR YOUR ORDER')
    }

    goHomePage() {
        cy.get('[data-test="back-to-products"]').click()
        cy.url().should('include', '/inventory') 
    }


} export default CheckoutPage