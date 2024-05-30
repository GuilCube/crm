import { headerDepot } from "./lib.js";

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

    buttonRow.append(searchButton);
    $('main').append(buttonRow);
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

    $(document).ready(function() {
        $.ajax({
            url: 'getGoods.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    var goods = response.data;
                    var tbody = $('#goodsTable tbody');
                    tbody.empty(); // Clear existing rows
                    
                    $.each(goods, function(index, item) {
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
            error: function(xhr, status, error) {
                console.error('Error fetching goods data:', error);
            }
        });
    });


}