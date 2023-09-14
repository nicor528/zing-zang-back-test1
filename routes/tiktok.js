/**
 * @swagger
 * tags:
 *   name: tiktok
 *   description: tiktok operations
 */
const express = require('express');
const { getAllVideos, addVideo, getUserVideos, saveVideo, generateAlphanumericCode, likeVideo, getSavedVideos } = require('../apis/apiDynamoDB');
const router = express.Router();

/**
 * @swagger
 * /addVideo:
 *   post:
 *     summary: Add a new video.
 *     tags: [tiktok]
 *     requestBody:
 *       description: Video data to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Video added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       '400':
 *         description: Failed to add video.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       '401':
 *         description: Missing data in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 */
router.post("/addVideo", async (req, res) => {
    const id = req.body.id;
    const videoID = await generateAlphanumericCode();
    const link = req.body.link;
    if(id && link){
        addVideo(id, videoID, link).then(result => {
            res.status(200).send({message: "ok", status: true})
        }).catch(error => {res.status(400).send({error, status: false})})
    }else{
        res.status(401).send({message: "Missing data in the body", status: false})
    }
})

/**
 * @swagger
 * /requestAllVideos:
 *   get:
 *     summary: Get all videos.
 *     tags: [tiktok]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all videos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 status:
 *                   type: boolean
 *       '400':
 *         description: Failed to connect with the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get("/requestAllVideos", async (req, res) => {
    getAllVideos().then(result => {
        res.status(200).send({data: result, status: true})
    }).catch(error => {
        res.status(400).send({status: false, message: "fail to conect with DB"})
    })
})

/**
 * @swagger
 * /likeVideo:
 *   post:
 *     summary: Like a video.
 *     tags: [tiktok]
 *     requestBody:
 *       description: Like video data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               ownerID:
 *                 type: string
 *               videoID:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Video liked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       '400':
 *         description: Failed to like video.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       '401':
 *         description: Missing data in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 */
router.post("/likeVideo", async (req, res) => {
    const id = req.body.id;
    const ownerID = req.body.ownerID;
    const videoID = req.body.videoID;
    if(id && ownerID && videoID){
        likeVideo(ownerID, videoID, id).then(result => {
            res.status(200).send({message: "ok", status: true})
        }).catch(error => {res.status(400).send({error, status: false})})
    }else{
        res.status(401).send({message: "Missing data in the body", status: false})
    }
})

/**
 * @swagger
 * /requestUserVideos:
 *   post:
 *     summary: Get videos of a user.
 *     tags: [tiktok]
 *     requestBody:
 *       description: User ID.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved user's videos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 status:
 *                   type: boolean
 *       '400':
 *         description: Failed to get user's videos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       '401':
 *         description: Missing data in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 */
router.post("/requestUserVideos", async (req, res) => {
    const id = req.body.id;
    getUserVideos(id).then(result => {
        res.status(200).send({data: result.videos, status: true})
    }).catch(error => {res.status(400).send({error, status: false})})
})

/**
 * @swagger
 * /saveVideo:
 *   post:
 *     summary: Save a video.
 *     tags: [tiktok]
 *     requestBody:
 *       description: Video data to be saved.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               videoID:
 *                 type: string
 *               ownerID:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Video saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       '400':
 *         description: Failed to save video.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       '401':
 *         description: Missing data in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 */
router.post("/saveVideo", async (req, res) => {
    const id = req.body.id;
    const videoID = req.body.videoID;
    const ownerID = req.body.ownerID;
    const link = req.body.link;
    if(id && videoID && link && ownerID){
        saveVideo(id, videoID, link, ownerID).then(result => {
            res.status(200).send({message: "ok", status: true})
        }).catch(error => {res.status(400).send({error, status: false})})
    }else{
        res.status(401).send({message: "Missing data in the body", status: false})
    }
})

/**
 * @swagger
 * /requestSavedVideos:
 *   post:
 *     summary: Get saved videos of a user.
 *     tags: [tiktok]
 *     requestBody:
 *       description: User ID.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved saved videos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 status:
 *                   type: boolean
 *       '400':
 *         description: Failed to get saved videos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       '401':
 *         description: Missing user ID in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 */
router.post("/requestSavedVideos", async (req, res) => {
    const id = req.body.id;
    if(id){
        getSavedVideos(id).then(videos => {
            res.status(200).send({data: videos.videos, status: true})
        }).catch(error => {res.status(400).send({error, status: false})})
    }else{
        res.status(401).send({message: "Missing id in the body", status: false})
    }
})

router.post("/getOneVideoData", async (req, res) => {

})




module.exports = router;