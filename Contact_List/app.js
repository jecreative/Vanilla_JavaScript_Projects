const form = document.querySelector("#contact-form");
const contactList = document.querySelector("#collection");
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");

// Invoke Event Listeners
loadEventListeners();
// Event Listeners
function loadEventListeners() {
  // Add contact
  form.addEventListener("submit", addContact);
  // Delete contact
  contactList.addEventListener("click", deleteContact);
}

// Functions

// Check for input fields
function addContact(e) {
  if (
    firstNameInput.value === "" &&
    lastNameInput.value === "" &&
    emailInput.value === ""
  ) {
    showError("Please fill out all fields");
  } else {
    // Create table row (tr)
    const tr = document.createElement("tr");
    // Create td
    const th = document.createElement("th");
    // Create td -- firstName
    const firstName = document.createElement("td");
    firstName.appendChild(document.createTextNode(firstNameInput.value));
    // Create td -- lastName
    const lastName = document.createElement("td");
    lastName.appendChild(document.createTextNode(lastNameInput.value));
    // Create td -- email
    const email = document.createElement("td");
    email.appendChild(document.createTextNode(emailInput.value));
    // Create td -- delete
    const deleteContact = document.createElement("td");
    // Create delete link
    const deleteBtn = document.createElement("a");
    deleteBtn.innerHTML = '<i class="fas fa-times-circle"></i>';
    deleteBtn.setAttribute("href", "#");
    deleteBtn.className = "text-danger delete-item";

    // Add deleteBtn to deleteContact
    deleteContact.appendChild(deleteBtn);

    // Add everything to a Table Row
    tr.appendChild(th);
    tr.appendChild(firstName);
    tr.appendChild(lastName);
    tr.appendChild(email);
    tr.appendChild(deleteContact);

    // Append Completed Table Row to Contact List
    contactList.appendChild(tr);

    storeFirstNameInLocalStorage(firstNameInput.value);

    storeLastNameInLocalStorage(lastNameInput.value);

    storeEmailInLocalStorage(emailInput.value);

    // Clear Input
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";

    e.preventDefault();
  }
}

// Store First Name in Local Storage
function storeFirstNameInLocalStorage(firstName) {
  let firstNames;
  if (localStorage.getItem("firstNames") === null) {
    firstNames = [];
  } else {
    firstNames = JSON.parse(localStorage.getItem("firstNames"));
  }
  firstNames.push(firstName);

  localStorage.setItem("firstNames", JSON.stringify(firstNames));
}
// Store Last Name in Local Storage
function storeLastNameInLocalStorage(lastName) {
  let lastNames;
  if (localStorage.getItem("lastNames") === null) {
    lastNames = [];
  } else {
    lastNames = JSON.parse(localStorage.getItem("lastNames"));
  }
  lastNames.push(lastName);
  localStorage.setItem("lastNames", JSON.stringify(lastNames));
}

// Store Email in Local Storage
function storeEmailInLocalStorage(email) {
  let emails;
  if (localStorage.getItem("emails") === null) {
    emails = [];
  } else {
    emails = JSON.parse(localStorage.getItem("emails"));
  }
  emails.push(email);
  localStorage.setItem("emails", JSON.stringify(emails));
}

//Show Error
function showError(error) {
  // Create div
  const errorDiv = document.createElement("div");
  // Get Elements
  const column = document.querySelector(".col");
  const heading = document.querySelector("#heading");
  // Add class
  errorDiv.className = "alert alert-danger";
  // Create textNode and Append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above heading
  column.insertBefore(errorDiv, heading);
  // Clear Error after 3 seconds
  setTimeout(clearError, 3000);
}
function clearError() {
  document.querySelector(".alert").remove();
}

// Delete Contacts
function deleteContact(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.parentElement.remove();
    }
  }
}
