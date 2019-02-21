let mobileDetail;
function setInputFilter(textbox, inputFilter) {
	if(!textbox) return;
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}

$('#validate').bind('click',function (){
	validate('controls', 'imei', 'result')
});

$('#imei').bind('keyup', function (e){
	if (e.keyCode == 13){
		validate('controls', 'imei', 'result')
	}
});

$('#imei').trigger('focus')

setInputFilter(document.getElementById("imei"), function(value) {
  return /^\d*$/.test(value); 
});

$('#' + 'result' + ' > a').bind('click',function (e){
	$('#' + 'imei').val('');
	$('#' + 'result').fadeOut(500, function (){
	  $('#' + 'controls').fadeIn(500, function (){
		$('#' + 'imei').trigger('focus')
	  });
	});
});	

function validate(controlsId, textBoxId, resultId){
	$('#' + controlsId).fadeOut(500,function (){

	  var msg, imei = $('#' + textBoxId).val(), r;
	  if ( imei !== '' && isIMEIValid(imei) ){
		  $.getJSON('scripts/DB.json', function(data) {
			  const imeiDetails = data.imeis;
			  
			mobileDetail = imeiDetails.filter( imeiData => 
				imeiData.imeino == imei
			)[0];
			//console.log(mobileDetail);
			if(!mobileDetail){
				msg = 'IMEI details not found in our record.';
				$('#' + resultId + ' > span').text(msg)
				$('#' + 'result' + ' > a').text('try again');
				$('#' + resultId).fadeIn()
				return;
			}
			$('#model_name').text(mobileDetail.Model);
			$('#device_name').text(mobileDetail.Device_Name);
			$('#Year').text(mobileDetail.Purchase_Year);
			$('#counrty').text(mobileDetail.Country);
			
			
			
			$('#home_container').attr('style','display:none');
			$('#brand_container').attr('style','display:block');
		  });
	  }else{     
		if(imei === '') {
			msg = 'Please enter the IMEI number.'
		} else {
			msg = 'Sorry, this is invalid.'
		}
		  $('#' + resultId + ' > span').text(msg)
		  $('#' + 'result' + ' > a').text('try again');
		  $('#' + resultId).fadeIn()
	  }
	});
}

$(document).ready(function() {
	$('#home_container').attr('style','display:block');
	$('#brand_container').attr('style','display:none');

});