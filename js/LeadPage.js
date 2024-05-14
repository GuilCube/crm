
// Create a header element with class "navbar"
const main = document.querySelector('main');
export function LeadPage()
{
  headerLead(0);
  // <!--Кнопи фунцкіоналу-->
  // <div class="button-row">
  //   <a id="showNewLeadForm" class="button-item" href="#">
  //     <span>Новий лід
  //       <img class="button-ico" src="/img/plusIco.png">
  //     </span></a>
  //   <a class="button-item" href="#">
  //     <span>Пошук
  //       <img class="button-ico" src="/img/searchIco.png">
  //   </a>
  //   </span>
  // </div>

  buttonsLead();

  // <div class="button-row">
  //     <a id="showNewLeadForm" class="button-item" href="#">
  //       <span>Новий лід
  //         <img class="button-ico" src="/img/plusIco.png">
  //       </span></a>
  //     <a class="button-item" href="#">
  //       <span>Пошук
  //         <img class="button-ico" src="/img/searchIco.png">
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


export function headerLead(activeTab){
const header = document.createElement('header');
header.classList.add('navbar');

// Create the first navbar container for navigation buttons
const navContainer1 = document.createElement('div');
navContainer1.classList.add('navbar-container', 'nav-buttons');

// Create and append "Ліди" link
const leadsLink = document.createElement('a');
leadsLink.classList.add('nav-item');
leadsLink.href = '/lead';
leadsLink.textContent = 'Ліди';
navContainer1.appendChild(leadsLink);

// Create and append "Замовлення" link
const ordersLink = document.createElement('a');
ordersLink.classList.add('nav-item');
ordersLink.href = '/order';
ordersLink.textContent = 'Замовлення';
navContainer1.appendChild(ordersLink);

// Create and append "Аналітика" link
const analyticsLink = document.createElement('a');
analyticsLink.classList.add('nav-item');
analyticsLink.href = '/analytics';
analyticsLink.textContent = 'Аналітика';
navContainer1.appendChild(analyticsLink);

navContainer1.childNodes[activeTab].classList.add('active')
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
exitIconLink.classList.add('nav-icon', 'rt');
exitIconLink.href = '/';

const exitIconImg = document.createElement('img');
exitIconImg.classList.add('exit-ico');
exitIconImg.src = '/img/exitIco.png';
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
//newLeadButton.href = '#';

const newLeadSpan = document.createElement('span');
newLeadSpan.textContent = 'Новий лід';

const newLeadImg = document.createElement('img');
newLeadImg.classList.add('button-ico');
newLeadImg.src = '/img/plusIco.png';

// Append the image to the "Новий лід" span
newLeadSpan.appendChild(newLeadImg);

// Append the span to the "Новий лід" button
newLeadButton.appendChild(newLeadSpan);

// Create the "Пошук" button
const searchButton = document.createElement('a');
searchButton.classList.add('button-item');
//searchButton.href = '#';

const searchSpan = document.createElement('span');
searchSpan.textContent = 'Пошук';

const searchImg = document.createElement('img');
searchImg.classList.add('button-ico');
searchImg.src = '/img/searchIco.png';

// Append the image to the "Пошук" span
searchSpan.appendChild(searchImg);

// Append the span to the "Пошук" button
searchButton.appendChild(searchSpan);

// Append both buttons to the button row
buttonRow.appendChild(newLeadButton);
buttonRow.appendChild(searchButton);

// Append the button row to an existing container in the DOM (e.g., body)
main.appendChild(buttonRow);

// Create modal container

const modalContainer = document.createElement('div');
modalContainer.id = 'newLead';
modalContainer.classList.add('modal-container');

// Create modal content card
const modalContent = document.createElement('div');
modalContent.classList.add('modal-content', 'card');

// Create modal title
const modalTitle = document.createElement('h3');
modalTitle.style.textAlign = 'center';
modalTitle.textContent = 'Створити лід...';

// Create lead form
const leadForm = document.createElement('form');
leadForm.id = 'leadForm';
leadForm.classList.add('leadForm');

// Helper function to create modal line with label and input
function createModalLine(labelText, inputType, inputName, placeholderText) {
  const modalLine = document.createElement('div');
  modalLine.classList.add('modal-line');

  const label = document.createElement('label');
  label.setAttribute('for', inputName);
  label.textContent = labelText;

  const input = document.createElement('input');
  input.type = inputType;
  input.id = inputName;
  input.name = inputName;
  input.placeholder = placeholderText;

  modalLine.appendChild(label);
  modalLine.appendChild(input);

  return modalLine;
}

// Create modal lines for form inputs
const idLeadLine = createModalLine('Лід №', 'text', 'idLead', 'Імпорт з БД');
const leadTypeLine = createModalLine('Тип', 'text', 'leadType', '');
const leadStatusLine = createModalLine('Статус', 'text', 'leadStatus', 'Вкажіть статус...');
const leadPhoneLine = createModalLine('Номер', 'text', 'leadPhone', 'Введіть номер телефону...');
const leadNameLine = createModalLine('Дані', 'text', 'leadName', 'ПІБ ліда...');
const leadEmailLine = createModalLine('Пошта', 'text', 'leadEmail', 'Введіть пошту...');

// Create modal line for comment textarea
const leadCommentLine = document.createElement('div');
leadCommentLine.classList.add('modal-line');

const commentLabel = document.createElement('label');
commentLabel.setAttribute('for', 'leadComment');
commentLabel.textContent = 'Коментар';

const commentTextarea = document.createElement('textarea');
commentTextarea.id = 'leadComment';
commentTextarea.name = 'leadComment';
commentTextarea.classList.add('comment');
commentTextarea.placeholder = 'Тут може бути коментар до ліда...';

leadCommentLine.appendChild(commentLabel);
leadCommentLine.appendChild(commentTextarea);

// Create modal line for buttons
const buttonLine = document.createElement('div');
buttonLine.classList.add('modal-line-buttons');

const backButton = document.createElement('button');
backButton.id = 'closeModal';
backButton.classList.add('close', 'btn', 'back');
backButton.textContent = 'Назад';

const createButton = document.createElement('button');
createButton.type = 'submit';
createButton.classList.add('btn', 'action');
createButton.textContent = 'Створити';

buttonLine.appendChild(backButton);
buttonLine.appendChild(createButton);

// Append all elements to build the modal structure
leadForm.appendChild(idLeadLine);
leadForm.appendChild(leadTypeLine);
leadForm.appendChild(leadStatusLine);
leadForm.appendChild(leadPhoneLine);
leadForm.appendChild(leadNameLine);
leadForm.appendChild(leadEmailLine);
leadForm.appendChild(leadCommentLine);

modalContent.appendChild(modalTitle);
modalContent.appendChild(leadForm);
modalContent.appendChild(buttonLine);

modalContainer.appendChild(modalContent);
main.appendChild(modalContainer);

newLeadButton.addEventListener('click', () => {
    modalContainer.style.display = 'block'; // Show the modal
  });
  backButton.addEventListener('click', () => {
    modalContainer.style.display = 'none'; // Hide the modal
  });

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
    cardList.appendChild(table);
    
    // Append the modal container to the document body
    main.appendChild(cardList)
    
    
}