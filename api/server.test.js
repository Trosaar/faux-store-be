const server = require('./server.js')
const request = require('supertest')

describe('Base route', () => {
    describe('GET to /', () => {
        it('should return html tag', () => {
            request(server).get('/').then(res => {
                expect(res.text).toBe('<h1>I Think its working</h1>')
            })
        })
    })
})
