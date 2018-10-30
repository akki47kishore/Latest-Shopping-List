const cartEvent = function(todos) {
    $('#page').on("click", function (e) {
        if (e.target && e.target.name === 'Remove') {
            const itemIndex = todos.findIndex((element)=>{
                return element.item === $(e.target).prop('id');
            });
            $(e.target).parent().parent().remove();
            todos[itemIndex].active = false;
        } 
    });
}

const createCartItems = function (element, index, category) {
    return _.template(`<li name='todo-item' id='catalogue${index}' class='py-2 list-group-item" w-75  pr-2'> Buy <%= item %> - <span class='float-right ml-2'>(<%= qty %> in Stock)</span><input type="number"  class="form-control h-75 float-right d-inline  w-25 itemsChosen" value='' name= '${category}_<%= item %>' placeholder='Enter quantity' > </li>`)(element);
}

const createCartPage = function(catalogue,todos) {
    document.getElementById("page-name").innerHTML = 'Cart';
    let checkboxValues = todos.filter((element)=>{
        return element.active === true;
    });
    const $section = $(`<section class = "mt-3"></section>`);
    checkboxValues.forEach((todoItem) => {
        let $ul =$(`<ul class="ml-3 my-3 list-group" id="collection-ul "><section class='mb-3'><b class='py-3 pl-0 w-50 d-inline-block'><h4>${todoItem.item}</h4> - choose from the options below:</b><button type='button' name='Remove' id='${todoItem.item}'  class='btn btn-danger  d-inline-block w-10 mr-5 remove-btn d-inline'>Remove</button></section></ul> `);
        $ul.append(catalogue[todoItem.item].map((element, index) => createCartItems(element, index, todoItem.item)));
        $section.append($ul[0]);
    });
    $section.append(`<button type = 'button' id='changeToCheckout' class = 'btn btn-primary '>Checkout</button> `);
    $('#page').html($section);
    cartEvent(todos);
}

export {createCartPage}; 
