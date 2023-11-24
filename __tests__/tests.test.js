const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data/index.js");
const { expect } = require("@jest/globals");

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

//task 2
describe("get/api/topics", () => {
  test("get 200, then an array with all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics.length).toBe(3);
        res.body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });
});

//task 3
describe("get/api/", () => {
  test("get 200, return an object describing all the available endpoints on your API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.type).toBe("application/json");
        expect(res.body.content).toHaveProperty("GET /api");
        expect(res.body.content).toHaveProperty("GET /api/topics");
        expect(res.body.content).toHaveProperty("GET /api/articles");
      });
  });
});

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
        expect(res.body.msg).toBe("Bad request");
      });
  });
  test("get 404, article does not exist. When the article_id is not found in the database", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("article does not exist");
      });
  });
});

//task 5
describe("/api/articles/", () => {
  test("get 200, then an array with all articles and sorted by created_at in descending order by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body.articles.length).toBe(13);
        res.body.articles.forEach((article) => {
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("body");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comment_count");
        });
        expect(res.body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("get 200, and return sorted array by article_id in decending order", () => {
    return request(app)
      .get("/api/articles?order=desc&sort_by=article_id")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body.articles.length).toBe(13);
        expect(res.body.articles).toBeSortedBy("article_id", {
          descending: true,
        });
      });
  });
  test("get 200, and return sorted array by article_id in ascending order", () => {
    return request(app)
      .get("/api/articles?order=asc&sort_by=article_id")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body.articles.length).toBe(13);
        expect(res.body.articles).toBeSortedBy("article_id", {
          ascending: true,
        });
      });
  });
  test("get 200, and return sorted array by author and by default in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=author")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body.articles.length).toBe(13);
        expect(res.body.articles).toBeSortedBy("author", { descending: true });
      });
  });
  test("get 200, and return sorted array by topic and by default in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=topic")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body.articles.length).toBe(13);
        expect(res.body.articles).toBeSortedBy("topic", { descending: true });
      });
  });

  test("get 400, bad request if request is not listed in endpoint.json", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
});

//task 6
describe("api/articles/:article_id/comments", () => {
  test("get 200, and return sorted array of comments of required article_id by created_at in descending order by default", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        expect(res.body.comments.length).toBe(2);
        expect(res.body.comments).toBeSortedBy("created_at", { descending: true });
        res.body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at")
        });
      });
  })
  test("get 200, and return empty array if no comment for a valid request of article_id", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments).toEqual([]);
        
      });
  })
  test("get 400, bad request if request is invalid type", () => {
    return request(app)
      .get("/api/articles/banana/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  })
  test("get 404, not found if request article is not found in database", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("article not exist");
      });
  })
})
//task 7
describe('post/api/articles/:article_id/comments', () => {
  test('201: response with add comments to database', () => {
    const newComments = {
      username: 'butter_bridge',
      body: 'great'
    }
    return request(app)
      .post('/api/articles/2/comments')
      .send(newComments)
      .expect(201)
      .then((res) => {
        expect(res.body.comments.comment_id).toBe(19)
        expect(res.body.comments).toHaveProperty("comment_id")
        expect(res.body.comments).toHaveProperty("body")
        expect(res.body.comments).toHaveProperty("article_id")
        expect(res.body.comments).toHaveProperty("author")
        expect(res.body.comments).toHaveProperty("votes")
        expect(res.body.comments).toHaveProperty("created_at")
      })
  })
  test('201: ignore properties add beside username and body and return a new comment', () => {
    const newComments = {
      username: 'butter_bridge',
      body: 'great',
      votes: 1,
      message: "hello"
    }
    return request(app)
      .post('/api/articles/2/comments')
      .send(newComments)
      .expect(201)
      .then((res) => {
        expect(res.body.comments).toMatchObject({
          comment_id: 19,
          body: 'great',
          article_id: 2,
          author: 'butter_bridge',
          votes: 0,
        })
        expect(res.body.comments).toHaveProperty("created_at")
  
      })
  })
  test('404: Bad request if reqest to a endpoint not exist', () => {
    const newComments = {
      username: 'butter_bridge',
      body: 'great'
    }
    return request(app)
      .post('/api/articles/99/comments')
      .send(newComments)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not exist");
      });
  })
  test('400: Bad request if post reqest missing essential data, e.g. missing body', () => {
    const newComments = {
      username: 'butter_bridge'
    }
    return request(app)
      .post('/api/articles/2/comments')
      .send(newComments)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  })
  test('404: Bad not found if post with username not found in users table', () => {
    const newComments = {
      username: 'winnie',
      body: 'great'
    }
    return request(app)
      .post('/api/articles/2/comments')
      .send(newComments)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not exist");
      });
  })
})

//task 8
// describe('patch/api/articles/:article_id/', () => {
//   test('201: response with add comments to database', () => {
//     const update = {
//       inc_votes: 1
//     }
//     return request(app)
//       .patch('/api/articles/3/')
//       .send(update)
//       .expect(201)
//       .then((res) => {
//         console.log(res.body)
//         expect(res.body.articles.votes).toBe(1) 
//         expect(res.body.articles).toMatchObject({
//           article_id: 3,
//           title: 'Eight pug gifs that remind me of mitch',
//           topic: 'mitch',
//           author: 'icellusedkars',
//           body: 'some gifs',
//           created_at: '2020-11-03T09:12:00.000Z',
//           votes: 1,
//           article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
//         })
//       })
//   })
//   test.only('201: the votes number is add on but not replace by new value', () => {
//     const update = {
//       inc_votes: 1
//     }
//     return request(app)
//       .patch('/api/articles/99/')
//       .send(update)
//       .expect(400)
//       .then((res) => {
//         console.log(res.body)
//         expect(res.body.articles.votes).toBe(101) 
//       })
//   })
// })

//task 9 
describe('delete/api/comments/:comment_id', () => {
  test('204: no response send back', () => {
    return request(app)
      .delete('api/comments/:comment_id')
      .send()
      .expect(204)
      .then((res) => {
        expect(res.body).toBe({})
        
      })
  })
})