// Create new post public/js/new-post.js
const newChessPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-new-chess-post').value.trim();
  const content = document.querySelector('#content-new-chess-post').value.trim();

  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard'); // When successful, load the dashboard page
    } else {
      alert('Failed to create a new post.'); // When unsuccessful, show alert
    }
  }
};

// Event listeners
const newChessPostForm = document.querySelector('.new-chess-post-form');
if (newChessPostForm) {
  newChessPostForm.addEventListener('submit', newChessPostFormHandler);
}

// Get the post ID from the endpoint
const post_id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];

// Update the post
const updateChessPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title-update-chess-post").value.trim();
  const content = document
    .querySelector("#content-update-chess-post")
    .value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard"); // When successful, load the dashboard page
    } else {
      alert("Failed to update a post."); // When unsuccessful, show alert
    }
  }
};

// Delete the post
const deleteChessPostFormHandler = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard"); // When successful, load the dashboard page
  } else {
    alert("Failed to delete a post."); // When unsuccessful, show alert
  }
};

// Event listeners
const updateChessPostButton = document.querySelector("#update-chess-post");

if (updateChessPostButton) {
  updateChessPostButton.addEventListener("click", updateChessPostFormHandler);
}

const deleteChessPostButton = document.querySelector("#delete-chess-post");

if (deleteChessPostButton) {
  deleteChessPostButton.addEventListener("click", deleteChessPostFormHandler);
}

const deletePost = async (post_id) => {
  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload(); // When successful, reload the page
  } else {
    alert("Failed to delete the post."); // When unsuccessful, show alert
  }
};

const deletePostHandler = (event) => {
  if (event.target.matches(".delete-post")) {
    const post_id = event.target.getAttribute("data-post-id");
    deletePost(post_id);
  }
};

document.addEventListener("click", deletePostHandler);

const newChessCommentFormHandler = async (event) => {
  event.preventDefault();

  const post_id = parseInt(window.location.pathname.split('/').pop());

  const content = document.querySelector('#content-new-chess-comment').value.trim();

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_text: content, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload(); // When successful, reload the same page
    } else {
      console.log('Response status:', response.status);
      console.log('Response text:', await response.text());
      alert('Failed to create a comment.'); // When unsuccessful, show alert
    }
  }
};

// Event listeners
const newChessCommentForm = document.querySelector('.new-chess-comment-form');
if (newChessCommentForm) {
  newChessCommentForm.addEventListener('submit', newChessCommentFormHandler);
}
