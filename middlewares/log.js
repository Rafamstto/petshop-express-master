const fs = require('fs');
const express = require('express');
const router = express.Router();
const passport = require('passport');

const log = (request, response, next) => {
    /** criar o arquivo log.text se não existir e adicionar mensagem no arquivo  */
    fs.appendFileSync('log.txt', `O usuario acessou a url: ${request.url} \n`);
    /** executa a proxima função (controller) */
    next();
}

/** exporta o middleware */
module.exports = log;

/* GET login page. */
router.get('/', (req, res, next) => {
    if (req.query.fail)
        res.render('login', { message: 'Usuário e/ou senha incorretos!' });
    else
        res.render('login', { message: null });
});

/* POST login page */
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?fail=true'
    })
);

module.exports = router;