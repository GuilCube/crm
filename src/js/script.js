/*Оpen and close form buttons */



const modal = document.getElementById('newLead'); //NewLead button

const closeModalButton = document.getElementById('closeModal'); //Close form button

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

  