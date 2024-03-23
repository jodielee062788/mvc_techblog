const newPostHandler = async (event) => {
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
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.add-post-form')
  .addEventListener('submit', newPostHandler);

document
  .querySelector('.postBox')
  .addEventListener('click', delButtonHandler);