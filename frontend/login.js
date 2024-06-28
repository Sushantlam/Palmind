let email = '';
let password = '';

function handleChange(event) {
  const { id, value } = event.target;
  if (id === 'email') {
    email = value;
  } else if (id === 'password') {
    password = value;
  }
}



function handleClick(event) {
  event.preventDefault();
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = '';


  axios.post('http://localhost:8800/auth/login', { email, password })
    .then(response => {
      
      const token = response.data.token;
      console.log(token);
      localStorage.setItem('token', token);
      Toastify({
        text: "Login successful! Redirecting...",
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
      }).showToast();
     

    
      setTimeout(() => {
        window.location.href = './index.html';
      }, 2000);
    })
    .catch(error => {
       
      errorDiv.textContent = error.response.data;
      Toastify({
        text: errorDiv.textContent,
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
      }).showToast();
      
    });
}


//logout
function logout(){
    axios
    .post('http://localhost:8800/auth/logout')
    .then(response => {
      localStorage.removeItem('token');
      Toastify({
        text: response.data.message,
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
      }).showToast();
      
     
      setTimeout(() => {
        window.location.href = './login.html';
      }, 500);
    })
    .catch(error => {
      Toastify({
        text: "Failed to logout",
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
      }).showToast();

      console.error('Failed to logout', error);
    });


}

   