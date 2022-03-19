const express = require('express');
const router = express.Router();
const Cont = require('./controller');

router.get('/', Cont.comingHome);
router.post('/', Cont.scoutingHome);
router.get('/:zone', Cont.knowingHome);
router.post('/:zone', Cont.scoutingHome);
    
module.exports = router;