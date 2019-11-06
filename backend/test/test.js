var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


describe("Grubhub Testing", function () {
    describe('Buyer Signup Test', function () {

        it('Email already exists', function () {
            agent.post("/buyer/signup")
                .send({ firstName: "testfirst", lastName: "testlast", 
                email: "laxmi@sjsu.edu", password: "test123" })
                .then(function (res) {
                    expect(JSON.parse(res.text).message).to.equal("Email already exists. Plz sign up with a different email id");
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Owner Login', function () {

        it('Logged in', function () {
            agent.post("/owner/login")
                .send({ email: "chris@sjsu.edu", password: "test123" })
                .then(function (res) {
                    expect(JSON.parse(res.text).success).to.equal(true);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Restaurant Sections', function () {

        it('Add Section', function () {
            agent.post("/restaurant/addSection")
                .send({ name:"Combo2", ownerId: "5db768574cedbe51c9c8b591"})
                .then(function (res) {
                    expect(JSON.parse(res.text).message).to.equal("Section added");
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it('Delete Section', function () {
            agent.post("/restaurant/deleteSection")
                .send({ ownerId: "5db768574cedbe51c9c8b591", id: "5dc23317230b5d0bbef84c0a"})
                .then(function (res) {
                    expect(JSON.parse(res.text).message).to.equal("Section deleted");
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });

    describe('Buyer Details', function () {

        it('Get Firstname', function () {
            agent.get("/buyer/firstName")
                .send({ id: "5da8f01820c2be9f2d48699a" })
                .then(function (res) {
                    expect(JSON.parse(res.text).firstName).to.equal("Laxmi2");
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });
});