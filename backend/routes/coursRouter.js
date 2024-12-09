const express = require('express');
const app = express();
const router = express.Router();
const cours = require('../controller/cours');


router.post('/newcours', cours.addCours );

router.get('/cours', cours.getCours );

router.get('/latestcours', cours.getLatestCours );

router.get('/cours/:courId', cours.getOnCour );

router.put('/admin/updateCour/:courId', cours.updateCours);
router.delete('/admin/admincours/:courId', cours.deleteCours);


module.exports = router;