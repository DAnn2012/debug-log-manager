(function( $ ) {
	'use strict';

	$(document).ready( function() {

		// Make page header sticky on scroll. Using https://github.com/AndrewHenderson/jSticky
		
		$('#dlm-header').sticky({
			topSpacing: 8, // Space between element and top of the viewport (in pixels)
			zIndex: 100, // z-index
			stopper: '', // Id, class, or number value
			stickyClass: 'dlm-sticky' // Class applied to element when it's stuck. Class name or false.
		})

		// Set WP_DEBUG logging status toggle/switcher position on page load

		var log_status = dlmvars.logStatus;
		$('.debug-log-switcher').attr('data-status',log_status);

		if ( log_status == 'enabled' ) {
			$('.debug-log-checkbox').prop('checked', true);
		} else {
			$('.debug-log-checkbox').prop('checked', false);					
		}

		// Toggle WP_DEBUG logging status on click

		$('.debug-log-switcher').click( function() {

			var status = this.dataset.status;

			$.ajax({
				url: ajaxurl,
				data: {
					'action': 'toggle_debugging'
				},
				success:function(data) {
					var data = data.slice(0,-1); // remove strange trailing zero in string returned by AJAX call
					$('#debug-log-status').empty();
					$('#debug-log-status').prepend(data);
					if ( status == 'disabled' ) {
						$('.debug-log-switcher').attr('data-status','enabled');
					} else if ( status == 'enabled' ) {
						$('.debug-log-switcher').attr('data-status','disabled');								
					}
				},
				error:function(errorThrown) {
					console.log(errorThrown);
				}
			});

		});

		// Clear log file
		
		$('#dlm-log-clear').click( function() {

			$.ajax({
				url: ajaxurl,
				data: {
					'action': 'clear_log'
				},
				success:function() {
					var table = $("#debug-log").DataTable();
					table.clear().draw();
					$('#dlm-log-file-size').empty();
					$('#dlm-log-file-size').prepend('0 B')
					$('#dlm-clear-success').show().delay(2500).fadeOut();
				},
				error:function(errorThrown) {
					console.log(errorThrown);
				}
			});
		});

		// Initialize log entries dataTable

		$("#debug-log").DataTable({
			pageLength: 10,
			order: [ 0, "asc" ]
		});

	});

})( jQuery );