/**
 * 页面加载入口
 */
 require.config({
 	baseUrl : 'js/',
 	paths : {
 		lm : './vendor/lm',
 		jquery : './jquery-2.1.0',
 		template : './vendor/template',
 		tpl : './vendor/tpl',
 	},
 });

define(['jquery','template','tpl','lm',],function($,template,tpl,lm){

	$(document).ready(function() {


		lm.Lm_init(function(){
			var self = this;
			var urlData = lm.getPathName()||{};

			/*
				点击清除可能存在的缓存
			*/
			$(".js-data-clear").click(function(){
				sessionStorage.removeItem("b_id");
				window.location.href="noqrcode.html";
			})

			/*
				消息获取
			*/
			lm.ajax({
				type: 'GET',
				url: lm.apiClass.root+lm.apiClass.apiUrl+lm.apiClass.apiInd.msg,
			}).done(function(data){
				if(data.code==0){
					self.msgList = data.data;
				}else if(data.code!=107){
					alert("错误信息"+data.msg)
				}else{
					$(".js-message").show();
				}
			});

			/*
				返佣模块不可用
			*/
			$('._ret').unbind('click').bind('click', function(event) {
				alert('返佣查看功能开发中');
			});

		});
		
	});
});



