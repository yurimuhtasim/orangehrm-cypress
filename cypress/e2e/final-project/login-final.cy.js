import LoginPages from '../../pages/LoginPages'

const loginPages = new LoginPages()

describe('Final Project Login', () => {
    let data

    before(() => {
        cy.fixture('loginData').then((d) => { data = d })
    })

    beforeEach(() => {
        loginPages.visit()
    })

    it('TC-LOGIN-001 Login valid', ()=>{
        cy.intercept('POST', '**/auth/validate').as('loginAPI')
        loginPages.login(data.validUser.username, data.validUser.password)
        cy.wait('@loginAPI')
        cy.url().should('include', 'dashboard')
    })

    it('TC-LOGIN-002 Username salah', ()=>{
        cy.intercept('POST', '**/auth/validate').as('wrongUser')
        loginPages.login(data.wrongUsername.username, data.wrongUsername.password)
        cy.wait('@wrongUser')
        cy.contains('Invalid credentials').should('exist')
    })

    it('TC-LOGIN-003 Password salah', ()=>{
        cy.intercept('POST', '**/auth/validate').as('wrongPassword')
        loginPages.login(data.wrongPassword.username, data.wrongPassword.password)
        cy.wait('@wrongPassword')
        cy.contains('Invalid credentials').should('exist')
    })

    it('TC-LOGIN-004 Username kosong', ()=>{
        loginPages.enterPassword(data.validUser.password)
        loginPages.clickLogin()
        cy.contains('Required').should('exist')
    })

    it('TC-LOGIN-005 Password kosong', ()=>{
        loginPages.enterUsername(data.validUser.username)
        loginPages.clickLogin()
        cy.contains('Required').should('exist')
    })

    it('TC-LOGIN-006 Username dan Password kosong', ()=>{
        loginPages.clickLogin()
        cy.contains('Required').should('exist')
    })

    it('TC-LOGIN-007 Username dan Password Salah', ()=>{
        cy.intercept('POST', '**/auth/validate').as('InvalidCredential')
        loginPages.login(data.wrongCredential.username, data.wrongCredential.password)
        cy.wait('@InvalidCredential')
        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC-LOGIN-008 Forgot Password', ()=>{
        loginPages.clickForgotPassword()
        cy.url().should('include', 'requestPasswordResetCode')
    })

})