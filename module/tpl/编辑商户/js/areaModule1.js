require.config({
 	baseUrl : '../../',
 	paths : {
 		lm : './vendor/lm',
 		jquery : './vendor/jquery-2.1.0',
 		template : './vendor/template',
 		tpl : './vendor/tpl',
 	},
});

define(['jquery','template','tpl','lm'],function($,template,tpl,lm){
	$('.lm-js-area').on('click',function(e){
		$($(this).attr('lm-target')).show();
		a();
	});
	
	function a(){
		$('html').css({'font-size':'18.75px'});
	}
});