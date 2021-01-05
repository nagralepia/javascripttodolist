//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();


    // todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");


    // create List-item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Add todo to local Strorage

    if (!todoInput.value == "") {
        saveLocalTosos(todoInput.value);
        //create mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);


        // append all this controls to list
        todoList.appendChild(todoDiv);
        todoInput.value = '';
    } else {
        alert("Cannot save Empty Todo");
    }



}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    console.log(todos);

    todos.forEach(function (todo) {
        // todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");


        // create List-item
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Add todo to local Strorage
        // saveLocalTosos(todoInput.value);


        //create mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // append all this controls to list
        todoList.appendChild(todoDiv);
    });

}

function deleteCheck(e) {
    const item = e.target;
    // delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        })

    }


    // check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';

                } else {
                    todo.style.display = 'none';
                }
                break;
            case "incomplete":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';

                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveLocalTosos(todo) {
    // Check --- hey Do i have already thing in there
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}


function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    console.log("Item==>> ", todo.children[0].innerText);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// localStorage.clear();



