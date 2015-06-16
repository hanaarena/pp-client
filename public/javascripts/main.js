/**
 * Created by lanz on 2015/6/10.
 */
'use strict';

$('.container a').hover(function() {
	$('.btn-oauth-one').css({
		'transform': 'translateX(-95px) translateY(76px)',
		'-webkit-transform': 'translateX(-95px) translateY(76px)',
		'-webkit-transition': '-webkit-transform .3s',
		'transition': '-webkit-transform .3s'
	});

	$('.btn-oauth-two').css({
		'transform': 'translateX(-45px) translateY(76px)',
		'-webkit-transform': 'translateX(-45px) translateY(76px)',
		'-webkit-transition': '-webkit-transform .3s',
		'transition': '-webkit-transform .3s'
	});
}, function() {
	$("p[class^='btn-oauth-']").css({
		'transform': '',
		'-webkit-transform': ''
	});
});

$('.block-username').hover(function() {
	$('.label-username').fadeIn('fast');
}, function() {
	$('.label-username').hide();
}).click(function() {
	window.location.reload();
});

// PP list comment box control
$('.pp-list ul li .list-wrapper .list-head').each(function() {
	$(this).find('.reply').click(function() {
		// Hide all .comment-box first
		if($(this).parent().parent().find('.detail-comment-list').hasClass('show')) {
			$(this).parent().parent().find('.detail-comment-list').removeClass('show');
		} else {
			$('.detail-comment-list').removeClass('show').addClass('hide');
			$(this).parent().parent().find('.detail-comment-list').addClass('show');
			$('.detail-comment-list textarea').focus();
		}
	});
});
