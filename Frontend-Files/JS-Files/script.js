 // Search functionality
        function performSearch() {
            const searchInput = document.getElementById('searchInput');
            const query = searchInput.value.trim();
            
            if (query) {
                // Add search animation
                searchInput.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    searchInput.style.transform = 'scale(1)';
                }, 200);
                
                // Here you would typically redirect to search results
                console.log('Searching for:', query);
                alert(`Searching for: "${query}"\n\nThis will redirect to search results page when backend is connected.`);
            } else {
                searchInput.focus();
            }
        }

        // Set search from tags
        function setSearch(term) {
            const searchInput = document.getElementById('searchInput');
            searchInput.value = term;
            searchInput.focus();
        }

        // Enter key search
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Animated counter for stats
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start);
                }
            }, 16);
        }

        // Intersection Observer for stats animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(document.getElementById('notesCount'), 1247);
                    animateCounter(document.getElementById('studentsCount'), 89);
                    animateCounter(document.getElementById('subjectsCount'), 15);
                    animateCounter(document.getElementById('downloadsCount'), 3420);
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        statsObserver.observe(document.querySelector('.stats'));

        // Mobile menu toggle
        function toggleMobileMenu() {
            const navAuth = document.querySelector('.nav-auth');
            if (navAuth.style.display === 'flex') {
                navAuth.style.display = 'none';
            } else {
                navAuth.style.display = 'flex';
                navAuth.style.position = 'absolute';
                navAuth.style.top = '100%';
                navAuth.style.right = '2rem';
                navAuth.style.background = 'white';
                navAuth.style.padding = '1rem';
                navAuth.style.borderRadius = '8px';
                navAuth.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                navAuth.style.border = '1px solid #e5e5e5';
            }
        }

        // Auto-focus search on page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('searchInput').focus();
            }, 500);
        });


        //Popular Notes Section

        const mockNotes = [
            {
                id: 1,
                title: "Introduction to Calculus - Complete Chapter Notes",
                subject: "Mathematics",
                uploader: "Alex Johnson",
                uploadDate: "2024-01-15",
                downloads: 245,
                rating: 4.8,
                fileType: "PDF",
                isTrending: true
            },
            {
                id: 2,
                title: "Organic Chemistry Lab Manual with Solutions",
                subject: "Chemistry",
                uploader: "Sarah Chen",
                uploadDate: "2024-01-12",
                downloads: 189,
                rating: 4.6,
                fileType: "PDF",
                isTrending: false
            },
            {
                id: 3,
                title: "Physics - Quantum Mechanics Summary",
                subject: "Physics",
                uploader: "Michael Brown",
                uploadDate: "2024-01-10",
                downloads: 167,
                rating: 4.9,
                fileType: "DOC",
                isTrending: true
            },
            {
                id: 4,
                title: "Data Structures and Algorithms - Interview Prep",
                subject: "Computer Science",
                uploader: "Emma Davis",
                uploadDate: "2024-01-08",
                downloads: 298,
                rating: 4.7,
                fileType: "PDF",
                isTrending: false
            },
            {
                id: 5,
                title: "Biology - Cell Structure and Function",
                subject: "Biology",
                uploader: "Ryan Wilson",
                uploadDate: "2024-01-05",
                downloads: 134,
                rating: 4.5,
                fileType: "PPT",
                isTrending: false
            },
            {
                id: 6,
                title: "Economics - Microeconomics Principles",
                subject: "Economics",
                uploader: "Lisa Garcia",
                uploadDate: "2024-01-03",
                downloads: 156,
                rating: 4.4,
                fileType: "PDF",
                isTrending: false
            }
        ];

        let currentNotesCount = 0;
        const notesPerLoad = 3;

        function createNoteCard(note) {
            const stars = '★'.repeat(Math.floor(note.rating)) + '☆'.repeat(5 - Math.floor(note.rating));
            
            return `
                <div class="note-card" onclick="viewNote(${note.id})">
                    ${note.isTrending ? '<div class="trending-badge">Trending</div>' : ''}
                    <div class="file-type">${note.fileType}</div>
                    <div class="note-header">
                        <div class="note-subject">${note.subject}</div>
                        <h3 class="note-title">${note.title}</h3>
                    </div>
                    <div class="note-meta">
                        <div class="note-stats">
                            <div class="stat-item">
                                <span>📥</span>
                                <span>${note.downloads}</span>
                            </div>
                            <div class="rating">
                                <span class="stars">${stars}</span>
                                <span>${note.rating}</span>
                            </div>
                        </div>
                        <div class="note-author">
                            by ${note.uploader}
                        </div>
                    </div>
                </div>
            `;
        }

        function loadMoreNotes() {
            const loading = document.getElementById('loading');
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            const notesGrid = document.getElementById('notesGrid');

            // Show loading state
            loading.classList.remove('hidden');
            loadMoreBtn.style.display = 'none';

            // Simulate API call delay
            setTimeout(() => {
                const notesToShow = mockNotes.slice(currentNotesCount, currentNotesCount + notesPerLoad);
                
                notesToShow.forEach(note => {
                    const noteCard = createNoteCard(note);
                    notesGrid.innerHTML += noteCard;
                });

                currentNotesCount += notesPerLoad;

                // Hide loading state
                loading.classList.add('hidden');
                
                // Show load more button if there are more notes
                if (currentNotesCount < mockNotes.length) {
                    loadMoreBtn.style.display = 'inline-block';
                } else {
                    loadMoreBtn.innerHTML = 'No more notes to load';
                    loadMoreBtn.disabled = true;
                    loadMoreBtn.style.opacity = '0.5';
                }
            }, 1000);
        }

        function viewNote(noteId) {
            const note = mockNotes.find(n => n.id === noteId);
            if (note) {
                // Add click animation
                event.currentTarget.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    event.currentTarget.style.transform = 'translateY(-5px)';
                }, 100);

                // In a real app, this would navigate to the note detail page
                alert(`Opening note: "${note.title}"\n\nThis would open the note details page when the backend is connected.`);
            }
        }

        // Initialize the section with first batch of notes
        document.addEventListener('DOMContentLoaded', function() {
            loadMoreNotes();
        });

        // Add hover effect for note cards
        document.addEventListener('DOMContentLoaded', function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            });

            // Observe all note cards for animation
            setTimeout(() => {
                document.querySelectorAll('.note-card').forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(card);
                });
            }, 100);
        });