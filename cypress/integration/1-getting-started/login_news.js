import { Given , And , Then , When} from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../support/helper/po_landing_page";
import SignInPage from "../../support/helper/po_sign_in_page";

const homePage = new HomePage();
const signInPage = new SignInPage();

Given('User access the Newspaper Webapp', () => {
    homePage.visitPage()
})

When('User navigates to Sign In page', () => {
    homePage.signIn()
})

Then('Verify if Sign In Modal is being displayed', () => {
    signInPage.checkSignInModal()
})

And ('Verify if Modal Header displays correct Header', () => {
    signInPage.checkModalHeader()
})

And ('Verify if Placeholders are correct', () => {
    signInPage.checkPlaceholders()
})

And('Verify if all expected buttons are being displayed', () => {
    signInPage.checkButtonsVisibility()
})

And('User enters valid credentials', datatable => {
    datatable.hashes().forEach(row => {
        signInPage.enterCredentials(row.email,row.pw)
    })
})


Then('User able to sign in successfully', () => {
    signInPage.signIn(true)
})

And('User enters invalid credentials', datatable => {
    datatable.hashes().forEach(row => {
        signInPage.enterCredentials(row.email,row.pw)
        signInPage.signIn(false)
        signInPage.checkAlert(row.message)
        signInPage.clear()
    })
})

And("User didn't enter any credentials", datatable => {
    datatable.hashes().forEach(row => {
        signInPage.signIn()
        signInPage.checkAlert(row.message)
        signInPage.clear()
    })
})