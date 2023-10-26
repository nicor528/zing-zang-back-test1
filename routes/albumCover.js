const express = require('express');
const { generateAlphanumericCode, addAlbumCover, getAllAlbumCovers, getUserAlbumCovers } = require('../apis/apiDynamoDB');
const { actualizarEnlaces2, actualizarEnlacesVideos2, actualizarEnlacesVideos } = require('../apis/apiS3');
const router = express.Router();

router.post("/addAlbumCover", async (req, res) => {
    const id = req.body.id;
    const albumCoverID = await generateAlphanumericCode();
    const link = req.body.link;
    const title = req.body.title;
    if(id && link && title){
        addAlbumCover(id, albumCoverID, link, title).then(result => {
            res.status(200).send({message: "ok", status: true})
        }).catch(error => {res.status(400).send({error, status: false})})
    }else{
        res.status(401).send({message: "Missing data in the body", status: false})
    }
})

router.get("/getAllAlbumCovers", async (req, res) => {
    getAllAlbumCovers().then(async (result) => {
        const albumCovers = await result.flatMap(item => item.albumCovers.L);
        actualizarEnlacesVideos(albumCovers).then(albumCovers => {
            res.status(200).send({data: albumCovers, status: true})
        }).catch(error => {res.status(400).send({error, status: false})})
    }).catch(error => {res.status(400).send({error, status: false})})
})

router.post("/getUserAlbumCovers", async (req, res) => {
    const id = req.body.id;
    if(id){
        getUserAlbumCovers(id).then(data => {
            actualizarEnlacesVideos2(data.albumCovers).then(data => {
                res.status(200).send({data: data, status: true})
            }).catch(error => {res.status(400).send({error, status: false})})
        }).catch(error => {res.status(400).send({error, status: false})})
    }else{
        res.status(401).send({message: "Missing data in the body", status: false})
    }
})


module.exports = router;