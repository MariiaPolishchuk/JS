const head = document.getElementById('h1');
const content = document.getElementById('content');

head.addEventListener('click', () => {
    head.classList.toggle('green');
    if (head.classList.contains('green')) {
        const message = document.createElement('h3');
        message.classList.add('h3');
        message.textContent = 'Add your workers!';
        content.appendChild(message);
    } else {
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
    }
});

class Person {
    constructor(firstName, lastName, age) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        if (value < 0) {
            this._age = 0;
        } else {
            this._age = value;
        }
    }
}

class Employee extends Person {
    constructor(firstName, lastName, age, inn, number, snils, id) {
        super(firstName, lastName, age);
        this.inn = inn;
        this.number = number;
        this.snils = snils;
        this.id = id;
    }
}

class Dev extends Employee {
    constructor(firstName, lastName, age, inn, number, snils, level, id) {
        super(firstName, lastName, age, inn, number, snils, id);
        this.level = level;
    }
}

const employees = [];
const developers = [];
let currentId = 1;

function updateEmployeeList() {
    const employeeList = document.getElementById('employeeList');
    const devList = document.getElementById('devList');
    employeeList.innerHTML = '';
    devList.innerHTML = '';

    employees.forEach((employee, index) => {
        const li = document.createElement('li');
        li.classList.add('list', 'employee-item');
        li.innerHTML = `<span class="bold">${employee.id}. ${employee.firstName} ${employee.lastName}</span>`;
        const details = document.createElement('div');
        details.classList.add('details', 'hidden');
        details.innerHTML = `
            <span class="bold">Age:</span> ${employee.age};<br>
            <span class="bold">INN:</span> ${employee.inn};<br>
            <span class="bold">Number:</span> ${employee.number};<br>
            <span class="bold">SNILS:</span> ${employee.snils};
        `;
        li.appendChild(details);
        li.addEventListener('click', () => {
            details.classList.toggle('hidden');
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            employees.splice(index, 1);
            updateEmployeeList();
        });
        li.appendChild(deleteButton);
        employeeList.appendChild(li);
    });

    developers.forEach((dev, index) => {
        const li = document.createElement('li');
        li.classList.add('list', 'developer-item');
        li.innerHTML = `<span class="bold">${dev.id}. ${dev.firstName} ${dev.lastName}</span>`;
        const details = document.createElement('div');
        details.classList.add('details', 'hidden');
        details.innerHTML = `
            <span class="bold">Age:</span> ${dev.age};<br>
            <span class="bold">INN:</span> ${dev.inn};<br>
            <span class="bold">Number:</span> ${dev.number};<br>
            <span class="bold">SNILS:</span> ${dev.snils};<br>
            <span class="bold">Level:</span> ${dev.level};
        `;
        li.appendChild(details);
        li.addEventListener('click', () => {
            details.classList.toggle('hidden');
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            developers.splice(index, 1);
            updateEmployeeList();
        });
        li.appendChild(deleteButton);
        devList.appendChild(li);
    });
}

document.getElementById('employeeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let age = parseInt(document.getElementById('age').value);
    let inn = document.getElementById('inn').value;
    let number = parseInt(document.getElementById('number').value);
    let snils = document.getElementById('snils').value;
    let type = document.getElementById('type').value;
    let level = document.getElementById('level').value;

    if (type === 'Dev') {
        const newDev = new Dev(firstName, lastName, age, inn, number, snils, level, currentId);
        developers.push(newDev);
    } else {
        const newEmployee = new Employee(firstName, lastName, age, inn, number, snils, currentId);
        employees.push(newEmployee);
    }

    currentId++;
    updateEmployeeList();
    document.getElementById('employeeForm').reset();
});
