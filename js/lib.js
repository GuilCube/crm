export function headerDepot(activeTab) {
    // Create header element with class "navbar"
    const header = $("<header>").addClass("navbar");
  
    // Create the first navbar container for navigation buttons
    const navContainer1 = $("<div>").addClass("navbar-container nav-buttons");
  
    // Create and append "Ліди" link
    const leadsLink = $("<a>").addClass("nav-item").attr("href", "/orderDepot").text("Замовлення");
    navContainer1.append(leadsLink);
  
    // Create and append "Замовлення" link
    const ordersLink = $("<a>").addClass("nav-item").attr("href", "/depot").text("Склад");
    navContainer1.append(ordersLink);
  
    // Create and append "Аналітика" link
    const analyticsLink = $("<a>").addClass("nav-item").attr("href", "/documents").text("Документи");
    navContainer1.append(analyticsLink);
  
    // Add 'active' class to the specified tab
    navContainer1.children().eq(activeTab).addClass("active");
  
    // Append the first navbar container to the header
    header.append(navContainer1);
  
    // Create the second navbar container for user greeting and icon
    const navContainer2 = $("<div>").addClass("navbar-container");
  
    // Create and append user greeting paragraph
    const greetingParagraph = $("<p>").addClass("nav-greet").text("Доброго дня, Комірник");
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

export function headerManager(activeTab) {
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

export function createModalLine(labelText, inputType, inputName, placeholderText) {
    return $('<div>').addClass('modal-line')
        .append($('<label>').attr('for', inputName).text(labelText))
        .append($('<input>').attr({ type: inputType, id: inputName, name: inputName, placeholder: placeholderText }));
}

export function createModalLineWithDropdown(labelText, inputType, inputName, placeholderText, dropdownOptions) {
    // Create the main container
    const container = $('<div>').addClass('modal-line');

    // Create and append the label
    const label = $('<label>').attr('for', inputName).text(labelText);
    container.append(label);

    // Create the input container
    const inputContainer = $('<div>').addClass('input-container');

    // Create and append the input
    const input = $('<input>').attr({
        type: inputType,
        id: inputName,
        name: inputName,
        placeholder: placeholderText,
        readonly: true
    });
    input.css('width', '100%');
    inputContainer.append(input);

    // Create and append the dropdown button

    const dropbtn = $('<span>').addClass('dropbtn').text('▼')
    inputContainer.append(dropbtn);

    // Create and append the dropdown content
    const dropdownContent = $('<div>').addClass('dropdown-content');
    dropdownOptions.forEach(option => {
        const span = $('<a>').data('value', option).text(option).attr('readonly', true);
        dropdownContent.append(span);
    });

    inputContainer.append(dropdownContent);

    // Append the input container to the main container
    container.append(inputContainer);

    return container;
}

export function showAlert(message, duration) {
    // Create alert div
    const $alertDiv = $('<div>').addClass('alert').text(message);
    $('body').append($alertDiv);

    // Show alert
    $alertDiv.fadeIn(500);

    // Automatically close alert after specified duration
    setTimeout(function () {
        $alertDiv.fadeOut(500);
        // Remove alert from DOM after fade-out transition
        setTimeout(function () {
            $alertDiv.remove();
        }, 500); // Match this time with the CSS transition duration
    }, duration);
}

export function setUnEditable($input, $buttons, $editContainer, $cardContainer,$toggle) {
    $input.css('background-color', 'inherit');
    $input.prop('readonly', true);
    $buttons.slideUp(250);
    //Removing compensation of hiding component
    $cardContainer.css('margin-top', '0');
    $editContainer.show();
    $toggle.hide();
}
export function setEditable($input, $buttons, $editContainer, $cardContainer,$toggle) {
    $input.css('background-color', 'rgba(219, 219, 219, .40)').prop('readonly', false);
    $buttons.slideDown(200);
    $editContainer.hide();
    //Compensation of hiding component
    $cardContainer.css('margin-top', '15px');
    $toggle.css('display',"flex");
}

export function addToggle($table,rowsToAppend,dropdownOptions) {
    const dropdownOptionsA = ['Фізична особа', 'Юридична особа'];
    //const dropdownOptionsB = ["Контакт","Перемовини","Уточнення даних","Очікує оплати","Оплачено","Не реалізовано"];
    rowsToAppend.forEach((row,index)=>{
    const $leadType = $table.find('td:last-child').eq(row);
    $leadType;
    // const $thisTable = $("table#0").find('td:last-child');
    //console.log($leadType);
    const $toggleButton = $('<span>').addClass('dropbtn toggle').text('▼');
    $leadType.append($toggleButton)

    const dropdownContent = $('<div>').addClass('dropdown-content').addClass('in-table');
    dropdownOptions[index].forEach(option => {
        const spanA = $('<a>').data('value', option).text(option);
        //console.log(option);
        dropdownContent.append(spanA);
        spanA.click(() => {
            var value = spanA.data('value');
            console.log($leadType.find('textarea'));
            $leadType.find('textarea').val(value);
            spanA.parent().hide();
        });
    });
    $leadType.append(dropdownContent);
    $toggleButton.on('click', () => {
        
        //console.log(dropdownContent.is(':hidden'));
        if (dropdownContent.is(':hidden')) {
            $('.dropdown-content.in-table').hide()
            dropdownContent.show();
        }
        else $('.dropdown-content.in-table').hide();
        //else dropdownContent.hide()
    });
    });
}
