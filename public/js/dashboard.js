// Function to handle form submission for creating a new post
const handleNewPostSubmit = async (event) => {
  event.preventDefault();

  // Gather data from the form
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  // Send a POST request to create a new post
  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // Redirect the user to the dashboard after creating the post
    document.location.replace('/dashboard');
  } else {
    alert('Failed to create post');
  }
};

// Function to handle click event for deleting a post
const handlePostDelete = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    // Send a DELETE request to remove the post
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Reload the dashboard after deleting the post
      document.location.reload();
    } else {
      alert('Failed to delete post');
    }
  }
};

// Attach event listeners
document
  .querySelector('#new-post-form')
  .addEventListener('submit', handleNewPostSubmit);

document
  .querySelector('#post-list')
  .addEventListener('click', handlePostDelete);