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
    console.log(cat);

    //create element
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
  <button class="btn btn-sm hover:text-white hover:bg-gradient-to-r from-[#009432] to-[#A3CB38]">${cat.category}</button>
  `;
    //append element
   categoryContainer.append(categoryDiv)
  }
}