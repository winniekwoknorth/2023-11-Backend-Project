const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const {topicData, userData, articleData, commentData } = require("../db/data/test-data/index.js");
const {getTopics}= require('../controllers/topics.controllers.js')
beforeEach(() => seed({topicData, userData, articleData, commentData}));
afterAll(() => db.end());

describe("get/api/topics", () => {
    test("get 200, then an array with all topics", () => {
        return request(app).get("/api/topics").expect(200)
            .then((res) => {
                expect(res.body.topics.length).toBe(3)
                res.body.topics.forEach((topic) => {
                    expect(topic).toHaveProperty('slug')
                    expect(topic).toHaveProperty('description')
                })
            }   
      );
    })
    });


