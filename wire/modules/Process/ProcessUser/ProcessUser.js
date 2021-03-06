$(document).ready(function() {
	
	if($("#Inputfield_id").val() == 40) {
		// guest user
		// hide fields that aren't necessary ehre
		$("#wrap_Inputfield_pass").hide(); 	
		$("#wrap_Inputfield_email").hide();	
		$("#wrap_Inputfield_roles input").attr('disabled', 'disabled');
		//$("#wrap_submit_save").remove();
	}

	var $guestRole = $("#Inputfield_roles_37"); 
	if($guestRole.size() > 0 && !$guestRole.is(":checked")) {
		$guestRole.attr('checked', 'checked'); 
	}
	
	$("#wrap_Inputfield_roles").find("input[type=checkbox]").each(function() {
		if($.inArray(parseInt($(this).val()), config.ProcessUser.editableRoles) == -1) {
			$(this).closest('label').addClass('ui-priority-secondary').click(function() {
				var $alert = $(this).find(".ui-state-error-text");
				if($alert.length == 0) {
					$alert = $("<span class='ui-state-error-text'>&nbsp;(" + config.ProcessUser.notEditableAlert + ")</span>");
					$(this).append($alert);
					setTimeout(function() {
						$alert.fadeOut('normal', function() {
							$alert.remove();
						});
					}, 2000);
				} else {
					$alert.remove();
				}
				return false;
			});
		}
	});
}); 
