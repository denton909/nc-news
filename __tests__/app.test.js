const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');
const db = require('../db/connection');
const request = require("supertest");
const app = require("../app")
const endpoints = require("../endpoints.json")


beforeEach(() => seed(testData));
afterAll(() => db.end())

describe("nc-news-2", () => {
    test("200 GET all topics at endpoint of /api/topics and return array of all topic objects", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
            expect(body.topics).toHaveLength(3);
            body.topics.forEach((topic) => {
                expect(topic).toHaveProperty("description", expect.any(String));
                expect(topic).toHaveProperty("slug", expect.any(String));
            })
        })
    })
})
describe("nc-news-3", () => {
    test("200: GET an object containing all the available endpoints on the API", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
            expect(typeof body.endPoints).toBe('object');
            expect(body.endPoints).toEqual(endpoints)
        })
    })
})

describe("nc-news-4", () => {
    test("200 GET the article object that corresponds with the id number of 1 in the URL", () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
           expect(typeof body.article).toBe('object');
           expect(body.article.article_id).toBe(1)
           expect(body.article).toHaveProperty("title", 'Living in the shadow of a great man');
           expect(body.article).toHaveProperty("topic", 'mitch');
           expect(body.article).toHaveProperty("author", 'butter_bridge');
           expect(body.article).toHaveProperty("body", 'I find this existence challenging');
           expect(body.article).toHaveProperty("created_at", '2020-07-09T20:11:00.000Z');
           expect(body.article).toHaveProperty("votes", 100);
           expect(body.article).toHaveProperty("article_img_url", 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700');
        })
    })
    test("200 GET the article object that corresponds with the id number of 4 in the URL", () => {
        return request(app)
        .get("/api/articles/4")
        .expect(200)
        .then(({ body }) => {
           expect(typeof body.article).toBe('object');
           expect(body.article.article_id).toBe(4)
           expect(body.article).toHaveProperty("title", 'Student SUES Mitch!');
           expect(body.article).toHaveProperty("topic", 'mitch');
           expect(body.article).toHaveProperty("author", 'rogersop');
           expect(body.article).toHaveProperty("body", 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages');
           expect(body.article).toHaveProperty("created_at", '2020-05-06T01:14:00.000Z');
           expect(body.article).toHaveProperty("votes", 0);
           expect(body.article).toHaveProperty("article_img_url", 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700');
        })
    })

    describe('Error Handling', ()=>{
        test('400 Bad Request. User inputs an id which is not a number this will return a 400 code and an error message', ()=>{
         return request(app)
        .get("/api/articles/mitch")
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe("Bad Request Invalid Input");
        })
        })
        test('Returns 404 when passed valid id that does not exist', ()=>{
            return request(app)
           .get("/api/articles/200")
           .expect(404)
           .then(({ body }) => {
               expect(body.msg).toBe("Request Not Found");
           })
           })
    })
})
describe('nc-news-5', () =>{
    xtest('200: If passed the endpoint of articles it should return with an array of article objects', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body.articles).toHaveLength(13);
            expect(body.articles[0].created_at).toBe(1604394720000)
            body.articles.forEach((article) => {
                expect(article).toHaveProperty("author", expect.any(String));
                expect(article).toHaveProperty("title", expect.any(String));
                expect(article).toHaveProperty("article_id", expect.any(Number));
                expect(article).toHaveProperty("topic", expect.any(String));
                expect(article).toHaveProperty("created_at", expect.any(Number));
                expect(article).toHaveProperty("votes", expect.any(Number));
                expect(article).toHaveProperty("article_img_url", expect.any(String));
                expect(article).toHaveProperty("comment_count", expect.any(Number));
                expect(article).not.toHaveProperty("body");
            })
        })
    })
})

describe("404 catch all error handling", () => {
    test("404 responds with an error message when passed the wrong endpoint", () => {
        return request(app)
        .get("/api/banana")
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("Data Not Found");
        })
    })
})

