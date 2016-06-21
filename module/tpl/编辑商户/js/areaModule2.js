require.config({
 	baseUrl : '../../',
 	paths : {
 		lm : './vendor/lm',
 		jquery : './vendor/jquery-2.1.0',
 		template : './vendor/template',
 		tpl : './vendor/tpl',
 		areaModule1 : './tpl/编辑商户/js/areaModule1',
 	},
});

define(['jquery','template','tpl','lm','areaModule1'],function($,template,tpl,lm,areaModule1){
	//alert(222);
	$('.lmui-list').on('click', function(event) {
		event.preventDefault();
		alert(2);
		/* Act on the event */
	});
		a();
	function a(){
		//alert(4);
	}
});