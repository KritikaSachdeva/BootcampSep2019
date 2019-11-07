const { examDetail } = require('../models/examDetail')
const question = require('./questionController')

const examDetails = async(req, res) => {
    try {
        const checkExamCode = await examDetail.findOne({ examCode: req.body.examCode })
        
        if(checkExamCode){
            return({"message" : "Exam Code already exist"})
        }
        else{
        req.body.examinerId = req.headers.id
        console.log(req.headers.id)
        let examInformation = new examDetail(req.body)
        const p = await examInformation.save()
        console.log(p)
        res.status(200).send({ msg: 'exam information saved successful' })
        }    
    } 
    catch (error) {
        console.log(error)
        res.send({ error })
    }
}

const viewExamDetail = async(req, res) => {
    try {
        let values = await examDetail.find()
        res.status(200).send(values)
    } catch (error) {
        console.log(error)
    }
}
const removeExam = async(req, res) => {
    try {
        let deleteExam = await examDetail.findById({ _id: req.params.id })
        question.removeByExamCode(deleteExam.examCode)
        await examDetail.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({ msg: 'exam deleted' })
    } catch (error) {
        res.status(404).send(error)
    }
}
const editExam = async(req, res) => {
    try {
        await examDetail.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                "examName": req.body.examName,
                "instructions": req.body.instructions,
                "examDuration": req.body.examDuration,
                "examStartTime": req.body.examStartTime
            }
        })
        res.status(200).send({ msg: 'exam detail updated' })
    } catch (error) {
        res.status(400).send(error)
    }
}
const fetchExamDetail = async(req, res) => {
    try {
        let obj = await examDetail.findById({ _id: req.params.id })
        res.status(200).send(obj)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}
module.exports = {
    examDetails,
    viewExamDetail,
    removeExam,
    fetchExamDetail,
    editExam
}