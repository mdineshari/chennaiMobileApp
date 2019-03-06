//create array that will hold all ordered products
var shoppingCart = [];

//this function manipulates DOM and displays content of our shopping cart
function displayShoppingCart() {
  var orderedProductsTblBody = document.getElementById(
    'orderedProductsTblBody'
  );
  //ensure we delete all previously added rows from ordered products table
  while (orderedProductsTblBody.rows.length > 0) {
    orderedProductsTblBody.deleteRow(0);
  }
  //variable to hold total price of shopping cart
  var cart_total_price = 0;

  // Show Empty data if shoppingCart array length is zero and show data
  // if it is greater than zero
  if (shoppingCart.length === 0) {
    $('#cart-msg').css('display', 'block');
    $('#my-cart-table').css('display', 'none');
  } else {
    $('#cart-msg').css('display', 'none');
    $('#my-cart-table').css('display', 'inline-table');
  }

  //iterate over array of objects
  for (var product in shoppingCart) {
    //add new row
    var row = orderedProductsTblBody.insertRow();
    //create three cells for product properties

    var cellDescription = row.insertCell(0);
    var cellPrice = row.insertCell(1);
    cellPrice.align = 'right';
    //fill cells with values from current product object of our array

    cellDescription.innerHTML = shoppingCart[product].description;
    cellPrice.innerHTML = shoppingCart[product].price;
    cart_total_price += parseInt(shoppingCart[product].price);
  }
  $('#someelem span.badge').text(shoppingCart.length);
  //fill total cost of our shopping cart
  document.getElementById('cart_total').innerHTML = cart_total_price;
}

$('#problem_details input[type="checkbox"').map(function(index, element) {
  $(element).change(function() {
    if ($(this).is(':checked')) {
      //Below we create JavaScript Object that will hold three properties you have mentioned:    Name,Description and Price
      var singleProduct = {};
      //Fill the product object with data

      singleProduct.description = $(this).attr('data-problem');
      singleProduct.price = $(this).attr('data-cost');
      singleProduct.id = $(this).attr('id');
      //Add newly created product to our shopping cart
      shoppingCart.push(singleProduct);
      //call display function to show on screen
      displayShoppingCart();
    } else {
      shoppingCart = shoppingCart.filter(
        cart => cart.id !== $(this).attr('id')
      );
      //call display function to show on screen
      displayShoppingCart();
    }
  });
});
