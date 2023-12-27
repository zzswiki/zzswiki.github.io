$('.main_box_class').click(function () { 
	var obj = $(this).find('.class_list');

	$(obj).slideToggle();
});