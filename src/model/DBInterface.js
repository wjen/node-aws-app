import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
class DBInterface {
    static get TABLE_NAME() {
        return 'inventory';
    }

    async connect() {
        this.connection = await mysql.createConnection({
            host: 'localhost',
            database: process.env['SQL_DB'],
            user: process.env['SQL_USER'],
            password: process.env['SQL_PW'],
        });
    }

    async createRecord(description, quantity, price) {
        const q = `INSERT INTO ${DBInterface.TABLE_NAME} (description, quantity, price) VALUES (?, ?, ?)`;
        // using execute prevents injection attacks as opposed to directly putting user input in values
        const [res, fields] = await this.connection.execute(q, [
            description,
            quantity,
            price,
        ]);
        console.log(res);
        return res.insertId;
    }

    async listRecords() {
        const [rows, fields] = await this.connection.execute(
            `SELECT * from ${DBInterface.TABLE_NAME}`
        );
        console.log(rows);
        return rows;
    }

    async clearTable() {
        const q = `DELETE from ${DBInterface.TABLE_NAME}`;
        await this.connection.execute(q);
    }

    async retrieveRecord(id) {
        const q = `SELECT * from ${DBInterface.TABLE_NAME} where id=?`;
        const [res, fields] = await this.connection.execute(q, [id]);
        console.log(res);
        return res;
    }

    async setDescription(id, value) {
        const q = `UPDATE ${DBInterface.TABLE_NAME} SET description=? WHERE id=?`;
        await this.connection.execute(q, [value, id]);
    }

    async setQuantity(id, value) {
        const q = `UPDATE ${DBInterface.TABLE_NAME} SET quantity=? WHERE id=?`;
        await this.connection.execute(q, [value, id]);
    }

    async setPrice(id, value) {
        const q = `UPDATE ${DBInterface.TABLE_NAME} SET price=? WHERE id=?`;
        await this.connection.execute(q, [value, id]);
    }

    async deleteRecord(id) {
        const q = `DELETE from ${DBInterface.TABLE_NAME} WHERE id=?`;
        const [res, fields] = await this.connection.execute(q, [id]);
        return res.affectedRows;
    }

    close() {
        this.connection.close();
    }
}

export default DBInterface;
