//selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//eventlisteners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);

//function

function addTodo(event){
    // prevent form from submitting
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //createLi
    const newToDo = document.createElement('li');
    newToDo.innerText = todoInput.value;
    newToDo.classList.add('todo-item')
    todoDiv.appendChild(newToDo);

    //add todo to localstorage
    saveLocalTodos(todoInput.value);



    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
  
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa fa-trash-o"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    //clear input vale
    todoInput.value = "";

};

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        })       
    }

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        //check for undefined values and skips then and only apply the switch statement on nodes with properties 
      if (todo.classList !== undefined) {
        switch (e.target.value) {
          case "all":
            todo.style.display = "flex";
            break;
          case "completed":
            if (todo.classList.contains("completed")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                  todo.style.display = "flex";
                } else {
                  todo.style.display = "none";
                }
            break;
        }
      }
      return;
    });
}

function saveLocalTodos(todo){
  //check if i already have anything in there?
  let todos;
  if(localStorage.getItem('todos')=== null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(todos));

}

function getTodos(){
  //check
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function(todo){

    //create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //createLi
    const newToDo = document.createElement('li');
    newToDo.innerText = todo;
    newToDo.classList.add('todo-item')
    todoDiv.appendChild(newToDo);


    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
  
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa fa-trash-o"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}


function removeLocalTodos(todo){
  //check
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1)
  localStorage.setItem('todos',JSON.stringify(todos));
}
