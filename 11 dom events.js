const formTodo = document.querySelector(".todo");
const todoList = document.querySelector(".todo-list");
const inputText = document.querySelector("#todo-text");

window.addEventListener("load", () => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach(todoText => {
        addTodoItem(todoText);
    });
});

formTodo.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = inputText.value.trim();
    if (todoText === "") {
        alert("Please add a todo");
        return;
    }
    addTodoItem(todoText);

    inputText.value = "";
});
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodoItem(todoText) {
    // Create new todo item
    const li = document.createElement("li");
    li.classList.add("list-items");
    li.innerHTML = `<span class="list-text">${todoText}</span> 
                    <div class="todo-btns">
                        <button class="btn done">done</button> 
                        <button class="btn remove">remove</button>
                    </div>`;
    todoList.appendChild(li);

    savedTodos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("done")) {
        const span = e.target.parentNode.previousElementSibling;
        span.style.textDecoration = "line-through";
    }
    if (e.target.classList.contains("remove")) {
        const todoText = e.target.parentNode.previousElementSibling.textContent;
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        const index = savedTodos.indexOf(todoText);
        // if (index !== -1) {
        //     savedTodos.splice(index, 1);
        // }
        e.target.parentNode.parentNode.remove();

    }
});

// let progress = document.querySelector(".final-progress");
// let completedTasks = document.querySelector(".completed");
// let totalTasks = document.querySelector(".task-items");

// let data = JSON.parse(localStorage.getItem("todos"));

// if(!Array.isArray(data)){
//     data = []
// }

// console.log(data.length);