module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;

    this.add = function(item, id){
        var storedItem = this.items[id];
        if(!storedItem) {
            storedItem = this.items[id] = {item:item,qty:0,reason:""};
        }
        storedItem.qty++;
        this.totalQty++;

    }

    this.remove = function(id){
        console.log(id);
        this.totalQty -= this.items[id].qty;
        delete this.items[id];
         
    }

    this.generateArray = function(){
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }

}