$(document).ready(function(){

    var num = 1;
    $("#moreItems").click(function(){
        // console.log("clicked");
        num = num+1;
        $("#addForm").append(`
        <li>
        <h3>Item #` + num +` <span class="trash"><i class="fa fa-trash"></i></span> </h3>
        <input id="item` + num + `" type="text" name="itemName" required placeholder="Name of item" autocomplete="off">
        <input type="number" name="amount" required placeholder="Amount added" min=1>
        <input type="text" name="location" required placeholder="Location of item" autocomplete="off">
        <textarea id="cbox" type="text" name="description" placeholder="Description of Item"></textarea>
        </li>`);
        
    });

    $("#fContainer").on("keypress","#cbox,input",function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('#moreItems').click();
            console.log($("#item"+num));
            $("#item"+num).focus();
            return false;
        } else {
            return true;
        }
    });

    $("ul").on("click",".trash",function(event){
        $(this).parent().parent().fadeOut(500,function(){
            $(this).remove();
        });
        event.stopPropagation();
    });

    $("#fContainer").on('input',"#cbox", function() {
        var scroll_height = $(this).get(0).scrollHeight;
    
        $(this).css('height', scroll_height + 'px');
    });
});


