const { Router } = require('express');
const router = Router();

router.get('/hello', async (req, res) => {
    return res.json("Hello World");
});

module.exports = router;