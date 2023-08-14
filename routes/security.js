const express = require('express');
const { verifyKey, setNewKey } = require('../apis/apiDynamoDB');
const router = express.Router();

router.post("/verifyRequest", async (req, res) => {
    const id = req.body.id;
    const key = req.body.key;
    verifyKey(id, key).then(newKey => {
        setNewKey(id, newKey).then(data => {
            res.status(200).send(newKey)
        }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
    }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
})




module.exports = router;