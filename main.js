/*Доробити TODO лист, в якому буде можливість:

1. Додати завдання
2. Видалити завдання
3. Відзначити як виконану
4. Усі дані повинні зберегтися після перезавантаження сторінки.
*/

//form
const form = document.querySelector('.js--form');

//input area
const userInputTask = document.querySelector('.js--form__input');

//buttons const
const buttonTask = document.querySelector('.form__btn');

//list area
const ul = document.querySelector('.js--todos-wrapper');
const li = document.querySelector('.todo-item');

//span
const todoitemdescription = document.querySelectorAll('.todo-item__description');

//last li area 
const todoitemchecked = document.querySelector('.todo-item--checked');


const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

 
function createTasks() {
    ul.innerHTML = "";

    tasks.forEach((task, index) => {
        const newLi = document.createElement('li');
        newLi.classList.add('todo-item');
        if (task.done) {
            newLi.classList.add('todo-item--checked');
        }
        
        const newDoneInput = document.createElement('input');
        newDoneInput.type = "checkbox";
        newDoneInput.checked = task.done;
        newDoneInput.addEventListener('change', () => {
            tasks[index].done = newDoneInput.checked;
            saveToLocalStorage();
            createTasks();
        });

        const newSpan = document.createElement('span');
        newSpan.classList.add('todo-item__description');
        newSpan.textContent = task.text;

        const newButton = document.createElement('button');
        newButton.classList.add('todo-item__delete');
        newButton.textContent = "Видалити";
        newButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveToLocalStorage();
            createTasks();
        });

        newLi.appendChild(newDoneInput);
        newLi.appendChild(newSpan);
        newLi.appendChild(newButton);
        ul.appendChild(newLi);
        
//for modal
newSpan.addEventListener('click', () => {
    modal.show();
    pTextTask.textContent = newSpan.textContent;
})
    });
}


function reCreateTask(event) {
    event.preventDefault();

    const userTaskText = userInputTask.value.trim();
    if (userTaskText === "") {
        alert('нема задачі');
        return;
    }

    tasks.push({ text: userTaskText, done: false });
    saveToLocalStorage();
    createTasks();

    userInputTask.value = '';
}

buttonTask.addEventListener('click', reCreateTask);
document.addEventListener('DOMContentLoaded', createTasks);

//for modal
const modalElement = document.getElementById('myModal');
const closeHeader = document.getElementById('closeModalHeader');
const closeFooter = document.getElementById('closeModalFooter');
const pTextTask = document.getElementById('textTask');


const modal = new bootstrap.Modal(modalElement);

closeHeader.addEventListener('click', () => {
    modal.hide();
})

closeFooter.addEventListener('click', () => {
    modal.hide();
})