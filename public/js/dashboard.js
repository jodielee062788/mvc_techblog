document.addEventListener("DOMContentLoaded", () => {
  const postTitles = document.querySelectorAll('.card-title');

  postTitles.forEach(title => {
    title.addEventListener('click', () => {
      const postId = title.dataset.postId;
      const loggedIn = title.dataset.loggedIn;

      if (loggedIn === 'true') {
        window.location.href = `/post/${postId}`;
      } else {
        window.location.href = '/login';
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for the dashboard link
  const dashboardLink = document.querySelector('#dashboard-link');
  if (dashboardLink) {
    dashboardLink.addEventListener('click', () => {
      window.location.href = '/dashboard';
    });
  }
});
  
const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-description').value.trim();
  
    if (title && description) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const deletePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  const updatePostFormHandler = async (event) => {
    event.preventDefault();
  
    const id = document.querySelector('#post-id').value.trim();
    const title = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-description').value.trim();
  
    if (title && description) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
    }
  };
  
  const addCommentHandler = async (event) => {
    event.preventDefault();
  
    const postId = document.querySelector('#post-id').value.trim();
    const commentText = document.querySelector('#comment-text').value.trim();
  
    if (commentText) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ postId, commentText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add comment');
      }
    }
  };
  
  const deleteCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete comment');
      }
    }
  };
  
  document
    .querySelector('#add-post-form')
    .addEventListener('submit', newPostFormHandler);
  
  document
    .querySelector('.post-list')
    .addEventListener('click', deletePostHandler);
  
  document
    .querySelector('.update-post-form')
    .addEventListener('submit', updatePostFormHandler);
  
  document
    .querySelector('.add-comment-form')
    .addEventListener('submit', addCommentHandler);
  
  document
    .querySelector('.comment-list')
    .addEventListener('click', deleteCommentHandler);
