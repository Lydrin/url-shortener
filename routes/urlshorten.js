const express = require('express');
const logger = require('morgan');
const log = require('log4js').getLogger();
const urlshortenService = require('./services/urlshortenService');

log.level = 'debug';

const router = express.Router();

router.use(logger('dev'));
router.use(express.json());

/* GET code */
router.get('/:hash', async (req, res) => {
  const { hash } = req.params;
  if (hash) {
    const item = await urlshortenService.read({ hash });
    return res.redirect(item.url);
  }
  return res.status(404).send();
});

/* POST code */
router.post('/', async (req, res) => {
  const { url } = req.body;
  if (url) {
    const item = await urlshortenService.write({ url });
    return res.json(item).send();
  }
  return res.status(404).send();
});

module.exports = router;
