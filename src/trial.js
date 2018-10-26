const createTodo = (todo) => {
    return _.template(``)(todo);
}

const createTodos = (data) => {
    const $ul = $('<ul />');

    $ul.append(
        todos.map((todo) => createTodo(todo))
    );

    return $ul;
}

const createTodoPage = (todos) => {
    const $root = $('#root');
    const $page = $('<div />');
    const $ul = createTodos(data);
    const onChange = function () {
        const index = 0 // calculate
        const matched = todos[index];

        if (matched) {
            matched.done = !matched.done;
        }
    }

    $page.append($ul);

    $ul.on('change', 'input', onChange);

    $root.append($page);

    return {
        onDistroy: () => {
            $ul.off('change');
        }
    }
}












//mine 
<form class="mt-5">
<section class="form-group form-check">
    
    <input type="checkbox" class="form-check-input " id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
</section>
<section class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
</section>
<button type="submit" class="btn btn-primary">Submit</button>
</form>