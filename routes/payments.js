const express = require('express');
const { createCharge } = require('../apis/apiStripe');
const router = express.Router();

router.post("/subscription", async (req, res) => {
    createCharge().then(charge => {
        
    })
})








module.exports = router;