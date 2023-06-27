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