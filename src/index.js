
import {todos} from '../data/todos.js';

function router(url) {
    const cur_url = url[4];
    if (cur_url === 'dist') {
        createTodoPage(todos);
    }
}

class collection{
    constructor(data) {
        this.data = data;
        this.createItem =(todo) => {
            return _.template(`<li name='todo-item'><input type="checkbox" > <%= item %> </li>`)(todo);
        }
        this.createItemList =()=>{
            const $ul = $('<ul  />');
            $ul.append(this.data.map((todo) => this.createItem(todo)));
            return $ul;
        }
    }
}

window.onload = function () {
    router(_.split(window.location, '/'));
}



function createTodoPage(){
    let newtodos =new collection(todos);
    const element = newtodos.createItemList();
    $('#todo-section').append(element[0]);
}
