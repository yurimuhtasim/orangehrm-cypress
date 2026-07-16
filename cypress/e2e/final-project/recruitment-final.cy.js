import LoginPages from '../../pages/LoginPages'
import recruitmentPages from '../../pages/RecruitmentPages'

const loginPages = new LoginPages()

describe('Final Project Recruitment', ()=>{

    beforeEach(()=>{

        loginPages.visit()
        loginPages.login('Admin', 'admin123')

        cy.wait(2000)

    })

    it('TC-REC-001 Open Recruitment Menu', ()=>{

        cy.intercept('GET', '**/api/**').as('recruitmentMenu')

        recruitmentPages.openRecruitment()

        cy.wait('@recruitmentMenu')

        cy.contains('Candidates').should('exist')

    })

    it('TC-REC-002 Click Add Button', ()=>{

        recruitmentPages.openRecruitment()

        recruitmentPages.clickAdd()

        cy.contains('Add Candidate').should('exist')

    })

    it('TC-REC-003 Input First Name', ()=>{

        recruitmentPages.openRecruitment()

        recruitmentPages.clickAdd()

        recruitmentPages.inputFirstName('Yuri')

    })

    it('TC-REC-004 Input Last Name', ()=>{

        recruitmentPages.openRecruitment()

        recruitmentPages.clickAdd()

        recruitmentPages.inputLastName('Testing')

    })

    it('TC-REC-005 Input First Name and Last Name', ()=>{

        recruitmentPages.openRecruitment()

        recruitmentPages.clickAdd()

        recruitmentPages.inputFirstName('Yuri')

        recruitmentPages.inputLastName('QA')

    })

    it('TC-REC-006 Click Save Without Data', ()=>{

        recruitmentPages.openRecruitment()

        recruitmentPages.clickAdd()

        recruitmentPages.clickSave()

        cy.contains('Required').should('exist')

    })

    it('TC-REC-007 Input Data and Save', ()=>{

        recruitmentPages.openRecruitment()

        recruitmentPages.clickAdd()

        recruitmentPages.inputFirstName('Yuri')

        recruitmentPages.inputLastName('Testing')

        recruitmentPages.clickSave()

    })

    it('TC-REC-008 Open Recruitment Again', ()=>{

        recruitmentPages.openRecruitment()

        cy.contains('Dashboard').click()

        recruitmentPages.openRecruitment()

        cy.contains('Candidates').should('exist')

    })

})