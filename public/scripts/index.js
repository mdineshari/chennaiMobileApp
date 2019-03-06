var address = null;
jQuery(document).ready(function($) {
  $("input[type='radio']").click(function(e) {
    var selectedOption = $(this).val();
    if (selectedOption === 'share') {
      address = shareMethod();
    } else if (selectedOption === 'customize') {
      customizeMethod();
    }
  });
});

function shareMethod() {
  $('#customizeDetails').addClass('form-disabled');
  return geoMethod();
}
function customizeMethod() {
  $('#customizeDetails').removeClass('form-disabled');
}
