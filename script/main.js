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

//categories
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
  <button id="${cat.category_id}" onclick=loadCategoryVideos(${cat.category_id}) class="btn btn-sm hover:text-white hover:bg-gradient-to-r from-[#009432] to-[#A3CB38]">${cat.category}</button>
  `;
    //append element
   categoryContainer.append(categoryDiv)
  }
}
/* ---------------------------------------------------------------------------- */




/* -------------------------------------------------------------------------------- */
                        
function loadVideos(searchTextfromSearchbar=' ') {
  // remove previous active button
  removeActiveClass();
  showLoader()

  // add active to 'All' button
  const allBtn = document.getElementById('btn-all');
  allBtn.classList.add('active');

  // fetch all videos
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchTextfromSearchbar}`
  )
    .then(res => res.json())
    .then(data => displayVideos(data.videos));
}




/* [
{
"category_id": "1001",
"video_id": "aaaa",
"thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
"title": "Shape of You",
"authors": [
{
"profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
"profile_name": "Olivia Mitchell",
"verified": ""
}
],
"others": {
"views": "100K",
"posted_date": "16278"
},
"description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}
 */


   
function displayVideos(videos) {
  const videoContainer = document.getElementById('video-container');

  videoContainer.innerHTML = ' ';

  if (videos.length == 0) {
    videoContainer.innerHTML = `<div class="flex flex-col col-span-full justify-center items-center py-24">
             
             <img class="w-[120px]" src="assets/Icon.png" alt="">
                               <br>
             <h1 class="font-bold text-4xl text-center">Oops!! Sorry, There is no
              <br>  content here</h1>
                
           </div>`;
    hideLoader();
    return;
    
  }
  
   for (video of videos) {
    const videoCard = document.createElement('div');
    videoCard.innerHTML = `
      <div class="">

          <figure class="relative">
            <img class="w-full h-[170px] object-cover" src="${
              video.thumbnail
            }" alt="">
            <span class="absolute bottom-2 right-2 text-white bg-teal-800 px-2 text-sm rounded-md">3hrs 56 min ago</span>
          </figure>
          
          <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    
                <div class="avatar">
                  <div class="ring-primary ring-offset-base-100 w-10 rounded-full">
                    <img src="${video.authors[0].profile_picture}" />
                  </div>
                </div>

                </div>

                <div class="intro">
                     <h2 class="text-lg font-semibold">${video.title}</h2>
                     <p class="text sm text-[#40407a] flex">${
                       video.authors[0].profile_name
                     } 
                     ${
                       video.authors[0].verified == true
                         ? `verified<img src="https://img.icons8.com/?size=96&id=t6plruOGzvuh&format=png" alt="" class="w-5 h-5">`
                         : ` `
                     }

                      
                     
                     
                     </p>
                     <p class="text sm text-[#40407a]">${
                       video.others.views
                     } </p>
                </div>
            </div>

             <button onclick="loadVideoDetails('${
               video.video_id
             }')" class="btn btn-block bg-gradient-to-r from-blue-400 to-indigo-200 text-gray-800 hover:from-green-500 hover:to-green-300">
  Details
</button>



          </div>
    
    
    `;
    videoContainer.append(videoCard);
  }
  hideLoader();
  }

/* -------------------------------------------------------------------------------- */


/* ******************************************************************************** */

function loadCategoryVideos(categoryId) {
 // console.log(categoryId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`;
  console.log(url);
  showLoader()

  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      //no active class now
      const clickedbtn = document.getElementById(`${categoryId}`);
      clickedbtn.classList.add('active')
      console.log(clickedbtn)
      displayVideos(data.category);



    });
    
}

/* ******************************************************************************** */


function removeActiveClass() {
  const activeButtons = document.getElementsByClassName('active');
  for (let btn of activeButtons) {
    btn.classList.remove('active')
  }
  console.log(activeButtons);
  
}


/* ******************************************************************************** */

function loadVideoDetails(videoId) {
  //console.log(videoId)
  const url2 = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url2)
    .then(res => res.json())
    .then(data=>displayVideoDetails(data.video))

}


function displayVideoDetails(video) {
  console.log(video)

  document.getElementById('video_details').showModal();
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = `
    
<div class="card bg-slate-300 shadow-md">
  <figure>
    <img src="${video.thumbnail}" alt="${video.title}" class="h-36 w-full object-cover rounded-t-md" />
  </figure>
  <div class="card-body p-3">
    <h2 class="text-base font-semibold text-slate-800">${video.title}</h2>
    <p class="text-xs text-gray-700">
      A card component has a figure and a body with title and description.
    </p>
  </div>
</div>


  
  `;
}


/* ******************************************************************************** */

document.getElementById('search-input').addEventListener('keyup', e => {
  const input = e.target.value;
  loadVideos(input); 
});
/* ******************************************************************************** */

function showLoader() {
  document.getElementById('loader').classList.remove('hidden')
  document.getElementById('video-container').classList.add('hidden')
}


function hideLoader() {
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('video-container').classList.remove('hidden');
}

/* ******************************************************************************** */




