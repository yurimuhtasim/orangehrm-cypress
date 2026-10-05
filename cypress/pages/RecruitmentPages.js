class Recruitment {

    openRecruitment() {
        cy.contains('Recruitment').click()
    }

    clickAdd() {
        cy.contains('Add').click()
    }

    inputFirstName(name){
        cy.get('input[name="firstName"]').type (name)
    }

    inputLastName(name){
        cy.get('input[name="lastName"]').type(name)
    }

    inputEmail(email){
    cy.contains('label', 'Email')
        .parents('.oxd-input-group')
        .find('input')
        .type(email)
}

    clickSave(){
        cy.contains('Save').click()
    }
}

export default new Recruitment()