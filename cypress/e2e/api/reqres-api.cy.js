const BASE_URL = 'https://reqres.in/api'

describe('Reqres API Testing', () => {
    let headers

    before(() => {
        cy.env(['REQRES_API_KEY']).then(({ REQRES_API_KEY }) => {
            expect(Boolean(REQRES_API_KEY), 'REQRES_API_KEY tersedia').to.be.true
            headers = { 'x-api-key': REQRES_API_KEY }
        })
    })

    const request = (method, path, options = {}) =>
        cy.request({ method, url: `${BASE_URL}${path}`, headers, ...options })

    it('TC-API-001 Get list users page 1', () => {
        request('GET', '/users?page=1').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.page).to.eq(1)
        })
    })

    it('TC-API-002 Get list users page 2', () => {
        request('GET', '/users?page=2').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.page).to.eq(2)
        })
    })

    it('TC-API-003 Get single user', () => {
        request('GET', '/users/2').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.id).to.eq(2)
            expect(response.body.data.first_name).to.exist
        })
    })

    it('TC-API-004 Get single user not found', () => {
        request('GET', '/users/23', { failOnStatusCode: false }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.deep.equal({})
        })
    })

    it('TC-API-005 Get list resource', () => {
        request('GET', '/unknown').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.length).to.be.greaterThan(0)
        })
    })

    it('TC-API-006 Get single resource', () => {
        request('GET', '/unknown/2').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.id).to.eq(2)
        })
    })

    it('TC-API-007 Create user', () => {
        request('POST', '/users', {
            body: { name: 'Yuri', job: 'QA Engineer' }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq('Yuri')
            expect(response.body.job).to.eq('QA Engineer')
        })
    })

    it('TC-API-008 Update user using PUT', () => {
        request('PUT', '/users/2', {
            body: { name: 'Yuri', job: 'Senior QA' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq('Yuri')
            expect(response.body.job).to.eq('Senior QA')
        })
    })

    it('TC-API-009 Update user using PATCH', () => {
        request('PATCH', '/users/2', {
            body: { job: 'Automation QA' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.job).to.eq('Automation QA')
        })
    })

    it('TC-API-010 Delete user', () => {
        request('DELETE', '/users/2').then((response) => {
            expect(response.status).to.eq(204)
        })
    })

    it('TC-API-011 Register successful', () => {
        request('POST', '/register', {
            body: { email: 'eve.holt@reqres.in', password: 'pistol' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('token')
        })
    })

    it('TC-API-012 Login successful', () => {
        request('POST', '/login', {
            body: { email: 'eve.holt@reqres.in', password: 'cityslicka' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token')
        })
    })

})