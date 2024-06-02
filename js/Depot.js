import { headerDepot } from "./lib.js";
import { createModalLine } from "./lib.js";
import { showAlert } from "./lib.js";
import { createGoodsLine } from "./lib.js";

export function DepotPage() {

    headerDepot(1);
    buttons()
    DepotOrderPageBody();

}

function buttons() {
    const buttonRow = $('<div>').addClass('button-row');


    const searchButton = $('<a>')
        .addClass('button-item')
        .append($('<span>').text('Пошук').append($('<img>').addClass('button-ico').attr('src', '/img/searchIco.png')));

    const NewGood = $('<a>')
        .addClass('button-item')
        .append($('<span>').text('Новий товар').append($('<img>').addClass('button-ico').attr('src', '/img/plusIco.png')));

    const archiveItem = $('<a>')
        .addClass('button-item')
        .append($('<span>').text('Архівувати товар').append($('<img>').addClass('button-ico').attr('src', 'img/archive.png')));

    const NewInbound = $('<a>')
        .addClass('button-item')
        .append($('<span>').text('Нове надходження').append($('<img>').addClass('button-ico').attr('src', '/img/Inbound.png')));
    const NewOutbound = $('<a>')
        .addClass('button-item')
        .append($('<span>').text('Нове відправлення').append($('<img>').addClass('button-ico').attr('src', '/img/Outbound.png')));

    buttonRow.append(searchButton, NewGood, archiveItem, NewInbound, NewOutbound);
    $('main').append(buttonRow);

    NewGoodForm();
    NewArchiveForm();


    //New good form
    function NewGoodForm() {
        //Body of form
        const modalContainer = $('<div>').attr('id', 'newGood').addClass('modal-container');
        const modalContent = $('<div>').addClass('modal-content');
        const modalTitle = $('<h3>').css('text-align', 'center').text('Новий товар...');
        const leadForm = $('<form>').addClass('leadForm');

        const $createLine = $('<span>').addClass('btn action add-line inform').text('+')

        const $goodContainerDIV = $('<div>').addClass('good-section')
        .append(createGoodsLine($('#newGood')), $createLine)

        leadForm.append(
            $goodContainerDIV
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

                    const $line = createGoodsLine($('#newGood')).hide();
                    $(this).before($line)
                    $line.slideDown(200);
                }
            });
        });

        const $submitButton = $('<button>').attr('type', 'submit').addClass('btn action').text('Створити')

        const buttonLine = $('<div>').addClass('modal-line-buttons')
            .append($('<button>').attr('id', 'closeModal').addClass('close btn back').text('Назад'))
            .append($submitButton);


        modalContent.append(modalTitle, leadForm, buttonLine);
        modalContainer.append(modalContent);
        $('main').append(modalContainer);

        NewGood.on('click', function () {
            modalContainer.fadeIn(200);
        });
        $('#closeModal').on('click', function () {

            modalContainer.fadeOut(100);
            setTimeout(() => {
                $('#achive').find(".good-container multiple").not(':first').remove();
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
            const dataPOST = [];
            console.log($('.good-container.multiple'));
            $('.good-container.multiple').each(function () {

                const g_name = $(this).find('input:first-child').val();
                const g_articul = $(this).find('input:last-child').val();
                console.log(g_name);
                console.log(g_articul);
                if (g_name && g_articul) {
                    dataPOST.push({ g_name: g_name, g_articul: g_articul });
                }
            });

            console.log(dataPOST);
            $.ajax({
                type: 'POST',
                url: 'submitGoods.php',
                data: JSON.stringify(dataPOST),
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    if (response.status === 'success') {
                        showAlert('Товар додано успішно', 3000);
                        modalContainer.fadeOut(200);
                        console.log(response.message);
                    } else {
                        showAlert('Виникла помилка: ' + response.message, 3000, 'red');
                        console.error('Error response:', response.message);
                    }
                },
                error: function (xhr, status, error) {
                    var errorMessage;
                    try {
                        var response = JSON.parse(xhr.responseText);
                        errorMessage = response.message || 'Виникла помилка';
                    } catch (e) {
                        errorMessage = 'Виникла помилка';
                    }
                    showAlert(errorMessage, 3000, 'red');
                    console.error('Error fetching data:', error);
                    console.error('Response:', xhr.responseText);
                }
            });
        });
    }

    function NewArchiveForm() {
        const modalContainer = $('<div>').attr('id', 'archive').addClass('modal-container');
        const modalContent = $('<div>').addClass('modal-content');
        const modalTitle = $('<h3>').css('text-align', 'center').text('Архівувати...');
        const leadForm = $('<form>').addClass('leadForm');

        const $createLine = $('<span>').addClass('btn action add-line inform').text('+')

        const $goodContainerDIV = $('<div>').addClass('good-section').append(createGoodsLine($('#archive')), $createLine)

        leadForm.append(
            $goodContainerDIV
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

                    const $line = createGoodsLine($('#archive')).hide();
                    $(this).before($line)
                    $line.slideDown(200);
                }
            });
        });

        const $submitButton = $('<button>').attr('type', 'submit').addClass('btn action').text('Створити')
        const $backButton =$('<button>').attr('id', 'closeModal').addClass('close btn back').text('Назад')
        const buttonLine = $('<div>').addClass('modal-line-buttons')
            
            .append($backButton, $submitButton);


        modalContent.append(modalTitle, leadForm, buttonLine);
        modalContainer.append(modalContent);
        $('main').append(modalContainer);

        console.log(archiveItem);
        archiveItem.on('click', function () {
            modalContainer.fadeIn(200);
        });

        $backButton.on('click', function () {
            modalContainer.fadeOut(100);
            setTimeout(() => {
                console.log($('#achive').find(".good-container multiple").not(':first'));
                $('#achive').find(".good-container multiple").not(':first').remove();


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
            const dataPOST = [];
            console.log($('.good-container.multiple'));
            $('.good-container.multiple').each(function () {

                const g_name = $(this).find('input:first-child').val();
                const g_articul = $(this).find('input:last-child').val();
                console.log(g_name);
                console.log(g_articul);
                if (g_name && g_articul) {
                    dataPOST.push({ g_name: g_name, g_articul: g_articul });
                }
            });

            console.log(dataPOST);
            $.ajax({
                type: 'POST',
                url: 'submitGoods.php',
                data: JSON.stringify(dataPOST),
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    if (response.status === 'success') {
                        showAlert('Товар додано успішно', 3000);
                        modalContainer.fadeOut(200);
                        console.log(response.message);
                    } else {
                        showAlert('Виникла помилка: ' + response.message, 3000, 'red');
                        console.error('Error response:', response.message);
                    }
                },
                error: function (xhr, status, error) {
                    var errorMessage;
                    try {
                        var response = JSON.parse(xhr.responseText);
                        errorMessage = response.message || 'Виникла помилка';
                    } catch (e) {
                        errorMessage = 'Виникла помилка';
                    }
                    showAlert(errorMessage, 3000, 'red');
                    console.error('Error fetching data:', error);
                    console.error('Response:', xhr.responseText);
                }
            });
        });
    }

}



function DepotOrderPageBody() {
    const $main = $('main')

    const $tableContainer = $('<div>').addClass('depot-container')

    const $table = $('<table>', { id: 'goodsTable' })
        .append(
            $('<thead>').append(
                $('<tr>')
                    .append($('<th>').text('№ п/п').addClass('depot-header'))
                    .append($('<th>').text('Артикул').addClass('depot-header'))
                    .append($('<th>').text('Назва').addClass('depot-header'))
                    .append($('<th>').text('Залишок').addClass('depot-header'))
            ),
            $('<tbody>')
        )
        .appendTo($tableContainer);
    $main.append($tableContainer)

    $(document).ready(function () {
        $.ajax({
            url: 'getGoods.php',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    var goods = response.data;
                    var tbody = $('#goodsTable tbody');
                    tbody.empty(); // Clear existing rows

                    $.each(goods, function (index, item) {
                        var row = '<tr class="depot-row">' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + item.g_articul + '</td>' +
                            '<td>' + item.g_name + '</td>' +
                            '<td>' + item.g_quantity + '</td>' +
                            '</tr>';
                        tbody.append(row);
                    });
                } else {
                    console.error('Failed to fetch goods data:', response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error fetching goods data:', error);
            }
        });
    });


}