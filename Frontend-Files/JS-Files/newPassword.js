const pathParts = window.location.pathname.split('/');
const token = pathParts[pathParts.length - 1];

const form = document.getElementById('newPasswordForm');

form.addEventListener('submit', async (e)=>{
    e.preventDefault(); // this line prevent the page to reload...

    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if(password !== confirmPassword){
        alert('password do not Match');
        return;
    }

    const pathParts = window.location.pathname.split('/');
    const token = pathParts[pathParts.length-1];

    fetch(`/api/reset-password/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password:password})  
    }).then(response => response.json())
    .then(data => {
        alert(data.message);
        if(data.message.toLowerCase().includes("success")){
            window.location.href = '/signin';
        }
    }).catch(err =>{
        console.log('Error:', err);
        alert('Something went wrong please try again.')
    })
})



function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const button = input.nextElementSibling;
            
            if (input.type === 'password') {
                input.type = 'text';
                button.textContent = '🙈';
            } else {
                input.type = 'password';
                button.textContent = '👁️';
            }
        }

        function checkPasswordRequirements(password) {
            const requirements = {
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /\d/.test(password),
                special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
            };

            // Update requirement indicators
            updateRequirement('lengthReq', requirements.length);
            updateRequirement('uppercaseReq', requirements.uppercase);
            updateRequirement('lowercaseReq', requirements.lowercase);
            updateRequirement('numberReq', requirements.number);
            updateRequirement('specialReq', requirements.special);

            return requirements;
        }

        function updateRequirement(elementId, isValid) {
            const element = document.getElementById(elementId);
            const icon = element.querySelector('.requirement-icon');
            
            if (isValid) {
                element.classList.add('valid');
                element.classList.remove('invalid');
                icon.textContent = '✓';
            } else {
                element.classList.add('invalid');
                element.classList.remove('valid');
                icon.textContent = '○';
            }
        }

        function calculatePasswordStrength(password) {
            const requirements = checkPasswordRequirements(password);
            const validCount = Object.values(requirements).filter(Boolean).length;
            
            const strengthBar = document.getElementById('strengthProgress');
            const strengthText = document.getElementById('strengthText');
            
            // Remove all classes
            strengthBar.className = 'strength-progress';
            strengthText.className = 'strength-text';
            
            if (validCount === 0) {
                strengthText.textContent = 'Password strength';
            } else if (validCount <= 2) {
                strengthBar.classList.add('weak');
                strengthText.classList.add('weak');
                strengthText.textContent = 'Weak';
            } else if (validCount === 3) {
                strengthBar.classList.add('fair');
                strengthText.classList.add('fair');
                strengthText.textContent = 'Fair';
            } else if (validCount === 4) {
                strengthBar.classList.add('good');
                strengthText.classList.add('good');
                strengthText.textContent = 'Good';
            } else if (validCount === 5) {
                strengthBar.classList.add('strong');
                strengthText.classList.add('strong');
                strengthText.textContent = 'Strong';
            }
            
            return validCount === 5;
        }

        // Password validation
        document.getElementById('newPassword').addEventListener('input', function() {
            const password = this.value;
            const isStrong = calculatePasswordStrength(password);
            
            // Clear confirm password validation when new password changes
            const confirmPassword = document.getElementById('confirmPassword');
            if (confirmPassword.value) {
                validatePasswordMatch();
            }
        });

        function validatePasswordMatch() {
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const confirmError = document.getElementById('confirmError');
            
            if (confirmPassword && password !== confirmPassword) {
                confirmError.textContent = 'Passwords do not match';
                confirmError.style.display = 'block';
                return false;
            } else {
                confirmError.style.display = 'none';
                return true;
            }
        }

        document.getElementById('confirmPassword').addEventListener('input', validatePasswordMatch);

        // Form submission
        document.getElementById('newPasswordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const submitBtn = document.getElementById('submitBtn');
            const loadingMessage = document.getElementById('loadingMessage');
            const successMessage = document.getElementById('successMessage');
            const passwordError = document.getElementById('passwordError');

            // Hide previous messages
            passwordError.style.display = 'none';
            successMessage.style.display = 'none';

            // Validate password strength
            const requirements = checkPasswordRequirements(password);
            const isStrong = Object.values(requirements).every(Boolean);
            
            if (!isStrong) {
                passwordError.textContent = 'Please meet all password requirements';
                passwordError.style.display = 'block';
                return;
            }

            // Validate password match
            if (!validatePasswordMatch()) {
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.style.display = 'none';
            loadingMessage.style.display = 'block';

            // Simulate API call
            setTimeout(() => {
                // Hide loading
                loadingMessage.style.display = 'none';
                
                // Show success message
                successMessage.style.display = 'block';
                
                // Redirect after showing success
                setTimeout(() => {
                    window.location.href = 'signin.html';
                }, 2000);
                
                // Scroll to top to show success message
                document.querySelector('.newpassword-card').scrollIntoView({ behavior: 'smooth' });
            }, 2000);
        });

        // Initialize password requirements display
        document.addEventListener('DOMContentLoaded', function() {
            checkPasswordRequirements('');
        });