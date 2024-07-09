const searchForm = document.querySelector('#search-form');
const searchBox = document.querySelector('#search-box');
const searchResult = document.querySelector('#output');
const showMoreButton = document.querySelector('#show-more');

const API_KEY = 'ulLA0CeBcsWJdVBpf0OtY4sflKRXEKr4HG-xlSzFjQc';

let page = 1;
let limit = 10;
let keyword = "";

async function fetchImages() {
    keyword = searchBox.value;
    const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${keyword}&page=${page}&per_page=${limit}&client_id=${API_KEY}&per_page=6`
    );
    const data = await response.json();
    // console.log(data);

    data.results.forEach((image) => {

        const container = document.createElement("div");
        container.style.position = "relative";
        container.style.paddingBottom = "56.25%"; 
        container.style.overflow = "hidden";

        const lowResImg = document.createElement("img");
        lowResImg.src = image.urls.thumb; // Low resolution image
        lowResImg.alt = image.alt_description || "Unsplash Image";
        lowResImg.style.position = "absolute";
        lowResImg.style.filter = "blur(10px)";
        lowResImg.style.transition = "opacity 0.5s";

        const highResImg = document.createElement("img");
        highResImg.src = image.urls.full; // High resolution image
        highResImg.alt = image.alt_description || "Unsplash Image";
        highResImg.style.position = "absolute";
        highResImg.style.transition = "opacity 0.5s";
        highResImg.onload = () => {
            lowResImg.style.opacity = "0";
            highResImg.style.opacity = "1";
        };

        const imageLink = document.createElement("a");
        imageLink.href = image.links.html;
        imageLink.target = "_blank";

        container.appendChild(lowResImg);
        container.appendChild(highResImg);
        imageLink.appendChild(container);
        searchResult.appendChild(imageLink);

        // const img = document.createElement("img");
        // img.src = image.urls.raw;
        // img.alt = image.alt_description || "Unsplash Image";
        // img.loading = "lazy";

        // const imageLink = document.createElement("a");
        // imageLink.href = image.links.html;
        // imageLink.target = "_blank";

        // imageLink.appendChild(img);
        // searchResult.appendChild(imageLink);
    });
    showMoreButton.style.display = "block";
}

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    searchResult.innerHTML = "";
    page = 1;
    await fetchImages();
    // searchBox.value = "";
});

showMoreButton.addEventListener("click", async () => {
    page++;
    await fetchImages();
});
