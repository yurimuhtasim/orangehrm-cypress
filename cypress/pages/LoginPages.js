class LoginPage {

    usernameField = 'input[name="username"]'
    passwordField = 'input[name="password"]'
    loginButton = 'button[type="submit"]'
    forgotPasswordLink = '.orangehrm-login-forgot-header'

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    enterUsername(username) {
        cy.get(this.usernameField).type(username)
    }

    enterPassword(password) {
        cy.get(this.passwordField).type(password)
    }

    clickLogin() {
        cy.get(this.loginButton).click()
    }

    clickForgotPassword() {
        cy.get(this.forgotPasswordLink).click()
    }

    verifyDashboard() {
        cy.url().should('include', '/dashboard')
    }

    verifyInvalidCredential() {
        cy.contains('Invalid credentials')
            .should('be.visible')
    }

    verifyRequired() {
        cy.contains('Required')
            .should('be.visible')
    }
}

export default LoginPage