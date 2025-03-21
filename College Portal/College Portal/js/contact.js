document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        let isValid = true;

        // Validate Name
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            showError('name', 'Name is required.');
            isValid = false;
        } else {
            showSuccess('name');
        }

        // Validate Email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('email', 'Email is required.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Email is not valid.');
            isValid = false;
        } else {
            showSuccess('email');
        }

        // Validate Phone Number
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^[0-9]{10}$/;
        if (phone === '') {
            showError('phone', 'Phone number is required.');
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            showError('phone', 'Phone number must be 10 digits.');
            isValid = false;
        } else {
            showSuccess('phone');
        }

        // Validate Subject
        const subject = document.getElementById('subject').value.trim();
        if (subject === '') {
            showError('subject', 'Subject is required.');
            isValid = false;
        } else {
            showSuccess('subject');
        }

        // Validate Message
        const message = document.getElementById('message').value.trim();
        if (message === '') {
            showError('message', 'Message is required.');
            isValid = false;
        } else {
            showSuccess('message');
        }

        if (isValid) {
            alert('Form submitted successfully!');
            // Optionally, reset the form
            contactForm.reset();
        }
    }

    function showError(inputId, message) {
        const inputField = document.getElementById(inputId);
        const formGroup = inputField.parentElement;
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.innerText = message;
        } else {
            const errorElement = document.createElement('small');
            errorElement.classList.add('error-message');
            errorElement.innerText = message;
            formGroup.appendChild(errorElement);
        }
    }

    function showSuccess(inputId) {
        const inputField = document.getElementById(inputId);
        const formGroup = inputField.parentElement;
        formGroup.classList.remove('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
});
