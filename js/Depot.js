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
    NewInboundForm();


    //New good form
    function NewGoodForm() {
        //Body of form
        const modalContainer = $('<div>').attr('id', 'newGood').addClass('modal-container');
        const modalContent = $('<div>').addClass('modal-content');
        const modalTitle = $('<h3>').css('text-align', 'center').text('Новий товар...');
        const newGood = $('<form>').addClass('leadForm');

        const $createLine = $('<span>').addClass('btn action add-line inform').text('+')

        const $goodContainerDIV = $('<div>').addClass('good-section');
        $goodContainerDIV.append(createGoodsLine($goodContainerDIV), $createLine)

        newGood.append(
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
                    $goodContainerDIV.find('label').text("Товар 1")
                    const $line =createGoodsLine($goodContainerDIV).hide();
                    $(this).before($line)
                    $line.slideDown(200);
                }
            });
        });

        const $submitButton = $('<button>').attr('type', 'submit').addClass('btn action').text('Створити')

        const buttonLine = $('<div>').addClass('modal-line-buttons')
            .append($('<button>').attr('id', 'closeModal').addClass('close btn back').text('Назад'))
            .append($submitButton);


        modalContent.append(modalTitle, newGood, buttonLine);
        modalContainer.append(modalContent);
        $('main').append(modalContainer);

        NewGood.on('click', function () {
            modalContainer.fadeIn(200);
        });
        $('#closeModal').on('click', function () {
            console.log($('#achive').find(".modal-line"));
            setTimeout(() => {
                console.log(newGood.find(".modal-line"));
                newGood.find(".modal-line").not(':first').remove();
                $('input#goods').parent().parent().find('label').text('Товар')
                $('input#goods').parent().parent().find('input').val('')
            }, 100)
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
        const archiveGood = $('<form>').addClass('leadForm');

        const $createLine = $('<span>').addClass('btn action add-line inform').text('+')

        const $goodContainerDIV = $('<div>').addClass('good-section').append(createGoodsLine($('#archive')), $createLine)

        archiveGood.append(
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
                    archiveGood.find('label:first').text("Товар 1")
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


        modalContent.append(modalTitle, archiveGood, buttonLine);
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
                archiveGood.find(".modal-line").not(':first').remove();
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

    function NewInboundForm() {
         //Modal form
    const modalContainer = $('<div>').attr('id', 'inbound').addClass('modal-container');
    const modalContent = $('<div>').addClass('modal-content');
    const modalTitle = $('<h3>').css('text-align', 'center').text('Нове надходження...');
    const leadForm = $('<form>').attr('id', 'inboundForm').addClass('leadForm');

    function createGoodsLineB($goodContainerDIV) {
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
    const $goodContainerDIV = $('<div>').addClass('good-section')
    $goodContainerDIV.append(createGoodsLineB($goodContainerDIV),$createLine)

    leadForm.append(
        $goodContainerDIV,        
        createModalLine('Відправник', 'text', 'l_name', 'Ведіть дані відправника...'),
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
                $goodContainerDIV.find('label:first').text("Товар 1")
                const $line = createGoodsLineB($goodContainerDIV).hide();
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

    const $buttonCancel =$('<button>').attr('id', 'closeModal').addClass('close btn back').text('Назад')
    const buttonLine = $('<div>').addClass('modal-line-buttons')
        .append($buttonCancel,$submitButton);

    leadForm.append(leadCommentLine);
    modalContent.append(modalTitle, leadForm, buttonLine);
    modalContainer.append(modalContent);
    $('main').append(modalContainer);

    NewInbound.on('click', function () {
        modalContainer.fadeIn(200);
    });
    $buttonCancel.on('click', function () {

        modalContainer.fadeOut(100);
        setTimeout(() => {
            $('input#goods').parent().parent().not(':first').remove();
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
        $('.good-container').each(function() {
            
            const g_name = $(this).find('input:first-child').val();
            const g_quantity = $(this).find('input.qty').val();
            console.log(g_name);
            console.log(g_quantity);
            if (g_name && g_quantity) {
                goods.push({ g_name: g_name, g_quantity: g_quantity });
            }
        });
        

        const dataPOST = {
            leadName:  $parentContainer.find('input#l_name').val(),
            adress:  $parentContainer.find('input#adress').val(),
            o_comment:  $parentContainer.find('textarea#leadComment').val(),
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