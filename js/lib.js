export function headerDepot(activeTab) {
    // Create header element with class "navbar"
    const header = $("<header>").addClass("navbar");
  
    // Create the first navbar container for navigation buttons
    const navContainer1 = $("<div>").addClass("navbar-container nav-buttons");
  
    // Create and append "Ліди" link
    const ordersLink = $("<a>").addClass("nav-item").attr("href", "/orderDepot").text("Замовлення");
    navContainer1.append(ordersLink);
  
    // Create and append "Замовлення" link
    const depotLink = $("<a>").addClass("nav-item").attr("href", "/depot").text("Склад");
    navContainer1.append(depotLink);
  
    // Create and append "Аналітика" link
    const docsLink = $("<a>").addClass("nav-item").text("Документи").attr("href", "/documents");
    navContainer1.append(docsLink);
    //

    const dropdownOptions = ['Надходження',"Відправлення"]
    const hrefs =["/documents","/documents"]
    //addToggleHeader(docsLink,dropdownOptions)

    function addToggleHeader(rowToAppend,dropdownOptions,hrefs) {
                
        const $toggleButton = $('<span>').addClass('dropbtn-header').text('▼');
        rowToAppend.append($toggleButton)
    
        const dropdownContent = $('<div>').addClass('dropdown-content').addClass('in-header');
        dropdownOptions.forEach(option=> {
            const spanA = $('<a>').text(option).attr("href", "/documents");
            dropdownContent.append(spanA);
        });
        rowToAppend.append(dropdownContent);
        $toggleButton.on('click', () => {
            
            //console.log(dropdownContent.is(':hidden'));
            if (dropdownContent.is(':hidden')) {
                $('.dropdown-content.in-header').hide()
                dropdownContent.show();
            }
            else $('.dropdown-content.in-header').hide();
            //else dropdownContent.hide()
        });
        
    }
  
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

export function showAlert(message, duration, color = 'default') {
    // Create alert div
    const $alertDiv = $('<div>').addClass('alert').text(message);
    if (color!= 'default') {
        $alertDiv.css('background-color',color)
    }
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
    rowsToAppend.forEach((row,index)=>{
        //Searches for each row of rowsToAppend array
    const $leadType = $table.find('td:last-child').eq(row);
    
    const $toggleButton = $('<span>').addClass('dropbtn toggle').text('▼');
    $leadType.append($toggleButton)

    const dropdownContent = $('<div>').addClass('dropdown-content').addClass('in-table');
    dropdownOptions[index].forEach(option => {
        const spanA = $('<a>').data('value', option).text(option);
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

export function createGoodsLine($goodSection) {
    const labelCount = $goodSection.find('.modal-line').length;
    console.log(labelCount);
    let goodNum;
    if (labelCount > 0) {
        console.log($('input#goods:first').parent().parent().find('label'));
        goodNum = labelCount + 1;
    }
    else
        goodNum = '';
    const $removeRowBtn = $('<span>').addClass('btn remove').text('X').css('display', 'block')

    $removeRowBtn.click(function (e) {
        e.preventDefault();
        //if($removeRowBnt.parent().parent())
        if ($removeRowBtn.parent().parent().find('input#goods').length > 1) {
            $removeRowBtn.parent().slideDown(200)
            $removeRowBtn.parent().remove()
            console.log($('input#goods').parent().find('label'));
            $('label').each(function (index) {
                $(this).text('Товар ' + (index));
            });
            
        }
        else {
            $removeRowBtn
                .siblings('.good').val('').prop('placeholder', 'Назва товару...')
        }
    });

    const $line = $('<div>').addClass('modal-line')
    const $goodContainer = $('<div>').addClass('good-container multiple');
    const $label = $('<label>').attr('for', 'text').text('Товар ' + goodNum)
    const $input = $('<input>').attr({ type: 'text', id: 'goods', name: 'goods', placeholder: 'Назва товару...' }).addClass('good-line');
    const $articul = $('<input>').attr({ type: 'text', id: 'articul', name: 'articul', placeholder: 'Вкажіть артикул...' }).addClass('good-line');;
    $goodContainer.append($input, $articul)
    $line.append($label, $goodContainer, $removeRowBtn)
    return $line
}
export function createGoodsLineB($goodContainerDIV) {
    const labelCount = $goodContainerDIV.find('input#goods').length;
    console.log(labelCount);
    let goodNum;
    if (labelCount > 0) {
        console.log($('input#goods:first').parent().parent().find('label').text('Товар 1'));
        goodNum = labelCount + 1;
    }
    else
        goodNum = '';
    const $removeRowBtn = $('<span>').addClass('btn remove').text('X').css('display','block')

    $removeRowBtn.click(function (e) {
        e.preventDefault();
        //if($removeRowBnt.parent().parent())
        if ($goodContainerDIV.find('input#goods').length > 1) {
            $removeRowBtn.closest('.modal-line').slideDown(200)
            $removeRowBtn.closest('.modal-line').remove()
            console.log($('input#goods').parent().parent().find('label')); 
            $goodContainerDIV.find('label').each(function(index) {
                $(this).text('Товар ' + (index + 1));
            });
            if($goodContainerDIV.find('label').length==1)
                $goodContainerDIV.find('label').text('Товар');
        }
        else
        {
            $removeRowBtn
                .siblings('input#goods').val('').prop('placeholder', 'Назва товару...')
                .siblings('input.qty').val('');
                
        }
    });

    const $line = $('<div>').addClass('modal-line')
    const $goodContainer = $('<div>').addClass('good-container');
    const $label = $('<label>').attr('for', 'text').text('Товар ' + goodNum)
    const $qty = $('<input>').addClass('qty editable').attr('type','number')
    const $input = $('<input>').attr({ type: 'text', id: 'goods', name: 'goods', placeholder: 'Назва товару...' });
    $goodContainer.append($input, $qty, $removeRowBtn)
    $line.append($label, $goodContainer)
    return $line
}