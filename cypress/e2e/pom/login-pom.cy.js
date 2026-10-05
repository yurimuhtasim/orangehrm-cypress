import LoginPage from '../../pages/LoginPages'

const loginPage = new LoginPage()

describe('OrangeHRM Login Feature Using POM', () => {
    let data

    before(() => {
        cy.fixture('loginData').then((loginData) => {
            data = loginData
        })
    })

    beforeEach(() => {
        loginPage.visit()
    })

    it('TC-LOGIN-001 Login menggunakan username dan password yang valid', () => {
        loginPage.login(data.validUser.username, data.validUser.password)

        loginPage.verifyDashboard()
    })

    it('TC-LOGIN-002 Login menggunakan password dengan perbedaan huruf besar kecil', () => {
        loginPage.login(data.wrongPassword.username, data.wrongPassword.password)

        loginPage.verifyInvalidCredential()
    })

    it('TC-LOGIN-003 Login menggunakan username salah dan password valid', () => {
        loginPage.login(data.wrongUsername.username, data.wrongUsername.password)

        loginPage.verifyInvalidCredential()
    })

    it('TC-LOGIN-004 Login menggunakan username dan password salah', () => {
        loginPage.login(data.wrongCredential.username, data.wrongCredential.password)

        loginPage.verifyInvalidCredential()
    })

    it('TC-LOGIN-005 Login tanpa mengisi username', () => {
        loginPage.enterPassword(data.validUser.password)
        loginPage.clickLogin()

        loginPage.verifyRequired()
    })

    it('TC-LOGIN-006 Login tanpa mengisi password', () => {
        loginPage.enterUsername(data.validUser.username)
        loginPage.clickLogin()

        loginPage.verifyRequired()
    })

    it('TC-LOGIN-007 Login tanpa mengisi username dan password', () => {
        loginPage.clickLogin()

        loginPage.verifyRequired()
    })

    it('TC-LOGIN-012 Membuka halaman forgot password', () => {
        loginPage.clickForgotPassword()

        cy.url().should('include', '/requestPasswordResetCode')
        cy.contains('Reset Password').should('be.visible')
    })

})