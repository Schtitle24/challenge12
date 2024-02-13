// Function to handle form submission for signing up
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Gather data from the form
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    // Send a POST request to the signup route
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the user to the dashboard
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
    }
  }
};

// Attach event listener
document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);