const input = document.querySelector('.input_recipe');
const submitBtn = document.querySelector('#basic-addon2');
const message = document.querySelector('.message');
const cardContainer = document.querySelector('.card-container');
const popUp = document.querySelector('.modal_popup');

async function checkInput() {
    let recipeName = input.value.trim();
    if(recipeName === '') {
        message.classList.add('error');
        message.textContent = `Please enter Recipe before searching...`    
    }
    else {
        fetchRecipe(recipeName).then(data => {
            message.textContent = `Found ${data.meals.length} Recipes`;
            message.classList.remove('error');
            message.classList.add('green_banner');
            renderRecipes(data);
        }).catch(err => {
            cardContainer.innerHTML = '';
            message.classList.remove('green_banner')
            message.classList.add('error');
            message.textContent = `Incorrect/Invalid Recipe name`
        });
    }
}
async function fetchRecipe(query) {
    const API_KEY = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    let response = await fetch(API_KEY);
    let data = await response.json();
    return data;
}
async function renderRecipes(data) {
    cardContainer.innerHTML = '';
    data.meals.forEach((ele, index) => {
        let recipeCard = document.createElement('div');
        recipeCard.classList.add('card');
        recipeCard.innerHTML = `<img src="${ele.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fs-3">${ele.strMeal}</h5>
                    <p class="card-text fs-5">${ele.strArea}, ${ele.strCategory}</p>
                    <a href="#" class="btn btn-primary recipe_more">More Details</a>
                </div>`;
        cardContainer.appendChild(recipeCard);
        const moreDetailsBtn = recipeCard.querySelector('.recipe_more');
        moreDetailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showReceiptDetails(ele);
    });
    })
}
function showReceiptDetails(meal) {
    popUp.classList.remove('hidden');
}   
submitBtn.addEventListener('click', checkInput);


