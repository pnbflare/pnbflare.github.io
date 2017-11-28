(function($) {
	
	$('[role=navigation] li a').on('focus blur',
		function(){$(this).parents().toggleClass("ccadm-hover");}
	);
}(jQuery));
