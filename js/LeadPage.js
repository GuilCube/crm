import { showAlert } from "./lib.js"
import { createModalLine } from "./lib.js";
import { createModalLineWithDropdown } from "./lib.js";
import { setEditable } from "./lib.js";
import { setUnEditable } from "./lib.js";
import { addToggle } from "./lib.js";

// Create a header element with class "navbar"
const main = document.querySelector('main');
export async function LeadPage() {
  header(0);
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
        setUnEditable($('textarea.editable'), $('div.modal-line-buttons.incard'),
          $('div.edit-container'), $('div.card-container'),$('.dropbtn.toggle'))
      }
    });

  });
}


export function header(activeTab) {
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
  const buttonRow = $('<div>').addClass('button-row');

  const newLeadButton = $('<a>')
    .attr('id', 'showNewLeadForm')
    .addClass('button-item')
    .append($('<span>').text('Новий лід').append($('<img>').addClass('button-ico').attr('src', '/img/plusIco.png')));

  const searchButton = $('<a>')
    .addClass('button-item')
    .append($('<span>').text('Пошук').append($('<img>').addClass('button-ico').attr('src', '/img/searchIco.png')));

  buttonRow.append(newLeadButton, searchButton);
  $('main').append(buttonRow);

  //Modal form
  const modalContainer = $('<div>').attr('id', 'newLead').addClass('modal-container');
  const modalContent = $('<div>').addClass('modal-content');
  const modalTitle = $('<h3>').css('text-align', 'center').text('Створити лід...');
  const leadForm = $('<form>').attr('id', 'leadForm').addClass('leadForm');

  const dropdownOptions = ['Оформлено', 'Комплектується', 'Відправлено']
  leadForm.append(
    createModalLine('Клієнт', 'text', 'leadType', 'Оберіть тип ліда...'),
    createModalLineWithDropdown('Статус', 'text', 'leadStatus', 'Оберість статус...', dropdownOptions),
    createModalLine('Товари', 'text', 'leadPhone', 'Введіть номер телефону...'),
    createModalLine('Адреса', 'text', 'leadName', 'ПІБ ліда...')
  );

  $(document).ready(function () {
    $(document).on('click', '.dropbtn', function () {
      $('.dropdown-content').removeClass('show');
      $(this).siblings('.dropdown-content').toggleClass('show');
    });


    $(document).on('click', '.dropdown-content a', function (e) {
      e.preventDefault();
      var value = $(this).data('value');
      //console.log(value);
      $(this).closest('.input-container').find('input').val(value);
      $(this).parent().removeClass('show');
    });


    $(window).click(function (e) {
      if (!$(e.target).closest('.input-container').length) {
        $('.dropdown-content').removeClass('show');
      }
    });
  });


  const leadCommentLine = $('<div>').addClass('modal-line')
    .append($('<label>').attr('for', 'leadComment').text('Коментар'))
    .append($('<textarea>').attr({ id: 'leadComment', name: 'leadComment', placeholder: 'Тут може бути коментар до ліда...' }).addClass('comment'));

  const $submitButton = $('<button>').attr('type', 'submit').addClass('btn action').text('Створити')

  const buttonLine = $('<div>').addClass('modal-line-buttons')
    .append($('<button>').attr('id', 'closeModal').addClass('close btn back').text('Назад'))
    .append($submitButton);

  leadForm.append(leadCommentLine);
  modalContent.append(modalTitle, leadForm, buttonLine);
  modalContainer.append(modalContent);
  $('main').append(modalContainer);

  newLeadButton.on('click', function () {
    modalContainer.fadeIn(200);
  });
  $('#closeModal').on('click', function () {
    modalContainer.fadeOut(100);
  });


  modalContainer.on('click', function (event) {
    if ($(event.target).is(modalContainer)) {
      modalContainer.fadeOut(200);
    }
  });

  // Handle form submission
  $submitButton.on('click', function (event) {
    event.preventDefault();
    const $parentContainer = $(this).closest('.modal-content');
    console.log($parentContainer);
    console.log($(this));
    const dataPOST = {
      leadType: $parentContainer.find('input#leadType').val(),
      leadStatus: $parentContainer.find('input#leadStatus').val(),
      leadPhone: $parentContainer.find('input#leadPhone').val(),
      leadName: $parentContainer.find('input#leadName').val(),
      leadEmail: $parentContainer.find('input#leadEmail').val(),
      leadComment: $parentContainer.find('textarea#leadComment').val()
    };
    console.log(dataPOST);
    $.ajax({
      type: 'POST',
      url: 'submitLead.php',
      data: JSON.stringify(dataPOST),
      contentType: 'application/json; charset=utf-8',
      success: function (response) {
        showAlert('Лід створено успішно', 3000);
        modalContainer.fadeOut(200);
        console.log(response);
      },
      error: function () {
        showAlert('Виникла помилка', 3000);
      }
    });
  });
}

//Create Lead CardList
function createTable(index, data) {

  // Create the main container
  const $cardContainer = $('<div>').addClass('card-container');

  // Create the edit container
  const $editContainer = $('<div>').addClass('edit-container');

  const $buttonContainer = $('<div>').addClass('modal-line-buttons incard');

  const $buttonSave = $('<button>').addClass('btn action').attr('id', "modifyData").text("Зберегти");
  const $buttonCancel = $('<button>').addClass('btn back').text("Назад");

  $buttonCancel.on('click', () => {
    setUnEditable($('textarea.editable'), $buttonContainer,
      $('div.edit-container'), $('div.card-container'),$('.dropbtn.toggle'))
  })

  $buttonContainer.append($buttonCancel).append($buttonSave);
  //Initial hiding of button
  $buttonContainer.hide()

  // Create the edit icon
  const $editIcon = $('<img>').addClass('edit-icon').attr('src', '/img/editIco.png').attr('alt', 'Edit');


  $editIcon.on("click", function () {
    //$(card).addClass('extended');

    const $parentContainer = $(this).closest('.card-container');
    setEditable($parentContainer.find('textarea.editable'), $buttonContainer,
      $('div.edit-container'), $('div.card-container'),$parentContainer.find('.dropbtn'))

  });

  // Append the edit icon to the edit container
  $editContainer.append($editIcon);

  // Append the edit container to the card container
  $cardContainer.append($editContainer);

  // Helper function to create a table row


  function createTableRow(config) {
    const $tr = $('<tr>');

    const $tdAttribute = $('<td>').addClass('card-attribute').text(config.attribute);
    const $tdTextarea = $('<td>').addClass('toggle-container')

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
    }); 
    //console.log($leadType);
    $table.append($tbody)

    //Adds toggle button near textarea
    const options = [['Фізична особа', 'Юридична особа'],
    ["Контакт","Перемовини","Уточнення даних","Очікує оплати","Оплачено","Не реалізовано"]];
    addToggle($table,[1,2],options)

    $cardContainer.append($table);
    // console.log("Card");
    // console.log($cardContainer);
    $('div.card-list').append($cardContainer)
    $($table).append($buttonContainer)

    //Form button listner
    $buttonSave.on('click', function () {
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
          setUnEditable($('textarea.editable'), $('div.modal-line-buttons.incard'),
            $('div.edit-container'), $('div.card-container'),$('.dropbtn.toggle'))

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