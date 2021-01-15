const server = require('../api/server.js')
const request = require('supertest')
const db = require('../database/dbConfig.js')
// const { expect } = require('chai')
// const chai = require('chai)

describe('Auth Router', () => {
    beforeAll( async () => {
        await db('users').truncate()
    })


    describe('GET to auth', () => {
        it('should be resitricted', async () => {
            await request(server).get('/api/auth').auth('username', 'password').then(res => {
                expect(res.status).toBe(401)
                expect(res.text).toBeTruthy()
            })
        })
    })

    describe('POST to auth', ()=> {
        it('should return the token for a new user', async () => {
            const user = {
                username: "test",
                password: "testpass"
            }

            await request(server).post('/api/auth/register')
            .send(user).then(res => {
                expect(res.body.newUser.username).toBe("test")
                expect(res.body.token).toBeTruthy()
            })
        })

        it('should return a token for existing user', async () => {
            const user = {
                username: "test",
                password: "testpass"
            }
            
            await request(server).post('/api/auth/login')
            .send(user).then(res => {
                expect(res.status).toBe(200)
                expect(res.body.token).toBeTruthy()
            })
        })
    })

    xdescribe('PUT to auth', () => {

    })

    xdescribe('DELETE to auth', () => {

    })
})