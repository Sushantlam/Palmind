$(document).ready(function() {
    let users = [];
  
    // Fetch users on page load
    fetchUsers();
  
    function fetchUsers() {
      axios.get('http://localhost:8800/auth/all')
        .then(response => {
          users = response.data;
          renderTable(users);
        })
        .catch(error => {
          console.error('There was an error fetching the users!', error);
        });
    }
    
  
    function renderTable(users) {
      const tableBody = $('#userTable tbody');
      tableBody.empty();
      users.forEach((user, index) => {
        const row = `
          <tr data-index="${index}">
            <td>${user.userName}</td>
            <td>${user.email}</td>
            <td>
           
          <button class="btn btn-info btn-sm view-btn" data-toggle="modal" data-target="#viewUserModal" data-index="${index}">View</button>
            <button class="btn btn-success btn-sm edit-btn" data-toggle="modal" data-target="#editUserModal" data-index="${index}">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
            </td>
          </tr>
        `;
        tableBody.append(row);
      });
      
    }

      // Handle row click for view
      $('#userTable tbody').on('click', '.view-btn', function() {
        const index = $(this).data('index');
        console.log(index);
        const user = users[index];
        console.log(user);
        $('#viewUsername').text(user.userName);
        $('#viewEmail').text(user.email);
      });
    
  
    // Handle row click for edit
    $('#userTable tbody').on('click', '.edit-btn', function() {
      const index = $(this).data('index');
      const user = users[index];
      $('#editUsername').val(user.userName);
      $('#editEmail').val(user.email);
      $('#editPassword').val('');
      $('#editUserForm').data('index', index);
    });

  
    // Handle edit form submission
    $('#editUserForm').submit(function(event) {
      event.preventDefault();
      const index = $(this).data('index');
      const user = users[index];
      const updatedUser = {
        userName: $('#editUsername').val(),
        email: $('#editEmail').val(),
        password: $('#editPassword').val() || undefined
      };
  
      axios.patch(`http://localhost:8800/auth/update/${user._id}`, updatedUser)
        .then(response => {
          $('#editUserModal').modal('hide');
          Toastify({
            text: "User updated successfully",
            duration: 2000,
            close: true,
            gravity: "top", 
            position: "right", 
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
          }).showToast();
         
    
          fetchUsers();
        })
        .catch(error => {
          Toastify({
            text:"Something went wrong",
            duration: 2000,
            close: true,
            gravity: "top", 
            position: "right", 
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
          }).showToast();
          
          console.error('There was an error updating the user!', error);
        });
    });
  
    // Handle delete
    $('#userTable tbody').on('click', '.delete-btn', function() {
      const index = $(this).data('index');
      const user = users[index];
  
      if (confirm('Are you sure you want to delete this user?')) {
        axios.delete(`http://localhost:8800/auth/delete/${user._id}`)
          .then(response => {
            
            Toastify({
              text: "User deleted successfully",
              duration: 2000,
              close: true,
              gravity: "top", 
              position: "right", 
              backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
            }).showToast();
            
            fetchUsers();
          })
          .catch(error => {
            console.error('There was an error deleting the user!', error);
          });
      }
    });


    //Create New User Modal
    $('#addUserBtn').click(function() {
      $('#addUserModal').modal('show');
    });

    // Handle add user form submission
    $('#addUserForm').submit(function(event) {
      event.preventDefault();
      const newUser = {
        userName: $('#addUsername').val(),
        email: $('#addEmail').val(),
        password: $('#addPassword').val()
      };

      axios.post('http://localhost:8800/auth/register', newUser)
        .then(response => {
          $('#addUserModal').modal('hide');
          Toastify({
            text: "User added successfully",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
          }).showToast();
          fetchUsers();
        })
        .catch(error => {
          Toastify({
            text: "Something went wrong",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
          }).showToast();
          console.error('There was an error adding the user!', error);
        });
    });

    //changePassword
    $('#changepassword').click(function() {
      $('#changePasswordModal').modal('show');
    });

    $('#changepasswordForm').submit(function(event) {
      event.preventDefault();
      const changePassword = {
        email: $('#oldEmail').val(),
        oldPassword: $('#oldPassword').val(),
        newPassword: $('#newPassword').val()
      };

      axios.patch('http://localhost:8800/auth/reset-password', changePassword)
        .then(response => {
          $('#changePasswordModal').modal('hide');
          Toastify({
            text: "Password Changed successfully",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
          }).showToast();
          fetchUsers();
        })
        .catch(error => {
          Toastify({
            text: "Something went wrong",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
          }).showToast();
          console.error('There was an error adding the user!', error);
        });
    });
  });
  