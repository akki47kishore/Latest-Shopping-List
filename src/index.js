import {catalogue} from '../data/catalogue.js';
import {todos} from '../data/todos.js';
let prev_page;
let collectionInstances = [];
class collection {
    constructor(data) {
        this.data = data;
        this.count = 0;
    }
    createListItem(element, type, ul_header) {
        this.count++;
        if (type === 'todo') {
            return _.template(`<li name='todo-item' id='todo${this.count}' class='py-2 list-group-item" w-25 pr-2'><input type="checkbox" class='checkbox' value ='<%= item %>' disabled> Buy <%= item %> - <%= qty%> <button type='button' name='Remove'  class='btn btn-danger remove-btn'>x</button></li>`)(element);
        } else if (type === 'catalogue') {
            return _.template(`<li name='todo-item' id='catalogue${this.count}' class='py-2 list-group-item" w-50  pr-2'> Buy <%= item %> - <input type="number"  class="form-control h-75 float-right d-inline  w-25 itemsChosen" value='' name= '${ul_header}_<%= item %>' placeholder ='0'> </li>`)(element); //<span class='float-right'>Stock available <%= qty%></span> 
        } else if (type === 'cart') {
            return _.template(`<li name='todo-item' id='todo${this.count}' class='py-2 list-group-item" w-25 pr-2'> <%= item %> <%= qty%> <button type='button' name='Remove'  class='btn btn-danger remove-btn'>x</button></li>`)(element);
        }


    }
    createList(ul_header) {
        const $ul = $(`<ul class="ml-3 my-3" id="collection-ul"><b>${ul_header}</b></ul>`);
        return $ul;
    }
    addNewItem($ul, type, ul_header) {
        $ul.append(this.data.map((element) => this.createListItem(element, type, ul_header)));
        return $ul;
    }
    addEvent(){
        $('#page').on("click", function (e) {
            if (e.target && e.target.name === 'Remove') {
                $(e.target).parent().remove();
            }
        });
    }
    destroy() {
        $('#collection-ul').off('click');
    }

}

window.onload = function () {
    window.history.pushState('todo', '', '#todo');
};

function createTodoPage() {
    collectionInstances[0] = new collection(todos);
    const element = collectionInstances[0].createList("Here's the list of items to buy");
    collectionInstances[0].addNewItem(element, 'todo', 'to-dos');
    document.getElementById("page-name").innerHTML = 'To-Do Items';
    $('#todo-section').append(element[0]);
    // $('#collection-ul').on("click", function (e) {
    //     if (e.target && e.target.nodeName === 'BUTTON') {
    //         $(e.target).parent().remove();
    //     }
    // });
    collectionInstances[0].addEvent();
    $("#changeToCatalogue").on("click", function () {
        prev_page = 'todo';
        window.history.pushState('Catalogue', '', '#Catalogue'); //?Check it out later 
        createCataloguePage();
    });

}

function createCartPage() {
    let catalogueSelected = Array.from($('.itemsChosen')).filter(function (element) {
        if (element.value !== '') {
            return [element.name];
        }
    });
    const cartdata = catalogueSelected.map((element) => {
        const category = catalogue[(element.name).split('_')[0]];
        const product = _.find(category, function(prod) { 
            return prod.item == (element.name).split('_')[1]; 
        });
        return product;
    });
    collectionInstances[0] = new collection(cartdata);
    const element = collectionInstances[0].createList("Following List Of Items are added to cart");
    collectionInstances[0].addNewItem(element, 'cart', 'Cart_Section');
    const $section = $(`<section class = "mt-3"></section>`);
    collectionInstances[0].addEvent();
    $section.append(element[0]);
    $section.append(`<button type = 'button' id='changeToBill' class = 'btn btn-primary '>Submit</button> `);
    $('#page').html($section);
    document.getElementById("page-name").innerHTML = 'Cart';
}

function createCataloguePage() {
    document.getElementById("page-name").innerHTML = 'Catalogue';
    let checkboxValues = $('.checkbox').map(function () {
        return $(this).val();
    }).get();
    const $section = $(`<section class = "mt-3"></section>`);
    checkboxValues.forEach((element, index) => {
        collectionInstances[index] = new collection(catalogue[element]);
        const newlist = collectionInstances[index].createList(`${element} - choose from the options below:`);
        collectionInstances[index].addNewItem(newlist, 'catalogue', element);
        $section.append(newlist[0]);
    });
    $section.append(`<button type = 'button' id='changeToCart' class = 'btn btn-primary '>Submit</button> `);
    $('#page').html($section);
    $("#changeToCart").on("click", function () {
        prev_page = 'catalogue';
        window.history.pushState('Cart', '', '#Cart'); //Check it out later 
        createCartPage();
    });
}


function createBillPage() {

}


function router() {
    const link = (location.hash).substring(1);
    if (prev_page === 'todo' || prev_page === 'Cart') {
        collectionInstances[0].destroy();
    }
    if (link === 'todo') {
        createTodoPage();
    } else if (link === 'Catalogue') {
        createCataloguePage();
    } else if (link === 'Cart') {
        createCartPage();
    } else if (link === 'Bill') {
        createBillPage();
    } else {
        console.log('wrong-page');
    }
}
window.onhashchange = router();