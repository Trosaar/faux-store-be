const server = require('../api/server.js')
const request = require('supertest')
const db = require('../database/dbConfig.js')

describe('purchases routes', () => {
    authInfo = {
        username: "purchasestest",
        password: "purchasespass"    }

    beforeAll( async() => {
        await db('purchases').truncate()
        await db('purchased_items').truncate()

        await request(server).post('/api/auth/register')
        .send(authInfo).then(res => {
            authInfo.id = res.body.newUser.UUID
            authInfo.token = res.body.token
        })        
    })

    // add/create new purchase
    describe('POST to purchases', () => {
        it('should return added purchase', async () => {
            const newPurchase = {
                "user_id": authInfo.id,
                "item_id": 2
            }

            await request(server).post('/api/purchases').set('authorization', authInfo.token)
            .send(newPurchase).then(res => {
                console.log(res.body)
                console.log(res.error)
                expect(res.status).toBe(200)
            })
        })
    })
    
    xdescribe('GET to purchases', () => {
        // get all purchase history
        it('should return all purchases from /', async () => {
            await request(server).get('/api/purchases/test').then(res => {
                expect(res.status).toBe(200)
            })
        })

        // get purchase history for an item
        xit('should return a single purchase from /:id', async () => {
            request(server).get('/api/purchases/:id').then(res => {
                expect(res.status).toBe(200)
            })
        })
    })

    //Update past purchase
    xdescribe('PUT to purchases', () => {
        it('should return updated purchase from /:id', async () => {
            const updates = {
                // fill in
            }

            request(server).put('/api/purchases/:id').send(updates).then(res => {
                expect(res.status).toBe(201)
            })
        })
    })

    xdescribe('DELETE to purchases', () => {
        it('should return a number 1 from /:id', async () => {
            request(server).delete('/api/purchases/:id').then(res => {
                expect(res.status).toBe(200)
            })
        })
    })
})