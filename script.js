// script.js
function displayText() {
    // Get the input value
    var input = document.getElementById('textInput').value;
    
    // Get the display box element
    var textBox = document.getElementById('textBox');
    
    // Set the text content of the display box
    textBox.textContent = input;
}
