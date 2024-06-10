import { headerManager, showSearchResults } from "./lib.js";
import { addToggle } from "./lib.js";
import { setEditable } from "./lib.js";
import { setUnEditable } from "./lib.js";
import { showAlert } from "./lib.js";
import { createModalLine } from "./lib.js";
import { createModalLineWithDropdown } from "./lib.js";
export function ManagerOrderPage() {
    headerManager(1, ['Ліди', "Замовлення", "Аналітика"]);

    buttons();

    const $cardList = $("<div>").addClass("card-list");
    $('main').append($cardList)
    $.ajax({
        type: "GET",
        url: "getOrders.php",
        data: "data",
        dataType: "json",
        success: function (data) {
            console.log(data.length);
            console.log(data);
            // Loop through the table data
            const blendedData = {};

            // Loop through the table data
            for (const entry of data) {
                const { o_id, l_id, o_status, adress, o_comment, m_id, g_id, g_quantity, g_name, leadName } = entry;
                if (!blendedData[o_id]) {
                    blendedData[o_id] = {
                        o_id,
                        l_id,
                        o_status,
                        adress,
                        o_comment,
                        m_id,
                        leadName,
                        goods: []
                    };
                }

                blendedData[o_id].goods.push({ g_id, g_quantity, g_name });
            }

            // Convert the object to an array if needed
            const dataModified = Object.values(blendedData);

            console.log(dataModified);
            for (let index = 0; index < dataModified.length; index++) {

                createTable(index, dataModified[index]);

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
                    $('div.edit-container'), $('div.card-container'), $('.dropbtn.toggle'))
                $('span.btn.action.add-line.incard').slideUp(50)
                $('span.btn.remove.incard').hide()
            }
        });

    });

}

function buttons() {
    const buttonRow = $('<div>').addClass('button-row');

    const newCard = $('<a>')
        .attr('id', 'showNewLeadForm')
        .addClass('button-item')
        .append($('<span>').text('Нове замовлення').append($('<img>').addClass('button-ico').attr('src', '/img/plusIco.png')));

    const searchButton = $('<a>')
        .addClass('button-item')
        .append($('<span>').text('Пошук').append($('<img>').addClass('button-ico').attr('src', '/img/searchIco.png')));

    buttonRow.append(newCard, searchButton);
    $('main').append(buttonRow);


    searchOrderForm();
    newOrderForm();

    function searchOrderForm() {
        const modalContainer = $('<div>').attr('id', 'searchOrder').addClass('modal-container');
        const modalContent = $('<div>').addClass('modal-content');
        const modalTitle = $('<h3>').css('text-align', 'center').text('Пошук замовлення...');
        const leadForm = $('<form>').attr('id', 'searchOrderForm').addClass('leadForm');

        function createGoodsLine($parentContainer) {
            const labelCount = $parentContainer.find('input#goods').length;
            console.log(labelCount);
            let goodNum;
            if (labelCount > 0) {
                console.log($('input#goods:first').parent().parent().find('label').text('Товар 1'));
                goodNum = labelCount + 1;
            }
            else
                goodNum = '';
            const $removeRowBtn = $('<span>').addClass('btn remove').text('X').css('display', 'block')

            $removeRowBtn.click(function (e) {
                e.preventDefault();
                //if($removeRowBnt.parent().parent())
                if ($removeRowBtn.parent().parent().parent().find('input#goods').length > 1) {
                    $removeRowBtn.parent().parent().slideDown(200)
                    $removeRowBtn.parent().parent().remove()
                    console.log($('input#goods').parent().parent().find('label'));
                    $('input#goods').parent().parent().find('label').each(function (index) {
                        $(this).text('Товар ' + (index + 1));
                    });
                    if ($('input#goods').parent().parent().find('label').length == 1)
                        $('input#goods').parent().parent().find('label').text('Товар ');
                }
                else {
                    $removeRowBtn
                        .siblings('input#goods').val('').prop('placeholder', 'Назва товару...')
                        .siblings('input.qty').val('');

                }
            });

            const $line = $('<div>').addClass('modal-line')
            const $goodContainer = $('<div>').addClass('good-container');
            const $label = $('<label>').attr('for', 'text').text('Товар ' + goodNum)
            const $qty = $('<input>').addClass('qty editable')
            const $input = $('<input>').attr({ type: 'text', id: 'goods', name: 'goods', placeholder: 'Назва товару...' });
            $goodContainer.append($input, $qty, $removeRowBtn)
            $line.append($label, $goodContainer)
            return $line
        }

        const $createLine = $('<span>').addClass('btn action add-line inform').text('+');

        $createLine.click(function (e) {
            e.preventDefault();
            //console.log($(this));
            if ($(this).parent().find('input#goods:last').val()!= 0 
                || $(this).parent().find('input.qty').val()!=0) {

                const $line = createGoodsLine(modalContainer).hide();
                $(this).before($line)
                $line.slideDown(200);
            }
        });

        const $goodContainerDIV = $('<div>').addClass('good-section').append(createGoodsLine(modalContainer), $createLine)
        
        const dropdownOptions = ['Оформлено', 'Комплектується', 'Відправлено'];
        leadForm.append(
            createModalLine('Клієнт', 'text', 'l_name', 'Ведіть дані ліда...'),
            createModalLineWithDropdown('Статус', 'text', 'o_status', 'Оберість статус...', dropdownOptions),
            $goodContainerDIV,
            createModalLine('Адреса', 'text', 'adress', 'Вкажіть адресу...'))
        const leadCommentLine = $('<div>').addClass('modal-line')
            .append($('<label>').attr('for', 'leadComment').text('Коментар'))
            .append($('<textarea>').attr({ id: 'leadComment', name: 'leadComment', placeholder: 'Тут може бути коментар до ліда...' }).addClass('comment'));

        const $submitButton = $('<button>').attr('type', 'submit').addClass('btn action').text('Створити')
        const $buttonCancel = $('<button>').attr('id', 'closeModal').addClass('close btn back').text('Назад')
        const buttonLine = $('<div>').addClass('modal-line-buttons')
            .append($buttonCancel, $submitButton);

        leadForm.append(leadCommentLine);
        modalContent.append(modalTitle, leadForm, buttonLine);
        modalContainer.append(modalContent);
        $('main').append(modalContainer);

        searchButton.on('click', function () {
            modalContainer.fadeIn(200);
        });
        $buttonCancel.on('click', function () {

            modalContainer.fadeOut(100);
            setTimeout(() => {
                modalContainer.find('input#goods').not(':first').remove();
                $('input#goods').parent().parent().find('label').text('Товар')
                $('input#goods').parent().parent().find('input').val('')
            }, 100)

        });

        $submitButton.on('click', (e) => {
            e.preventDefault();
            const $parentContainer = modalContainer;
            const dataPOST = {
                l_name: $parentContainer.find('input#l_name').val(),
                o_status: $parentContainer.find('input#o_status').val(),
                goods: [], // Initialize an array to store goods data
                adress: $parentContainer.find('input#adress').val(),
                leadComment: $parentContainer.find('textarea#leadComment').val()
            };        
            // Collect multiple goods and their quantities
            $parentContainer.find('.good-container').each(function () {
                const goodName = $(this).find('input#goods').val();
                const quantity = $(this).find('input.qty').val()

                if (goodName&&quantity) {
                    dataPOST.goods.push({ name: goodName, quantity: quantity });
                }
                else if(quantity && !goodName){
                    const error ='Пошук за кількісттю неможливий'
                    showAlert(error,3000,'red')
                    throw error
                }
            });

            // Logging for debugging
            console.log('Form data:', dataPOST);

            $.ajax({
                type: 'POST',
                url: 'searchOrder.php',
                data: JSON.stringify(dataPOST),
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    try {
                        const jsonResponse = JSON.parse(response);
                        if (jsonResponse.success) {
                            modalContainer.fadeOut(200);

                            const blendedData = {};
                            // Loop through the table data
                            for (const entry of jsonResponse.data) {
                                const { o_id, l_id, o_status, adress, o_comment, m_id, g_id, g_quantity, g_name, leadName } = entry;
                                if (!blendedData[o_id]) {
                                    blendedData[o_id] = {
                                        o_id,
                                        l_id,
                                        o_status,
                                        adress,
                                        o_comment,
                                        m_id,
                                        leadName,
                                        goods: []
                                    };
                                }

                                blendedData[o_id].goods.push({ g_id, g_quantity, g_name });
                            }

                            // Convert the object to an array if needed
                            const dataModified = Object.values(blendedData);
                            console.log("Datamodif",dataModified);
                            const $cardList = $('.card-list')
                            showSearchResults($cardList, modalContainer, dataModified)
                            setTimeout(() => {
                                for (let index = 0; index < dataModified.length; index++) {
                                    console.log(dataModified[index]);
                                    createTable(index, dataModified[index]);                                }
                            }, 300)
                            $cardList.fadeIn(200)

                        } else {
                            showAlert(`Помилка: ${jsonResponse.error}`, 3000, 'red');
                            console.error(jsonResponse.error); // Log the error
                        }
                    } catch (e) {
                        showAlert('Невірний формат відповіді', 3000, 'red');
                        console.error('Error parsing JSON response:', e);
                    }
                },
                error: function (xhr, status, error) {
                    let errorMessage = `Виникла помилка: ${error}`;
                    if (xhr.status === 404) {
                        errorMessage = 'Сервер не знайдено (404)';
                    } else if (xhr.status === 500) {
                        errorMessage = 'Помилка сервера (500)';
                    }
                    showAlert(errorMessage, 3000, 'red');
                    console.error(`AJAX error: ${status}`, error);
                },
                statusCode: {
                    404: function () {
                        showAlert('Сервер не знайдено (404)', 3000);
                    },
                    500: function () {
                        showAlert('Помилка сервера (500)', 3000);
                    }
                }
            });
        })

        buttonRow.append(searchButton);
        $('main').append(buttonRow);

        $(document).ready(function () {
            $(document).on('click', '.dropbtn', function () {
                $('.dropdown-content').removeClass('show');
                $(this).siblings('.dropdown-content').toggleClass('show');
            });

            $(document).on('click', '.dropdown-content a', function (e) {
                e.preventDefault();
                var value = $(this).data('value');
                console.log(value);
                console.log($(this).closest('.input-container').find('input'));
                $(this).closest('.input-container').find('input').val(value);
                $(this).parent().removeClass('show');
            });


            $(window).click(function (e) {
                if (!$(e.target).closest('.input-container').length) {
                    $('.dropdown-content').removeClass('show');
                }
            });
        });


    }

    function newOrderForm() {
        //Modal form
        const modalContainer = $('<div>').attr('id', 'newLead').addClass('modal-container');
        const modalContent = $('<div>').addClass('modal-content');
        const modalTitle = $('<h3>').css('text-align', 'center').text('Нове замовлення...');
        const leadForm = $('<form>').attr('id', 'leadForm').addClass('leadForm');

        function createGoodsLine($parentContainer) {
            const labelCount = $parentContainer.find('input#goods').length;
            console.log(labelCount);
            let goodNum;
            if (labelCount > 0) {
                console.log($('input#goods:first').parent().parent().find('label').text('Товар 1'));
                goodNum = labelCount + 1;
            }
            else
                goodNum = '';
            const $removeRowBtn = $('<span>').addClass('btn remove').text('X').css('display', 'block')

            $removeRowBtn.click(function (e) {
                e.preventDefault();
                //if($removeRowBnt.parent().parent())
                if ($removeRowBtn.parent().parent().parent().find('input#goods').length > 1) {
                    $removeRowBtn.parent().parent().slideDown(200)
                    $removeRowBtn.parent().parent().remove()
                    console.log($('input#goods').parent().parent().find('label'));
                    $('input#goods').parent().parent().find('label').each(function (index) {
                        $(this).text('Товар ' + (index + 1));
                    });
                    if ($('input#goods').parent().parent().find('label').length == 1)
                        $('input#goods').parent().parent().find('label').text('Товар ');
                }
                else {
                    $removeRowBtn
                        .siblings('input#goods').val('').prop('placeholder', 'Назва товару...')
                        .siblings('input.qty').val('');

                }
            });

            const $line = $('<div>').addClass('modal-line')
            const $goodContainer = $('<div>').addClass('good-container');
            const $label = $('<label>').attr('for', 'text').text('Товар ' + goodNum)
            const $qty = $('<input>').addClass('qty editable')
            const $input = $('<input>').attr({ type: 'text', id: 'goods', name: 'goods', placeholder: 'Назва товару...' });
            $goodContainer.append($input, $qty, $removeRowBtn)
            $line.append($label, $goodContainer)
            return $line
        }

        ///const $goodsModal=createModalLine('Товари', 'text', 'leadPhone', 'Введіть номер телефону...').append($qty);
        const $createLine = $('<span>').addClass('btn action add-line inform').text('+')
        //$goodContainer.append($goodsModal,$qty)
        //const dropdownOptions = ['Оформлено', 'Комплектується', 'Відправлено'];
        const $goodContainerDIV = $('<div>').addClass('good-section').append(createGoodsLine(modalContainer), $createLine)

        leadForm.append(
            createModalLine('Клієнт', 'text', 'l_name', 'Ведіть дані ліда...'),
            //createModalLineWithDropdown('Статус', 'text', 'o_status', 'Оберість статус...', dropdownOptions),
            $goodContainerDIV,
            createModalLine('Адреса', 'text', 'adress', 'Вкажіть адресу...')
        );

        $(document).ready(function () {
            $(document).on('click', '.dropbtn', function () {
                $('.dropdown-content').removeClass('show');
                $(this).siblings('.dropdown-content').toggleClass('show');
            });
            $createLine.click(function (e) {
                e.preventDefault();
                //console.log($(this));
                if ($(this).parent().find('input#goods:last').val() != 0) {

                    const $line = createGoodsLine(modalContainer).hide();
                    $(this).before($line)
                    $line.slideDown(200);
                }
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
        const $buttonCancel = $('<button>').attr('id', 'closeModal').addClass('close btn back').text('Назад')
        const buttonLine = $('<div>').addClass('modal-line-buttons')
            .append($buttonCancel, $submitButton);

        leadForm.append(leadCommentLine);
        modalContent.append(modalTitle, leadForm, buttonLine);
        modalContainer.append(modalContent);
        $('main').append(modalContainer);

        newCard.on('click', function () {
            modalContainer.fadeIn(200);
        });
        $buttonCancel.on('click', function () {

            modalContainer.fadeOut(100);
            setTimeout(() => {
                modalContainer.find('input#goods').not(':first').remove();
                $('input#goods').parent().parent().find('label').text('Товар')
                $('input#goods').parent().parent().find('input').val('')
            }, 100)

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
            const goods = [];
            console.log($('.good-container'));
            $('.good-container').each(function () {

                const g_name = $(this).find('input:first-child').val();
                const g_quantity = $(this).find('input.qty').val();
                console.log(g_name);
                console.log(g_quantity);
                if (g_name && g_quantity) {
                    goods.push({ g_name: g_name, g_quantity: g_quantity });
                }
            });


            const dataPOST = {
                leadName: $parentContainer.find('input#l_name').val(),
                adress: $parentContainer.find('input#adress').val(),
                o_comment: $parentContainer.find('textarea#leadComment').val(),
                goods: goods
            };
            console.log(goods);
            console.log(dataPOST);
            $.ajax({
                type: 'POST',
                url: 'submitOrder.php',
                data: JSON.stringify(dataPOST),
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    showAlert('Замовнстворено успішно', 3000);
                    modalContainer.fadeOut(200);
                    console.log(response);
                },
                error: function () {
                    showAlert('Виникла помилка', 3000);
                }
            });
        });
    }

}

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
            $('div.edit-container'), $('div.card-container'), $('.dropbtn.toggle'))
        console.log($cardContainer.find('.qty'));
        $cardContainer.find('.qty').prop('readonly', true).css('background-color', 'inherit');
        $('span.btn.action.add-line.incard').slideUp(50)
        $('span.btn.remove.incard').hide();


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
            $('div.edit-container'), $('div.card-container'), $parentContainer.find('.dropbtn'))
        $parentContainer.find('.qty').prop('readonly', false).css('background-color', 'var(--data_background)')
        console.log($parentContainer.find('span.btn.action.add-line.incard').slideDown(500));
        console.log($parentContainer.find('span.btn.remove').fadeIn(500));

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
    $.getJSON('app/orderCardTemplate.json', (dataJSON) => {
        // Create the table
        const $table = $('<table>').addClass('card').attr('id', index);
        console.log("Data in getJSON")
        console.log(data);

        const $tbody = $('<tbody>');
        //const index = $("table").length - 1;
        //console.log(data.goods);
        dataJSON.forEach(config => {
            function createGoodsLineCard() {
                const $removeRowBnt = $('<span>').addClass('btn remove incard').text('X').css('display', 'block')
                const $tdTextarea = $('<td>').addClass('toggle-container');
                const $textarea = $('<textarea>')
                    .addClass('line goods')
                    .attr('id', config.textareaId)
                    .attr('name', config.textareaName)
                    .attr('placeholder', config.placeholder)
                    .addClass(config.extraClasses.join(' '))
                    .css("height", "28.6px")
                    .attr('placeholder', 'Вкажіть товар...')
                    .prop('placeholder', 'Товар...')

                const $qty = $('<input>')
                    .addClass('qty editable').css('background-color', 'var(--data_background)')
                //console.log($qty);

                $removeRowBnt.click(function (e) {
                    e.preventDefault();
                    //if($removeRowBnt.parent().parent())
                    if ($removeRowBnt.parent().parent().find('textarea#goods').length > 1) {
                        $removeRowBnt.parent().slideDown(200)
                        $removeRowBnt.parent().remove()
                    }
                    else
                        $removeRowBnt
                            .siblings('textarea#goods').val('').prop('placeholder', 'Товар...')
                            .siblings('input.qty').val('')
                });

                $tdTextarea.append($textarea, $qty, $removeRowBnt)
                return $tdTextarea;
            }

            console.log(typeof (data[config.textareaId]));
            if (!(typeof data[config.textareaId] === 'object')) {
                const $row = createTableRow(config);
                //console.log(data[config.textareaId])
                console.log($row.find("textarea").val(data[config.textareaId]));
                $row.find("textarea").val(data[config.textareaId])
                $tbody.append($row);
            }
            else {
                const $row = createTableRow(config);
                data[config.textareaId].forEach((el, index) => {
                    const $removeRowBtn = $('<span>').addClass('btn remove incard').text('X')
                    $removeRowBtn.click(function (e) {
                        e.preventDefault();
                        //if($removeRowBnt.parent().parent())
                        if ($removeRowBtn.parent().parent().find('textarea#goods').length > 1) {
                            $removeRowBtn.parent().slideDown(200)
                            $removeRowBtn.parent().remove()
                        }
                        else
                            $removeRowBtn
                                .siblings('textarea#goods').val('').prop('placeholder', 'Товар...')
                                .siblings('input.qty').val('')
                    });

                    console.log(el)
                    //const $row = createTableRow(config);

                    //console.log(data[config.textareaId])
                    //console.log($row.find("textarea").val(el.g_name));
                    console.log(index == 0);
                    if (index == 0) {
                        $row.find("textarea").
                            val(el.g_name)
                            .addClass('goods')

                        const $qty = $('<input>')
                            .addClass('qty editable')
                            .val(el.g_quantity)
                            .prop('readonly', true);
                        //console.log($qty);                        
                        $row.find('td:last-child').append($qty, $removeRowBtn)
                    }
                    else {
                        const $tdTextarea = $('<td>').addClass('toggle-container')
                        $row.find('td.card-attribute').text('Товари');
                        const $textarea = $('<textarea>')
                            .addClass('line goods')
                            .attr('id', config.textareaId)
                            .attr('name', config.textareaName)
                            .attr('placeholder', config.placeholder)
                            .prop('readonly', config.readonly)
                            .prop('placeholder', 'Товар...')
                            .addClass(config.extraClasses.join(' '));

                        $textarea.val(el.g_name)

                        const $qty = $('<input>')
                            .addClass('qty editable')
                            .val(el.g_quantity)
                            .prop('readonly', true);
                        //console.log($qty);
                        $tdTextarea.append($textarea, $qty, $removeRowBtn);
                        $row.append($tdTextarea)
                    }
                    $tbody.append($row);
                })
                const $addButton = $('<span>').addClass('btn action add-line incard').text('+').hide()
                $row.append($addButton)

                $addButton.click(() => {
                    console.log($addButton);
                    if ($addButton.parent().find('textarea:last').val() != 0) {

                        const goodLine = createGoodsLineCard().hide()
                        $addButton.before(goodLine)
                        goodLine.slideDown(200)
                    }
                })
            }
        });

        $table.append($tbody)
        if ($table.find('#o_status').val() == 'Відправлено') {
            $editContainer.remove()
            $cardContainer.addClass('top-offset')
        }

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
                o_id: $parentContainer.find('#o_id').val(),
                leadName: $parentContainer.find('#leadName').val(),
                goods: [],
                adress: $parentContainer.find('#adress').val(),
                o_comment: $parentContainer.find('#o_comment').val()
            };

            const $goodRow = $parentContainer.find('.goods').parent();
            console.log('Goods');
            console.log($goodRow);

            $goodRow.each(function () {
                console.log($(this).find('textarea#goods').val());
                console.log($(this).closest('td').find('.qty').val());

                const g_name = $(this).find('textarea#goods').val();
                const g_quantity = $(this).closest('td').find('.qty').val();
                if (g_name) { // Only add if there is a value
                    dataPOST.goods.push({ g_name, g_quantity });
                }
            });

            console.log("Data POST");
            console.log(dataPOST);
            $.ajax({
                type: 'POST',
                url: 'updateOrder.php', // URL of your server-side script
                data: JSON.stringify(dataPOST),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (response) {
                    console.log('Data modified successfully:', response);
                    setUnEditable($('textarea.editable'), $('div.modal-line-buttons.incard'),
                        $('div.edit-container'), $('div.card-container'), $('.dropbtn.toggle'))
                    $('.qty').prop('readonly', true).css('background-color', 'inherit');
                    $('span.btn.remove.incard').hide()
                    $('span.btn.action.add-line.incard').slideUp(50)
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
