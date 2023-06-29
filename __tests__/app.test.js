const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');
const db = require('../db/connection');
const request = require("supertest");
const app = require("../app")
const endpoints = require("../endpoints.json")

const commentToPost = {
    username: 'butter_bridge',
    body: 'This article is great'
};

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
    test('200: If passed the endpoint of articles it should return with an array of article objects', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body.articles).toHaveLength(13);
            body.articles.forEach((article) => {
                expect(article).toHaveProperty("author", expect.any(String));
                expect(article).toHaveProperty("title", expect.any(String));
                expect(article).toHaveProperty("article_id", expect.any(Number));
                expect(article).toHaveProperty("topic", expect.any(String));
                expect(article).toHaveProperty("created_at", expect.any(String));
                expect(article).toHaveProperty("votes", expect.any(Number));
                expect(article).toHaveProperty("article_img_url", expect.any(String));
            })
        })
    })
    test('200: If passed the endpoint of articles it should return with an array of article objects in descending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body.articles[0].created_at).toBe('2020-11-03T09:12:00.000Z');
             expect(body.articles).toBeSortedBy('created_at', {
                descending: true,
              });
        })
    })
    test('200: If passed the endpoint of articles it should return with an array of article objects that does not contain the key of body', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            body.articles.forEach((article) => {
                expect(article).not.toHaveProperty("body");
            })
        })
    })
    test('200: If passed the endpoint of articles it should return with an array of article objects that includes a key of comment_count which is the total count of all the comments with that articles article id', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body.articles[0].comment_count).toBe('2')
            body.articles.forEach((article) => {
            expect(article).toHaveProperty("comment_count", expect.any(String));
            })
        })
    })
   
})

describe('nc-news-6', () => {
    test('200: should return an array of comment objects for a given article_id', () => {
       return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({body}) => {
            expect(body.comments).toHaveLength(11);
            body.comments.forEach((comment) => {
                expect(comment).toHaveProperty("comment_id", expect.any(Number));
                expect(comment).toHaveProperty("votes", expect.any(Number));
                expect(comment).toHaveProperty("created_at", expect.any(String));
                expect(comment).toHaveProperty("author", expect.any(String));
                expect(comment).toHaveProperty("body", expect.any(String));
                expect(comment).toHaveProperty("article_id", expect.any(Number));
            })
        })
    })
    test('200: should return an array of comment objects for a given article_id with the most recent comments first ', () => {
        return request(app)
         .get('/api/articles/1/comments')
         .expect(200)
         .then(({body}) => {
             expect(body.comments[0].comment_id).toBe(5);
             expect(body.comments[0].created_at).toBe('2020-11-03T21:00:00.000Z');
            expect(body.comments).toBeSortedBy('created_at', {
                descending: true,
              });
         })
     })
     describe('Error Handling', ()=>{
        test('400 Bad Request. User inputs an id which is not a number this will return a 400 code and an error message', ()=>{
         return request(app)
        .get("/api/articles/mitch/comments")
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe("Bad Request Invalid Input");
        })
        })
        test('Returns 404 when passed valid id that does not exist', ()=>{
            return request(app)
           .get("/api/articles/200/comments")
           .expect(404)
           .then(({ body }) => {
               expect(body.msg).toBe("ID Not Found");
           })
           })
    })
    
})
describe('nc-news-7', ()=> {
    test('201: Should be able to post a comment object for an article and return that posted comment object', ()=>{
        return request(app)
        .post('/api/articles/1/comments')
        .send(commentToPost)
        .expect(201)
        .then(({body}) => {
           expect(body).toEqual({article_id: 1, author: 'butter_bridge', body: 'This article is great', comment_id: 19, created_at: body.created_at, votes: 0})

        })
    })
     test('201: Should be able to post a comment object which has more properties than needed for an article and return that posted comment object with only the properties that have been used to create the comment', ()=>{
        const commentToPostWithTooManyProperties = {
            username: 'butter_bridge',
            body: 'This article is great',
            votes: 20,
            firstName: 'Phil',
            lastName: 'Denton'
        };
        return request(app)
        .post('/api/articles/1/comments')
        .send(commentToPostWithTooManyProperties)
        .expect(201)
        .then(({body}) => {
           expect(body).toEqual({article_id: 1, author: 'butter_bridge', body: 'This article is great', comment_id: 19, created_at: body.created_at, votes: 0})
           
        })
    })
    describe('Error handling', () => {
        test('400 Bad Request. User inputs an id which is not a number this will return a 400 code and an error message', ()=>{
            return request(app)
           .post("/api/articles/mitch/comments")
           .send(commentToPost)
           .expect(400)
           .then(({ body }) => {
               expect(body.msg).toBe("Bad Request Invalid Input");
           })
           })
        test('400 Bad Request. User inputs no username or body this will return a 400 code and an error message', ()=>{
            const invalidUserNameType = {
            };
            return request(app)
           .post("/api/articles/1/comments")
           .send(invalidUserNameType)
           .expect(400)
           .then(({ body }) => {
               expect(body.msg).toBe("Bad Request missing input");
           })
           })
        test('Returns 404 when passed valid id that does not exist', ()=>{
               return request(app)
              .post("/api/articles/200/comments")
              .send(commentToPost)
              .expect(404)
              .then(({ body }) => {
                  expect(body.msg).toBe("violates foreign key constraint");
              })
              })
        test('Returns 404 when username is not found', ()=>{
            const invalidUserName = {
                username: 'Phil',
                body: 'This article is great'
            };    
            return request(app)
               .post("/api/articles/1/comments")
               .send(invalidUserName)
               .expect(404)
               .then(({ body }) => {
                   expect(body.msg).toBe("violates foreign key constraint");
               })
               })
    })
})

describe("nc-news-8", () => {
    const updateArticle = {inc_votes: 1}
    test("201: Should be able to update an article's votes total by the specified number of votes. Return that article object with the updated votes total ",() =>{
    return request(app)
    .post('/api/articles/1')
    .send(updateArticle)
    .expect(201)
    .then(({body})=>{
        expect(body).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: body.created_at,
            votes: 101,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          })
    })
    })
    test("201: Should be able to update an article's votes total by the specified number of votes if the input is a number as string. Return that article object with the updated votes total ",() =>{
        const updateArticleWithString = {inc_votes: '1'}
        return request(app)
        .post('/api/articles/1')
        .send(updateArticle)
        .expect(201)
        .then(({body})=>{
            expect(body).toEqual({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: body.created_at,
                votes: 101,
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              })
        })
        })
    describe('Error Handling', () =>{
        test('400 Bad Request. User inputs an id which is not a number this will return a 400 code and an error message', ()=>{
            return request(app)
           .post("/api/articles/mitch")
           .send(updateArticle)
           .expect(400)
           .then(({ body }) => {
               expect(body.msg).toBe("Bad Request Invalid Input");
           })
           })
        test('Returns 404 when passed valid id that does not exist', () => {
            return request(app)
           .post("/api/articles/200")
           .send(updateArticle)
           .expect(404)
           .then(({ body }) => {
            expect(body.msg).toBe("Request Not Found");
        })
           })
        test('400 Bad Request. User inputs no votes this will return a 400 code and an error message', ()=>{
            const invalidInput = {
            };
            return request(app)
           .post("/api/articles/1")
           .send(invalidInput)
           .expect(400)
           .then(({ body }) => {
               expect(body.msg).toBe("Bad Request Invalid Input");
           })
           })
        test('400 Bad Request. User inputs something other than a number for votes this will return a 400 code and an error message', ()=>{
            const invalidInput = {
                inc_votes: "mitch"
            };
            return request(app)
           .post("/api/articles/1")
           .send(invalidInput)
           .expect(400)
           .then(({ body }) => {
               expect(body.msg).toBe("Bad Request Invalid Input");
           })
           })
           
    })
})
describe('nc-news-9', ()=>{
    test.only('should return a 204 status after the restaurant has been deleted', ()=>{
        return request(app)
        .delete('/api/comments/1')
        .expect(204)
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

