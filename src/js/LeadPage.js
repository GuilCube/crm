const main = document.querySelector('main')

const buttonRow = document.createElement('div');
buttonRow.classList.add('button-row');

// Create the "Новий лід" button
const newLeadButton = document.createElement('a');
newLeadButton.id = 'showNewLeadForm';
newLeadButton.classList.add('button-item');
newLeadButton.href = '#';

const newLeadSpan = document.createElement('span');
newLeadSpan.textContent = 'Новий лід';

const newLeadImg = document.createElement('img');
newLeadImg.classList.add('button-ico');
newLeadImg.src = '/src/img/plusIco.png';

// Append the image to the "Новий лід" span
newLeadSpan.appendChild(newLeadImg);

// Append the span to the "Новий лід" button
newLeadButton.appendChild(newLeadSpan);

// Create the "Пошук" button
const searchButton = document.createElement('a');
searchButton.classList.add('button-item');
searchButton.href = '#';

const searchSpan = document.createElement('span');
searchSpan.textContent = 'Пошук';

const searchImg = document.createElement('img');
searchImg.classList.add('button-ico');
searchImg.src = '/src/img/searchIco.png';

// Append the image to the "Пошук" span
searchSpan.appendChild(searchImg);

// Append the span to the "Пошук" button
searchButton.appendChild(searchSpan);

// Append both buttons to the button row
buttonRow.appendChild(newLeadButton);
buttonRow.appendChild(searchButton);

// Append the button row to an existing container in the DOM (e.g., body)
main.appendChild(buttonRow);

newLeadButton.addEventListener('click', () => {
  modal.style.display = 'block'; // Show the modal
});  //NewLead modal itself



//Create Lead CardList
const cardList = document.createElement('div');
cardList.classList.add('card-list')

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