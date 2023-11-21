const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");



describe("get/api/", () => {
    test("get 200, return an object describing all the available endpoints on your API", () => {
        return request(app).get("/api").expect(200)
            .then((res) => {
                expect(res.type).toBe('application/json')
                expect(res.body.content).toHaveProperty('GET /api')
                expect(res.body.content).toHaveProperty('GET /api/topics')
                expect(res.body.content).toHaveProperty('GET /api/articles')
               
            }   
      );
    })
    });

