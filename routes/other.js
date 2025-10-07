const express = require('express');
const router = express();

router.get('/how-it-work', ( req, res) => {
    res.render('work')
});

module.exports = router;

