class TodoList {
    constructor(el) {
        this.todos = [];
        this.el = el;
        this.filteredTodos = [];
        this.render();
        this.addEventListeners();
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.filteredTodos = [];
        this.render();
    }

    removeTodo(id) {
        this.todos = this.todos.filter(el => el.id !== id);
        this.render();
    }

    changeStatus(id) {
        const todo = this.todos.find(el => el.id === id);
        if (todo) {
            todo.status = !todo.status;
            this.render();
        }
    }

    findTasks(query) {
        this.filteredTodos = this.todos.filter(el => el.value.includes(query));
        this.render();
    }

    moveUp(id) {
        const index = this.todos.findIndex(el => el.id === id);
        if (index > 0) {
            [this.todos[index], this.todos[index - 1]] = [this.todos[index - 1], this.todos[index]];
            this.render();
        }
    }

    moveDown(id) {
        const index = this.todos.findIndex(el => el.id === id);
        if (index < this.todos.length - 1) {
            [this.todos[index], this.todos[index + 1]] = [this.todos[index + 1], this.todos[index]];
            this.render();
        }
    }

    render() {
        let todosToRender = this.filteredTodos.length > 0 ? this.filteredTodos : this.todos;
        this.el.innerHTML = todosToRender.map(el => `
            <li data-id="${el.id}" class="${el.status ? 'completed' : 'in-progress'} ${this.filteredTodos.length > 0 && this.filteredTodos.includes(el) ? 'highlight' : ''}">
                <span>${el.value}</span>
                <button class="set-status">Change status</button>
                <button class="delete-task">Delete</button>
                <button class="move-up">Move Up</button>
                <button class="move-down">Move Down</button>
            </li>
        `).join('');
    }

    addEventListeners() {
        this.el.addEventListener('click', event => {
            const target = event.target;
            const id = target.closest('li').dataset.id;

            if (target.classList.contains('set-status')) {
                this.changeStatus(id);
            } else if (target.classList.contains('delete-task')) {
                this.removeTodo(id);
            } else if (target.classList.contains('move-up')) {
                this.moveUp(id);
            } else if (target.classList.contains('move-down')) {
                this.moveDown(id);
            }
        });

        document.querySelector('.create-btn').addEventListener('click', () => {
            const input = document.querySelector('.todo-input');
            const value = input.value.trim();
            if (value) {
                this.addTodo(new Task(value, false));
                input.value = '';
            }
        });

        document.querySelector('.find-btn').addEventListener('click', () => {
            const query = document.querySelector('.find-input').value.trim();
            this.findTasks(query);
            document.querySelector('.find-input').value = '';
        });

        document.querySelector('.show-all-btn').addEventListener('click', () => {
            this.filteredTodos = [];
            this.render();
        });

        document.addEventListener('click', event => {
            if (!event.target.closest('li') && !event.target.closest('button')) {
                this.filteredTodos = [];
                this.render();
            }
        });
    }
}

class Task {
    constructor(value, status) {
        this.value = value;
        this.status = status;
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('.list');
    const todoList = new TodoList(list);
});
