document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            contentSections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // Show the first section by default
    if (contentSections.length > 0) {
        contentSections[0].classList.add('active');
    }

    // Handle form submissions
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const portfolioForm = document.getElementById('portfolioForm');
    const portfolioDisplay = document.getElementById('portfolioDisplay');
    const displayAboutMe = document.getElementById('displayAboutMe');
    const displayProjects = document.getElementById('displayProjects');
    const displaySkills = document.getElementById('displaySkills');

    // Function to save user data to local storage
    function saveUserData(username, data) {
        localStorage.setItem(username, JSON.stringify(data));
    }

    // Function to retrieve user data from local storage
    function getUserData(username) {
        return JSON.parse(localStorage.getItem(username));
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;
            const fullName = document.getElementById('fullName').value;
            const bio = document.getElementById('bio').value;

            // Save user data to local storage
            saveUserData(username, { password, email, fullName, bio, portfolio: {} });
            alert('Registration successful! Please log in.');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            // Retrieve user data and verify credentials
            const userData = getUserData(username);
            if (userData && userData.password === password) {
                alert('Login successful!');
                // Show create portfolio section
                document.querySelector('.nav-link[href="#create"]').click();
                portfolioForm.dataset.username = username;
            } else {
                alert('Invalid username or password');
            }
        });
    }

    if (portfolioForm) {
        portfolioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = portfolioForm.dataset.username;
            const aboutMe = document.getElementById('aboutMe').value;
            const projects = document.getElementById('projects').value;
            const skills = document.getElementById('skills').value;

            // Retrieve user data, update portfolio, and save back to local storage
            const userData = getUserData(username);
            userData.portfolio = { aboutMe, projects, skills };
            saveUserData(username, userData);

            // Display portfolio
            displayAboutMe.textContent = 'About Me: ' + aboutMe;
            displayProjects.textContent = 'Projects: ' + projects;
            displaySkills.textContent = 'Skills: ' + skills;
            portfolioDisplay.style.display = 'block';
        });
    }
});
