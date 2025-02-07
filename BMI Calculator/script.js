document.getElementById('bmi-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters

    // Calculate BMI
    let bmi = weight / (height * height);

    // Show result
    let resultElement = document.getElementById('result');
    resultElement.textContent = `Your BMI is: ${bmi.toFixed(2)}`;

    // Classify BMI
    if (bmi < 18.5) {
        resultElement.textContent += " - Underweight";
        resultElement.style.color = 'blue';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        resultElement.textContent += " - Normal weight";
        resultElement.style.color = 'green';
    } else if (bmi >= 25 && bmi < 29.9) {
        resultElement.textContent += " - Overweight";
        resultElement.style.color = 'orange';
    } else {
        resultElement.textContent += " - Obese";
        resultElement.style.color = 'red';
    }
});
