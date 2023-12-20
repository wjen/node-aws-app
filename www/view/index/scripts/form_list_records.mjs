import InventoryAPI from '../../model/InventoryAPI.js';
import loadSelect from './load_select.mjs';

function formListRecords() {
    window.addEventListener('load', async () => {
        const records = await InventoryAPI.listRecords();
        console.log(
            '🚀 ~ file: form_list_records.mjs:7 ~ window.addEventListener ~ records:',
            records
        );

        loadSelect(records);

        const buttSelect = document.querySelector('#list_records #select');
        console.log(
            '🚀 ~ file: form_list_records.mjs:15 ~ window.addEventListener ~ buttSelect:',
            buttSelect
        );
        buttSelect.addEventListener('click', clickSelect);

        const buttDelete = document.querySelector('#list_records #delete');
        buttDelete.addEventListener('click', clickDelete);

        document
            .querySelectorAll('#list_records [data-field]')
            .forEach((element) => {
                element.addEventListener('click', clickUpdate);
            });
    });
}
function getID() {
    const selectElement = document.querySelector('#record-list');
    console.log(
        '🚀 ~ file: form_list_records.mjs:33 ~ getID ~ selectElement:',
        selectElement
    );
    const index = selectElement.selectedIndex;
    console.log('🚀 ~ file: form_list_records.mjs:38 ~ getID ~ index:', index);
    const optionElement = selectElement.childNodes[index];
    console.log(
        '🚀 ~ file: form_list_records.mjs:40 ~ getID ~ optionElement:',
        optionElement
    );
    console.log(optionElement.getAttribute('data-id'));
    return optionElement.getAttribute('data-id');
}
async function clickSelect(event) {
    const records = await InventoryAPI.retrieveRecord(getID());
    console.log(
        '🚀 ~ file: form_list_records.mjs:49 ~ clickSelect ~ getID():',
        getID()
    );
    console.log(
        '🚀 ~ file: form_list_records.mjs:43 ~ clickSelect ~ records:',
        records
    );
    if (records.length < 1) return;
    console.log(records);
    document.querySelector('#info #id').innerHTML = records[0].id;
    document.querySelector('#info #description').innerHTML =
        records[0].description;
    document.querySelector('#info #quantity').innerHTML = records[0].quantity;
    document.querySelector('#info #price').innerHTML = records[0].price;
}

async function clickDelete(event) {
    await InventoryAPI.deleteRecord(getID());
    const records = await InventoryAPI.listRecords();
    loadSelect(records, 'description');
}

async function clickUpdate(event) {
    const field = event.target.getAttribute('data-field');
    const value = document.querySelector(`#${field}`).innerHTML;
    await InventoryAPI.updateRecord(getID(), field, value);
    console.log(
        '🚀 ~ file: form_list_records.mjs:76 ~ clickUpdate ~ value:',
        value
    );
    console.log(
        '🚀 ~ file: form_list_records.mjs:77 ~ clickUpdate ~ value:',
        value
    );
    const records = await InventoryAPI.listRecords();
    console.log(records);
    loadSelect(records, 'description');
}
export default formListRecords;
