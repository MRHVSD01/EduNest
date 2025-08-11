//For security purpose can't directly open this file from  URL

// const { response } = require("express");

        // Clear session when browser/tab is closed
    // window.addEventListener('beforeunload', function() {
    //     localStorage.removeItem('token');
    // });


    window.onload = function(){
        const profileName = document.getElementById('profile-fullname');
        const profileUniversity = document.getElementById('profile-universityName');
        const userProfileName = document.getElementById('user-profileName');

        const token = localStorage.getItem('token');

        if(!token){
            window.location.href = '/signin';
            return;
        }

        fetch('/api/verify-session', {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data =>{
            if(!data.success){
                localStorage.removeItem('token');
                window.location.href = '/signin';
            }
            console.log("Welcome", data.user);
            const firstName = data.user.firstName;
            let university = data.user.university;

            profileName.innerText = firstName;
            profileUniversity.innerText = university;
            userProfileName.innerText = firstName;

            // window.location.href = '/Dashboard';
        });
    };


    function logout(){
        const token =  localStorage.getItem('token');

         if (!token) {
            alert("Already logged out");
            window.location.href = '/signin';
            return;
        }
        
        fetch('/api/logout', {
            // method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then(data =>{
            if(data.success){
                localStorage.removeItem('token');
                window.location.href = '/';
            }else{
                alert(data.message || 'Logout Failed');
            }
        })
        .catch(error =>{
            console.error("Error:", error);

            localStorage.removeItem('token');
            window.location.href = '/';
        })
    }

function toggleDropdown() {
            const dropdown = document.getElementById('profileDropdown');
            dropdown.classList.toggle('show');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('profileDropdown');
            const profileBtn = document.querySelector('.profile-btn');
            
            if (!profileBtn.contains(event.target)) {
                dropdown.classList.remove('show');
            }
        });

//Temporary Search result;
        

        // Search functionality
        document.querySelector('.search-input').addEventListener('keypress', function(e) {
            const searchvalue = document.querySelector('.search-input').value;
            if(searchvalue == "machine learning"){
                window.open("SearchResult.html", "_blank");
            }else if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    alert(`Searching for: "${query}"`);
                    // In a real app, you would redirect to search results
                }
            }
        });

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Dashboard loaded');
            
            // Add smooth scrolling for internal links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });