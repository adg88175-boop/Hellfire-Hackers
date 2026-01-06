document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => {
        observer.observe(section);
    });

    // Page specific logic
    if (document.querySelector('.hero')) {
        // Landing Page
        const loginButton = document.querySelector('.btn-login');
        loginButton.addEventListener('click', () => {
            window.location.href = 'login.html';
        });

    } else if (document.querySelector('.login-container')) {
        // Login Page
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Mock login - in a real app, you'd use Firebase Auth
            window.location.href = 'dashboard.html';
        });

    } else if (document.querySelector('.dashboard-container')) {
        // Dashboard Page
        const timeButtons = document.querySelectorAll('.time-btn');
        const focusButtons = document.querySelectorAll('.focus-btn');
        const activityCards = document.querySelector('.activity-cards');

        let selectedTime = null;
        let selectedFocus = null;

        const recommendations = {
            '15': {
                'academic': [{ title: 'Flashcards', description: 'Review key concepts with flashcards.' }],
                'skill': [{ title: 'Quick Challenge', description: 'Complete a 5-minute coding challenge.' }],
                'collaboration': [{ title: 'Find a Partner', description: 'Post your availability for a quick chat.' }],
                'personal': [{ title: 'Breathing Exercise', description: 'Practice a 5-minute mindfulness exercise.' }]
            },
            '30': {
                'academic': [{ title: 'Quiz', description: 'Take a short quiz on your current subject.' }],
                'skill': [{ title: 'Watch a Tutorial', description: 'Watch a short video on a new skill.' }],
                'collaboration': [{ title: 'Peer Review', description: 'Review a classmate\'s work.' }],
                'personal': [{ title: 'Guided Meditation', description: 'Follow a guided meditation for relaxation.' }]
            },
            '60': {
                'academic': [{ title: 'Mini-Project', description: 'Start a small project on a new topic.' }],
                'skill': [{ title: 'Coding Project', description: 'Work on a personal coding project.' }],
                'collaboration': [{ title: 'Group Study', description: 'Join a virtual study group.' }],
                'personal': [{ title: 'Online Course', description: 'Start a lesson in an online course.' }]
            },
            '120': {
                'academic': [{ title: 'Deep Dive', description: 'In-depth study of a challenging topic.' }],
                'skill': [{ title: 'Build a Feature', description: 'Add a new feature to an existing project.' }],
                'collaboration': [{ title: 'Project Collaboration', description: 'Collaborate with a team on a project.' }],
                'personal': [{ title: 'Workshop', description: 'Participate in an online workshop.' }]
            }
        };

        timeButtons.forEach(button => {
            button.addEventListener('click', () => {
                selectedTime = button.dataset.time;
                updateRecommendations();
            });
        });

        focusButtons.forEach(button => {
            button.addEventListener('click', () => {
                selectedFocus = button.dataset.focus;
                updateRecommendations();
            });
        });

        function updateRecommendations() {
            if (selectedTime && selectedFocus) {
                const recommendedActivities = recommendations[selectedTime][selectedFocus];
                activityCards.innerHTML = '';
                recommendedActivities.forEach(activity => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <h3>${activity.title}</h3>
                        <p>${activity.description}</p>
                    `;
                    activityCards.appendChild(card);
                });
            }
        }

        const logoutButton = document.getElementById('logout-btn');
        logoutButton.addEventListener('click', () => {
            // Mock logout
            window.location.href = 'index.html';
        });
    }
});
