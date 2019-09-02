$(document).ready(function(){
    $('button#addToCart').click(function(){
        var items = [];
        var dataInLocalStorage = localStorage.getItem("addedItems");

        if(dataInLocalStorage) {
            items = JSON.parse(dataInLocalStorage || "[]");
        }

        var item = items.find(x => x.id === $(this).val());

        if(item)
        {
            item.total++;
        }
        else 
        {
            item = {
                id: $(this).val(),
                total: 1
            };
            items.push(item);
        }
           
        localStorage.setItem("addedItems",JSON.stringify(items));
    });

    $('#btnPurchase').click(function(){
        $.ajax({
            type: "POST",
            url: "/users/purchase",
            contentType: "application/json",
            processData: false,
            success: function (msg) {
                if (msg) {
                    //window.location.href = "/users/purchase";
                } else {
                    //alert("Cannot add to list !");
                }
            },
 
            data: localStorage.getItem("addedItems")
        });
    });
});

