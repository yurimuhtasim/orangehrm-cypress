import LoginPages from '../../pages/LoginPages'

const loginPages = new LoginPages()

describe('Final Project Login', () => {

    beforeEach(() => {
        loginPages.visit()
    })

    it('TC-LOGIN-001 Login valid', ()=>{
        cy.intercept('POST', '**/auth/validate').as('loginAPI')
        loginPages.login('Admin','admin123')
        cy.wait('@loginAPI')
        cy.url().should('include', 'dashboard')
    })

    it('TC-LOGIN-002 Username salah', ()=>{
        cy.intercept('POST', '**/auth/validate').as('wrongUser')
        loginPages.login('Salah','admin123')
        cy.wait('@wrongUser')
        cy.contains('Invalid credentials').should('exist')
    })

    it('TC-LOGIN-003 Password salah', ()=>{
        cy.intercept('POST', '**/auth/validate').as('wrongPassword')
        loginPages.login('Admin','salah')
        cy.wait('@wrongPassword')
        cy.contains('Invalid credentials').should('exist')
    })

    it('TC-LOGIN-004 Username kosong', ()=>{
        loginPages.enterPassword('admin123')
        loginPages.clickLogin()
        cy.contains('Required').should('exist')
    })

    it('TC-LOGIN-005 Password kosong', ()=>{
        loginPages.enterUsername('Admin')
        loginPages.clickLogin()
        cy.contains('Required').should('exist')
    })

    it('TC-LOGIN-006 Username dan Password kosong', ()=>{
        loginPages.clickLogin()
        cy.contains('Required').should('exist')
    })

    it('TC-LOGIN-007 Username dan Password Salah', ()=>{
        cy.intercept('POST', '**/auth/validate').as('InvalidCredential')
        loginPages.login('Yuri','123456789')
        cy.wait('@InvalidCredential')
        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC-LOGIN-008 Forgot Password', ()=>{
        loginPages.clickForgotPassword()
        cy.url().should('include', 'requestPasswordResetCode')
})

})