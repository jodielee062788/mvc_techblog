const newPostCommentHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-text').value.trim();

    if (text) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ text: text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create a comment');
        }
    }
};

document
  .querySelector('.comment-list')
  .addEventListener('submit', newPostCommentHandler);
