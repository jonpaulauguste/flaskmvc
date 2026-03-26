async function getTodoData() {
    const response = await fetch('/api/todos');
    if (response.ok === false) {
        throw new Error('Unable to fetch todos');
    }
    return response.json();
}

function getStatusBadge(isCompleted) {
    if (isCompleted) {
        return '<span class="badge text-bg-success">Completed</span>';
    }
    return '<span class="badge text-bg-warning">Pending</span>';
}

function loadTable(todos) {
    const table = document.querySelector('#result');
    table.innerHTML = '';

    for (const todo of todos) {
        table.innerHTML += '<tr>' +
            '<td>' + todo.id + '</td>' +
            '<td>' + todo.userId + '</td>' +
            '<td>' + todo.title + '</td>' +
            '<td>' + getStatusBadge(todo.completed) + '</td>' +
            '</tr>';
    }
}

async function main() {
    try {
        const todos = await getTodoData();
        loadTable(todos);
    } catch (error) {
        const table = document.querySelector('#result');
        table.innerHTML = '<tr><td colspan="4">Failed to load todos.</td></tr>';
    }
}

main();
