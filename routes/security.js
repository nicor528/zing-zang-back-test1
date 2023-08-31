const express = require('express');
const { verifyKey, setNewKey } = require('../apis/apiDynamoDB');
const router = express.Router();

router.post("/verifyRequest", async (req, res) => {
    // 401 = bad Api Key
    // 402 = no active subscription
    const id = req.body.id;
    const key = req.body.key;
    verifyKey(id, key).then(newKey => {
        setNewKey(id, key).then(async (data) => {
            res.status(200).send({key: newKey})
        }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
    }).catch(error => {
        if(error == 1){
            res.status(401).send({error : "wrong key"})
        }else{
            res.status(400).send({error : "bad conection with DB"})
        }
    })
})

router.post("/verifyDemo", async (res, rej) => {
    const id = req.body.id;
    const key = req.body.key;
    verifyKey(id, key).then(newKey => {
        res.status(200).send({key: key})
    }).catch(error => {
        if(error == 1){
            res.status(401).send({error : "wrong key"})
        }else{
            res.status(400).send({error : "bad conection with DB"})
        }
    })
})




module.exports = router;