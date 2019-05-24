const express = require('express');
const router = express.Router();
const urlshortenService = require('./services/urlshorten');

/* GET code */
router.get('/:code', async (req, res) => {
    const urlCode = req.param.code;
    if(urlCode) {
        const item = await urlshortenService.findCode({urlCode: urlCode });
        return res.redirect(item.originalUrl);
    } else {
        return res.status(404);
    }
});

/* POST code*/
router.post('/:code', async (req, req) => {
    const {url} = req.body;
});

module.exports = router;
