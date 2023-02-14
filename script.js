const form = document.querySelector('.form');
const list = document.querySelector('.list');
const search = document.querySelector('#search');


function addTodo(input) {
  const html = `
    <div class="todo"><span>${input}</span><i class="fa-regular fa-trash-can delete"></i></div>
  `;
  list.innerHTML += html;
}

function searchForTodo(input) {
  const arr = [...list.children];
  arr.filter(todo => {
    return !todo.textContent.toLowerCase().includes(input);
  }).forEach(todo => {
    todo.classList.add('filtered');
  });
  arr.filter(todo => {
    return todo.textContent.toLowerCase().includes(input);
  }).forEach(todo => {
    todo.classList.remove('filtered');
  });
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
    e.target.parentElement.remove();
  }
});


search.addEventListener('keyup', e => {
  searchForTodo(e.target.value.trim().toLowerCase());
});