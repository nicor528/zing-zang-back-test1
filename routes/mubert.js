/**
 * @swagger
 * tags:
 *   name: Spotify
 *   description: Spotify operations
 */
const express = require('express');
const { getRot, createSong } = require('../apis/apiSpotify');
const { setPat, getPat, getTextSongs, addNewTextSong, getUser } = require('../apis/apiDynamoDB');
const router = express.Router();

/**
 * @swagger
 * /api/Spotify/createPat:
 *   post:
 *     summary: Create PAT (Personal Access Token) for Spotify
 *     tags: [Spotify]
 *     requestBody:
 *       description: User email and ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: PAT created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: PAT created successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: Bad request
 */
router.post("/createPat", async (req, res) => {
    const email = req.body.email;
    const id = req.body.id;
    getRot(email).then(pat => {
        setPat(id, pat).then(() => {
            res.status(200).send("ok")
        }).catch(error => {res.status(400)})
    }).catch(error => {res.status(400)})
})

/**
 * @swagger
* /api/spotify/createTextSong:
*   post:
*     summary: Create a text song and associate it with a user
*     tags: [Spotify]
*     requestBody:
*       description: Song details and user ID
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               mode:
*                 type: string
*               duration:
*                 type: string
*               bitrate:
*                 type: string
*               text:
*                 type: string
*               tittle:
*                 type: string
*               id:
*                 type: string
*     responses:
*       200:
*         description: Text song created and associated successfully
*         content:
*           application/json:
*             example:
*               message: Text song created and associated successfully
*       400:
*         description: Bad request
*         content:
*           application/json:
*             example:
*               error: Bad request
*/
router.post("/createTextSong", async (req, res) => {
    const mode = "track";
    const duration = req.body.duration;
    const bitrate = "128";
    const text = req.body.text;
    const title = req.body.title;
    const id = req.body.id;
    if(mode && duration && bitrate && text && title && id){
        getPat(id).then(pat => {
            getUser(id).then(user => {
                createSong(pat, mode, duration, bitrate, text).then(tasks => {
                    addNewTextSong(id, tasks[0].task_id, tasks[0].download_link, title, user.name, duration).then(data => {
                        res.status(200).send({message: "ok", status: true})
                    }).catch(error => {res.status(400).send({error, status: false})})
                }).catch(error => {res.status(400).send({error, status: false})})
            }).catch(error => {res.status(400).send({error, status: false})})
        }).catch(error => {res.status(400).send({error, status: false})})
    }else{
        res.status(401).send({message: "Missing data in the body", status: false})
    }

})

/**
 * @swagger
* /api/spotify/requestTextSongs:
*   post:
*     summary: Request text songs associated with a user
*     tags: [Spotify]
*     requestBody:
*       description: User ID
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: string
*     responses:
*       200:
*         description: Text songs retrieved successfully
*         content:
*           application/json:
*             example:
*               songs:
*                 - title: Song 1
*                   lyrics: Lyrics for Song 1
*                 - title: Song 2
*                   lyrics: Lyrics for Song 2
*       400:
*         description: Bad request
*         content:
*           application/json:
*             example:
*               error: Bad request
*/
router.post("/requestTextSongs", async (req, res) => {
    const id = req.body.id;
    if(id){
        getTextSongs(id).then(songs => {
            res.status(200).send(songs.songs)
        }).catch(error => {res.status(400).send({error, status: false})})
    }else{
        res.status(401).send({message: "Missing id in the body", status: false})
    }
})







module.exports = router;