const formTodo = document.querySelector(".todo");
const todoList = document.querySelector(".todo-list");
const listItem = document.querySelector(".list-items");
const inputText = document.querySelector("#todo-text")

formTodo.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = inputText.value;
    if(todoText === ""){
        alert("Please add todo");
        return;
    }

    inputText.value = ""

    const li = document.createElement("li");
    li.classList.add("list-items");
    li.innerHTML = `<span class="list-text">${todoText}</span> 
                        <div class="todo-btns">
                            <button class="btn done">done</button> 
                            <button class="btn remove">remove</button>
                        </div>`;
    todoList.append(li);

    todoList.addEventListener("click", (e)=>{
        if(e.target.classList.contains("done")){
            const span = e.target.parentNode.previousElementSibling;
            span.style.textDecoration = "line-through";
        }
        if(e.target.classList.contains("remove")){
            e.target.parentNode.parentNode.remove()
        }
    })
})


