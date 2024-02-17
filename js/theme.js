if (localStorage.getItem('darkTheme') == "true"){
	$('body').addClass('dark-theme');
	$('#themeButton').prop('name', 'moon-outline');
} else {
	localStorage.setItem("darkTheme", "false");
}

$('#themeButton').on('click', function () {
	$('body').toggleClass('dark-theme');

	if($('body').hasClass('dark-theme')){
		$('#themeButton').prop('name', 'moon-outline');
		localStorage.setItem("darkTheme", "true");
	} else {
		localStorage.setItem("darkTheme", "false");
		$('#themeButton').prop('name', 'sunny-outline');
	};
});

$('body').addClass('load');