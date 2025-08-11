 // Form validation and submission
        document.getElementById('signinForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });

        function validateForm() {
            let isValid = true;
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
                el.textContent = '';
            });

            // Validate email
            const email = document.getElementById('email').value.trim();
            if (!email) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate password
            const password = document.getElementById('password').value;
            if (!password) {
                showError('password', 'Password is required');
                isValid = false;
            } else if (password.length < 6) {
                showError('password', 'Password must be at least 6 characters');
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

        function submitForm() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const submitBtn = document.getElementById('submitBtn');
            const loadingMessage = document.getElementById('loadingMessage');
            const successMessage = document.getElementById('successMessage');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Signing In...';
            loadingMessage.style.display = 'block';
            
            // ready the form data
            const formData = {
                email: email,
                password: password
            };

            // Simulate API call

            fetch('/api/login', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(Response => Response.json())
            .then(data => { 
                // Hide loading
                loadingMessage.style.display = 'none';
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign In';
                if(data.success){
                    //Store the token in the local storage
                   localStorage.setItem('token', data.token);
                    setTimeout(() => {
                        window.location.href = '/Dashboard'
                    }, 2000);
                }else{
                    alert(data.message || 'Signin failed. Please try again.');
                }
            })
            .catch(error => {
                 // Hide loading
                loadingMessage.style.display = 'none';
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign In';
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        }

        // Password toggle functionality
        function togglePassword() {
            const passwordField = document.getElementById('password');
            const toggleBtn = document.querySelector('.password-toggle');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleBtn.textContent = '🙈';
            } else {
                passwordField.type = 'password';
                toggleBtn.textContent = '👁️';
            }
        }

        // Enter key support
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('signinForm').dispatchEvent(new Event('submit'));
            }
        });

        // Social signin functions
        function signinWithGoogle() {
            alert('Google sign-in integration will be implemented with backend');
        }

        function signinWithFacebook() {
            alert('Facebook sign-in integration will be implemented with backend');
        }

        // Auto-focus email field on page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('email').focus();
            }, 300);
        });

        
        
       