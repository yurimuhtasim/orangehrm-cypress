class Directory{

    openDirectory (){
        cy.contains('Directory').click()
    }

    inputEmployeeName(name) {
        cy.get('input[placeholder="Type for hints..."]').first().clear().type(name)
    }

    clickSearch(){
        cy.contains('Search').click()
    }

    clickReset(){
        cy.contains('Reset').click()
    }
}

export default new Directory()