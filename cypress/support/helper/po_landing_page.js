

var server = Cypress.env('usedENV')
var selectedServer


switch (server) {

    case 'prod': selectedServer = Cypress.env('prod')
    break
}

class LoginPage {

    username = '[data-test="username"]'
    password = '[data-test="password"]'
    loginButton = '[data-test="login-button"]'
    menu = '#react-burger-menu-btn'
    clickLogoutButton = '#logout_sidebar_link'
    alert = '[data-test="error"]'
    
    

    elements = {

        inputUsername: () => cy.get(this.username),
        inputPassword: () => cy.get(this.password),
        login: () => cy.get(this.loginButton),
        menu: () => cy.get(this.menu),
        logoutButton: () => cy.get(this.clickLogoutButton),
        alertMessage: () => cy.get(this.alert)

    }

    visitPage() {

        cy.visit(selectedServer)
    
    }

    enterCredentials (username, password) {

        this.elements.inputUsername().type(username)
        this.elements.inputPassword().type(password)

    }

    login(isValid) {

        this.elements.login().click()

        if (isValid == true) {
        } else {
        }
    }

    checkAlert(message) {

        this.elements.alertMessage().should('contain.text', message)

    }

    logout() {

        this.elements.menu().click()
        this.elements.logoutButton().click()

    }
    

    checkPageRedirection() {
        cy.url().should('include', '/inventory') 
    }
    

} export default LoginPage