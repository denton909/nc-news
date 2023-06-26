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
        })
    })
    test("200 GET the article object that corresponds with the id number of 4 in the URL", () => {
        return request(app)
        .get("/api/articles/4")
        .expect(200)
        .then(({ body }) => {
           expect(typeof body.article).toBe('object');
           expect(body.article.article_id).toBe(4)
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
        test('413 Request Entity Too Large. User inputs an id which is a number but is bigger than current amount of data this will return a 413 code and an error message', ()=>{
            return request(app)
           .get("/api/articles/200")
           .expect(413)
           .then(({ body }) => {
               expect(body.msg).toBe("Request Entity Is Larger Than Data Range");
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
