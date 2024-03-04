
let updateIndex = null;
let timelineBtn = document.querySelector(".add-timeline-btn");
let formContainer = document.querySelector(".form-container");
let form = document.querySelector(".form");
let closeForm = document.querySelector(".close-btn");

let label = document.querySelector(".img-area");
let labelIcon = document.querySelector(".img-area i");
let img = document.querySelector(".img")
let labelP = document.querySelector(".img-area p");
let inputImg = document.getElementById("image-input");

let timelineData = JSON.parse(localStorage.getItem("timelineData")) || [];

timelineBtn.addEventListener("click", openmodal);
closeForm.addEventListener("click", closemodal);


function openmodal() {
    formContainer.style.display = "flex";
}
function closemodal() {
    formContainer.style.display = "none";
    labelIcon.style.display = "block";
    labelP.style.display = "block";
    img.src = "";
    form.reset();
}

inputImg.addEventListener("change", () => {
    const file = inputImg.files[0]; // Get the selected file

    // Check if a file is selected
    if (file) {
        const reader = new FileReader(); // Initialize a new FileReader object

        // Define the onload event for the reader
        reader.onload = function (e) {
            img.src = e.target.result; // Set the src attribute of the img tag to the loaded data URL
            labelIcon.style.display = "none"; // Hide the icon
            labelP.style.display = "none"; // Hide the text
            img.style.display = "block"; // Show the image
        }

        // Read the selected file as a data URL
        reader.readAsDataURL(file);
    }
});

// console.log(timelineData)

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let year = e.target.year.value.trim()
    let title = e.target.title.value.trim()
    let detail = e.target.detail.value.trim();
    let cardImage = img.src;

    console.log(year, title, detail, cardImage)

    if (!Array.isArray(timelineData)) {
        timelineData = [];
    }

    if (updateIndex !== null) {
        timelineData[updateIndex] = {
            year: year,
            title: title,
            detail: detail,
            cardImage: cardImage
        }
        updateIndex = null;
    } else {
        if (year && title && detail && cardImage) {
            timelineData.push({
                year: year,
                title: title,
                detail: detail,
                cardImage: cardImage
            })
        } else {
            alert("please all the details...")
        }
    }
    let sortedData = timelineData.sort((a, b) => a.year - b.year);

    localStorage.setItem("timelineData", JSON.stringify(sortedData));

    closemodal()

    displaydata();

});

function displaydata() {
    let timeline = document.querySelector(".timeline");

    timeline.innerHTML = '';


    timelineData.forEach((element, index) => {

        let bgClass = `event-${index}`;

        timeline.innerHTML += `<div class="event">
                                <img src="${element.cardImage}" alt="link" class="event-img">
                                <div class="year ${bgClass}">
                                    ${element.year}
                                    <i class="fa-regular fa-pen-to-square edit-btn" onclick="edit(${index})"></i>
                                    <i class="fa-regular fa-trash-can remove-btn" onclick="remove(${index})"></i>
                                </div>
                                <div class="hr ${bgClass}"></div>
                                <div class="border ${bgClass}">
                                    <h3 class="title">${element.title}</h3>
                                    <div class="details">${element.detail}</div>
                                </div>
                            </div>`;

        function getRandomColor() {
            let red = Math.floor(Math.random() * 155) + 100;
            let green = Math.floor(Math.random() * 155) + 100;
            let blue = Math.floor(Math.random() * 155) + 100;
            let rgb = `rgb(${red}, ${green}, ${blue})`
            return rgb;
        }

        let randomColor = getRandomColor();

        let style = document.createElement('style');
        style.innerHTML = `.${bgClass} {
                            background-color: ${randomColor};
                            }`;
        document.head.appendChild(style);
    })
}

displaydata()

function remove(i) {
    timelineData.splice(i, 1);
    localStorage.setItem("timelineData", JSON.stringify(timelineData));
    displaydata();
}

function edit(i) {
    timeline = timelineData[i];

    img.src = timeline.cardImage;
    form.title.value = timeline.title;
    form.year.value = timeline.year;
    form.detail.value = timeline.detail;

    labelP.style.display = "none";
    labelIcon.style.display = "none";

    updateIndex = i;
    openmodal();
}
