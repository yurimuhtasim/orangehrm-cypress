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

    clickSave(){
        cy.contains('Save').click()
    }
}

export default new Recruitment()