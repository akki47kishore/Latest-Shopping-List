import {catalogue} from '../data/catalogue.js';
import {todos} from '../data/todos.js';
let prev_page;
let collectionInstances= [];
class collection{
    constructor(data) {
        this.data = data;
        this.count = 0;
    }
    createListItem (element,type){
        this.count ++;
        if(type === 'todo'){
            return _.template(`<li name='todo-item' id='todo${this.count}' class='py-2 w-25 pr-2'><input type="checkbox" class='checkbox' value ='<%= item %>' disabled> Buy <%= item %> - <%= qty%> <button type='button'  class='btn btn-danger remove-btn'>x</button></li>`)(element);
        } else if(type === 'catalogue') {
            return _.template(`<li name='todo-item' id='catalogue${this.count}' class='py-2 w-50  pr-2'> Buy <%= item %> - <input type="number"  class="form-control h-75 float-right d-inline  w-25 itemsChosen" value='' name= '<%= item %>' placeholder ='0'> </li>`)(element); //<span class='float-right'>Stock available <%= qty%></span> 
        }
        
    }
    createList (ul_header){
        const $ul = $(`<ul class="ml-3 my-3" id="collection-ul"><b>${ul_header}</b></ul>`);
        return $ul;
    }
    addNewItem($ul,type){
        $ul.append(this.data.map((element) => this.createListItem(element,type)));
        return $ul;
    }
    destroy(){
        $('#collection-ul').off('click');
    }
    
}

window.onload = function () {
    window.history.pushState('todo','', '#todo'); 
};

function createTodoPage(){
    collectionInstances[0] =new collection(todos);
    const element = collectionInstances[0].createList("Here's the list of items to buy");
    collectionInstances[0].addNewItem(element,'todo');
    document.getElementById("page-name").innerHTML = 'To-Do Items';
    $('#todo-section').append(element[0]);
    $('#collection-ul').on("click", function(e) {
        if(e.target && e.target.nodeName === 'BUTTON') {
            $(e.target).parent().hide();
        }
    });
}

function createCartPage(){
    let catalogueSelected = $('.itemsChosen').filter(function() {
        if($(this).val() !== ''){
            return [$(this).name, $(this).val()];
        }
    });

    // catalogueSelected = catalogueSelected.map(element => {
    //     return [element.name, element.value];
    // });
    console.log(catalogueSelected[0].value);
}

function createCataloguePage() {
    document.getElementById("page-name").innerHTML = 'Catalogue';
    const size = $(".checkbox").length;
    let checkboxValues = $('.checkbox').map(function() {
        return $(this).val();
    }).get();
    const $section = $(`<section class = "mt-3"></section>`);
    checkboxValues.forEach((element,index) => {
        collectionInstances[index] = new collection(catalogue[element]);
        const newlist = collectionInstances[index].createList(`${element} - choose from the options below:`);
        collectionInstances[index].addNewItem(newlist,'catalogue');
        $section.append(newlist[0]);
    });
    $section.append(`<button type = 'button' id='changeToCart' class = 'btn btn-primary '>Submit</button> `);
    $('#page').html($section);
    $("#changeToCart").on("click", function(){
        prev_page = 'catalogue'; 
        // window.history.pushState('Cart','', '#Cart');   Check it out later 
        createCartPage();  
    });
}


function createBillPage(){

}


function router(){
    const link = (location.hash).substring(1);
    if(prev_page === 'todo' || prev_page === 'Cart'){
        collectionInstances[0].destroy();
    }      
    if(link ==='todo'){
        createTodoPage();
    } else if(link === 'Catalogue'){
        createCataloguePage();
    } else if(link === 'Cart'){
        createCartPage();  
    } else if(link === 'Bill'){
        createBillPage();
    }
    else{
        console.log('wrong-page');
    }
}
window.onhashchange = router();                    

$("#changeToCatalogue").on("click", function(){
    prev_page = 'catalogue'; 
    // window.history.pushState('Cart','', '#Cart');   Check it out later 
    createCartPage();  
});

$("#changeToCatalogue").on("click", function(){
    prev_page = 'todo'; 
    // window.history.pushState('Catalogue','', '#Catalogue');   Check it out later 
    createCataloguePage();  
});
 