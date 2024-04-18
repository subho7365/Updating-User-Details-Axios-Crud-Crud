const baseURL = 'https://crudcrud.com/api/39bb511afcab4468aa3d2f6abdddbd82';
// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get form data
  const formData = new FormData(event.target);
  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    phone: formData.get("phone")
  };

  // Make POST request to save user details
  axios.post("/save-user-details", userData)
    .then(response => {
      // Update user details on the screen
      updateUserList(response.data);
    })
    .catch(error => {
      console.error("Error saving user details:", error);
    });

  // Clear form fields
  event.target.reset();
}

// Function to update user details on the screen
function updateUserList(user) {
  const userList = document.getElementById("userList");
  userList.innerHTML = `
    <li>ID: ${user._id}</li>
    <li>Username: ${user.username}</li>
    <li>Email: ${user.email}</li>
    <li>Phone: ${user.phone}</li>
    <button onclick="editUser('${user._id}')">Edit</button>
    <button onclick="deleteUser('${user._id}')">Delete</button>
  `;
}

// Function to fetch user details and populate form fields for editing
function editUser(id) {
  axios.get(`/user-details/${id}`)
    .then(response => {
      const userData = response.data;
      // Populate form fields with user details
      document.getElementById("username").value = userData.username;
      document.getElementById("email").value = userData.email;
      document.getElementById("phone").value = userData.phone;
    })
    .catch(error => {
      console.error("Error fetching user details:", error);
    });
}

// Function to delete user account
function deleteUser(id) {
  axios.delete(`/delete-user/${id}`)
    .then(response => {
      // Display success message or update UI accordingly
    })
    .catch(error => {
      console.error("Error deleting user:", error);
    });
}
// Do not touch the code below
module.exports = handleFormSubmit;
