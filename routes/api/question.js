const express = require('express');

const Question = require('./schema/question');
const Podcast = require('./schema/podcast');
const UserQuestion = require('./schema/userQuestion')
const { mongoose } = require("mongoose");
const router = express.Router();

router.post("/create", async(req, res) => {
    const data = req.body;
    const audio = await Podcast.findById(data.audio);
    if(req.user?._id?.toString() === audio._doc.ownerId.toString()){
        const body = req;
        await Question.create({
            question: body.question,
            A: body.A,
            B: body.B,
            C: body.C,
            D: body.D,
            audio: mongoose.Types.ObjectId(body.audio)
        });
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

router.post("/question", async (req, res) => {
    res.status(201).send(await Question.where({audio: req.body.id}));
});

router.get("/question", async (req, res) => {
    const randomQuestion = await Question.random();
    if (await UserQuestion.exists({user: req.user._id})){
        res.send({"status": "Already create"})
    } else {
        console.log(randomQuestion);
        // await UserQuestion.create({
        //     user: req.user._id,
        //     question: randomQuestion._doc._id,
        // });
        res.status(201).send({"status": "Success"})
    }
});
//
// router.post("/answer", async (req, res) => {
//     const answer = req.body.answer;
//     const database = await UserQuestion.where({"user": req.user._id});
//     // const databaseAnswer = database._doc.question
// })

module.exports = router;