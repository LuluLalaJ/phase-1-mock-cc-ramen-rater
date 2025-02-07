// write your code here

const apiUrl = "http://localhost:3000"
const ramenUrl = apiUrl + "/ramens"
const divRamen = document.getElementById('ramen-menu')
const newRamenForm = document.getElementById('new-ramen')
const editRamenForm = document.getElementById('edit-ramen')

function getRamenImages() {
    fetch(ramenUrl)
    .then(response => response.json())
    .then(ramenImages => ramenImages.forEach((ramen) => renderRamen(ramen)))
}

getRamenImages()

function renderRamen(ramen) {
    const imgRamen = document.createElement('img')
    imgRamen.src = ramen.image
    imgRamen.onclick = (event) => displayRamen(event, ramen)
    //why didn't addEventListener work? 
    divRamen.appendChild(imgRamen)
}

function displayRamen(event, ramen) {
    let displayImg = document.getElementById('ramen-detail-img')
    let displayName = document.getElementById('ramen-detail-name')
    let displayRestaurant = document.getElementById('ramen-detail-restaurant')
    let displayRating = document.getElementById('rating-display')
    let displayComment = document.getElementById('comment-display')
    // console.log(event.target)
    displayImg.src = ramen.image
    displayName.textContent = ramen.name
    displayRestaurant.textContent = ramen.restaurant
    displayRating.textContent = ramen.rating
    displayComment.textContent = ramen.comment
}

newRamenForm.addEventListener('submit', addNewRamen)

function addNewRamen(e) {
    e.preventDefault()
    let name = document.getElementById('new-name').value
    let restaurant = document.getElementById('new-restaurant').value
    let image = document.getElementById('new-image').value
    let rating = document.getElementById('new-rating').value
    let comment = document.getElementById('new-comment').value

    const newRamen = {
        name: name,
        restaurant: restaurant,
        image: image,
        rating: rating,
        comment: comment
    }
    

    renderRamen(newRamen)
    newRamenForm.reset()
    //how can we provide conditions for the inputs 
}

//advanced deliverables 

//See the details for the first ramen as soon as the page loads
//Too redundant here 
displayFirstImage()

function displayFirstImage(){
    fetch(ramenUrl)
    .then(response => response.json())
    .then(ramenImages =>  renderFirstImage(ramenImages[0]))
}

function renderFirstImage(ramen) {
    let displayImg = document.getElementById('ramen-detail-img')
    let displayName = document.getElementById('ramen-detail-name')
    let displayRestaurant = document.getElementById('ramen-detail-restaurant')
    let displayRating = document.getElementById('rating-display')
    let displayComment = document.getElementById('comment-display')

    displayImg.src = ramen.image
    displayName.textContent = ramen.name
    displayRestaurant.textContent = ramen.restaurant
    displayRating.textContent = ramen.rating
    displayComment.textContent = ramen.comment
}

//Update the form on the frontend; does not persist 
editRamenForm.addEventListener('submit', updateForm)

function updateForm(event) {
    event.preventDefault()
    const newRating = document.getElementById('edited-rating').value
    const newComment = document.getElementById('edited-comment').value
    let currentRating = document.getElementById('rating-display')
    let currentComment = document.getElementById('comment-display')

    currentRating.textContent = newRating
    currentComment.textContent = newComment

    editRamenForm.reset()
}