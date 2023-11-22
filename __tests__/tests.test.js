const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const {topicData, userData, articleData, commentData } = require("../db/data/test-data/index.js");

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
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
  
//task 5
describe("/api/articles/", () => {
  test("get 200, then an array with all articles and sorted by created_at in descending order by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(typeof (res.body)).toBe('object')
        expect(res.body.articles.length).toBe(13)
        expect(res.body.articles[0]).toMatchObject({
          article_id: 3,
          title: 'Eight pug gifs that remind me of mitch',
          topic: 'mitch',
          author: 'icellusedkars',
          body: 'some gifs',
          created_at: '2020-11-03T09:12:00.000Z',
          votes: 0,
          article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
          comment_count: '2'
        })
        expect(res.body.articles).toBeSortedBy('created_at', { descending: true })
      });
  })
  test("get 200, and return sorted array by article_id in decending order", () => {
    return request(app)
        .get("/api/articles?order=desc&sort_by=article_id")
        .expect(200)
      .then((res) => {  
            expect(typeof (res.body)).toBe('object')
            expect(res.body.articles.length).toBe(13)
            expect(res.body.articles).toBeSortedBy('article_id',{descending: true})
        });
        
})
test("get 200, and return sorted array by article_id in ascending order", () => {
  return request(app)
      .get("/api/articles?order=asc&sort_by=article_id")
      .expect(200)
    .then((res) => {  
          expect(typeof (res.body)).toBe('object')
          expect(res.body.articles.length).toBe(13)
          expect(res.body.articles).toBeSortedBy('article_id',{ascending: true})
      });
      
})
test("get 200, and return sorted array by author and by default in descending order", () => {
  return request(app)
      .get("/api/articles?sort_by=author")
      .expect(200)
    .then((res) => {  
          expect(typeof (res.body)).toBe('object')
          expect(res.body.articles.length).toBe(13)
          expect(res.body.articles).toBeSortedBy('author',{descending: true})
      });
      
})
test("get 200, and return sorted array by topic and by default in descending order", () => {
  return request(app)
      .get("/api/articles?sort_by=topic")
      .expect(200)
    .then((res) => {  
          expect(typeof (res.body)).toBe('object')
          expect(res.body.articles.length).toBe(13)
          expect(res.body.articles).toBeSortedBy('topic',{descending: true})
      });
      
})
  
test("get 400, by request if request is not listed in endpoint.json", () => {
  return request(app)
  .get("/api/articles?sort_by=title")
  .expect(400)
  .then((res) => {
    expect(res.body.msg).toBe('Bad request')
})
      
})
})
