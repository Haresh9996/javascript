

let addTimelinebtn = document.querySelector(".add-timeline")
let closeBtn = document.querySelector(".close-btn")
let formContainer = document.querySelector(".form-container");
let form = document.querySelector("form.form");
let updateIndex = null;
let mainImage = document.getElementById("img");

addTimelinebtn.addEventListener("click", openModal);

closeBtn.addEventListener("click", closeModal);

form.addEventListener('submit', addTimelineData);

mainImage.addEventListener("change", previewImage);

function openModal() {
    formContainer.style.display = "block";
}

function closeModal() {
    formContainer.style.display = "none";

    let i = document.querySelector(".img-area i");
    let p = document.querySelector(".img-area p");
    let img = document.querySelector(".img-area img");

    p.style.display = "block";
    i.style.display = "block";
    img.style.display = "none";


}

function addTimelineData(e) {
    e.preventDefault()

    let timelineData = JSON.parse(localStorage.getItem("timelineData")) || [];

    let year = e.target.year.value.trim();
    let title = e.target.title.value.trim();
    let details = e.target.details.value.trim();
    let img = e.target.img.files[0];
    let imageUrl = URL.createObjectURL(img);

    if (!Array.isArray(timelineData)) {
        timelineData = [];
    }

    if (updateIndex !== null) {
        timelineData[updateIndex] = {
            imageUrl: imageUrl,
            year: year,
            title: title,
            details: details
        }
        updateIndex = null;
    } else {
        if (year && title && details) {
            timelineData.push({
                imageUrl: imageUrl,
                year: year,
                title: title,
                details: details
            })
        } else {
            alert("Please Fill all the details")
        }
    }

    let sortedData = timelineData.sort((a, b) => a.year - b.year);
    console.log(sortedData)


    localStorage.setItem("timelineData", JSON.stringify(sortedData));

    e.target.reset();

    closeModal();

    createTimelineData();
}

// function createTimelineData() {

//     let timelineData = JSON.parse(localStorage.getItem("timelineData"));


//     let timelineArea = document.querySelector(".timeline");
//     let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        
//     // Generate unique class name for this event
//     let eventClass = `event-${index}`;
//     let event = "";

//     timelineData.forEach((element, index) => {
//         event += `<div class="event" onclick="">
//                     <div class="main">
//                     <img src="${element.imageUrl}" alt="icon">
//                     <div class="year">${element.year} <i class="bi bi-pencil-square edit-btn" onclick="edit(${index})"></i></div>
//                     </div>
//                         <div class="card">
//                             <i class="bi bi-trash3 trash-btn" onclick="del(${index})"></i>
//                             <h3 class="title">${element.title}</h3>
//                             <p class="details">${element.details}</p>
//                         </div>
//                     </div>`;
//     });

//     timelineArea.innerHTML = event;

// }

function createTimelineData() {

    let timelineData = JSON.parse(localStorage.getItem("timelineData"));

    let timelineArea = document.querySelector(".timeline");
    let event = "";

    timelineData.forEach((element, index) => {
        // Generate random color
        let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        
        // Generate unique class name for this event
        let eventClass = `event-${index}`;

        event += `<div class="event " onclick="">
                    <div class="main ${eventClass}">
                    <img src="${element.imageUrl}" alt="icon">
                    <div class="year ${eventClass}">${element.year} <i class="bi bi-pencil-square edit-btn" onclick="edit(${index})"></i></div>
                    </div>
                        <div class="card ${eventClass}">
                            <i class="bi bi-trash3 trash-btn" onclick="del(${index})"></i>
                            <h3 class="title">${element.title}</h3>
                            <p class="details">${element.details}</p>
                        </div>
                    </div>`;

        // Add CSS style for this event class
        let style = document.createElement('style');
        style.innerHTML = `
            .${eventClass} {
                background-color: ${randomColor};
            }
        `;
        document.head.appendChild(style);
    });

    timelineArea.innerHTML = event;

}


function del(i) {
    let timelineData = JSON.parse(localStorage.getItem("timelineData"));
    timelineData.splice(i, 1);
    localStorage.setItem("timelineData", JSON.stringify(timelineData));
    createTimelineData();
}

function edit(i) {
    let timelineData = JSON.parse(localStorage.getItem("timelineData"));
    let finalData = timelineData[i];

    form.title.value = finalData.title;
    form.year.value = finalData.year;
    form.details.value = finalData.details;

    updateIndex = i;

    openModal()
    localStorage.setItem("timelineData", JSON.stringify(timelineData));

    console.log(finalData)
}

function getRandomColor() {
    let red = Math.floor(Math.random() * 155) + 100;
    let green = Math.floor(Math.random() * 155) + 100;
    let blue = Math.floor(Math.random() * 155) + 100;
    let rgb = `rgb(${red}, ${green}, ${blue})`


}
getRandomColor();

function previewImage(e) {

    let label = document.querySelector(".img-area");
    let i = document.querySelector(".img-area i");
    let p = document.querySelector(".img-area p");
    let img = e.target.files[0];
    let reader = new FileReader();
    console.log("reader", reader)

    reader.onload = function (event) {
        console.log(event.target.result)
        let image = event.target.result;
        let finalImg = document.createElement("img");
        finalImg.classList.add("added-img");
        finalImg.src = image;
        // label.innerHTML = "";
        p.style.display = "none";
        i.style.display = "none";
        label.appendChild(finalImg);

        localStorage.setItem("selectedImage", image);
    };
    console.log(reader)

    reader.readAsDataURL(img);

}

createTimelineData()
