const createCatalogueItems = function (element, index){
    return _.template(`<li name='todo-item' id='<%= item %>_${index}' class='py-2 list-group-item border w-50 pr-2'> <%= item %> <%= qty%></li>`)(element);
}

const createCataloguePage = function (catalogue){
    document.getElementById("page-name").innerHTML = 'Catalogue';
    let $section = $(`<section class = "mt-3"></section>`);
    _.forEach(catalogue,(element,index)=> {
        let $ul =  $(`<ul class="ml-3 my-3 list-group" id="collection-ul "><b class='py-3 pl-1 '>${index}</b></ul>`);
        $ul.append(element.map((value, key) => createCatalogueItems(value, key)));
        $section.append($ul[0]);
    });
    $('#page').html($section);
}
export {createCataloguePage}; 
