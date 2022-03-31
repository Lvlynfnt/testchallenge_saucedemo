function randomNum(max) {
    return Math.floor(Math.random() * max);
  }

var filename = 'cypress/fixtures/item_descriptions.json'
var singleItemIndx 



class Products {

sidebarAbout = '#about_sidebar_link'
sidebarAllItems = '#inventory_sidebar_link'
sidebarLogout = '#logout_sidebar_link'
sidebarResetAppState = '#reset_sidebar_link'
cartBtn = '.shopping_cart_link'


    elements = {
        about: () => cy.get(this.sidebarAbout),
        getInventoryItem: () => cy.get(this.inventoryItem),
        cartBtn: () => cy.get(this.cartBtn),

    }

    addCart(isAll) {

        if (isAll == true) {

        cy.get('.btn_inventory').its('length').then((i) => {

            cy.log(i)

            cy.get('.btn_inventory').each(($el) => {

                cy.wrap($el).click()

            })

            cy.get('.shopping_cart_badge').should('contain.text', i)
        })
 
        } else {

            cy.get('.btn_inventory').its('length').then((i) => {
                cy.log(i)
                singleItemIndx = randomNum(i)
                cy.get('.btn_inventory').eq(singleItemIndx).click()
                cy.get('.shopping_cart_badge').should('contain.text', '1')

            })
        }
    }

    viewCart() {

        this.elements.cartBtn().click()
        
    }

    getProductDetails() {

        cy.writeFile(filename, {
            items: []
        })

        cy.get('.inventory_item_desc').each(($eldesc) => {
        
            cy.wrap($eldesc).invoke('text').then((desc) => {

                cy.readFile(filename).then((list) => {

                var obj = list

                obj['items'].push({
                    "desc": desc
    
                    })

                cy.writeFile(filename, list)

                })
            })
        })
                    
    }


    checkItemDetails(isAll) {

        cy.get('.inventory_item_desc').its(length).then((i) => {

            cy.readFile(filename).then((getData) => {

                if (isAll == true) {

                    cy.get('.inventory_item_desc').each(($el, index) => {
                        cy.wrap($el).should('contain.text', getData.items[index].desc)
                    })

                } else {

                    cy.log(`single item indx: ${singleItemIndx}`)
                    cy.get('.inventory_item_desc').eq(0).should('contain.text', getData.items[singleItemIndx].desc)

                }
            })
        })
    }

    checkout() {

        cy.get('[data-test="checkout"]').click()

        // const randomName = faker.name.firstName()
        // cy.log(`NAME: ${randomName}`)

    }

   

} export default Products