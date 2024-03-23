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

const deletePostHandler = (event) => {
  if (event.target.matches('.deleteBtn')) {
    const id = event.target.getAttribute('data-id');
    deletePost(id);
  }
};
    
document.addEventListener('click', deletePostHandler);

