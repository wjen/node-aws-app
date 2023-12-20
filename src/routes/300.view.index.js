import Express from 'express';
const router = Express.Router();

router.use('/index', (req, res, next) => {
    res.render('index/index.ejs', {}, (err, html) => {
        if (err) throw new Error(err);
        else res.send(html);
    });
});

export default router;
