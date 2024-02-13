// Function to handle form submission for logging in
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Gather data from the form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the login route
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the user to the dashboard
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in');
    }
  }
};

// Attach event listener
document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);