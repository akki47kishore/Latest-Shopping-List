import {todos} from '../data/todos.js';
import {createCataloguePage} from './catalog.js';
import {createCartPage} from './cart.js';
import {createCheckoutPage} from './checkout.js';
import {catalogue} from '../data/catalogue.js';
let prev_page;

function createList(ul_header) {
    const $ul = $(`<ul class="ml-3 my-3 list-group" id="collection-ul "><b class='py-3 pl-1 '>${ul_header}</b></ul>`);
    return $ul;
}

function createTodos(element, index) {
    const checked = (element.active === true) ? 'checked' : '';
    const labelTxt = (element.active === 'done' )? '<s>Buy <%= item %> - <%= qty%></s>' : 'Buy <%= item %> - <%= qty%>';
    return _.template(`<li name='todo-item' id='todo_${index}'  class='py-2 list-group-item border" w-25 pr-2'>
                            <input type="checkbox" name='checkbox' class='checkbox' id='${index}'  value ='<%= item %>' ${checked}> 
                            <label class="form-check-label" for='${index}'>${labelTxt}</label>  
                      </li>`)(element);
}
function todoEvent(){
    $('#page').on("click", function (e) {
        if (e.target && e.target.name === 'checkbox') {
            todos[e.target.id].active = true;
        } 
    });
}

function createTodoPage() {
    const $ul = createList("Here's the list of items to buy");
    $ul.append(todos.map((element, index) => createTodos(element, index)));
    document.getElementById("page-name").innerHTML = 'To-Do Items';
    $ul.append(`<section class='mt-4'>
                <button class='btn btn-primary  w-10  d-inline' id="changeToCart" >Cart</button></section>`);
    $('#page').html($ul[0]);
    todoEvent();
    $("#changeToCart").on("click", function () {
        prev_page = 'todo';
        window.history.pushState('Cart', '', 'Cart'); //?Check it out later 
        createCartPage(catalogue,todos);
        $("#changeToCheckout").on("click", function () {
            prev_page = 'catalogue';
            window.history.pushState('Checkout', '', '#Checkout'); //Check it out later 
            createCheckoutPage(catalogue);
        });
    });

}

function destroy() {
    $('#page').off('click');
}


window.onload = function () {
    window.history.pushState('todo', '', '#todo');
    $('#nav-bar').on("click",function(e){
        if (e.target && e.target.name === 'todo') {
            // window.history.pushState('todo', '', '#todo');
            createTodoPage();
        } else if(e.target && e.target.name === 'catalogue'){
               //window.history.pushState('Catalogue', '', 'Catalogue');
            createCataloguePage(catalogue);
        }else if(e.target && e.target.name === 'cart'){
            //window.history.pushState('Cart', '', 'Cart'); 
            createCartPage(catalogue,todos);
            $("#changeToCheckout").on("click", function () {
                prev_page = 'catalogue';
                window.history.pushState('Checkout', '', '#Checkout'); //Check it out later 
                createCheckoutPage(catalogue);
            });
        }
    })
};

function router() {
    const link = (location.hash).substring(1);
    if (prev_page === 'todo' || prev_page === 'Cart') {
        destroy();
    }
    if (link === 'todo') {
        createTodoPage();
    } else if (link === 'Catalogue') {
        createCataloguePage(catalogue);
    } else if (link === 'Cart') {
        createCartPage(catalogue,todos);
    } else if (link === 'Checkout') {
        createCheckoutPage(catalogue);
    } else {
        console.log('wrong-page');
    }
}
window.onhashchange = router();
export{todos}
