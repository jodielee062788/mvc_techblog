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
            console.log('Response status:', response.status);
            console.log('Response text:', await response.text());
            alert('Failed to create a comment');
        }
    }
};

document
  .querySelector('#comment-form')
  .addEventListener('submit', newPostCommentHandler);
