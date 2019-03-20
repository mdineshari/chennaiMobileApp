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
  shoppingCart.map(product => {
    //add new row
    var row = orderedProductsTblBody.insertRow();
    //create three cells for product properties

    var cellDescription = row.insertCell(0);
    var cellPrice = row.insertCell(1);
    cellPrice.align = 'right';
    //fill cells with values from current product object of our array

    cellDescription.innerHTML = product.description;
    cellPrice.innerHTML = product.price;
    cart_total_price += parseInt(product.price);
  });

  //fill the count of checked problems in badge of the cart
  $('#someelem span.badge').text(shoppingCart.length);
  //fill total cost of our shopping cart
  $('#cart_total').text(cart_total_price);
}

$('#problem_details input[type="checkbox"').map(function(index, element) {
  $(element).change(function() {
    if ($(this).is(':checked')) {
      //Below we create JavaScript Object that will hold three properties you have mentioned:    Name,Description and Price
      var description = $(this).attr('data-problem');
      var price = $(this).attr('data-cost');
      var id = $(this).attr('id');

      var singleProduct = {
        description,
        price,
        id,
      };

      //Add newly created product to our shopping cart
      shoppingCart.push(singleProduct);
    } else {
      shoppingCart = shoppingCart.filter(
        cart => cart.id !== $(this).attr('id')
      );
    }
    //call display function to show on screen
    displayShoppingCart();
  });
});
