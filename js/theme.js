$('#button').on('click', function () {
	$('body').toggleClass('dark-theme');

	if($('body').hasClass('dark-theme')){
		$('#sun').prop('name', 'moon-outline');
	} else {
		$('#sun').prop('name', 'sunny-outline');
	};
});