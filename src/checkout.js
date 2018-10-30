function createCheckoutItems(element, index) {
    return _.template(`<li name='todo-item' id='<%= item %>_${index}' class='py-2 list-group-item border w-50 pr-2'> <%= item %> <%= qty%></li>`)(element);
}

function createCheckoutPage(catalogue) {
    let catalogueSelected = Array.from($('.itemsChosen')).filter(function (element) {
        if (element.value !== '') {
            return [element.name];
        }
    });
    const cartdata = catalogueSelected.map((element) => {
        const category = catalogue[(element.name).split('_')[0]];
        const product = _.find(category, function (prod) {
            return prod.item == (element.name).split('_')[1];
        });
        return product;
    });

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
}
export {createCheckoutPage};