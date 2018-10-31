function createCheckoutItems(element, index) {
    return _.template(`<li name='todo-item' id='<%= item %>_${index}' class='py-2 list-group-item border w-50 pr-2'> <%= item %> <%= qty%></li>`)(element);
}

function createCheckoutPage(catalogue, todos) {
    let catalogueSelected = Array.from($('.itemsChosen')).filter(function (element) {
        if (element.value !== '') {
            return [element.name];
        }
    });
    const cartdata = [];
    let errorflag = false;
    let errormessage = '';
    let errorItem ;
    let catalogueCopy = _.cloneDeep(catalogue);
    let todoCopy = _.cloneDeep(todos);
    for (const element of catalogueSelected) {
        const category = catalogue[(element.name).split('_')[0]];
        const key = _.findKey(category, (obj) => {
            return obj.item === (element.name).split('_')[1];
        });
        const product = Object.assign({ bought: element.value , cat: (element.name).split('_')[0] }, category[key]);
        if (category[key].qty - element.value >= 0) {
            category[key].qty -= element.value;
            let todo_Object = todos.find((todoItem) => {
                return todoItem.item === element.name.split('_')[0]
            });
            if (todo_Object.qty - element.value >= 0) {
                todo_Object.qty -= element.value;
                if (todo_Object.qty === 0) {
                    todo_Object.active = 'done';   
                }
                cartdata.push(product);
            } else {
                errorflag = true;
                errorItem = element;
                errormessage = _.template(`* You Only need <%= qty%> <%= item %> `)(todoCopy);
                break;
            }

        } else {
            errorflag = true;
            errorItem = element;
            errormessage = _.template(`* Only <%= qty%> <%= item %> <%= cat %> in Stock`)(product);
            break;
        }
    }
    if (!errorflag) {
        const $ul = $(`<ul class="ml-3 my-3 list-group" id="collection-ul ">
                        <b class='py-3 pl-1 '>Following List Of Items are being billed</b>
                        <li class='d-flex py-2 list-group-item w-50'><section class='w-50 font-weight-bold'>Item</section> <section class='w-25 font-weight-bold'>Price</section><section class='w-25 font-weight-bold'>Qty</section></li>
                    </ul>`);
        $ul.append(cartdata.map((element, index) => createCheckoutItems(element, index)));
        $ul.append(`<li class='d-flex py-2 list-group-item w-50'><span class='font-weight-bold total'>Total:</span>`)
        const $section = $(`<section class = "mt-3"></section>`);
        $section.append($ul[0]);
        $section.append(` <button class='btn btn-primary  w-10' id="todo-btn" >To-Do</button>`);
        $('#page').html($section);
        document.getElementById("page-name").innerHTML = 'Checkout';
    }else{
        errorItem.style.backgroundColor = "pink";
        $('#error').html(errormessage);
        catalogue= _.cloneDeep(catalogueCopy);
        todos = _.cloneDeep(todoCopy);
        console.log(todos);
    }

}
export { createCheckoutPage };