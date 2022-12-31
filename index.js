const listElement = document.querySelector('.todo-list');
const inputElement = document.querySelector('input');
const addButtonElement = document.querySelector('.add-todo');

inputElement.focus();
inputElement.select();

const todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
  listElement.innerHTML = '';

  for (todo of todos) {
    const todoElement = document.createElement('li');
    todoElement.classList.add('todo-element');

    const todoText = document.createTextNode(todo + ' ');

    const checkElement = document.createElement('a');
    // checkElement.setAttribute('href', '#');
    checkElement.classList.add('check-element');
    const checkIcon = document.createTextNode('✅');
    checkElement.appendChild(checkIcon);

    const pos = todos.indexOf(todo);
    checkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');

    todoElement.appendChild(todoText);
    todoElement.appendChild(checkElement);

    listElement.appendChild(todoElement);
  }
}

renderTodos();

function addTodo() {
  const todoText = inputElement.value;
  if (!todoText) {
    return;
  }
  todos.push(todoText);

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
  const body = document.querySelector('body'),
    app = document.querySelector('#app'),
    h1 = document.querySelector('.title'),
    input = document.querySelector('input'),
    motivational = document.querySelector('.motivational-phrase'),
    emojiRun = document.querySelector('.emoji-run-element'),
    themeButtonElement = document.querySelector('.theme-selector'),
    addTodoButton = document.querySelector('.add-todo');

  body.classList.toggle('dark-theme');
  app.classList.toggle('dark-theme');
  h1.classList.toggle('dark-theme');
  input.classList.toggle('dark-theme');
  motivational.classList.toggle('dark-theme');
  emojiRun.classList.toggle('dark-theme');
  themeButtonElement.classList.toggle('dark-theme');
  addTodoButton.classList.toggle('dark-theme');

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
