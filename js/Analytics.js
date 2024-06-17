import { headerManager } from "./lib.js";


export function AnalyticsPage(){
    headerManager(2);
    metric1();
    metric2();
    metric3()

}
function metric1() {
    $.ajax({
        type: "GET",
        url: "getPopularGood.php",
        data: "data",
        dataType: "json",
        success: function (data) {
          //console.log(data.length);
          console.log(data);
          $('main').append($("<div>").addClass('query-text-container')
            .append($('<span>')
                .text('Найпопулярніший товар: ' + data.data.g_name+ ', всього було замовлено '+ 
                    data.data.total_ordered + " шт." )))
            },
        error: function (xhr, status, error) {
          console.error('Error fetching data:', error);
          console.error('Response:', xhr.responseText);
        }
      });
}
function metric2() {
    $.ajax({
        type: "GET",
        url: "getFailRatio.php",
        data: "data",
        dataType: "json",
        success: function (data) {
          //console.log(data.length);
          console.log(data);
          $('main').append($("<div>").addClass('query-text-container')
            .append($('<span>')
                .text('Відсоток відмов: ' + parseFloat(data.data.result).toPrecision(4)+"%")))
            },
        error: function (xhr, status, error) {
          console.error('Error fetching data:', error);
          console.error('Response:', xhr.responseText);
        }
      });
}
function metric3() {
    $.ajax({
        type: "GET",
        url: "getConversion.php",
        data: "data",
        dataType: "json",
        success: function (data) {
          //console.log(data.length);
          console.log(data);
          $('main').append($("<div>").addClass('query-text-container')
            .append($('<span>')
                .text('Конверсія: ' + parseFloat(data.data.result).toPrecision(4)+"%")))
            },
        error: function (xhr, status, error) {
          console.error('Error fetching data:', error);
          console.error('Response:', xhr.responseText);
        }
      });
}