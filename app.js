$(document).ready(function() {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'GET',
        success: function(posts) {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/comments',
                method: 'GET',
                success: function(comments) {
                    const tableBody = $('#postsTable tbody');
                   
                    posts.forEach(function(post) {
                       
                        const postComments = comments.filter(function(comment) {
                            return comment.postId === post.id;
                        });
                        const limitComments = postComments.slice(0, 3);
                        const allComments = limitComments.map(function(comment) {
                            return comment.body;
                        }).join('<br> <br>');
                        const truncatedContent = post.body.length > 30 ? post.body.substring(0, 30) + '...' : post.body;
                        const row = $('<tr>');
                        row.html(`
                            <th scope="row">${post.id}</th>
                            <td>${post.title}</td>
                            <td>${truncatedContent}</td>
                            <td>${allComments}</td>
                        `);
                        tableBody.append(row);
                    });
                },
                error: function(error) {
                    console.error('err:', error);
                }
            });
        },
        error: function(error) {
            console.error('err:', error);
        }
    });
});