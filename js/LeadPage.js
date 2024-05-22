
// Create a header element with class "navbar"
const main = document.querySelector('main');
export function LeadPage() {
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

  
  const $cardList= $("<div>").addClass("card-list");
  $(main).append($cardList)
  $.ajax({
    type: "GET",
    url: "getLeads.php",
    data: "data",
    dataType: "json",
    success: function (data) {
      console.log(data.length);
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        createTable(index,data[index]);
      }      
},
error: function (xhr, status, error) {
      console.error('Error fetching data:', error);
      console.error('Response:', xhr.responseText);
    }   
  });


  //
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


  $(document).ready(function () {
    // Add keydown event listener to the document body
    $(document).on('keydown', function (event) {
      // Check if the pressed key is the "Escape" key (key code 27)
      if (event.which === 27) {
        
        $('textarea.editable').css('background-color', 'inherit');
        $('textarea.editable').prop('readonly', true);
        $('button#modifyData').hide();
        //Removing compensation of hiding component
        $('div.card-container').css('margin-top', '0');
        $('div.edit-container').show();
      }
    });
  });

}


export function headerLead(activeTab) {
  // Create header element with class "navbar"
  const header = $("<header>").addClass("navbar");

  // Create the first navbar container for navigation buttons
  const navContainer1 = $("<div>").addClass("navbar-container nav-buttons");

  // Create and append "Ліди" link
  const leadsLink = $("<a>").addClass("nav-item").attr("href", "/lead").text("Ліди");
  navContainer1.append(leadsLink);

  // Create and append "Замовлення" link
  const ordersLink = $("<a>").addClass("nav-item").attr("href", "/order").text("Замовлення");
  navContainer1.append(ordersLink);

  // Create and append "Аналітика" link
  const analyticsLink = $("<a>").addClass("nav-item").attr("href", "/analytics").text("Аналітика");
  navContainer1.append(analyticsLink);

  // Add 'active' class to the specified tab
  navContainer1.children().eq(activeTab).addClass("active");

  // Append the first navbar container to the header
  header.append(navContainer1);

  // Create the second navbar container for user greeting and icon
  const navContainer2 = $("<div>").addClass("navbar-container");

  // Create and append user greeting paragraph
  const greetingParagraph = $("<p>").addClass("nav-greet").text("Доброго дня, Менеджер");
  navContainer2.append(greetingParagraph);

  // Create and append exit icon link
  const exitIconLink = $("<a>").addClass("nav-icon rt").attr("href", "/");
  const exitIconImg = $("<img>").addClass("exit-ico").attr("src", "/img/exitIco.png");
  exitIconLink.append(exitIconImg);

  // Append the second navbar container to the header
  header.append(navContainer2);
  navContainer2.append(exitIconLink);

  // Prepend the header to the document body
  $("body").prepend(header);
}

function buttonsLead() {

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
  // const leadCommentLine = createModalLine('Коментар', 'text', 'leadComment', 'Вкажіть коментар...');

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


function createTable(index,data) {
  $(document).ready(function () {
    // Create the main container
    const $cardContainer = $('<div>').addClass('card-container');

    // Create the edit container
    const $editContainer = $('<div>').addClass('edit-container');

    const $button = $('<button>').addClass('btn action').attr('id',"modifyData").text("Зберегти")
      //Initial hiding of button
      //$button.hide()

    // Create the edit icon
    const $editIcon = $('<img>').addClass('edit-icon').attr('src', '/img/editIco.png').attr('alt', 'Edit');


    $editIcon.on("click", function () {
      //$(card).addClass('extended');
      const $parentContainer = $(this).closest('.card-container');
      $parentContainer.find('textarea.editable').css('background-color', 'rgba(219, 219, 219, .40)').prop('readonly', false);
      $button.show();
      $('div.edit-container').hide();
      //Compensation of hiding component
      $('div.card-container').css('margin-top', '15px');
    });

    // Append the edit icon to the edit container
    $editContainer.append($editIcon);

    // Append the edit container to the card container
    $cardContainer.append($editContainer);

       // Helper function to create a table row


    function createTableRow(config) {
      const $tr = $('<tr>');

      const $tdAttribute = $('<td>').addClass('card-attribute').text(config.attribute);
      const $tdTextarea = $('<td>');

      const $textarea = $('<textarea>')
        .addClass('line')
        .attr('id', config.textareaId)
        .attr('name', config.textareaName)
        .attr('placeholder', config.placeholder)
        .prop('readonly', config.readonly)
        .addClass(config.extraClasses.join(' '));

      $tdTextarea.append($textarea);
      $tr.append($tdAttribute).append($tdTextarea);

      return $tr;
    }
    // Create table rows
    $.getJSON('app/leadCardTemplate.json', (dataJSON) => {
      // Create the table
    const $table = $('<table>').addClass('card').attr('id',index);
      console.log("Data in getJSON")      
      console.log(data);
      
      const $tbody = $('<tbody>');
      //const index = $("table").length - 1;
      dataJSON.forEach(config => {
        const $row = createTableRow(config);
        //console.log(data[config.textareaId])
        $row.find("textarea").val(data[config.textareaId]);
        $tbody.append($row);
        //console.log($row.find('textarea#'+'leadType'));
        
      });
      $table.append($tbody)
    
  
      $cardContainer.append($table);
      // console.log("Card");
      // console.log($cardContainer);
      $('div.card-list').append($cardContainer)      
      $($table).append($button) 

      //Form button listner
        $button.on('click', function() {
          const $parentContainer = $(this).closest('.card-container');
          console.log($parentContainer);
            // Gather data from the form
          const dataPOST = {
            idLead:  $parentContainer.find('textarea#idLead').val(),
            leadType: $parentContainer.find('textarea#leadType').val(),
            leadStatus: $parentContainer.find('textarea#leadStatus').val(),
            leadPhone: $parentContainer.find('textarea#leadPhone').val(),
            leadName: $parentContainer.find('textarea#leadName').val(),
            leadEmail: $parentContainer.find('textarea#leadEmail').val(),
            leadComment: $parentContainer.find('textarea#leadComment').val()
          };
          console.log("Data POST");
          console.log(dataPOST);
          $.ajax({
            type: 'POST',
            url: 'updateLead.php', // URL of your server-side script
            data: JSON.stringify(dataPOST),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(response) {
              console.log('Data modified successfully:', response);
              $('button#modifyData').hide()
            },
            error: function(xhr, status, error) {
              console.error('Error modifying data:', error);
              console.error('Response:', xhr.responseText);
            }
          });
        })
    
      
      $(document).ready(function () {
        function adjustTextareaHeight() {
          // Select all textarea elements with class "wrapable"
          $("textarea").each(function() {
              // Set the height of textarea based on its scroll height
              $(this).height(0); // Reset height to auto
              var scrollHeight = Math.max(this.scrollHeight, $(this).height());
              $(this).height(scrollHeight);
          });
      }
      // Call adjustTextareaHeight initially and on input/change events
      adjustTextareaHeight(); // Adjust heights on page load
      $("textarea").on('input change', adjustTextareaHeight); // Adjust heights on input/change events
      $('textarea.editable').css('background-color', 'inherit'); 

      });
    });

  });


}