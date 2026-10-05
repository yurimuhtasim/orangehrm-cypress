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
    cy.get('input[name="firstName"]').should('have.value', 'Yuri')
})


it('TC-REC-004 Input Last Name', ()=>{
    recruitmentPages.openRecruitment()
    recruitmentPages.clickAdd()
    recruitmentPages.inputLastName('Testing')
    cy.get('input[name="lastName"]').should('have.value', 'Testing')
})

it('TC-REC-005 Input First Name and Last Name', ()=>{
    recruitmentPages.openRecruitment()
    recruitmentPages.clickAdd()
    recruitmentPages.inputFirstName('Yuri')
    recruitmentPages.inputLastName('QA')
    cy.get('input[name="firstName"]').should('have.value', 'Yuri')
    cy.get('input[name="lastName"]').should('have.value', 'QA')
})

    it('TC-REC-006 Click Save Without Data', ()=>{

        recruitmentPages.openRecruitment()

        recruitmentPages.clickAdd()

        recruitmentPages.clickSave()

        cy.contains('Required').should('exist')

    })

it('TC-REC-007 Input Data and Save', ()=>{
    const uniqueId = Date.now()

    recruitmentPages.openRecruitment()
    recruitmentPages.clickAdd()
    recruitmentPages.inputFirstName('Auto')
    recruitmentPages.inputLastName(`Test${uniqueId}`)
    recruitmentPages.inputEmail(`auto.test${uniqueId}@example.com`)
    recruitmentPages.clickSave()

    cy.contains('Successfully Saved').should('be.visible')
})

    it('TC-REC-008 Open Recruitment Again', ()=>{

        recruitmentPages.openRecruitment()

        cy.contains('Dashboard').click()

        recruitmentPages.openRecruitment()

        cy.contains('Candidates').should('exist')

    })

})