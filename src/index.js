
import {todos} from '../data/todos.js';

function router(url) {
    const cur_url = url[4];
    if (cur_url === 'dist') {
        createTodoPage(todos);
    }
}

window.onload = function () {
    router(_.split(window.location, '/'));
}

const createTodo = (todo) => {
    
    return _.template(`<li name='todo-item'> <%= item %> </li>`)(todo);
}
const createTodos = () => {
    const $ul = $('<ul />');
    $ul.append(todos.map((todo) => createTodo(todo)));
    return $ul;
}

function createTodoPage(){
    const element = createTodos();
    console.log(element);
}
