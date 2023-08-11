const express = require('express');
const { createUser, createID } = require('../apis/apiDynamoDB');
const router = express.Router();
const { SingInPass, SingUpEmail1 } = require('../apis/apiAuth');

router.get("/test", (req,res) => {
    res.status(200).send("holaaaa")
})

router.post("/singUpGoogle", async (req, res) => {
    const token = req.body.token;

})

router.post("/singUpEmail", async (req, res) => {
    const User = req.body.user;
    const uid = req.body.uid;
    const email = req.body.email;
    const pass = req.body.pass;
    SingUpEmail1(email, pass).then(user => {
        createID(user.uid).then(id => {
            createUser(id, User, email, pass).then(user => {
                res.status(200).send({
                    data : {
                        xu1 : uid,
                        k3y: id
                    }
                })
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
    })
    
})

router.post("/singUpFace")

router.post("/singUpTwitter")


module.exports = router;