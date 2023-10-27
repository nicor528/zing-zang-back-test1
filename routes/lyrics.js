const express = require('express');
const { generateAlphanumericCode, addLyrics, getUserLyrics, getLyrics } = require('../apis/apiDynamoDB');
const router = express.Router();

router.post("/addLyrics", async (req, res) => {
    const id = req.body.id;
    const lyricsID = await generateAlphanumericCode();
    const lyrics = req.body.lyrics;
    const title = req.body.title;
    if(id && lyrics && title){
        addLyrics(id, lyricsID, lyrics, title).then(result => {
            res.status(200).send({message: "ok", status: true})
        }).catch(error => {res.status(400).send({error, status: false})})
    }else{
        res.status(401).send({message: "Missing data in the body", status: false})
    }
})

router.get("/getAllyrics", async (req, res) => {
    console.log("sadeas")
    getLyrics(async (result) => {
        const lyrics = result.flatMap(item => item.lyrics.L);
        console.log("test")
        res.status(200).send({data: lyrics, status: true})
    }).catch(error => {res.status(400).send({error, status: false})})
})

router.post("/getUserLyrics", async (req, res) => {
    const id = req.body.id;
    if(id){
        getUserLyrics(id).then(data => {
            res.status(200).send({data: data, status: true})
        }).catch(error => {res.status(400).send({error, status: false})})
    }else{
        res.status(401).send({message: "Missing data in the body", status: false})
    }
})



module.exports = router;