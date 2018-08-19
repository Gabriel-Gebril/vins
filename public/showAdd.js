$(document).ready(function(){

    $(".showItemBtn").on("click",function(){
        location.href = "/items/" + $(this).attr("id");
    });

});