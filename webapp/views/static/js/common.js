$(document)
	.ready(function() {
		$('#selectCategoryId')
			.change(function() {
				$('#inputCategoryId')
					.val($('#selectCategoryId option:selected').val());
			});
	});
