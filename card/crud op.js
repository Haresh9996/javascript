let form = document.querySelector(".add");
let tbody = document.querySelector(".tbody");
let adduser = document.querySelector(".add-user");

adduser.addEventListener("click", () => {
    form.classList.toggle("hide");
})

let editIndex = null;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = e.target.name.value.trim();
    let about = e.target.about.value.trim();
    let email = e.target.email.value.trim();
    let number = e.target.number.value.trim();

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (number.length < 10) {
        alert("Please enter a number with at least 10 digits.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("usersdata")) || [];

    if (!Array.isArray(users)) {
        users = []; 
    }
      
    if (editIndex !== null) {
        // Editing existing user
        users[editIndex] = {
            "name": name,
            "about": about,
            "email": email,
            "number": number
        };
        editIndex = null; 
    } else {
       
        users.push({
            "name": name,
            "about": about,
            "email": email,
            "number": number
        });
    }

    localStorage.setItem("usersdata", JSON.stringify(users));
    e.target.reset();
    
    form.classList.toggle("hide");
    createData();
})

let createData = () => {

    let users = JSON.parse(localStorage.getItem("usersdata")) || [];

    let finalData = "";

    users.forEach((element, index) => {
        finalData += `<tr>
                        <td>${element.name}</td>
                        <td>${element.about}</td>
                        <td>
                            <div>Mo. No. <span>${element.number}</span></div>
                            <div>Email Id <span>${element.email}</span></div>
                        </td>
                        <td>
                            <span><i class="fa-solid fa-pen-to-square" onclick="edit(${index})"></i></span>
                            <span><i class="fa-regular fa-trash-can" onclick="remove(${index})"></i></span>
                        </td>
                    </tr>`;
    })

    tbody.innerHTML = finalData;
}

let edit = (i) => {

    let users = JSON.parse(localStorage.getItem("usersdata")) || [];

    let user = users[i];
    console.log(user);

    form.name.value = user.name;
    form.about.value = user.about;
    form.email.value = user.email;
    form.number.value = user.number;

    editIndex = i;

    localStorage.setItem("usersdata", JSON.stringify(users));
    createData();
    form.classList.toggle("hide");
}


let remove = (i) => {
    let users = JSON.parse(localStorage.getItem("usersdata")) || [];

    users.splice(i, 1)

    localStorage.setItem("usersdata", JSON.stringify(users));

    createData();
}

createData()
