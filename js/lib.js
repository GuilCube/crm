export function createModalLine(labelText, inputType, inputName, placeholderText) {
    return $('<div>').addClass('modal-line')
        .append($('<label>').attr('for', inputName).text(labelText))
        .append($('<input>').attr({ type: inputType, id: inputName, name: inputName, placeholder: placeholderText }));
}

export function showAlert(message, duration) {
    // Create alert div
    const $alertDiv = $('<div>').addClass('alert').text(message);
    $('body').append($alertDiv);

    // Show alert
    $alertDiv.fadeIn(500);      

    // Automatically close alert after specified duration
    setTimeout(function() {
        $alertDiv.fadeOut(500);
        // Remove alert from DOM after fade-out transition
        setTimeout(function() {
            $alertDiv.remove();
        }, 500); // Match this time with the CSS transition duration
    }, duration);
}

