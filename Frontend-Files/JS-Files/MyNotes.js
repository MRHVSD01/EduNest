// // JS-Files/MyNotes.js

// window.onload = function () {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     window.location.href = "/signin";
//     return;
//   }

//   // Load profile info (reuse from Dashboard.js)
//   fetch("/api/verify-session", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data.success) {
//         localStorage.removeItem("token");
//         window.location.href = "/signin";
//         return;
//       }

//       document.getElementById("profile-fullname").innerText =
//         data.user.firstName;
//       document.getElementById("profile-universityName").innerText =
//         data.user.university;

//       // Now fetch user's notes
//       fetchMyNotes(token);
//     })
//     .catch((err) => console.error("Error verifying session:", err));
// };

// function fetchMyNotes(token) {
//   const container = document.getElementById("myNotesContainer");

//   fetch("/api/notes/my", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       container.innerHTML = ""; // Clear old content
//       if (data.notes.length === 0) {
//         container.innerHTML = `<p style="color:#7f8c8d;">You haven't uploaded any notes yet.</p>`;
//         return;
//       }

//       data.notes.forEach((note) => {
//         const noteCard = document.createElement("div");
//         noteCard.classList.add("note-card");
//         noteCard.innerHTML = `
//           <div class="note-title">${note.title}</div>
//           <div class="note-meta">
//             <span class="note-subject">${note.subject}</span>
//             <span>${new Date(note.createdAt).toLocaleDateString()}</span>
//           </div>
//           <div class="note-stats">
//             <div class="note-stat"><span>📥</span> <span>${
//               note.downloads
//             } downloads</span></div>
//             <div class="note-stat"><span>❤️</span> <span>${
//               note.likes
//             } likes</span></div>
//           </div>
//           <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
//             <button class="btn btn-primary" onclick="viewNote('${
//               note._id
//             }')">👁 View</button>
//             <button class="btn" style="background:#f1f2f6;" onclick="editNote('${
//               note._id
//             }')">✏️ Edit</button>
//             <button class="btn" style="background:#ffe6e6; color:#dc3545;" onclick="deleteNote('${
//               note._id
//             }')">🗑 Delete</button>
//           </div>
//         `;
//         container.appendChild(noteCard);
//       });
//     })
//     .catch((err) => {
//       console.error("Error loading notes:", err);
//       container.innerHTML = `<p style="color:red;">Failed to load notes. Please try again later.</p>`;
//     });
// }

// // Actions
// function viewNote(id) {
//   window.location.href = `/note/${id}`;
// }

// function editNote(id) {
//   window.location.href = `/edit-note/${id}`;
// }

// function deleteNote(id) {
//   if (confirm("Are you sure you want to delete this note?")) {
//     const token = localStorage.getItem("token");
//     fetch(`/api/notes/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           alert("Note deleted successfully!");
//           window.location.reload();
//         } else {
//           alert(data.message || "Error deleting note");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Something went wrong!");
//       });
//   }
// }

// JS-Files/MyNotes.js

window.onload = function () {
  const token = localStorage.getItem("token");

  // Load profile info
  if (token) {
    fetch("/api/verify-session", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          localStorage.removeItem("token");
          return;
        }

        document.getElementById("profile-fullname").innerText =
          data.user.firstName;
        document.getElementById("profile-universityName").innerText =
          data.user.university;

        fetchMyNotes(token);
      })
      .catch((err) => console.error(err));
  } else {
    // No token, still show demo notes
    fetchMyNotes(null);
  }
};

function fetchMyNotes(token) {
  const container = document.getElementById("myNotesContainer");
  container.innerHTML = "";

  fetch("/api/notes/my", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success || !data.notes) {
        container.innerHTML = `<p style="color:red;">Failed to load notes</p>`;
        return;
      }

      data.notes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
        noteCard.innerHTML = `
          <div class="note-title">${note.title}</div>
          <div class="note-meta">
            <span class="note-subject">${note.subject}</span>
            <span>${new Date(note.uploadAt).toLocaleDateString()}</span>
          </div>
          <div class="note-stats">
            <div class="note-stat">📥 ${note.downloads || 0} downloads</div>
            <div class="note-stat">❤️ ${note.likes || 0} likes</div>
          </div>
        `;
        container.appendChild(noteCard);
      });
    })
    .catch((err) => {
      console.error(err);
      container.innerHTML = `<p style="color:red;">Failed to load notes</p>`;
    });
}
