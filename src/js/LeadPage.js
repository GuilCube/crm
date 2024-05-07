// Create a header element with class "navbar"
const main = document.querySelector('main')

function LeadPage()
{
  headerLead();
  // <!--Кнопи фунцкіоналу-->
  // <div class="button-row">
  //   <a id="showNewLeadForm" class="button-item" href="#">
  //     <span>Новий лід
  //       <img class="button-ico" src="/src/img/plusIco.png">
  //     </span></a>
  //   <a class="button-item" href="#">
  //     <span>Пошук
  //       <img class="button-ico" src="/src/img/searchIco.png">
  //   </a>
  //   </span>
  // </div>

  buttonsLead();

  // <div class="button-row">
  //     <a id="showNewLeadForm" class="button-item" href="#">
  //       <span>Новий лід
  //         <img class="button-ico" src="/src/img/plusIco.png">
  //       </span></a>
  //     <a class="button-item" href="#">
  //       <span>Пошук
  //         <img class="button-ico" src="/src/img/searchIco.png">
  //     </a>
  //     </span>
  //   </div>

  createTable();
    // <div class="card-list">    
    //     <table class="card">
    //     <tr>
    //       <td class="card-attribute">Лід№</td>
    //       <td>
    //         <span class="card-value">0001</span>
    //       </td>
    //     </tr>
    //     <tr>
    //       <td class="card-attribute">Тип</td>
    //       <td>
    //         <span class="card-value">Фізична особа</span>
    //       </td>
    //     </tr>
    //     <tr>
    //       <td class="card-attribute">Статус</td>
    //       <td>
    //         <span class="card-value">Контакт</span>
    //       </td>
    //     </tr>
    //     <tr>
    //       <td class="card-attribute">Номер</td>
    //       <td>
    //         <span class="card-value">+38 (067) 833-56-76</span>
    //       </td>
    //     </tr>
    //     <tr>
    //       <td class="card-attribute">Дані</td>
    //       <td>
    //         <span class="card-value">Петренко Петро Петрович</span>
    //       </td>
    //     </tr>
    //     <tr>
    //       <td class="card-attribute">Пошта</td>
    //       <td>
    //         <span class="card-value">пошта_собака_пот.соь</span>
    //       </td>
    //     </tr>
    //     <tr>
    //       <td class="card-attribute">Коментар</td>
    //       <td>
    //         <span class="card-value">Тут моде бути комента></span>
    //       </td>
    //     </tr>
    //   </table>
    //   </div>
}


function headerLead(){
const header = document.createElement('header');
header.classList.add('navbar');

// Create the first navbar container for navigation buttons
const navContainer1 = document.createElement('div');
navContainer1.classList.add('navbar-container', 'nav-buttons');

// Create and append "Ліди" link
const leadsLink = document.createElement('a');
leadsLink.classList.add('nav-item', 'active');
leadsLink.href = '#';
leadsLink.textContent = 'Ліди';
navContainer1.appendChild(leadsLink);

// Create and append "Замовлення" link
const ordersLink = document.createElement('a');
ordersLink.classList.add('nav-item');
ordersLink.href = '#';
ordersLink.textContent = 'Замовлення';
navContainer1.appendChild(ordersLink);

// Create and append "Аналітика" link
const analyticsLink = document.createElement('a');
analyticsLink.classList.add('nav-item');
analyticsLink.href = '#';
analyticsLink.textContent = 'Аналітика';
navContainer1.appendChild(analyticsLink);

// Append the first navbar container to the header
header.appendChild(navContainer1);

// Create the second navbar container for user greeting and icon
const navContainer2 = document.createElement('div');
navContainer2.classList.add('navbar-container');

// Create and append user greeting paragraph
const greetingParagraph = document.createElement('p');
greetingParagraph.classList.add('nav-greet');
greetingParagraph.textContent = 'Доброго дня, Менеджер';
navContainer2.appendChild(greetingParagraph);

// Create and append exit icon link
const exitIconLink = document.createElement('a');
exitIconLink.classList.add('nav-icon');
exitIconLink.href = '#';

const exitIconImg = document.createElement('img');
exitIconImg.classList.add('exit-ico');
exitIconImg.src = '/src/img/exitIco.png';
exitIconLink.appendChild(exitIconImg);

// Append the second navbar container to the header
header.appendChild(navContainer2);
navContainer2.appendChild(exitIconLink);

// Append the header to the document body or another container in the DOM
document.body.prepend(header);
}

function buttonsLead(){


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

}

//Create Lead CardList


 function createTable() {
const cardList = document.createElement('div');
cardList.classList.add('card-list')
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