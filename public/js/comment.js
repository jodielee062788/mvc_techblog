// Event handler for submitting a new comment
const newPostCommentHandler = async (event) => {
    event.preventDefault();

    // Extract post ID from URL
    const postId = parseInt(window.location.pathname.split('/').pop());

    const content = document.querySelector('#comment-text').value.trim();

    if (content) { 
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                body: JSON.stringify({ text: content, postId }),
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
  .querySelector('.comment-form')
  .addEventListener('submit', newPostCommentHandler);
