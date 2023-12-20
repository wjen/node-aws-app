import Express from 'express';
const router = Express.Router();

router.use('*', (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

export default router;
