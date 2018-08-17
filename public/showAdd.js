$(document).ready(function(){

    $(".showItemBtn").on("click",function(){
        console.log("hi");
        location.href = window.location.href + "/" + $(this).attr("id");
    });

});