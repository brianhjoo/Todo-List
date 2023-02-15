const form = document.querySelector('.form');
const list = document.querySelector('.list');
const search = document.querySelector('#search');

{/* <div class="todo">
  <input class="todoInput" type="text" readonly="readonly" value="${input}"></input>
  <div class="icons">
    <i class="fa-regular fa-pen-to-square edit"></i>
    <i class="fa-regular fa-trash-can delete"></i>
  </div>
</div>; */}

function addTodo(input) {
  const todoWrapper = document.createElement('div');
  const todoInput = document.createElement('input');
  const iconWrapper = document.createElement('div');
  const editIcon = document.createElement('i');
  const deleteIcon = document.createElement('i');

  todoWrapper.classList.add('todo');

  todoInput.classList.add('todoInput');
  todoInput.type = 'text';
  todoInput.autocomplete = 'off';
  todoInput.setAttribute('readonly', 'readonly');
  todoInput.setAttribute('value', input);

  iconWrapper.classList.add('icons');
  editIcon.classList.add('fa-regular', 'fa-pen-to-square', 'edit');
  deleteIcon.classList.add('fa-regular', 'fa-trash-can', 'delete');

  iconWrapper.append(editIcon, deleteIcon);
  todoWrapper.append(todoInput, iconWrapper);
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
});

search.addEventListener('keyup', e => {
  searchForTodo(e.target.value.trim().toLowerCase());
});