let form = document.querySelector(".form");
let container = document.querySelector(".container");
let showFormButton = document.querySelector(".showFormButton")

showFormButton.addEventListener('click', () => {
    // Toggle the visibility of the form
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
});

let editIndex = null;

document.querySelector("#upload-img").addEventListener("change", (e)=>{
    e.preventDefault();
    let label = document.querySelector(".upload-area");
    let imageFile = e.target.files[0];
    let imageUrl = URL.createObjectURL(imageFile);
    label.style.padding = 0;
    label.innerHTML = ""; // Clear previous preview
    let imagePreview = document.createElement("img");
    imagePreview.src = imageUrl;
    label.appendChild(imagePreview);
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const about = e.target.about.value;
    const follower = e.target.follower.value;
    const following = e.target.following.value;
    const repo = e.target.repo.value;
    const gitlink = e.target.gitlink.value;
    const linkedin = e.target.linkedin.value;
    let imageFile = e.target.image.files[0];
    let imageUrl = URL.createObjectURL(imageFile);

    let users = JSON.parse(localStorage.getItem("userCard")) ?? [];

    if (!users || users == null) {
        users = [];
    }

    if (editIndex !== null) {
        users[editIndex] = {
            imageUrl: imageUrl,
            name: name,
            about: about,
            follower: follower,
            following: following,
            repo: repo,
            gitlink: gitlink,
            linkedin: linkedin
        }
        editIndex = null;
    } else {
        users.push({
            imageUrl: imageUrl,
            name: name,
            about: about,
            follower: follower,
            following: following,
            repo: repo,
            gitlink: gitlink,
            linkedin: linkedin
        })
    }
    localStorage.setItem("userCard", JSON.stringify(users));

    form.reset();

    form.style.display = "none"

    makeCards()
})

function makeCards() {
    document.querySelector(".upload-area img").style.display = "none";
    let users = JSON.parse(localStorage.getItem("userCard")) ?? [];

    let containerData = "";

    users.forEach((element, index) => {
        containerData += `<div class="card">
                                <i class="fa-regular fa-pen-to-square" onclick="edit(${index})"></i> 
                                <i class="fa-regular fa-trash-can" onclick="del(${index})"></i> 
                                <div class="img-container">
                                    <img src="${element.imageUrl}" alt="">
                                </div>
                                <div class="card-body">
                                    <h2 class="full-name">${element.name}</h2>
                                    <p class="about">${element.about}</p>
                                    <div class="github">
                                        <p>Followers: <span>${element.follower}</span></p>
                                        <p>Following: <span>${element.following}</span></p>
                                        <p>Repos: <span>${element.repo}</span></p>
                                    </div>
                                    <div class="social-icons">
                                        <a href="${element.gitlink}" class="social-links"><i class="fa-brands fa-square-github"></i></a>
                                        <a href="${element.linkedin}" class="social-links"><i class="fa-brands fa-linkedin-in"></i></a>
                                    </div>
                                </div>
                            </div>`
    });
    container.innerHTML = containerData;
}

function del(i) {
    let users = JSON.parse(localStorage.getItem("userCard")) ?? [];
    users.splice(i, 1);
    localStorage.setItem("userCard", JSON.stringify(users));
    makeCards()
}

function edit(i) {
    let users = JSON.parse(localStorage.getItem("userCard")) ?? [];
    let user = users[i];

    form.name.value = user.name;
    form.about.value = user.about;
    form.follower.value = user.follower;
    form.following.value = user.following;
    form.repo.value = user.repo;
    form.gitlink.value = user.gitlink;
    form.linkedin.value = user.linkedin;

    let imagePreview = container.querySelector(".img-container img");
    imagePreview.src = user.imageUrl;

    editIndex = i;

    localStorage.setItem("userCard", JSON.stringify(users));

    makeCards()
}
makeCards()
