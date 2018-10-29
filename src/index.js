import {catalogue} from '../data/catalogue.js';
import {todos} from '../data/todos.js';
let prev_page;
let collectionInstances = [];

function createListItem(element, type, ul_header) {
        this.count++;
        if (type === 'todo') {
            return _.template(`<li name='todo-item' id='todo${this.count}' class='py-2 list-group-item" w-25 pr-2'><input type="checkbox" class='checkbox' value ='<%= item %>' disabled> Buy <%= item %> - <%= qty%> <button type='button' name='Remove'  class='btn btn-danger remove-btn'>x</button></li>`)(element);
        } else if (type === 'catalogue') {
            return _.template(`<li name='todo-item' id='catalogue${this.count}' class='py-2 list-group-item" w-50  pr-2'> Buy <%= item %> - <input type="number"  class="form-control h-75 float-right d-inline  w-25 itemsChosen" value='' name= '${ul_header}_<%= item %>' placeholder ='0'> </li>`)(element); //<span class='float-right'>Stock available <%= qty%></span> 
        } else if (type === 'cart') {
            return _.template(`<li name='todo-item' id='todo${this.count}' class='py-2 list-group-item" w-25 pr-2'> <%= item %> <%= qty%> <button type='button' name='Remove'  class='btn btn-danger remove-btn'>x</button></li>`)(element);
        }

}
function createList(ul_header) {
        const $ul = $(`<ul class="ml-3 my-3" id="collection-ul"><b>${ul_header}</b></ul>`);
        return $ul;
    }
function createTodos(element, index) {
    const checked = element.done ?'checked':'';
    const labelTxt = element.done ? '<s>Buy <%= item %> - <%= qty%></s>' : 'Buy <%= item %> - <%= qty%>';
    return _.template(`<li name='todo-item'  class='py-2 list-group-item" w-25 pr-2'>
                            <input type="checkbox" class='checkbox' id='todo${index}' value ='<%= item %>' ${checked}> 
                            <label class="form-check-label" for='todo${index}'>${labelTxt}</label>  
                            <button type='button' name='Remove'  class='btn btn-danger remove-btn'>x</button>
                      </li>`)(element);
    }
function addEvent(){
        $('#page').on("click", function (e) {
            if (e.target && e.target.name === 'Remove') {
                $(e.target).parent().remove();
            }
        });
    }
function destroy() {
        $('#collection-ul').off('click');
    }


window.onload = function () {
    window.history.pushState('todo', '', '#todo');
};

function createTodoPage() {
    const $ul = createList("Here's the list of items to buy");
    $ul.append(todos.map((element,index) => createTodos(element,index)));
    document.getElementById("page-name").innerHTML = 'To-Do Items';
    $ul.append(`<button class='btn btn-success add-To-do'>Add More</button>
                <button class='btn btn-primary' id="changeToCatalogue" >SUBMIT</button>`);
    $('#page').append($ul[0]);
    addEvent();
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
function createCatalogueOptions(element,index,category){
    return _.template(`<li name='todo-item' id='catalogue${index}' class='py-2 list-group-item" w-50  pr-2'> Buy <%= item %> - <input type="number"  class="form-control h-75 float-right d-inline  w-25 itemsChosen" value='' name= '${category}_<%= item %>' placeholder ='0'> </li>`)(element);
}
function createCataloguePage() {
    document.getElementById("page-name").innerHTML = 'Catalogue';
    let checkboxValues = Array.from($('.checkbox').map(function () {
        if($(this).prop("checked") !== true){
            return $(this).val();
        }else {
            return 1;
        }    
    }));
    checkboxValues = _.pull(checkboxValues,1);
    console.log(checkboxValues);
    const $section = $(`<section class = "mt-3"></section>`);
    checkboxValues.forEach((category) => {
        let $ul = createList(`${category} - choose from the options below:`);
        $ul.append(catalogue[category].map((element,index) => createCatalogueOptions(element,index,category)));
        $section.append($ul[0]);
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