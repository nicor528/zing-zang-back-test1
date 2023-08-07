const express = require('express');
const { createUser } = require('../apis/apiDynamoDB');
const router = express.Router();

router.get("/test", (req,res) => {
    res.status(200).send("holaaaa")
})

router.post("/singUpGoogle", async (req, res) => {
    const token = req.body.token;

})

router.post("/singUpEmail", async (req, res) => {
    const user = req.body.user;
    const uid = req.body.uid
    createUser(uid, user).then(user => {
        
    }).catch(error => {
        console.log(error)
    })
})

router.post("/singUpFace")

router.post("/singUpTwitter")


module.exports = router;