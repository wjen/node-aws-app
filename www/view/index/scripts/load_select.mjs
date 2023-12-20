function loadSelect(data, field = 'description') {
    const selectElement = document.querySelector('#record-list');
    selectElement.replaceChildren();

    for (const record of data) {
        const element = document.createElement('option');
        element.setAttribute('data-id', record.id);
        element.innerHTML = record[field];
        selectElement.append(element);
    }
}

export default loadSelect;
