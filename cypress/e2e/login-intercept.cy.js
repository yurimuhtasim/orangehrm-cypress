describe('OrangeHRM Login Feature With Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC-LOGIN-001 Login menggunakan username dan password valid', () => {
    cy.intercept('POST', '**/auth/validate').as('validLogin')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@validLogin')
    cy.url().should('include', '/dashboard')
  })

  it('TC-LOGIN-002 Login menggunakan password dengan huruf besar kecil berbeda', () => {
    cy.intercept('POST', '**/auth/validate').as('wrongPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('Admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongPassword')
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOGIN-003 Login menggunakan username salah dan password valid', () => {
    cy.intercept('POST', '**/auth/validate').as('wrongUsername')

    cy.get('input[name="username"]').type('adminn')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongUsername')
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOGIN-004 Login menggunakan username dan password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('wrongCredential')

    cy.get('input[name="username"]').type('Minda')
    cy.get('input[name="password"]').type('Minda123')
    cy.get('button[type="submit"]').click()

    cy.wait('@wrongCredential')
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOGIN-005 Login tanpa mengisi username', () => {
    cy.intercept('GET', '**/auth/login').as('loginPage')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()


    cy.contains('Required').should('be.visible')
  })

  it('TC-LOGIN-006 Login tanpa mengisi password', () => {
    cy.intercept('GET', '**/web/index.php/auth/login').as('emptyPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

  
    cy.contains('Required').should('be.visible')
  })

  it('TC-LOGIN-007 Login tanpa mengisi username dan password', () => {
    cy.intercept('GET', '**/web/index.php/auth/login').as('emptyCredential')

    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
  .should('have.length', 2)
  })

  it('TC-LOGIN-012 Membuka halaman forgot password', () => {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('forgotPassword')

    cy.contains('Forgot your password?').click()

    cy.wait('@forgotPassword')
    cy.url().should('include', '/requestPasswordResetCode')
  })

})