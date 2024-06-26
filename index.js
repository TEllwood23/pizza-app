var menu = [
    { id: 1, name: "Margherita", price: 8 },
    { id: 2, name: "Pepperoni", price: 10 },
    { id: 3, name: "Hawaiian", price: 10 },
    { id: 4, name: "Veggie", price: 9 },
];
var cashInRegister = 100;
var nextOrderId = 1;
var orderQueue = [];
function reStock() {
    cashInRegister = cashInRegister - 30;
}
function addNewPizza(pizzaObj) {
    menu.push(pizzaObj);
}
function placeOrder(pizzaName) {
    var selectedPizza = menu.find(function (pizzaObj) { return pizzaObj.name === pizzaName; });
    if (!selectedPizza) {
        console.error("".concat(pizzaName, " does not exist in the menu"));
        return;
    }
    cashInRegister += selectedPizza.price;
    var newOrder = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" };
    orderQueue.push(newOrder);
    return newOrder;
}
function completeOrder(orderId) {
    var order = orderQueue.find(function (order) { return order.id === orderId; });
    if (!order) {
        console.error("Order ".concat(orderId, " does not exist"));
        return;
    }
    order.status = "completed";
    cashInRegister -= order.pizza.price;
    return order;
}
function displayMenu(array) {
    var container = document.getElementById('menuContainer');
    var htmlString = '<ul>';
    array.forEach(function (item) {
        htmlString += "<li>".concat(item.name, "</li>");
    });
    htmlString += '</ul>';
    container.innerHTML = htmlString;
}
displayMenu(menu);
console.log("Menu at start", menu);
console.log("Initial cash in register", cashInRegister);
addNewPizza({ id: 5, name: 'Brocolli', price: 10 });
console.log("Menu after adding Brocolli", menu);
placeOrder("Pepperoni");
console.log("New cash in register after order", cashInRegister);
reStock();
console.log("Cash in register after restock", cashInRegister);
completeOrder(1);
console.log("Cash in register at end", cashInRegister);
