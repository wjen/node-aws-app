import DBInterface from '../src/model/DBInterface.js';
import assert from 'assert';

describe(`Database Interface Test`, function () {
    it(`sanity test`, async function () {
        const dbi = new DBInterface();
        await dbi.connect();
        dbi.close();
    });

    it(`create a record`, async function () {
        const dbi = new DBInterface();
        await dbi.connect();
        const id = await dbi.createRecord('apple', 4, 3.5);
        assert.ok(id != null);
        dbi.close();
    });

    it('list records', async function () {
        const dbi = new DBInterface();
        await dbi.connect();
        await dbi.clearTable();
        await dbi.createRecord('apple', 4, 3.5);
        await dbi.createRecord('banana', 7, 1.5);
        const records = await dbi.listRecords();
        assert.strictEqual(2, records.length);
        dbi.close();
    });

    it('retrieve record', async function () {
        const dbi = new DBInterface();
        await dbi.connect();
        await dbi.clearTable();
        const id = await dbi.createRecord('apple', 4, 3.5);
        await dbi.createRecord('banana', 7, 1.5);
        const record = await dbi.retrieveRecord(id);
        assert.strictEqual(record[0].description, 'apple');
        dbi.close();
    });

    it('set description', async function () {
        const dbi = new DBInterface();
        await dbi.connect();
        await dbi.clearTable();
        const id = await dbi.createRecord('apple', 4, 3.5);
        await dbi.setDescription(id, 'pear');
        const record = await dbi.retrieveRecord(id);
        assert.strictEqual(record[0].description, 'pear');
        dbi.close();
    });

    it('set quanitity', async function () {
        const dbi = new DBInterface();
        await dbi.connect();
        await dbi.clearTable();
        const id = await dbi.createRecord('apple', 4, 3.5);
        await dbi.setQuantity(id, 2);
        const record = await dbi.retrieveRecord(id);
        assert.strictEqual(record[0].quantity, 2);
        dbi.close();
    });

    it('set price', async function () {
        const dbi = new DBInterface();
        await dbi.connect();
        await dbi.clearTable();
        const id = await dbi.createRecord('apple', 4, 3.5);
        await dbi.setPrice(id, 1.99);
        const record = await dbi.retrieveRecord(id);
        assert.strictEqual(record[0].price, '1.99');
        dbi.close();
    });

    it('delete record', async function () {
        const dbi = new DBInterface();
        await dbi.connect();
        await dbi.clearTable();
        const id = await dbi.createRecord('apple', 4, 3.5);
        await dbi.deleteRecord(id);
        const records = await dbi.listRecords();
        assert.strictEqual(0, records.length);
        dbi.close();
    });
});
