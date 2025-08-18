/*
1. Переробити ToDo-list з використанням Jquery
2. За допомогою Bootstrap створити модальне вікно до TODO list, яке по кліку на завдання буде показувати вікно з його текстом.
*/


//jquery wariant 

$(document).ready(function () {
    const $form = $('.js--form');
    const $input = $('.js--form__input');
    const $ul = $('.js--todos-wrapper');
    const $pTextTask = $('#textTask');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        $ul.empty();

        tasks.forEach((task, index) => {
            const $li = $('<li>').addClass('todo-item');
            if (task.done) $li.addClass('todo-item--checked');

            const $checkbox = $('<input type="checkbox">').prop('checked', task.done);
            $checkbox.on('change', function () {
                tasks[index].done = this.checked;
                saveToLocalStorage();
                renderTasks();
            });

            const $span = $('<span>')
                .addClass('todo-item__description')
                .text(task.text)
                .on('click', function () {
                    $pTextTask.text($(this).text());
                    modal.show();
                });

            const $button = $('<button>')
                .addClass('todo-item__delete btn btn-danger btn-sm ms-2')
                .text('Видалити')
                .on('click', function () {
                    tasks.splice(index, 1);
                    saveToLocalStorage();
                    renderTasks();
                });

            $li.append($checkbox, $span, $button);
            $ul.append($li);
        });
    }

    $form.on('submit', function (e) {
        e.preventDefault();
        const text = $input.val().trim();
        if (!text) {
            alert('нема задачі');
            return;
        }
        tasks.push({ text, done: false });
        saveToLocalStorage();
        renderTasks();
        $input.val('');
    });

    const modalElement = document.getElementById('myModal');
    const modal = new bootstrap.Modal(modalElement);

    $('#closeModalHeader, #closeModalFooter').on('click', function () {
        modal.hide();
    });

    renderTasks();
});