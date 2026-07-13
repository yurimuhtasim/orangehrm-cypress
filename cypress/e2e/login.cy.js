describe ('OrangeHRM Login Feature' ,() => {

  beforeEach(() => {
     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC-LOGIN-001 Login menggunakan username dan password yang valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  it('TC-LOGIN-002 Login menggunakan password dengan huruf awalan berbeda', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('Admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should ('be.visible')
  })

  it('TC-LOGIN-003 Login menggunakan username salah dan password valid', () => {
    cy.get('input[name="username"]').type('adminn')
    cy.get('input[name="password"]').type('Admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should ('be.visible')
  })

  it('TC-LOGIN-004 Login menggunakan username dan password yang salah', () => {
    cy.get('input[name="username"]').type('Minda')
    cy.get('input[name="password"]').type('Minda123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should ('be.visible')
  })

  it('TC-LOGIN-005 Login tanpa mengisi username', () => {
    cy.get('input[name="password"]').type('Admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should ('be.visible')
  })

  it('TC-LOGIN-006 Login tanpa mengisi password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should ('be.visible')
  })

  it('TC-LOGIN-007 Login tanpa mengisi username dan password', () => {
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should ('be.visible')
  })

  it('TC-LOGIN-008 Login menggunakan username dengan huruf kecil', () => {
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  it('TC-LOGIN-009 Login menggunakan username dengan spasi di awal', () => {
    cy.get('input[name="username"]').type(' Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should ('be.visible')
  })
 
  it('TC-LOGIN-010 Login menggunakan karakter khusus pada username', () => {
    cy.get('input[name="username"]').type('@Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should ('be.visible')
  })

  it('TC-LOGIN-011 Login menggunakan password dengan spasi di tengah', () => {
    cy.get('input[name="username"]').type('@Admin')
    cy.get('input[name="password"]').type('admin 123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should ('be.visible')
  })

  it('TC-LOGIN-012 Membuka halaman forgot password', () => {
    cy.contains('Forgot your password?').click()

    cy.url().should('include', '/requestPasswordResetCode')
    cy.contains('Reset Password').should ('be.visible')
  })
})