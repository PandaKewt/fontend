const express = require('express');
const passport = require('passport');
const router = express.Router();
const user = require('./schema/user')
// const {body} = require("express-validator");

// { failureRedirect: '/' },
router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        res.sendStatus(200);
});

router.post('/logout', (req, res) => {
    if(req.isAuthenticated()){
        req.logout((err) => {
            console.log(err)
            res.sendStatus(200);
        });
    } else {
        res.sendStatus(500);
    }
});

router.post('/signup', (req, res) => {
    const reqBody = req.body;
    const users = new user({firstName: reqBody.firstName, lastName: reqBody.lastName, username: reqBody.username, principalId: reqBody.principalId})
    user.register(users, req.body.password, (err, user) =>{
        if(err.name === "UserExistsError") {
            res.status(500).send({success:false, message: err.message});
        } else if (err) {
            console.log(err)
            res.status(500).send({success:false, message: err.message});
        } else {
            res.status(201).send({success: true, message: "Your account has been saved"});
        }
    })
})



module.exports = router;