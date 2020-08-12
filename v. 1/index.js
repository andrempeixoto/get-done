// App de To-do

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
}