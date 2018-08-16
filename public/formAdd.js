$(document).ready(function(){
    $("#moreItems").click(function(){
        // console.log("clicked");
        $("#addForm").append(`<li>
        <input type="text" name="itemName" required placeholder="Name of Item">
        <input type="text" name="amount" required placeholder="Amount added">
        <input type="text" name="location" required placeholder="Location of item">
        <input type="text" name="description" placeholder="Description of item">
        </li>`);
    });

    $("form input").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('#moreItems').click();
            return false;
        } else {
            return true;
        }
    });
});


