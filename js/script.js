// /*Оpen and close form buttons */
// const modal = document.getElementById('newOrder'); //NewLead button

// const closeModalButton = document.getElementById('closeModal'); //Close form button

// // Function to close the modal
// closeModalButton.addEventListener('click', () => {
//     modal.style.display = 'none'; // Hide the modal
// });

// const openModalButton = document.getElementById('showNewOrderForm')
// openModalButton.addEventListener('click',()=>{
//     modal.style.display = 'block'; // Hide the modal
// })

// // Close the modal if user clicks outside of the modal content
// window.addEventListener('click', (event) => {
//     if(event===null)
//         return;
//     if (event.target === modal) {
//         modal.style.display = 'none'; // Hide the modal
//     }
// });

// // Prevent form submission (for demo purposes)
// const leadForm = document.getElementById('leadForm');
// leadForm.addEventListener('submit', (event) => {
//     event.preventDefault(); // Prevent form submission
//     // You can handle form submission logic here (e.g., send data to server)
//     console.log('Form submitted!');
// });

const card = $("table.card");
const cardExtended = $('table.card.extended')


$(document).ready(function() {

    $('textarea.line').prop('readonly', true);

    // Get the height of the source element
    // var sourceTop = $('table.card').offset().top;

    // cardExtended.css('top', sourceTop + 'px');

    // var sourceWidth = $('table.card').width() + parseInt($('div.card-list').css("margin-left"))+40;
    
    // cardExtended.css('left', sourceWidth+ 'px');

    // var sourceHeight = $('table.card').outerHeight(); // Get outer height including padding and border
    // // Set the height of the target element to match the source element's height
    // cardExtended.css('height', sourceHeight + 'px');
    
//     const clonedCard = $('table.card').clone()
//     clonedCard.addClass('cloned');
// cardExtended.append(clonedCard)
});

const wTextArea = $('.wrapable')

$(card).on("dblclick" ,function () { 
    $(card).addClass('extended');
    $('textarea.line').prop('readonly', false);    
});

$(document).ready(function() {
    // Add keydown event listener to the document body
    $(document).on('keydown', function(event) {
        // Check if the pressed key is the "Escape" key (key code 27)
        if (event.which === 27) {
            card.removeClass("extended")
        }
    });
});

$(document).ready(function() {
    // Function to adjust textarea height based on content
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
});
