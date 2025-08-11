// Form validation and submission
        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });

        function validateForm() {
            let isValid = true;
            
            // Reset all error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
                el.textContent = '';
            });

            // Validate required fields
            const requiredFields = ['firstName', 'lastName', 'email', 'university', 'password', 'confirmPassword'];
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    showError(field, 'This field is required');
                    isValid = false;
                }
            });

            // Validate email format
            const email = document.getElementById('email').value;
            if (email && !isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate password strength
            const password = document.getElementById('password').value;
            if (password && !isStrongPassword(password)) {
                showError('password', 'Password must be at least 8 characters with uppercase, lowercase, and numbers');
                isValid = false;
            }

            // Validate password confirmation
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }

            // Validate terms agreement
            if (!document.getElementById('terms').checked) {
                alert('Please accept the Terms of Service and Privacy Policy');
                isValid = false;
            }

            return isValid;
        }

        function showError(fieldId, message) {
            const errorElement = document.getElementById(fieldId + 'Error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function isStrongPassword(password) {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /\d/.test(password);
            const hasMinLength = password.length >= 8;
            
            return hasUpperCase && hasLowerCase && hasNumbers && hasMinLength;
        }

        // function submitForm() {
        //     const submitBtn = document.getElementById('submitBtn');
        //     const loadingMessage = document.getElementById('loadingMessage');
        //     const successMessage = document.getElementById('successMessage');
            
        //     // Show loading state
        //     submitBtn.disabled = true;
        //     submitBtn.textContent = 'Creating Account...';
        //     loadingMessage.style.display = 'block';
            
        //     // Simulate API call
        //     setTimeout(() => {
        //         // Hide loading state
        //         loadingMessage.style.display = 'none';
        //         submitBtn.disabled = false;
        //         submitBtn.textContent = 'Create Account';
                
        //         // Show success message
        //         successMessage.style.display = 'block';
                
        //         // Reset form
        //         document.getElementById('signupForm').reset();
                
        //         // Hide success message after 3 seconds
        //         setTimeout(() => {
        //             successMessage.style.display = 'none';
        //         }, 3000);
                
        //     }, 2000);
        // }

        function submitForm() {
    const submitBtn = document.getElementById('submitBtn');
    const loadingMessage = document.getElementById('loadingMessage');
    const successMessage = document.getElementById('successMessage');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Account...';
    loadingMessage.style.display = 'block';
    
    // Get form data
    const formData = new FormData(document.getElementById('signupForm'));
    
    // Convert FormData to regular object
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Send actual request to server
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject)
    })
    .then(response => response.json())
    .then(data => {
        // Hide loading state
        loadingMessage.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
        
        if (data.success) {
            // Show success message
            successMessage.textContent = data.message;
            successMessage.style.display = 'block';
            
            // Reset form
            document.getElementById('signupForm').reset();
            
            // Optional: Redirect to dashboard after success
            setTimeout(() => {
                window.location.href = '/signin';
            }, 2000);
            
        } else {
            // Show error message
            alert(data.message || 'Registration failed. Please try again.');
        }
    })
    .catch(error => {
        // Hide loading state
        loadingMessage.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
        
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}



        // Password toggle functionality
        function togglePassword(fieldId) {
            const passwordField = document.getElementById(fieldId);
            const toggleBtn = passwordField.nextElementSibling;
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleBtn.textContent = '🙈';
            } else {
                passwordField.type = 'password';
                toggleBtn.textContent = '👁️';
            }
        }

        // Password strength indicator
        document.getElementById('password').addEventListener('input', function() {
            const password = this.value;
            const strengthIndicator = document.getElementById('passwordStrength');
            
            if (!password) {
                strengthIndicator.textContent = '';
                return;
            }
            
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /\d/.test(password);
            const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const hasMinLength = password.length >= 8;
            
            const score = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars, hasMinLength].filter(Boolean).length;
            
            if (score < 3) {
                strengthIndicator.textContent = 'Weak password';
                strengthIndicator.className = 'password-strength strength-weak';
            } else if (score < 5) {
                strengthIndicator.textContent = 'Medium password';
                strengthIndicator.className = 'password-strength strength-medium';
            } else {
                strengthIndicator.textContent = 'Strong password';
                strengthIndicator.className = 'password-strength strength-strong';
            }
        });

        // Social signup functions
        function signupWithGoogle() {
            alert('Google signup integration will be implemented with backend');
        }

        function signupWithFacebook() {
            alert('Facebook signup integration will be implemented with backend');
        }

        // Auto-focus first field on page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('firstName').focus();
            }, 300);
        });