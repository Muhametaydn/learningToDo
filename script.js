// Todo eleman ekleme
// burası onemli
// Eleman Seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;

//load items
loadItems();

eventListeners();
function eventListeners() {
  //submit
  form.addEventListener("submit", addNewItem);
  //delete an item
  taskList.addEventListener("click", deleteItem);
  //delete all item
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  todos = getItemsFormLS();
  todos.forEach(function(item){
    creatItem(item);
  });
}
//get ıtems form locak storage
function getItemsFormLS() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
  
}

//sett item to form ls
function setItemToLS(newTodo) {
  todos = getItemsFormLS();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function creatItem(newTodo) {
  // li olusturma
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";

  li.appendChild(document.createTextNode(newTodo));

  // a olusturmak
  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';
  li.appendChild(a);
  taskList.appendChild(li);
}
function addNewItem(e) {
  if (input.value === "") {
    alert("Add new item");
    // console.log("submit");
  }
  //create item
  creatItem(input.value);
  setItemToLS(input.value);

  input.value = "";
  e.preventDefault();
}

//eleman silme
function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("silmek istediginize emin misiniz?")) {
      e.target.parentElement.parentElement.remove();
      deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
    }
  }

  e.preventDefault();
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getItemsFormLS();

    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}

//delete all item

function deleteAllItems(e) {
  if (confirm("Tüm elemanları silmek istediginizi emin misiniz")) {
   while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild)
   }
   localStorage.clear();
  }
  // taskList.innerHTML ="";
}
