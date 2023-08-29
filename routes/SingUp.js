const express = require('express');
const { createUser, createID, setNewKey, generateAlphanumericCode } = require('../apis/apiDynamoDB');
const router = express.Router();
const { SingUpEmail1 } = require('../apis/apiAuth');

router.get("/test", (req,res) => {
    console.log("test")
    res.status(200).send("holaaaa")
})

router.post("/singUpGoogle", async (req, res) => {
    const uid = req.body.uid;
    const User = req.body.user;
    const email = req.body.email;

    createID(uid).then(id => {
        createUser(id, User, email, "").then(async (user) => {
            const key = await generateAlphanumericCode();
            setNewKey(id, key).then(async (datax) => {
                const data = await {
                    id: id,
                    key: key,
                }
                res.status(200).send(data)
            }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
        }).catch(error => {
            console.log(error)
        })
    }).catch(error => {res.status(400).send({error : "bad conection with DB"})})

})

router.post("/singUpEmail", async (req, res) => {
    console.log(req.body)
    const User = req.body.user;
    //const uid = req.body.uid;
    const email = req.body.email;
    const pass = req.body.pass;
    SingUpEmail1(email, pass).then(user1 => {
        createID(user1.uid).then(id => {
            createUser(id, User, email, pass).then(async (user) => {
                const key = await generateAlphanumericCode();
                setNewKey(id, key).then(async (datax) => {
                    const data = await {
                        id: id,
                        key: key,
                    }
                    res.status(200).send(data)
                }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
    })
})

router.post("/singUpFace")

router.post("/singUpTwitter")


module.exports = router;