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
});
