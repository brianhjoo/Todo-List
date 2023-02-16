const form = document.querySelector('.form');
const list = document.querySelector('.list');
const search = document.querySelector('#search');

function addTodo(input) {
  const todoWrapper = document.createElement('div');
  const todoInput = document.createElement('input');
  const controlsWrapper = document.createElement('div');
  const doneButton = document.createElement('span');
  const editIcon = document.createElement('i');
  const deleteIcon = document.createElement('i');

  todoWrapper.classList.add('todo');

  todoInput.classList.add('todoInput');
  todoInput.type = 'text';
  todoInput.autocomplete = 'off';
  todoInput.setAttribute('readonly', 'readonly');
  todoInput.setAttribute('value', input);

  controlsWrapper.classList.add('controls');
  doneButton.classList.add('doneButton');
  doneButton.innerText = 'done';
  editIcon.classList.add('fa-regular', 'fa-pen-to-square', 'edit');
  deleteIcon.classList.add('fa-regular', 'fa-trash-can', 'delete');

  controlsWrapper.append(doneButton, editIcon, deleteIcon);
  todoWrapper.append(todoInput, controlsWrapper);
  list.append(todoWrapper);
}

function searchForTodo(input) {
  const arr = [...list.children];
  arr.filter(todo => {
    const todoInput = todo.querySelector('.todoInput');
    return !todoInput.getAttribute('value').toLowerCase().includes(input);
  }).forEach(todo => {
    todo.classList.add('filtered');
  });
  arr.filter(todo => {
    const todoInput = todo.querySelector('.todoInput');
    return todoInput.getAttribute('value').toLowerCase().includes(input);
  }).forEach(todo => {
    todo.classList.remove('filtered');
  });
}

function editTodo(todo) {
  todo.removeAttribute('readonly');
  todo.focus();
}

function saveTodo(todo) {
  todo.setAttribute('value', todo.value);
  todo.setAttribute('readonly', 'readonly');
}


form.addEventListener('submit', e => {
  e.preventDefault();

  if (form.todo.value) {
    addTodo(form.todo.value.trim());
    form.reset();
  }
});


list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.classList.contains('edit')) {
    editTodo(e.target.parentElement.previousElementSibling);
  }
  if (e.target.tagName === 'SPAN') {
    const allTodos = list.querySelectorAll('.todo');
    const todo = e.target.parentElement.previousElementSibling;
    const todoContainer = e.target.parentElement.parentElement;
    todo.classList.toggle('done');
    if (allTodos.length > 1) {
      todoContainer.remove();
      list.append(todoContainer);
    }
  }
});

list.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    saveTodo(e.target);
  }
});

search.addEventListener('keyup', e => {
  searchForTodo(e.target.value.trim().toLowerCase());
});