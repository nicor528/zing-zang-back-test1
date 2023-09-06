/**
 * @swagger
 * tags:
 *   name: SingIn
 *   description: SingIn operations
 */

const express = require('express');
const { createUser, createID, getUser, getID, getKey } = require('../apis/apiDynamoDB');
const { SingInPass } = require('../apis/apiAuth');
const router = express.Router();

/**
 * @swagger
 * /api/singin/singInEmail:
 *   post:
 *     summary: Sing In using email and password
 *     tags: [SingIn]
 *     requestBody:
 *       description: User data for Email Sign In
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sign In successful
 *         content:
 *           application/json:
 *             example:
 *               user: { id: "123", name: "John",... }
 *               key: "abc123"
 *       400:
 *         description: Bad connection with DB
 *         content:
 *           application/json:
 *             example:
 *               error: Bad connection with DB
 */
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

/**
 * @swagger
 * /api/singin/singInWithId:
 *   post:
 *     summary: Sing In using user ID
 *     tags: [SingIn]
 *     requestBody:
 *       description: User data for ID Sign In
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sign In successful
 *         content:
 *           application/json:
 *             example:
 *               user: { id: "123", name: "John" }
 *               key: "abc123"
 *       400:
 *         description: Bad connection with DB
 *         content:
 *           application/json:
 *             example:
 *               error: Bad connection with DB
 */
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