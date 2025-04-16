/* ---------------------------------------------------------------------------- */

//load categorybuttons dynamically and display page

function loadCategory() {
  // 1 - fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    // 2- covert promise to json()
    .then(res => res.json())
    // 3- send data to displayCategory()
    .then(data => displayCategory(data.categories));
}

loadCategory();

/* {
"category_id": "1001",
"category": "Music"
} */

function displayCategory(receivedCategories) {
  //get the container
  const categoryContainer = document.getElementById('category-container');
  //loop operation on array of object
  for (let cat of receivedCategories) {
    
    //create element
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
  <button class="btn btn-sm hover:text-white hover:bg-gradient-to-r from-[#009432] to-[#A3CB38]">${cat.category}</button>
  `;
    //append element
   categoryContainer.append(categoryDiv)
  }
}
/* ---------------------------------------------------------------------------- */




/* -------------------------------------------------------------------------------- */

function loadVideos() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
  .then(data=>displayVideos(data.videos))
}

loadVideos();
   
function displayVideos(videos) {
   const videoContainer=document.getElementById('video-container')
  for (video of videos) {
   
    
    const videoCard = document.createElement('div');
    videoCard.innerHTML = `
     <div class="shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    
    
    `;
    videoContainer.append(videoCard);
    }
  }

/* -------------------------------------------------------------------------------- */








