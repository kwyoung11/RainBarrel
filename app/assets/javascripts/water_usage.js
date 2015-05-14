$(document).ready(function(){
	$('.data-stat').removeClass('data-stat-active');

	$(".data-stat").on('hover, click', function() {
		$('.explanation').hide();
		if ($(this).hasClass('data-stat-active')) {
			$("." + $(this).attr('id')).hide();
			$('.data-stat').removeClass('data-stat-active');
		} else {
			$("." + $(this).attr('id')).show();	
			$('.data-stat').removeClass('data-stat-active');
			$(this).addClass('data-stat-active');
		}

		
	});


});