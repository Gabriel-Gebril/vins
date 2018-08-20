$(document).ready(function(){

    $(".showItemBtn").on("click",function(){
        location.href = "/users/" + $(this).attr("id");
    });

});