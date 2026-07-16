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

    })

    it('TC-DIR-002 Search Liana', ()=>{

        directoryPages.openDirectory()

        directoryPages.inputEmployeeName('Liana')

        directoryPages.clickSearch()

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

    })

    it('TC-DIR-006 Search Tanpa Isi Data', ()=>{

        directoryPages.openDirectory()

        directoryPages.clickSearch()

    })

    it('TC-DIR-007 Klik Reset', ()=>{

        directoryPages.openDirectory()

        directoryPages.inputEmployeeName('Liana')

        directoryPages.clickReset()

    })

    it('TC-DIR-008 Buka Ulang Directory', ()=>{

        directoryPages.openDirectory()

        cy.contains('Dashboard').click()

        directoryPages.openDirectory()

    })

})