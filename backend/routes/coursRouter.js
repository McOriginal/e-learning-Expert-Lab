const express = require('express');
const app = express();
const router = express.Router();
const cours = require('../controller/cours');


router.post('/newcours', cours.addCours );

router.get('/cours', cours.getCours );

router.get('/latestcours', cours.getLatestCours );

router.get('/cours/:courId', cours.getOnCour );


module.exports = router;