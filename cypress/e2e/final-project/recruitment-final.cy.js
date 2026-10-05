import LoginPages from '../../pages/LoginPages'
import recruitmentPages from '../../pages/RecruitmentPages'

const loginPages = new LoginPages()

const FIRST_NAME_INPUT = 'input[name="firstName"]'
const LAST_NAME_INPUT = 'input[name="lastName"]'

const openAddCandidateForm = () => {
    recruitmentPages.openRecruitment()
    recruitmentPages.clickAdd()
}

describe('Final Project Recruitment', () => {

    beforeEach(() => {
        loginPages.visit()
        loginPages.login('Admin', 'admin123')
        cy.wait(2000)
    })

    it('TC-REC-001 Open Recruitment Menu', () => {
        cy.intercept('GET', '**/api/**').as('recruitmentMenu')

        recruitmentPages.openRecruitment()

        cy.wait('@recruitmentMenu')
        cy.contains('Candidates').should('exist')
    })

    it('TC-REC-002 Click Add Button', () => {
        openAddCandidateForm()

        cy.contains('Add Candidate').should('exist')
    })

    it('TC-REC-003 Input First Name', () => {
        openAddCandidateForm()
        recruitmentPages.inputFirstName('Yuri')

        cy.get(FIRST_NAME_INPUT).should('have.value', 'Yuri')
    })

    it('TC-REC-004 Input Last Name', () => {
        openAddCandidateForm()
        recruitmentPages.inputLastName('Testing')

        cy.get(LAST_NAME_INPUT).should('have.value', 'Testing')
    })

    it('TC-REC-005 Input First Name and Last Name', () => {
        openAddCandidateForm()
        recruitmentPages.inputFirstName('Yuri')
        recruitmentPages.inputLastName('QA')

        cy.get(FIRST_NAME_INPUT).should('have.value', 'Yuri')
        cy.get(LAST_NAME_INPUT).should('have.value', 'QA')
    })

    it('TC-REC-006 Click Save Without Data', () => {
        openAddCandidateForm()
        recruitmentPages.clickSave()

        cy.contains('Required').should('exist')
    })

    it('TC-REC-007 Input Data and Save', () => {
        const uniqueId = Date.now()

        openAddCandidateForm()
        recruitmentPages.inputFirstName('Auto')
        recruitmentPages.inputLastName(`Test${uniqueId}`)
        recruitmentPages.inputEmail(`auto.test${uniqueId}@example.com`)
        recruitmentPages.clickSave()

        cy.contains('Successfully Saved').should('be.visible')
    })

    it('TC-REC-008 Open Recruitment Again', () => {
        recruitmentPages.openRecruitment()
        cy.contains('Dashboard').click()
        recruitmentPages.openRecruitment()

        cy.contains('Candidates').should('exist')
    })

})