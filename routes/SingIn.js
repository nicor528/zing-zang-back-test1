const express = require('express');
const { createUser, createID, getUser, getID, getKey } = require('../apis/apiDynamoDB');
const { SingInPass } = require('../apis/apiAuth');
const router = express.Router();

router.post("/singInEmail", async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    SingInPass(email, pass).then(user => {
        getID(user.uid).then(id => {
            getUser(id).then(user => {
                res.status(200).send(user)
            }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
        }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
    }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
})

router.post("/singInWithId", async (req, res) => {
    const uid = req.body.uid;
    getID(uid).then(id => {
        getKey(id).then(key => {
            getUser(id).then(async (user) => {
                const data = await {
                    user,
                    key
                }
                res.status(200).send(data)
            }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
        }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
    }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
})


module.exports = router;