// Function to delete a post by ID
const deletePost = async (id) => {
  const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to delete project');
        }
      };

// Event handler for delete button click
const deletePostHandler = (event) => {
  if (event.target.matches('.deleteBtn')) {
    const id = event.target.getAttribute('data-id'); // Get post ID from data attribute
    deletePost(id);
  }
};
    
document.addEventListener('click', deletePostHandler);

