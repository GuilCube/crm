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
    const dropbtn = $('<span>').addClass('dropbtn').text('▼');
    inputContainer.append(dropbtn);
    
    // Create and append the dropdown content
    const dropdownContent = $('<div>').addClass('dropdown-content');
    dropdownOptions.forEach(option => {
        const span = $('<a>').data('value', option).text(option).attr('readonly',true);
        dropdownContent.append(span);
    });
    inputContainer.append(dropdownContent);
    
    // Append the input container to the main container
    container.append(inputContainer);
    
    return container;
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

