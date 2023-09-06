/**
 * @swagger
 * tags:
 *   name: SingUp
 *   description: SingUp operations
 */
const express = require('express');
const { createUser, createID, setNewKey, generateAlphanumericCode, setPat } = require('../apis/apiDynamoDB');
const router = express.Router();
const { SingUpEmail1 } = require('../apis/apiAuth');
const { getRot } = require('../apis/apiSpotify');

/**
 * @swagger
 * /api/singup/test:
 *   get:
 *     summary: Test the SingUp route
 *     tags: [SingUp]
 *     responses:
 *       200:
 *         description: Test successful
 *         content:
 *           application/json:
 *             example:
 *               message: Test successful
 */
router.get("/test", (req,res) => {
    console.log("test")
    res.status(200).send("holaaaa")
})

/**
 * @swagger
 * /api/singup/singUpGoogle:
 *   post:
 *     summary: SingUp using Google
 *     tags: [SingUp]
 *     requestBody:
 *       description: User data for Google SignUp
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               user:
 *                 type: object
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: SignUp successful
 *         content:
 *           application/json:
 *             example:
 *               id: 12345
 *               key: abc123
 *       400:
 *         description: Bad connection with DB
 *         content:
 *           application/json:
 *             example:
 *               error: Bad connection with DB
 */
router.post("/singUpGoogle", async (req, res) => {
    const uid = req.body.uid;
    const User = req.body.user;
    const email = req.body.email;

    createID(uid).then(id => {
        createUser(id, User, email, "").then(async (user) => {
            const key = await generateAlphanumericCode();
            setNewKey(id, key).then( () => {
                getRot(email).then(pat => {
                    setPat(id, pat).then(async () => {
                        const data = await {
                            id: id,
                            key: key,
                        }
                        res.status(200).send(data)
                    }).catch(error => {res.status(400)})
                }).catch(error => {res.status(400)})
            }).catch(error => {res.status(400).send({error : "bad conection with DB"})})
        }).catch(error => {
            console.log(error)
        })
    }).catch(error => {res.status(400).send({error : "bad conection with DB"})})

})

/**
 * @swagger
 * /api/singup/singUpEmail:
 *   post:
 *     summary: SingUp using email and password
 *     tags: [SingUp]
 *     requestBody:
 *       description: User data for Email SingUp
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *     responses:
 *       200:
 *         description: SingUp successful
 *         content:
 *           application/json:
 *             example:
 *               id: 12345
 *               key: abc123
 *       400:
 *         description: Bad connection with DB
 *         content:
 *           application/json:
 *             example:
 *               error: Bad connection with DB
 */
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
                setNewKey(id, key).then(() => {
                    getRot(email).then(pat => {
                        setPat(id, pat).then(async () => {
                            const data = await {
                                id: id,
                                key: key,
                            }
                            res.status(200).send(data)
                        }).catch(error => {res.status(400).send({error})})
                    }).catch(error => {res.status(400).send({error})})
                }).catch(error => {res.status(400).send({error})})
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {res.status(400).send({error})})
    }).catch(error => {res.status(400).send({error})})
})

router.post("/singUpFace")

router.post("/singUpTwitter")


module.exports = router;