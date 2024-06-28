let email = '';
let password = '';
let userName = '';

function handleChnage(event) {
  const { id, value } = event.target;
  if (id === 'email') {
    email = value;
  } else if (id === 'password') {
    password = value;
  }
  else if(userName="username"){
     userName =value
  }
}

function handleClick(event) {
  event.preventDefault();
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = '';


  axios.post('http://localhost:8800/auth/register', { email, password, userName})
    .then(response => {
    //    console.log(response);
       Toastify({
        text: "User Created Successfully",
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
      }).showToast();
      window.location.href = './login.html';
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
