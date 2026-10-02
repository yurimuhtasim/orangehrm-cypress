import LoginPage from '../../pages/LoginPages'

const loginPage = new LoginPage()

describe('OrangeHRM Login Feature Using POM', () => {

    beforeEach(() => {
        loginPage.visit()
    })

    // TC-LOGIN-001
    it('TC-LOGIN-001 Login menggunakan username dan password yang valid', () => {
        cy.fixture('loginData').then((data) => {

            loginPage.enterUsername(data.validUser.username)
            loginPage.enterPassword(data.validUser.password)
            loginPage.clickLogin()

            loginPage.verifyDashboard()
        })
    })

    // TC-LOGIN-002
    it('TC-LOGIN-002 Login menggunakan password dengan perbedaan huruf besar kecil', () => {
        cy.fixture('loginData').then((data) => {

            loginPage.enterUsername(data.wrongPassword.username)
            loginPage.enterPassword(data.wrongPassword.password)
            loginPage.clickLogin()

            loginPage.verifyInvalidCredential()
        })
    })

    // TC-LOGIN-003
    it('TC-LOGIN-003 Login menggunakan username salah dan password valid', () => {
        cy.fixture('loginData').then((data) => {

            loginPage.enterUsername(data.wrongUsername.username)
            loginPage.enterPassword(data.wrongUsername.password)
            loginPage.clickLogin()

            loginPage.verifyInvalidCredential()
        })
    })

    // TC-LOGIN-004
    it('TC-LOGIN-004 Login menggunakan username dan password salah', () => {
        cy.fixture('loginData').then((data) => {

            loginPage.enterUsername(data.wrongCredential.username)
            loginPage.enterPassword(data.wrongCredential.password)
            loginPage.clickLogin()

            loginPage.verifyInvalidCredential()
        })
    })

    // TC-LOGIN-005
    it('TC-LOGIN-005 Login tanpa mengisi username', () => {

        loginPage.enterPassword('admin123')
        loginPage.clickLogin()

        loginPage.verifyRequired()
    })

    // TC-LOGIN-006
    it('TC-LOGIN-006 Login tanpa mengisi password', () => {

        loginPage.enterUsername('Admin')
        loginPage.clickLogin()

        loginPage.verifyRequired()
    })

    // TC-LOGIN-007
    it('TC-LOGIN-007 Login tanpa mengisi username dan password', () => {

        loginPage.clickLogin()

        loginPage.verifyRequired()
    })

    // TC-LOGIN-012
    it('TC-LOGIN-012 Membuka halaman forgot password', () => {

        loginPage.clickForgotPassword()

        cy.url().should(
            'include',
            '/requestPasswordResetCode'
        )

        cy.contains('Reset Password')
            .should('be.visible')
    })

})

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});