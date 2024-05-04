const modal = document.getElementById('newLead');
const openModalButton = document.getElementById('showNewLeadForm');
const closeModalButton = document.getElementById('closeModal');

// Function to open the modal
openModalButton.addEventListener('click', () => {
    modal.style.display = 'block'; // Show the modal
});

// Function to close the modal
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide the modal
});

// Close the modal if user clicks outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide the modal
    }
});

// Prevent form submission (for demo purposes)
const leadForm = document.getElementById('leadForm');
leadForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    // You can handle form submission logic here (e.g., send data to server)
    console.log('Form submitted!');
});

function setTextareaHeightToLineHeight(textarea) {
    var lineHeight = parseFloat(window.getComputedStyle(textarea).lineHeight); // Get line height
    textarea.style.height = lineHeight + 7 + 'px'; // Set textarea height to line height
}

// Apply behavior to all textareas
document.addEventListener('DOMContentLoaded', function() {
    var textareas = document.querySelectorAll('textarea'); // Select all textareas
    textareas.forEach(function(textarea) {
        setTextareaHeightToLineHeight(textarea); // Apply function to each textarea
        textarea.addEventListener('input', function() {
            setTextareaHeightToLineHeight(textarea); // Adjust height on input
        });
    });
});