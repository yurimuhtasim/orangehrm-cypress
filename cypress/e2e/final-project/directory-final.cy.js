import LoginPages from '../../pages/LoginPages'
import directoryPages from '../../pages/DirectoryPages'

const loginPages = new LoginPages()

const RECORDS_FOUND = /Records? Found/
const EMPLOYEE_NAME_INPUT = 'input[placeholder="Type for hints..."]'
const AUTOCOMPLETE_OPTION = '.oxd-autocomplete-option'

describe('Final Project Directory', () => {

    beforeEach(() => {
        loginPages.visit()
        loginPages.login('Admin', 'admin123')
        cy.wait(2000)
    })

    it('TC-DIR-001 Open Directory', () => {
        cy.intercept('GET', '**/api/**').as('directory')

        directoryPages.openDirectory()

        cy.wait('@directory')
        cy.contains(RECORDS_FOUND).should('be.visible')
    })

    it('TC-DIR-002 Search Employee Yang Ada', () => {
        directoryPages.openDirectory()
        directoryPages.inputEmployeeName('Peter')
        cy.get(AUTOCOMPLETE_OPTION).first().click()
        directoryPages.clickSearch()

        cy.contains(RECORDS_FOUND).should('be.visible')
    })

    it('TC-DIR-005 Search Employee Tidak Ada', () => {
        directoryPages.openDirectory()
        directoryPages.inputEmployeeName('YuriTesting')
        directoryPages.clickSearch()

        cy.contains('Invalid').should('be.visible')
    })

    it('TC-DIR-006 Search Tanpa Isi Data', () => {
        directoryPages.openDirectory()
        directoryPages.clickSearch()

        cy.contains(RECORDS_FOUND).should('be.visible')
    })

    it('TC-DIR-007 Klik Reset', () => {
        directoryPages.openDirectory()
        directoryPages.inputEmployeeName('a')
        cy.get(AUTOCOMPLETE_OPTION).first().click()
        directoryPages.clickReset()

        cy.get(EMPLOYEE_NAME_INPUT).first().should('have.value', '')
    })

    it('TC-DIR-008 Buka Ulang Directory', () => {
        directoryPages.openDirectory()
        cy.contains('Dashboard').click()
        directoryPages.openDirectory()

        cy.contains(RECORDS_FOUND).should('be.visible')
    })

})