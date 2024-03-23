// Event handler for submitting post edits
const editPostHandler = async (event) => {
    event.preventDefault();
  
    // Extract post ID from URL
    const postId = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
    
    const title = document.querySelector("#edit-title").value.trim();
    const description = document.querySelector("#edit-description").value.trim();
  
    if (title && description) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to update a post.");
      }
    }
  };

  document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editPostHandler);