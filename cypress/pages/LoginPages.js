class LoginPages {

    usernameField = 'input[name="username"]'
    passwordField = 'input[name="password"]'
    loginButton = 'button[type="submit"]'
    forgotPasswordLink = '.orangehrm-login-forgot-header'

   visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(this.usernameField, { timeout: 30000 }).should('be.visible')
}

    enterUsername(username) {
        cy.get(this.usernameField).clear().type(username)
    }

    enterPassword(password) {
        cy.get(this.passwordField).clear().type(password)
    }

    clickLogin() {
        cy.get(this.loginButton).click()
    }

    clickForgotPassword() {
        cy.get(this.forgotPasswordLink).click()
    }

    login(username, password) {
        this.enterUsername(username)
        this.enterPassword(password)
        this.clickLogin()
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

export default LoginPages