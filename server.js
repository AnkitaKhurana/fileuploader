require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');
const app = express();
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const calculate = require('./CalculateLetters');
// // enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//start app 
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
        res.send(text);
    });
})

app.post('/upload', async (req, res) => {
    try {

        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let avatar = req.files.avatar;

            let BUCKET_CONFIG = {
                Bucket: process.env.BUCKET_NAME || 'ankita-nagp-bucket', 
                Key: 'files/' + Date.now() + '-' + avatar.name, 
                Body: avatar.data
            }
            s3.upload(BUCKET_CONFIG, function(err, data) {//Do nothing
            });
            calculate(avatar.data.toString()).then((letters) => {
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: avatar.name,
                        mimetype: avatar.mimetype,
                        LETTERS: letters
                    }
                });
            }).catch(err => {
                res.status(500).send(err);
            });

        }
    } catch (err) {
        res.status(500).send(err);
    }
});



app.listen(port, () =>
    console.log(`App is listening on port ${port}.`)
);