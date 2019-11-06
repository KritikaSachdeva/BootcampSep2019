const express = require('express')
const app = express()
const { Users } = require('../controller')
const { Ques } = require('../controller')
const middleware = require("../auth/middleware");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../config/config")


const createToken = require("../auth/authenticator").checkAuth;
module.exports = () => {

    // admin update examiner info
    app.patch('/examiner/:id', async(req, res) => {
        const result = await Users.updateUser(req, res);
        res.send(result);
    })

    //admin will add examiner
    app.post('/examiner', async(req, res) => {
        const response = await Users.adminDetails(req, res)
        res.send(response);
    })

    //admin will view examiner
    app.get('/examiner', async(req, res) => {
        const result = await Users.fetchData(req, res)
        res.send(result);
    })

    app.post('/login', async(req, res) => {
        const result = await createToken(req)
        if (result.token == "null") {
            res.status(400).send(result)
        } else {
            res.status(200).send(result)
        }
    })

    app.post('/signUp', async(req, res) => {
        const result = await Users.userRecord(req, res)
        res.send(result)
    })

    //  for viewing the details of loggedin user
    app.get('/loggedIn', async(req, res) => {
        const response = await Users.loggedInDetails(req, res)
        res.send(response)
    })

    //examiner will create exam details
    app.post('/exam', middleware, (req, res) => {
        Users.examDetail(req, res)
    })

    //examiner will view exam
    app.get('/exam', (req, res) => {
        const response = Users.viewExamDetail(req, res)

    })

    //examiner will fetch particular exam detail
    app.get('/exam/:id', middleware, (req, res) => {
        Users.fetchExamDetail(req, res)
    })

    //examiner will edit exam details
    app.patch('/exam/:id', middleware, (req, res) => {
        Users.editExam(req, res)
    })

    //examiner will delete exam using exam id
    app.delete('/exam/:id', middleware, (req, res) => {
        Users.removeExam(req, res)
    })

    //examiner will view performance of candidate
    app.get('/performance', middleware, async(req, res) => {
        debugger
        const response = await Users.studentPerformance(req, res)
        res.send(response)
    })

    app.get('/performance/students', middleware, async(req, res) => {
        const response = await Users.studPerformance(req, res)
        console.log(response)
    })

    //examiner will write exam questions
    app.post('/exam/question', middleware, (req, res) => {
        Users.question(req, res)
    })

    //examiner will views questions
    app.get('/exam/question/:id', middleware, (req, res) => {
        Users.getQuestionDetail(req, res)
    })

    //get particular question using its ID
    app.get('/exam/question/byid/:id', middleware, (req, res) => {
        // console.log(req.params.id)
        Users.fetchQuestionById(req, res)
    })

    //examiner will edit questions
    app.patch('/exam/question/:id', middleware, (req, res) => {
        Users.editQuestion(req, res)
            // res.send({ "data": req.body })
    })

    //examiner will delete question by id
    app.delete('/exam/question/:id', middleware, (req, res) => {
        Users.removeQuestion(req, res)
    })

    //candidates will view quesions using accesskey
    app.get('/test', middleware, async(req, res) => {
        const response = await Ques.testQuestions(req, res)
        return response
    })

    //post answers selected by candidates
    app.post('/test', middleware, async(req, res) => {
        const response = await Ques.saveCandidateAnswers(req, res)
        return response
    })

    app.post('/test/accessKey', async(req, res) => {
        const response = await Ques.checkAccessKey(req, res)
        return response
    })

    app.get('/test/accessKey', async(req, res) => {
        const response = await Ques.getExamTime(req, res)
        return response
    })

    app.get('/test/endTest', async(req, res) => {
        const response = await Ques.saveAllQuestions(req, res)
    })

    //admin will add examiner
    // app.post('/examiner', middleware, (req, res) => {
    //     const response = adminDetail.adminDetails(req, res)
    //     return response;
    // })

    //admin will delete examiner using id of examiner
    app.delete('/examiner/:id', (req, res) => {
            const result = Users.examinerDel(req, res)
            res.send(result)
        })
        //admin will view test created by each examiner using their id
    app.get('/examiner/:id', middleware, async(req, res) => {
        const result = await Users.testDetails(req, res)
        res.send(result);
    })

    //examiner will create test details
    app.post('/exam', (req, res) => {
        Users.examDetails(req, res)
    })

    app.patch('/examiner', middleware, async(req, res) => {
        const result = await Users.examinerUpd(req, res)
        res.send(result)
    })

    //examiner will edit test details
    app.patch('/exam', (req, res) => {
        res.send({ "data": req.body })
    })
    return app
}