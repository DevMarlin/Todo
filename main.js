window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value)
    })

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })

    DisplayTodos()
})

function DisplayTodos () {
    const todoList = document.querySelector('#todo-list');
    
    todoList.innerHTML = '';
    todos.sort((x, y) => y.createdAt - x.createdAt).forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkBox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = "Delete";

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions)

        todoList.appendChild(todoItem)

        if (todo.done) {
            todoItem.classList.add('done');
        }

        todoItem.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    })
}

function changeLabelStyle(radioElement) {
    const rootStyles = getComputedStyle(document.documentElement);

    label_1 = document.getElementById("label_category1");
    label_2 = document.getElementById("label_category2");

    label_1.style.background = rootStyles.getPropertyValue('--item-clr');
    label_1.style.color = rootStyles.getPropertyValue('--dark');
    label_2.style.background = rootStyles.getPropertyValue('--item-clr');
    label_2.style.color = rootStyles.getPropertyValue('--dark');

    element = document.getElementById("label_" + radioElement.id);

    if (radioElement.id === "category1") {
        element.style.background = rootStyles.getPropertyValue('--business');
    } else {
        element.style.background = rootStyles.getPropertyValue('--personal');
    }

    element.style.color = rootStyles.getPropertyValue('--item-clr');
}

function switchTheme(button) {
    const root = document.documentElement
    if (button.dataset.theme === "dark") {
        theme = "light";

        root.style.setProperty('--grey', '#888');
        root.style.setProperty('--item-clr', '#fff');
        root.style.setProperty('--text-color', '#313154');
        root.style.setProperty('--background', '#eee');
        root.style.setProperty('--hover', '#363636');
        root.style.setProperty('--danger', '#e25d5d');
        root.style.setProperty('--shadow', '0 1px 3px rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--primary', '#c75de2');
        root.style.setProperty('--personal', '#35b48e');
        root.style.setProperty('--business', '#4ab0cf');
        root.style.setProperty('--business-glow', '0px 0px 4px rgba(58, 130, 238, 0.75)');
        root.style.setProperty('--personal-glow', '0px 0px 4px rgba(234, 64, 164, 0.75)');
 
        document.getElementById('themeIcon').src = '/assets/LightTheme.png';
    } else {
        theme ="dark";

        root.style.setProperty('--grey', '#cacaca');
        root.style.setProperty('--item-clr', '#1d1d1d');
        root.style.setProperty('--text-color', '#fff');
        root.style.setProperty('--background', '#161616');
        root.style.setProperty('--hover', '#363636');
        root.style.setProperty('--danger', '#e25d5d');
        root.style.setProperty('--shadow', '0 1px 3px rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--primary', '#c75de2');
        root.style.setProperty('--personal', '#35b48e');
        root.style.setProperty('--business', '#4ab0cf');
        root.style.setProperty('--business-glow', '0px 0px 4px rgba(58, 130, 238, 0.75)');
        root.style.setProperty('--personal-glow', '0px 0px 4px rgba(234, 64, 164, 0.75)');

        document.getElementById('themeIcon').src = '/assets/darkTheme.png';
    }

    button.dataset.theme = theme;
}