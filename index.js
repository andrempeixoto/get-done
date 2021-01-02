var listElement = document.querySelector('.todo-list');
var inputElement = document.querySelector('input');
var addButtonElement = document.querySelector('.add-todo');

inputElement.focus();
inputElement.select();

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
  listElement.innerHTML = '';

  for (todo of todos) {
    var todoElement = document.createElement('li');
    todoElement.classList.add('todo-element');
    var todoText = document.createTextNode(todo + ' ');

    var linkElement = document.createElement('a');
    linkElement.setAttribute('href', '#');
    linkElement.classList.add('link-element');
    var linkText = document.createTextNode('✅');
    linkElement.appendChild(linkText);

    var pos = todos.indexOf(todo);
    linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');

    todoElement.appendChild(todoText);
    todoElement.appendChild(linkElement);

    listElement.appendChild(todoElement);
  }
}

renderTodos();

function addTodo() {
  var todoText = inputElement.value;
  if (todoText === '') {
    return false;
  } else {
    todos.push(todoText);
  }
  inputElement.value = '';

  renderTodos();
  saveToStorage();
}

addButtonElement.onclick = addTodo;

function enterAsClick(event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Cancel the default action, if needed
    addButtonElement.click(); // Trigger the button element with a click
  }
}

inputElement.addEventListener('keyup', enterAsClick);

function deleteTodo(pos) {
  todos.splice(pos, 1);
  renderTodos();
  saveToStorage();
}

function setDarkTheme() {
  var body = document.querySelector('body'),
    app = document.querySelector('#app'),
    h1 = document.querySelector('.title'),
    input = document.querySelector('input'),
    motivational = document.querySelector('.motivational-phrase'),
    emojiRun = document.querySelector('.emoji-run-element'),
    themeButtonElement = document.querySelector('.theme-selector');

  body.classList.toggle('dark-theme');
  app.classList.toggle('dark-theme');
  h1.classList.toggle('dark-theme');
  input.classList.toggle('dark-theme');
  motivational.classList.toggle('dark-theme');
  emojiRun.classList.toggle('dark-theme');
  themeButtonElement.classList.toggle('dark-theme');

  if (app.classList.contains('dark-theme')) {
    localStorage.setItem('dark-theme', 'enabled');
  } else {
    localStorage.setItem('dark-theme', 'disabled');
  }
}

if (localStorage.getItem('dark-theme') === 'enabled') {
  setDarkTheme();
}

function saveToStorage() {
  localStorage.setItem('list_todos', JSON.stringify(todos));
}
