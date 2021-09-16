submitPost: ({ input: { id, author, body } }) => {
    const post = { author, body };
    let index = POSTS.length;
  
    if (id != null && id >= 0 && id < POSTS.length) {
      if (POSTS[id].authorId !== authorId) return null;
  
      POSTS.splice(id, 1, post);
      index = id;
    } else {
      POSTS.push(post);
    }
  
    return mapPost(post, index);
  }