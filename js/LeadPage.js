import {showAlert} from "./lib.js"
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


  const $cardList = $("<div>").addClass("card-list");
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
        createTable(index, data[index]);
      }
    },
    error: function (xhr, status, error) {
      console.error('Error fetching data:', error);
      console.error('Response:', xhr.responseText);
    }
  });

  $(document).ready(function () {
    const $tables = $('table.card');
    console.log($tables);
    // Initialize a variable to store the maximum height
    var maxHeight = 0;

    // Iterate over each table to find the maximum height
    $tables.each(function () {
      // Get the height of the current table
      var tableHeight = $(this).height();

      // Update maxHeight if the current table is taller
      if (tableHeight > maxHeight) {
        maxHeight = tableHeight;
      }
    });
    // Set each table's height to the maximum height found
    $tables.height(maxHeight);


    // Add keydown event listener to the document body
    $(document).on('keydown', function (event) {
      // Check if the pressed key is the "Escape" key (key code 27)
      if (event.which === 27) {

        $('textarea.editable').css('background-color', 'inherit');
        $('textarea.editable').prop('readonly', true);
        $('button#modifyData').slideUp(500);
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
  // Create the button row
  const buttonRow = $('<div>').addClass('button-row');

  // Create the "Новий лід" button
  const newLeadButton = $('<a>')
    .attr('id', 'showNewLeadForm')
    .addClass('button-item');
  
  const newLeadSpan = $('<span>').text('Новий лід');
  const newLeadImg = $('<img>')
    .addClass('button-ico')
    .attr('src', '/img/plusIco.png');
  
  newLeadSpan.append(newLeadImg);
  newLeadButton.append(newLeadSpan);

  // Create the "Пошук" button
  const searchButton = $('<a>').addClass('button-item');
  const searchSpan = $('<span>').text('Пошук');
  const searchImg = $('<img>')
    .addClass('button-ico')
    .attr('src', '/img/searchIco.png');
  
  searchSpan.append(searchImg);
  searchButton.append(searchSpan);

  // Append both buttons to the button row
  buttonRow.append(newLeadButton, searchButton);

  // Append the button row to an existing container in the DOM (e.g., body or main)
  $('main').append(buttonRow);

  // Create modal container
  const modalContainer = $('<div>')
    .attr('id', 'newLead')
    .addClass('modal-container');

  // Create modal content card
  const modalContent = $('<div>')
    .addClass('modal-content card');

  // Create modal title
  const modalTitle = $('<h3>')
    .css('text-align', 'center')
    .text('Створити лід...');

  // Create lead form
  const leadForm = $('<form>')
    .attr('id', 'leadForm')
    .addClass('leadForm');

  // Helper function to create modal line with label and input
  function createModalLine(labelText, inputType, inputName, placeholderText) {
    const modalLine = $('<div>').addClass('modal-line');
    const label = $('<label>')
      .attr('for', inputName)
      .text(labelText);
    const input = $('<input>')
      .attr('type', inputType)
      .attr('id', inputName)
      .attr('name', inputName)
      .attr('placeholder', placeholderText);

    modalLine.append(label, input);
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
  const leadCommentLine = $('<div>').addClass('modal-line');
  const commentLabel = $('<label>')
    .attr('for', 'leadComment')
    .text('Коментар');
  const commentTextarea = $('<textarea>')
    .attr('id', 'leadComment')
    .attr('name', 'leadComment')
    .addClass('comment')
    .attr('placeholder', 'Тут може бути коментар до ліда...');

  leadCommentLine.append(commentLabel, commentTextarea);

  // Create modal line for buttons
  const buttonLine = $('<div>').addClass('modal-line-buttons');
  const backButton = $('<button>')
    .attr('id', 'closeModal')
    .addClass('close btn back')
    .text('Назад');
  const createButton = $('<button>')
    .attr('type', 'submit')
    .addClass('btn action')
    .text('Створити');

  buttonLine.append(backButton, createButton);

  // Append all elements to build the modal structure
  leadForm.append(idLeadLine, leadTypeLine, leadStatusLine, leadPhoneLine, leadNameLine, leadEmailLine, leadCommentLine);
  modalContent.append(modalTitle, leadForm, buttonLine);
  modalContainer.append(modalContent);
  $('main').append(modalContainer);

  // Add event listeners
  newLeadButton.on('click', function() {
    modalContainer.fadeIn(250); // Show the modal
  });
  backButton.on('click', function() {
    modalContainer.fadeOut(100); // Hide the modal
  });
}

//Create Lead CardList


function createTable(index, data) {

  // Create the main container
  const $cardContainer = $('<div>').addClass('card-container');

  // Create the edit container
  const $editContainer = $('<div>').addClass('edit-container');

  const $button = $('<button>').addClass('btn action').attr('id', "modifyData").text("Зберегти")
  //Initial hiding of button
  $button.hide()

  // Create the edit icon
  const $editIcon = $('<img>').addClass('edit-icon').attr('src', '/img/editIco.png').attr('alt', 'Edit');


  $editIcon.on("click", function () {
    //$(card).addClass('extended');
    const $parentContainer = $(this).closest('.card-container');
    $parentContainer.find('textarea.editable').css('background-color', 'rgba(219, 219, 219, .40)').prop('readonly', false);
    $button.slideDown(200);
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
    const $table = $('<table>').addClass('card').attr('id', index);
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
    $button.on('click', function () {
      const $parentContainer = $(this).closest('.card-container');
      console.log($parentContainer);
      // Gather data from the form
      const dataPOST = {
        idLead: $parentContainer.find('textarea#idLead').val(),
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
        success: function (response) {
          console.log('Data modified successfully:', response);
          $('button#modifyData').slideUp(500)
          $("div.edit-container").show()
          $('div.card-container').css('margin-top', '0');

        showAlert('Зміни вступили в силу!', 3000);
        },
        error: function (xhr, status, error) {
          console.error('Error modifying data:', error);
          console.error('Response:', xhr.responseText);
          
        }
      });
    })


    $(document).ready(function () {
      function adjustTextareaHeight() {
        // Select all textarea elements with class "wrapable"
        $("td > textarea").each(function () {
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




}