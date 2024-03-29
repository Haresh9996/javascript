
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
    labelIcon.style.display = "block";
    labelP.style.display = "block";
    img.src = "";
    form.reset();
    formContainer.style.display = "none";
    updateIndex = null;
}

// const imageInput = document.getElementById('image-input');

inputImg.addEventListener('change', function () {
    const file = this.files[0];

    const validExtensions = ['image/jpeg', 'image/png'];
    if (validExtensions.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = function (e) {
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
        labelP.style.display = 'none';
        labelIcon.style.display = 'none';
    } else {
        img.src = '';
        labelP.style.display = 'block';
        labelP.textContent = 'Please upload a valid image file (JPEG or PNG).';
    }
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let year = e.target.year.value.trim()
    let title = e.target.title.value.trim()
    let detail = e.target.detail.value.trim();
    let cardImage = img.src;

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
            return;
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
                                <div class="event-img-container">
                                <img src="${element.cardImage}" alt="link" class="event-img">
                                </div>
                                <div class="year ${bgClass}">
                                    ${element.year}
                                    <i class="fa-regular fa-pen-to-square edit-btn" onclick="edit(${index})"></i>
                                    <i class="fa-regular fa-trash-can remove-btn")"></i>
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

    let removeBtns = document.querySelectorAll(".remove-btn");
    removeBtns.forEach((btn, index) => {
        let modal = document.querySelector(".modal-container");
        let yes = document.querySelector(".yes");
        let no = document.querySelector(".no");

        btn.addEventListener("click", (e) => {
            modal.style.display = "grid";
            yes.onclick = function(){
                e.stopPropagation();
                let eventElement = e.target.closest(".event");
                let targetedIndex = Array.from(eventElement.parentNode.children).indexOf(eventElement);
                timelineData.splice(targetedIndex, 1);
                localStorage.setItem("timelineData", JSON.stringify(timelineData));
                modal.style.display = "none";
                displaydata();
            }
            no.onclick = function(){
                modal.style.display = "none";
            }
        });
    });
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

displaydata()
