function toggleMenu() {
    const navOptions = document.getElementById('nav-options');
    navOptions.classList.toggle('show');
}

// create post logic start here 
// Array to store posts locally in memory
const posts = [];

function createPost() {
  const content = document.getElementById("post-content").value;
  const imageInput = document.getElementById("post-image");
  
  if (!content && !imageInput.files.length) {
    alert("Please add some text or an image to post.");
    return;
  }

  // Read image file as a data URL if provided
  let imageDataUrl = "";
  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function (event) {
      imageDataUrl = event.target.result;
      addPost(content, imageDataUrl);
    };
    
    reader.readAsDataURL(file);
  } else {
    addPost(content, imageDataUrl);
  }

  // Clear the form
  document.getElementById("post-content").value = "";
  imageInput.value = null;
}

function addPost(content, image) {
  // Create a post object and add to posts array
  const post = { content, image };
  posts.unshift(post); // Adds new posts to the top
  
  displayPosts();
}

function displayPosts() {
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "<h2>Community Posts</h2>";
  
  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    // Display content
    const contentPara = document.createElement("p");
    contentPara.textContent = post.content;
    postDiv.appendChild(contentPara);

    // Display image if available
    if (post.image) {
      const img = document.createElement("img");
      img.src = post.image;
      postDiv.appendChild(img);
    }

    postsDiv.appendChild(postDiv);
  });
}

// create post logic ends here 