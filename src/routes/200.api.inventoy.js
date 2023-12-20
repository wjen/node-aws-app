import Express from 'express';
import DBInterface from '../model/DBInterface.js';

const router = Express.Router();
const dbi = new DBInterface();
await dbi.connect();

// /api/inventory is where api resides,
// Express.urlencoded is middleware that pull info out of form and puts in req.body field
router.post(
    '/api/inventory',
    Express.urlencoded({ extended: false }),
    async (req, res, next) => {
        console.log('-------------');
        console.log(req.body);
        const id = await dbi.createRecord(
            req.body.description,
            req.body.quantity,
            req.body.price
        );
        res.write(JSON.stringify({ id: id }));
        res.end();
    }
);

/* Retrieve a single record */
router.get('/api/inventory/:id', async (req, res, next) => {
    const records = await dbi.retrieveRecord(req.params.id);
    res.write(JSON.stringify(records));
    res.end();
});

/* Get all records */
router.get('/api/inventory', async (req, res, next) => {
    const records = await dbi.listRecords();
    res.write(JSON.stringify(records));
    res.end();
});

/* Delete record */
router.delete('/api/inventory/:id', async (req, res, next) => {
    const record = await dbi.deleteRecord(req.params.id);
    res.write(JSON.stringify({ affectedRows: record }));
    res.end();
});

/* Update record */
router.put('/api/inventory/:id', Express.json({}), async (req, res, next) => {
    switch (req.body.field) {
        case 'description':
            await dbi.setDescription(req.params.id, req.body.value);
            break;
        case 'price':
            await dbi.setPrice(req.params.id, req.body.value);
            break;
        case 'quanitity':
            await dbi.setQuantity(req.params.id, req.body.value);
            break;
    }
    const record = await dbi.retrieveRecord(req.params.id);
    res.write(JSON.stringify(record));
    res.end();
});
export default router;
