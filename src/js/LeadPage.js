
const cardList = document.createElement('div');
cardList.classList.add('card-list')
const main = document.querySelector('main')
 function createTable() {

    // Create a table element
    const table = document.createElement('table');
    table.classList.add('card');
    const tbody = document.createElement('tbody')    
    
  
    //Value get from DB
    const rowData = [
      { attribute: 'Лід№', value: '0001' },
      { attribute: 'Тип', value: 'Фізична особа' },
      { attribute: 'Статус', value: 'Контакт' },
      { attribute: 'Номер', value: '+38 (067) 833-56-76' },
      { attribute: 'Дані', value: 'Петренко Петро Петрович' },
      { attribute: 'Пошта', value: 'пошта_собака_пот.соь' },
      { attribute: 'Коментар', value: 'Тут може бути коментар' }
    ];
  
    // Iterate over the data and create table rows and cells
    rowData.forEach(item => {
      // Create table row
      const row = document.createElement('tr');
  
      // Create table cell for attribute
      const attributeCell = document.createElement('td');
      attributeCell.classList.add('card-attribute');
      attributeCell.textContent = item.attribute;
  
      // Create table cell for value
      const valueCell = document.createElement('td');
      const valueSpan = document.createElement('span');
      valueSpan.classList.add('card-value');
      valueSpan.textContent = item.value;
      valueCell.appendChild(valueSpan);
  
      // Append cells to the row
      row.appendChild(attributeCell);
      row.appendChild(valueCell);
  
      // Append row to the table
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    cardList.appendChild(table)
    main.appendChild(cardList)
  }