import InventoryAPI from '../../model/InventoryAPI.js';
import loadSelect from './load_select.mjs';

function formAddRecords() {
    document
        .querySelector('#hiddenFrame')
        .addEventListener('load', async (event) => {
            const records = await InventoryAPI.listRecords();
            loadSelect(records, 'description');
        });
}

export default formAddRecords;
