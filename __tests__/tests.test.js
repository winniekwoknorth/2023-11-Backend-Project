const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const {topicData, userData, articleData, commentData } = require("../db/data/test-data/index.js");
beforeEach(() => seed({topicData, userData, articleData, commentData}));
afterAll(() => db.end());
//task 2
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
    
//task 3
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
    })
        

//task 4
describe("/api/articles/:article_id", () => {
    test("get 200, then an array with all topics", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
          .then((res) => {
          expect(res.body.article.article_id).toBe(1);
          expect(res.body.article).toHaveProperty("author");
          expect(res.body.article).toHaveProperty("title");
          expect(res.body.article).toHaveProperty("article_id");
          expect(res.body.article).toHaveProperty("body");
          expect(res.body.article).toHaveProperty("topic");
          expect(res.body.article).toHaveProperty("created_at");
          expect(res.body.article).toHaveProperty("votes");
          expect(res.body.article).toHaveProperty("article_img_url");
        });
    });
    test("get 400, Bad Request. When invalid article_id is put on request", () => {
      return request(app)
        .get("/api/articles/banana")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe('Bad request')
      });
    })
    test("get 404, article does not exist. When the article_id is not found in the database", () => {
      return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe('article does not exist')
      });
    })
  });
  

