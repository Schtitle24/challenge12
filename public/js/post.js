// Function to handle form submission for adding a comment to a post
const commentFormHandler = async (event) => {
  event.preventDefault();

  // Gather data from the form
  const postId = document.querySelector('#post-id').value.trim();
  const comment = document.querySelector('#comment-text').value.trim();

  if (postId && comment) {
    // Send a POST request to the create route for comments
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ postId, comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, reload the page to display the new comment
      document.location.reload();
    } else {
      alert('Failed to add comment');
    }
  }
};

// Attach event listener for comment form submission
document
  .querySelector('#comment-form')
  .addEventListener('submit', commentFormHandler);