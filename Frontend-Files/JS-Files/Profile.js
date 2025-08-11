window.onload = function () {
  const profileName = document.getElementById("profile-fullname");
  const profileUniversity = document.getElementById("profile-universityName");
  const userEmail = document.getElementById('user-email');
  const userProfileName = document.getElementById("user-profileName");

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/signin";
    return;
  }

  fetch("/api/verify-session", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        localStorage.removeItem("token");
        window.location.href = "/signin";
      }
      console.log("Welcome", data.user);
      const firstName = data.user.fullName;
      let university = data.user.university;
      const email = data.user.email;

      profileName.innerText = firstName;
      profileUniversity.innerText = university;
      userEmail.innerText = email;

      // window.location.href = '/Dashboard';
    });
};

function toggleEdit(section) {
  const display = document.getElementById(section + "Display");
  const edit = document.getElementById(section + "Edit");

  display.style.display = "none";
  edit.style.display = "block";
}

function cancelEdit(section) {
  const display = document.getElementById(section + "Display");
  const edit = document.getElementById(section + "Edit");

  display.style.display = "block";
  edit.style.display = "none";
}

function saveAbout() {
  const textarea = document.getElementById("aboutText");
  const display = document.getElementById("aboutDisplay");

  // Convert textarea content to paragraphs
  const paragraphs = textarea.value.split("\n\n").filter((p) => p.trim());
  display.innerHTML = paragraphs
    .map((p) => `<p class="about-text">${p.trim()}</p>`)
    .join("");

  cancelEdit("about");

  // Show success message
  alert("Profile updated successfully!");
}

function switchTab(tabName) {
  // Remove active class from all tabs and content
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  // Add active class to clicked tab and corresponding content
  event.target.classList.add("active");
  document.getElementById(tabName).classList.add("active");
}

function uploadAvatar() {
  // Create file input
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = function (e) {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload the file to your server
      alert("Avatar upload functionality would be implemented here!");
    }
  };

  input.click();
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  // Add any initialization code here
  console.log("Profile page loaded");
});
