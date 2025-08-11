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

        // Search functionality
        document.querySelector('.search-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    // Update search results
                    document.querySelector('.search-query').textContent = `Results for "${query}"`;
                    console.log(`Searching for: "${query}"`);
                }
            }
        });


const mockNotes = [
    {
        id: 1,
        title: "Machine Learning Fundamentals - Complete Guide",
        author: "Sarah Chen",
        university: "Stanford University",
        subject: "Computer Science",
        date: "2 weeks ago",
        rating: 4.8,
        reviews: 24,
        description: "Comprehensive notes covering supervised learning, unsupervised learning, neural networks, and practical applications. Includes examples, algorithms, and real-world case studies perfect for beginners and intermediate students.",
        views: 342,
        downloads: 187,
        likes: 89,
        pages: 45,
        type: "notes"
    },
    {
        id: 2,
        title: "Advanced Machine Learning Algorithms",
        author: "Michael Rodriguez",
        university: "MIT",
        subject: "Computer Science",
        date: "1 week ago",
        rating: 4.6,
        reviews: 18,
        description: "Deep dive into advanced ML algorithms including SVM, random forests, gradient boosting, and ensemble methods. Perfect for advanced students with mathematical proofs and implementation details.",
        views: 256,
        downloads: 143,
        likes: 67,
        pages: 62,
        type: "notes"
    },
    {
        id: 3,
        title: "Machine Learning with Python - Practical Examples",
        author: "Emily Wang",
        university: "UC Berkeley",
        subject: "Computer Science",
        date: "3 days ago",
        rating: 4.9,
        reviews: 31,
        description: "Hands-on guide to machine learning using Python libraries like scikit-learn, TensorFlow, and pandas. Includes code examples, datasets, and step-by-step tutorials for building ML models.",
        views: 189,
        downloads: 98,
        likes: 45,
        pages: 38,
        type: "notes"
    },
    {
        id: 4,
        title: "Deep Learning and Neural Networks",
        author: "David Kim",
        university: "Carnegie Mellon",
        subject: "Computer Science",
        date: "5 days ago",
        rating: 4.7,
        reviews: 22,
        description: "Comprehensive coverage of deep learning concepts, neural network architectures, backpropagation, and modern deep learning frameworks. Includes CNN, RNN, and transformer architectures.",
        views: 298,
        downloads: 156,
        likes: 78,
        pages: 54,
        type: "notes"
    },
    {
        id: 5,
        title: "Statistical Learning Theory",
        author: "Lisa Anderson",
        university: "Harvard",
        subject: "Statistics",
        date: "1 week ago",
        rating: 4.5,
        reviews: 15,
        description: "Mathematical foundations of machine learning from a statistical perspective. Covers PAC learning, VC dimension, and generalization bounds.",
        views: 234,
        downloads: 89,
        likes: 56,
        pages: 67,
        type: "notes"
    },
    {
        id: 6,
        title: "Linear Algebra for Machine Learning",
        author: "Robert Johnson",
        university: "Princeton",
        subject: "Mathematics",
        date: "4 days ago",
        rating: 4.8,
        reviews: 28,
        description: "Essential linear algebra concepts for ML including eigenvalues, eigenvectors, matrix decompositions, and their applications in dimensionality reduction and optimization.",
        views: 345,
        downloads: 201,
        likes: 112,
        pages: 43,
        type: "notes"
    }
];

let currentResults = [...mockNotes];
let currentPage = 1;
let resultsPerPage = 5;
let currentFilter = 'all';

// Create result card HTML
function createResultCard(note) {
    const stars = '★'.repeat(Math.floor(note.rating)) + '☆'.repeat(5 - Math.floor(note.rating));
    
    return `
        <div class="result-card" onclick="viewNote(${note.id})">
            <div class="result-header">
                <div>
                    <a href="#" class="result-title">${note.title}</a>
                    <div class="result-author">by ${note.author} • ${note.university}</div>
                </div>
                <div class="result-rating">
                    <span class="stars">${stars}</span>
                    <span>${note.rating} (${note.reviews})</span>
                </div>
            </div>
            <div class="result-meta">
                <span class="result-subject">${note.subject}</span>
                <span class="result-date">${note.date}</span>
                <span class="result-university">${note.university}</span>
            </div>
            <div class="result-description">
                ${note.description}
            </div>
            <div class="result-stats">
                <div class="result-stat">
                    <span>👀</span>
                    <span>${note.views} views</span>
                </div>
                <div class="result-stat">
                    <span>📥</span>
                    <span>${note.downloads} downloads</span>
                </div>
                <div class="result-stat">
                    <span>❤️</span>
                    <span>${note.likes} likes</span>
                </div>
                <div class="result-stat">
                    <span>📄</span>
                    <span>${note.pages} pages</span>
                </div>
            </div>
            <div class="result-actions">
                <a href="#" class="action-btn primary" onclick="downloadNote(${note.id}); event.stopPropagation();">
                    📥 Download
                </a>
                <a href="#" class="action-btn" onclick="previewNote(${note.id}); event.stopPropagation();">
                    👁️ Preview
                </a>
                <a href="#" class="action-btn" onclick="likeNote(${note.id}); event.stopPropagation();">
                    ❤️ Like
                </a>
            </div>
        </div>
    `;
}

// Create pagination HTML
function createPagination() {
    const totalPages = Math.ceil(currentResults.length / resultsPerPage);
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `<a href="#" class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>← Previous</a>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<a href="#" class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</a>`;
    }
    
    // Next button
    paginationHTML += `<a href="#" class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next →</a>`;
    
    return `<div class="pagination">${paginationHTML}</div>`;
}

// Render results
function renderResults() {
    const resultsSection = document.getElementById('resultsSection');
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const pageResults = currentResults.slice(startIndex, endIndex);
    
    let html = '';
    pageResults.forEach(note => {
        html += createResultCard(note);
    });
    
    html += createPagination();
    resultsSection.innerHTML = html;
    
    // Update search stats
    updateSearchStats();
}

// Update search statistics
function updateSearchStats() {
    const searchStats = document.getElementById('searchStats');
    searchStats.textContent = `About ${currentResults.length} results (0.23 seconds)`;
}

// Filter results by type
function filterResults(filterType) {
    currentFilter = filterType;
    currentPage = 1;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Apply filter
    if (filterType === 'all') {
        currentResults = [...mockNotes];
    } else if (filterType === 'notes') {
        currentResults = mockNotes.filter(note => note.type === 'notes');
    } else if (filterType === 'recent') {
        currentResults = [...mockNotes].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
    } else if (filterType === 'most-downloaded') {
        currentResults = [...mockNotes].sort((a, b) => b.downloads - a.downloads);
    } else {
        currentResults = [...mockNotes];
    }
    
    // Apply subject filters
    filterBySubject();
}

// Filter by subject checkboxes
function filterBySubject() {
    const checkedSubjects = [];
    document.querySelectorAll('.subject-checkbox:checked').forEach(checkbox => {
        const subjectName = checkbox.nextElementSibling.textContent;
        checkedSubjects.push(subjectName);
    });
    
    if (checkedSubjects.length === 0) {
        currentResults = [];
    } else {
        // Start with base filter results
        let baseResults = [...mockNotes];
        
        if (currentFilter === 'notes') {
            baseResults = mockNotes.filter(note => note.type === 'notes');
        } else if (currentFilter === 'recent') {
            baseResults = [...mockNotes].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });
        } else if (currentFilter === 'most-downloaded') {
            baseResults = [...mockNotes].sort((a, b) => b.downloads - a.downloads);
        }
        
        // Apply subject filter
        currentResults = baseResults.filter(note => checkedSubjects.includes(note.subject));
    }
    
    currentPage = 1;
    renderResults();
}

// Search functionality
function searchNotes(query) {
    const searchQuery = query.toLowerCase();
    document.getElementById('searchQuery').textContent = `Results for "${query}"`;
    
    currentResults = mockNotes.filter(note => 
        note.title.toLowerCase().includes(searchQuery) ||
        note.author.toLowerCase().includes(searchQuery) ||
        note.subject.toLowerCase().includes(searchQuery) ||
        note.description.toLowerCase().includes(searchQuery)
    );
    
    currentPage = 1;
    renderResults();
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(currentResults.length / resultsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderResults();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Note actions
function viewNote(noteId) {
    const note = mockNotes.find(n => n.id === noteId);
    console.log(`Viewing note: ${note.title}`);
}

function downloadNote(noteId) {
    const note = mockNotes.find(n => n.id === noteId);
    console.log(`Downloading: ${note.title}`);
    // Increment download count
    note.downloads++;
    renderResults();
}

function previewNote(noteId) {
    const note = mockNotes.find(n => n.id === noteId);
    // note.previewNote++; not working
    console.log(`Previewing: ${note.title}`);
}

function likeNote(noteId) {
    const note = mockNotes.find(n => n.id === noteId);
    console.log(`Liking: ${note.title}`);
    // Increment like count
    note.likes++;
    renderResults();
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderResults();
    
    // Add event listeners for related searches
    document.querySelectorAll('.related-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('.related-title').textContent;
            searchNotes(searchTerm);
        });
    });
});

// Infinite scroll (optional)
// let isLoading = false;
// window.addEventListener('scroll', function() {
//     if (isLoading) return;
    
//     const scrollTop = window.pageYOffset;
//     const windowHeight = window.innerHeight;
//     const documentHeight = document.documentElement.scrollHeight;
    
//     if (scrollTop + windowHeight >= documentHeight - 100) {
//         const totalPages = Math.ceil(currentResults.length / resultsPerPage);
//         if (currentPage < totalPages) {
//             isLoading = true;
//             setTimeout(() => {
//                 currentPage++;
//                 renderResults();
//                 isLoading = false;
//             }, 500);
//         }
//     }
// });