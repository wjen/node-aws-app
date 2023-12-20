class InventoryAPI {
    static async listRecords() {
        const response = await fetch('/api/inventory', {
            method: 'GET',
        });

        return await response.json();
    }

    static async retrieveRecord(id) {
        const response = await fetch(`/api/inventory/${id}`);

        return await response.json();
    }

    static async deleteRecord(id) {
        const response = await fetch(`/api/inventory/${id}`, {
            method: 'DELETE',
        });

        return await response.json();
    }

    static async updateRecord(id, field, value) {
        console.log(id, field, value);
        const data = {
            field,
            value,
        };
        console.log(data);
        const response = await fetch(`/api/inventory/${id}`, {
            headers: new Headers({ 'content-type': 'application/json' }),
            method: 'PUT',
            body: JSON.stringify(data),
        });

        // return await response.json();
    }
}

export default InventoryAPI;
