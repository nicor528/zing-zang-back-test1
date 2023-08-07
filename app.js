const express = require('express');
const cors = require('cors');
const singUp = require("./routes/SingUp");

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({limit: '10mb',  extended: false }));
app.use(singUp);


const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log("server up en", PORT));