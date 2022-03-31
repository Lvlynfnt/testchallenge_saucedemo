import { Given , And , Then , When} from "cypress-cucumber-preprocessor/steps";
import LoginPage from "../../support/helper/po_landing_page";
import Products from "../../support/helper/po_products_page";
import CheckoutPage from "../../support/helper/po_checkout_page";

const loginPage = new LoginPage();
const productsPage = new Products();
const checkoutPage = new CheckoutPage

Given('User access the Saucedemo Webapp', () => {
    loginPage.visitPage()
})

And('User enters valid credentials', datatable => {
    datatable.hashes().forEach(row => {
        loginPage.enterCredentials(row.username, row.pw)
        loginPage.login(true)
    })
})

Then('User able to sign in successfully', () => {
    loginPage.checkPageRedirection()
    productsPage.getProductDetails()
})

And('User log out', () => {
    loginPage.logout()
})

And('User enters invalid credentials', datatable => {
    datatable.hashes().forEach(row => {
        loginPage.enterCredentials(row.username, row.pw)
        loginPage.login(true)
        loginPage.checkAlert(row.message)
    })
})

Then('User add to cart all products available', () => {
    productsPage.addCart(true)
})

And ('User view Cart', () => {
    productsPage.viewCart()
})

And ('Verify if all item descriptions display correct details on Your Cart page', () => {
    productsPage.checkItemDetails(true)
})

Then('User add random single item', () => {
    productsPage.addCart(false)
})

And ('Verify if the single item description displays correct details on Your Cart page', () => {
    productsPage.checkItemDetails(false)
})

And('User check out', () => {
    productsPage.checkout()
})

And('User enters Check out Information details', () => {
    checkoutPage.enterCheckoutInfo()
    checkoutPage.continue()
})

Then('Verify if Checkout Overview details are corect', () => {
    checkoutPage.checkCheckoutOverview()
})

And('Verify if Amount computation are correct', () => {
    checkoutPage.checkComputation()
})

Then('User successfully made the order', () => {
    checkoutPage.finish()
})

And ('User go back to the Home page', () => {
    checkoutPage.goHomePage()
})

