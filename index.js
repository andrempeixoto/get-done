// App de To-do
if(localStorage.getItem('dark-mode') === 'enabled') {
  setDarkMode();
}


var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
  listElement.innerHTML = '';

  for (todo of todos) {
    var todoElement = document.createElement('li');
    var todoText = document.createTextNode(todo + ' ');
    
    var linkElement = document.createElement('a');
    linkElement.setAttribute('href', '#');
    var linkText = document.createTextNode('✅');
    linkElement.appendChild(linkText);

    var pos = todos.indexOf(todo);
    linkElement.setAttribute('onclick', 'deleteTodo('+ pos +')');

    todoElement.appendChild(todoText);
    todoElement.appendChild(linkElement);

    listElement.appendChild(todoElement);
  };
};

renderTodos();

function addTodo() {
  var todoText = inputElement.value;
    if (todoText === '') {
      return false;
    } else {
      todos.push(todoText)
    };
  inputElement.value = '';

  renderTodos();
  saveToStorage();
};

buttonElement.onclick = addTodo;

function enterAsClick(event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Cancel the default action, if needed
    buttonElement.click(); // Trigger the button element with a click
  }
};

inputElement.addEventListener('keyup', enterAsClick);

function deleteTodo(pos) {
  todos.splice(pos, 1); // remove, em uma posição, uma qnt de itens de um array
  renderTodos();
  saveToStorage();
};

function saveToStorage() {
  localStorage.setItem('list_todos', JSON.stringify(todos));
};

function setDarkMode() {
  var body = document.querySelector('body'),
  app = document.querySelector('#app'),
  h1 = document.querySelector('#app h1'),
  // a = document.querySelector('#app a'),
  // ul = document.querySelector('#app ul'),
  // li = document.querySelectorAll('#app li'),
  input = document.querySelector('#app input'),
  keepgoing = document.querySelector('#app #keepgoing'),
  onfire = document.querySelector('#app #onfire'),
  button = document.querySelector('#app button#mode');

  body.classList.toggle("dark-mode");
  app.classList.toggle("dark-mode");
  h1.classList.toggle("dark-mode");
  // a.classList.toggle("dark-mode");
  // ul.classList.toggle("dark-mode");
  // for (let i = 0; i < li.length; i++) {
  //   li[i].classList.toggle("dark-mode")
  //   };
  input.classList.toggle("dark-mode");
  keepgoing.classList.toggle("dark-mode");
  onfire.classList.toggle("dark-mode");
  button.classList.toggle("dark-mode");


  if (app.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode', 'enabled');
  } else {
    localStorage.setItem('dark-mode', 'disabled');
  };
};