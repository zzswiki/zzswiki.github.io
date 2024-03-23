if (localStorage.getItem('lightTheme') == "true"){
	$('body').addClass('light-theme');
	$('#themeButton').prop('name', 'sunny-outline');
} else {
	localStorage.setItem("lightTheme", "false");
	$('#themeButton').prop('name', 'moon-outline');
}

$('#themeButton').on('click', function () {
	$('body').toggleClass('light-theme');

	if($('body').hasClass('light-theme')){
		$('#themeButton').prop('name', 'sunny-outline');
		localStorage.setItem("lightTheme", "true");
	} else {
		localStorage.setItem("lightTheme", "false");
		$('#themeButton').prop('name', 'moon-outline');
	};
});

$('body').addClass('load');