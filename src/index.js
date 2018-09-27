import styles from './styles/index.scss'

const photosContainer = document.querySelector(".photos")
const searchForm = document.querySelector(".form")
const searchInput = document.querySelector("#search-text")
const api = "https://api.unsplash.com/search/photos"
const apiKey = process.env.API_KEY
const apiSecretKey = process.env.SECRET_API_KEY
const defaultPlaceholder = searchInput.getAttribute("placeholder")

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    fetchData();
})

setInterval( () => {
    const placeholders = [
        "Mountains",
        "Cats",
        "Dogs",
        "Puppies",
        "Destinity",
        "Reasons to live"
    ]
    const placeholder = placeholders[Math.floor(Math.random()*placeholders.length)];
    
    searchInput.setAttribute("placeholder", `${defaultPlaceholder} ${placeholder}`)
}, 1500)

function fetchData() {
    const searchValue = searchInput.value
    return fetch(`${api}/?client_id=${apiKey}&client_secret=${apiSecretKey}&query=${searchValue}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(displayPhotos)
        .catch(err => console.log(err))
}

function displayPhotos(photos) {
    console.log(photos)
    photosContainer.innerHTML = ''
    photos.results.forEach(image => {
        photosContainer.innerHTML+=`
        <figure class="photo">
            <a href="${image.links.html}">
                <img src="${image.urls.small}" alt>
            </a>
            <figcaption class="photo__caption">
            <p class="photo__caption__desc">${image.description || ''}</p>
            <p><strong>Author:</strong> ${image.user.first_name} ${image.user.last_name}</p>
            </figcaption>
        </figure>
        `
    });
}