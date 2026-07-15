describe('Reqres API Testing', () => {

  const headers = {
    'x-api-key': 'free_user_3GWVXGK6pTRY11qCVc1RiiyDKVp'
  }

  // TC-API-001
  it('TC-API-001 Get list users page 1', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=1',
      headers
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.page).to.eq(1)
    })
  })

  // TC-API-002
  it('TC-API-002 Get list users page 2', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
      headers
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.page).to.eq(2)
    })
  })

  // TC-API-003
  it('TC-API-003 Get single user', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(2)
      expect(response.body.data.first_name).to.exist
    })
  })

  // TC-API-004
  it('TC-API-004 Get single user not found', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/23',
      headers,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.deep.equal({})
    })
  })

  // TC-API-005
  it('TC-API-005 Get list resource', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown',
      headers
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.length).to.be.greaterThan(0)
    })
  })

  // TC-API-006
  it('TC-API-006 Get single resource', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown/2',
      headers
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(2)
    })
  })

  // TC-API-007
  it('TC-API-007 Create user', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers,
      body: {
        name: 'Yuri',
        job: 'QA Engineer'
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.name).to.eq('Yuri')
      expect(response.body.job).to.eq('QA Engineer')
    })
  })

  // TC-API-008
  it('TC-API-008 Update user using PUT', () => {
    cy.request({
      method: 'PUT',
      url: 'https://reqres.in/api/users/2',
      headers,
      body: {
        name: 'Yuri',
        job: 'Senior QA'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq('Yuri')
      expect(response.body.job).to.eq('Senior QA')
    })
  })

  // TC-API-009
  it('TC-API-009 Update user using PATCH', () => {
    cy.request({
      method: 'PATCH',
      url: 'https://reqres.in/api/users/2',
      headers,
      body: {
        job: 'Automation QA'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.job).to.eq('Automation QA')
    })
  })

  // TC-API-010
  it('TC-API-010 Delete user', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers
    }).then((response) => {
      expect(response.status).to.eq(204)
    })
  })

  // TC-API-011
  it('TC-API-011 Register successful', () => {
  cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/register',
    headers,
    body: {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('id')
    expect(response.body).to.have.property('token')
  })
})
  // TC-API-012
  it('TC-API-012 Login successful', () => {
  cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/login',
    headers,
    body: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('token')
  })
})
})