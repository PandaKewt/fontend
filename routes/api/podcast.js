const { body, validationResult } = require('express-validator');
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const Podcast = require('./schema/podcast');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
});

const upload = multer({ storage: storage });

router.post('/upload',
    upload.single('audio'),
    body('fileName').not().isEmpty().isAscii(),
    async (req, res) => {
        if(req.isAuthenticated()){
            const file = req.file;
            const mimetype = req.file?.mimetype;
            const fileName = req.body.fileName;
            const user = req.user._id;
            const errors = validationResult(req);
            console.log(mimetype)
            if (errors.isEmpty() && mimetype?.includes("audio")) {
                const audio = fs.readFileSync(file.path);
                const encode = Buffer.from(audio);
                try {
                    await Podcast.create({
                        fileName: fileName,
                        audio: encode,
                        mimetype: mimetype,
                        ownerId: user,
                    });
                    res.status(201).send({ status: 'Successful' });
                } catch(err){
                    res.status(500).send({ status: 'Error', errors: err });
                }
            } else {
                res.status(405).send({ status: 'Error', errors: 'Missing filename or audio' });
            }
            if(file) fs.unlinkSync(req.file.path);
        } else {
            res.status(401).send({status: "Unauthorized"})
        }
})

router.post('/search', body("search").trim().escape(), async (req, res) => {
    const search = req.body.search;
    res.status(201).send(await Podcast.findByFileName(search));
})

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Podcast.findById(id);
    res.contentType(data.get("mimetype"));
    res.status(201).send(data.get("audio"));
})

module.exports = router;