var start_email_num = 0;
var end_email_num = 0;
(function($) {
	$(document).ready(function() {
		if($('#recipient_group').val() == 'post_comments') {
			$('#specified_post').show();
			$('#post_id').show();
		}
		$('#recipient_group').change(function() {
			if($('#recipient_group').val() == 'post_comments') {
				$('#specified_post').show();
				$('#post_id').show();
			} else {
				$('#specified_post').hide();
				$('#post_id').hide();
			}
		});
	});
	wp_mass_send = function() {
		end_email_num += Number($('#per_time_send').val());
		if(end_email_num >= email_count) {
			end_email_num = email_count;
		}
		$.ajax({
			type: 'POST',
			cache: false,
			data: {
				one_by_one: $('#one_by_one').val(),
				subject: $('#subject').val(),
				message: $('#message').val(),
				email_list: $('#email_list').val(),
				start_email: start_email_num,
				end_email: end_email_num
			},
			dataType: 'html',
			success: function(data, textStatus) {
				$('#loading_bar').animate({width: end_email_num / email_count * 100 + '%'}, 300);
				$('#massmailer_sending').text('(' + end_email_num + '/' + email_count + ')');
				if(end_email_num < email_count) {
					start_email_num += Number($('#per_time_send').val());
					setTimeout("wp_mass_send()", 500);
				} else {
					$('.sending').hide();
					$('.sended').show();
					$('#sent_successfully').show();
				}
			}
		});
		return false;
	}
})(jQuery);