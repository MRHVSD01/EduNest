function toggleDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.classList.toggle("show");
}

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


// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("profileDropdown");
  const profileBtn = document.querySelector(".profile-btn");

  if (!profileBtn.contains(event.target)) {
    dropdown.classList.remove("show");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Debug: Check if upload area exists
  const uploadElement = document.getElementById("uploadArea");

  // Debug: Check Dropzone CSS
  const dzStyles = window.getComputedStyle(uploadElement);

  //making & configuration of my Dropzone...
  const myDropzone = new Dropzone("#uploadArea", {
    url: "/api/upload-notes",
    // url: "https://httpbin.org/post",  // server link that al;lways give success message.
    dictDefaultMessage: "📄 Click here or drag files to upload",
    maxFilesize: 5, // 5MB limit
    acceptedFiles: ".pdf", // Only PDF files
    maxFiles: 5, // Max 5 files at once
    addRemoveLinks: true, // Show remove buttons
    autoProcessQueue: false,
    previewTemplate: '<div style="display:none;"></div>'
  });

  // if (!uploadElement.querySelector(".dz-message")) {
  //   uploadElement.innerHTML = '<div class="dz-message">📄 Click here or drag files to upload</div>';
  // }

  if (!uploadElement.querySelector(".dz-message")) {
    uploadElement.innerHTML = `
            <div class="upload-icon">📄</div>
            <h3>Drag & Drop your PDF files here</h3>
            <p>or click to browse</p>
            <p class="upload-info">Maximum file size: 5MB | Supported formats: PDF only</p>
    `;
}

  const uploadBtn = document.getElementById("upload-Btn");
  const resetBtn = document.getElementById("reset-Btn");

  //Event handlers of my Dropzonee.....
  myDropzone.on("addedfile", function (file) {
    console.log("File added:", file.name);

    const filesGrid = document.getElementById('filesGrid');
    const filePreviewContainer = document.getElementById('filePreviewContainer');

    const fileCard = createFileCard(file);

    filesGrid.insertAdjacentHTML('beforeend',fileCard);

    filePreviewContainer.style.display='block';

    uploadBtn.disabled = false;

    const removeBtn = filesGrid.querySelector(`[data-file-name="${file.name}"] .file-remove-btn`);
    const fileName = file.name
    removeBtn.addEventListener('click', ()=>{
        const fileToRemove = myDropzone.files.find(file => file.name === fileName );
        if(fileToRemove){
          myDropzone.removeFile(fileToRemove);
        }
        const removeFileCard = document.querySelector(`[data-file-name="${fileName}"]`);
        if(removeFileCard){
          removeFileCard.remove();
        }
        if(myDropzone.files.length===0){
          const filePreviewContainer = document.getElementById('filePreviewContainer');
          filePreviewContainer.style.display = 'none';
          uploadBtn.disabled = true;
        }
    })
  });

  
  myDropzone.on("removedfile", function (file) {
    console.log("File removed:", file.name);
    uploadBtn.disabled = true;
  });


  myDropzone.on("success", function (file, response) {
    console.log("Upload Success:", response);

    const filesList = document.getElementById("uploadedFilesList");
    const listItem = document.createElement("li");
    listItem.textContent = `✅ ${file.name} - Upload Successfully`;
    filesList.appendChild(listItem);

    document.getElementById("uploadResults").style.display = "block";
  });


  myDropzone.on("error", function (file, errorMessage) {
    console.log("Upload error:", errorMessage);

    const filesList = document.getElementById("uploadedFilesList");
    const listItem = document.createElement("li");

    listItem.textContent = `❌ ${file.name} - Upload Failed`;
    listItem.style.color = "red";
    filesList.appendChild(listItem);

    document.getElementById("uploadResults").style.display = "block";
  });


  uploadBtn.addEventListener("click", () => {
    console.log("Starting upload...");
    myDropzone.processQueue();
  });


  resetBtn.addEventListener("click", () => {
    myDropzone.removeAllFiles();
    uploadBtn.disabled = true;
    const filesList = document.getElementById("uploadedFilesList");
    if (filesList) {
      filesList.innerHTML = "";
    }
    document.getElementById("uploadResults").style.display = "none";

    const filesGrid = document.getElementById('filesGrid');
    if(filesGrid){
      filesGrid.innerHTML = '';
    }

  });

  const uploadForm = document.getElementById("uploadForm");
  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault(); // this prevent the automatic reload of the page....

    const formData = new FormData(this);
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    myDropzone.files.forEach((file) => {
      formData.append("Files[]", file);
    });

    console.log(formObject);

    console.log("Form submitted with files:", myDropzone.files.length);

    // for server use..
    fetch("/api/upload-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          uploadForm.reset();
          // alert("file is successfully uploaded!!!");
          toast('Success!', 'Your notes is uploaded', '✅');
          console.log("Notes Title:", data.notesDetail.title);
          console.log("Upload Date:", data.notesDetail.date);
        } else {
          // alert(data.message || "file upload failed!!!, Please try again");
          console.log(data.message);
          toast('Failed!', data.message, '❌' )
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        // alert("an error occurred while uplaoding file. Please try again!");
        toast('Failed!', 'an error occurred', '❌' )
      });
  });
});

const toastContainer = document.querySelector('.hidden')
const toastSign = document.querySelector('#toast-mark');
const toastType = document.querySelector('#toast-type');
const toastDescription = document.querySelector('#toast-des');

function toast(type, message, sign){
  toastContainer.classList.remove('hidden')
  toastContainer.classList.add('show')
  if(type === 'Failed!'){
    toastContainer.style.backgroundColor = 'red';
  }
  toastSign.innerText = sign;
  toastType.innerText = type;
  toastDescription.innerText = message;
}

// console.log(formatFileSize(1080921));
//---file size formater----
function formatFileSize(bytes){
    if(bytes<1024){
      reduceSize = `${bytes} bytes`;
      return reduceSize;
    }else if(bytes<1048576){
      return `${(bytes/1024).toFixed(2)} KB`;
    }else{
      return `${(bytes/1048576).toFixed(2)} MB`;
    }
}

// const testFile = {
//   name : 'sample.pdf',
//   size : 2560000
// }

// console.log(createFileCard(testFile));

//-----file card----------
function createFileCard(file){
    const fileName = file.name;
    const fileSize = formatFileSize(file.size);

    return `
        <div class="file-card" data-file-name="${fileName}">
            <div class="file-icon">📄</div>
            <div class="file-info">
                <div class="file-name">${fileName}</div>
                <div class="file-size">${fileSize}</div>
                <div class="file-status ready">Ready to upload</div>
            </div>
            <div class="file-actions">
                <button  type="button" class="file-remove-btn">×</button>
            </div>
        </div>
        `;
}


//---remove button of preview files------

function removeFile(fileName){
    alert("remove btn clicked")
    const fileToRemove = myDropzone.files.find(file => file.name === fileName );
    console.log(fileToRemove);
    if(fileToRemove){
      myDropzone.removeFile(fileToRemove);
    }

    const removeFileCard = document.querySelector(`[data-file-name="${fileName}"]`);
    console.log(removeFileCard);
    if(removeFileCard){
      removeFileCard.remove();
    }

    if(myDropzone.files.length===0){
      const filePreviewContainer = document.getElementById('filePreviewContainer');
      filePreviewContainer.style.display = 'none';
      uploadBtn.disabled = true;
    }
}