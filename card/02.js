
const addUser = document.querySelector(".add-user");
const form = document.querySelector(".form");

addUser.addEventListener("click", () => {
    form.classList.toggle("hide");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const about = document.getElementById("about").value;
    const follower = document.getElementById("follower").value;
    const following = document.getElementById("following").value;
    const repo = document.getElementById("repo").value;
    const git = document.getElementById("github").value;
    const linkedin = document.getElementById("linkedin").value;

    const imageFile = document.getElementById("upload-img").files[0];
    const imageUrl = URL.createObjectURL(imageFile);

    getdata(imageUrl, name, about, follower, following, repo, git, linkedin);
    form.classList.toggle("hide")

});


function getdata(imageUrl, name, about, follower, following, repo, git, linkedin) {
    const container = document.querySelector(".container");
    const card = document.createElement("div");
    card.classList.add("card");
    const cardContent = `<div class="img-container">
                    <img src="${imageUrl}" alt="">
            </div>
            <div class="card-body">
                    <h2 class="full-name">${name}</h2>
                    <p class="about">${about}</p>
            <div class="github">
                <p>Followers: <span>${follower}</span></p>
                <p>Following: <span>${following}</span></p>
                <p>Repos: <span>${repo}</span></p>
            </div>
            <div class="social-icons">
                <a href="${git}" class="social-links"><i class="fa-brands fa-square-github"></i></a>
                <a href="${linkedin}" class="social-links"><i class="fa-brands fa-linkedin-in"></i></a>
            </div>`
    card.innerHTML = cardContent;
    container.appendChild(card)

}