/*Оpen and close form buttons */

const modal = document.getElementById('newLead'); //NewLead button
const openModalButton = document.getElementById('showNewLeadForm');  //NewLead modal itself
const closeModalButton = document.getElementById('closeModal'); //Close form button

 
// Function to open the modal
openModalButton.addEventListener('click', () => {
    modal.style.display = 'block'; // Show the modal
});

// Function to close the modal
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide the modal
});

// Close the modal if user clicks outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide the modal
    }
});

// Prevent form submission (for demo purposes)
const leadForm = document.getElementById('leadForm');
leadForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    // You can handle form submission logic here (e.g., send data to server)
    console.log('Form submitted!');
});



//Create card FRONT-END ONLY!!!!
// Function to create and populate the table
function createTable() {
    // Create a table element
    const table = document.createElement('table');
    table.classList.add('card');
    const tbody = document.createElement('tbody')    
    
  
    // Data to populate the table
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
  
    const container = document.querySelector('.card-list'); 
    //console.log(document.querySelector('main'))
    
    container.appendChild(table)
  }
  
  