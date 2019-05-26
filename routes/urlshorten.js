const express = require('express');
const logger = require('morgan');
const log = require('log4js').getLogger();
const createError = require('http-errors');
const urlshortenService = require('./services/urlshortenService');

log.level = 'debug';

const router = express.Router();

router.use(logger('dev'));
router.use(express.json());

/* GET code */
router.get('/:hash', async (req, res, next) => {
  const { hash } = req.params;
  if (hash) {
    const item = await urlshortenService.read({ hash });
    return res.redirect(item.url);
  }
  return next(createError(404, 'This url code does not exist'));
});

/* POST code */
router.post('/', async (req, res, next) => {
  const { url } = req.body;
  if (url) {
    // Teste tout d'abord si l'url n'a pas déja été hashée
    let urlDoc = await urlshortenService.read({ url }).catch((err) => {
      log.error(err.stack);
      next(createError(500, 'Une erreur interne est survenue'));
    });
    if (urlDoc) {
      // Si l'url est déja trouvée
      return res.json(urlDoc.hash).send();
    }
    urlDoc = await urlshortenService.write({ url }).catch((err) => {
      log.error(err.stack);
      next(createError(500, 'Une erreur interne est survenue'));
    });
    return res.json(urlDoc.hash).send();
  }
  return next(createError(400, 'La requête est mal formatée'));
});

module.exports = router;
