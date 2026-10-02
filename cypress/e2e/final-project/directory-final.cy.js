import LoginPages from "../../pages/LoginPages"
import directoryPages from "../../pages/DirectoryPages"

const loginPages = new LoginPages()

describe('Final Project Directory', ()=>{

    beforeEach(()=>{

        loginPages.visit()
        loginPages.login('Admin','admin123')

        cy.wait(2000)

    })

 it('TC-DIR-001 Open Directory', ()=>{
    cy.intercept('GET','**/api/**').as('directory')
    directoryPages.openDirectory()
    cy.wait('@directory')
    cy.contains(/Records? Found/).should('be.visible')
})

it('TC-DIR-002 Search Employee Yang Ada', ()=>{
    directoryPages.openDirectory()
    directoryPages.inputEmployeeName('Peter')
    cy.get('.oxd-autocomplete-option').first().click()
    directoryPages.clickSearch()
    cy.contains(/Records? Found/).should('be.visible')
})

    it('TC-DIR-003 Search Abi', ()=>{

        directoryPages.openDirectory()

        directoryPages.inputEmployeeName('Abi')

        directoryPages.clickSearch()

    })

    it('TC-DIR-004 Search Admin', ()=>{

        directoryPages.openDirectory()

        directoryPages.inputEmployeeName('Admin')

        directoryPages.clickSearch()

    })

it('TC-DIR-005 Search Employee Tidak Ada', ()=>{
    directoryPages.openDirectory()
    directoryPages.inputEmployeeName('YuriTesting')
    directoryPages.clickSearch()
    cy.contains('Invalid').should('be.visible')
})

it('TC-DIR-006 Search Tanpa Isi Data', ()=>{
    directoryPages.openDirectory()
    directoryPages.clickSearch()
    cy.contains(/Records? Found/).should('be.visible')
})

it('TC-DIR-007 Klik Reset', ()=>{
    directoryPages.openDirectory()
    directoryPages.inputEmployeeName('a')
    cy.get('.oxd-autocomplete-option').first().click()
    directoryPages.clickReset()
    cy.get('input[placeholder="Type for hints..."]').first().should('have.value', '')
})

it('TC-DIR-008 Buka Ulang Directory', ()=>{
    directoryPages.openDirectory()
    cy.contains('Dashboard').click()
    directoryPages.openDirectory()
    cy.contains(/Records? Found/).should('be.visible')
})

})