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

define(['jquery','template','tpl','lm'],function($,template,tpl,lm){

	$(document).ready(function() {


		lm.Lm_init(function(){
			var self = this;
			var perarr=[]
			var urlData = lm.getPathName()||{id : 1};

			var newDefault = 0;

			/*
				获取地推员列表
			*/

			lm.ajax({
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.contactlist,
				type : 'POST',
				datatype : 'json',
				data : urlData,
			}).done(function(data){
				console.log(data);

				if (data.code === 0) {
					
					self.bdList = data.data;
					

				}else if(data.code!=107){
					alert('错误代码：' + data.code + '错误信息：' + data.msg);
				}
			});

			/*
				选择地推员
			*/
			self.togglenick = function(e,id){

				if($(e).parent().hasClass("_active")){
					$(e).parent().removeClass("index");
					$(e).parent().removeClass("_active");
					newDefault = 0;
				}else{
					$(e).parent().addClass("_active");
					$(e).parent().addClass("index");
					newDefault = id;
				}

				
			};
			self.togglestar = function(e,id){

				if($(e).parent().hasClass("index")){
					$(e).parent().removeClass("index");
					$(e).parent().removeClass("_active");
					newDefault = 0;
				}else{
					$(e).parent().addClass("index").siblings().removeClass("index");
					$(e).parent().addClass("_active");
					newDefault = id;
				}
				
			};

			$("[data-submit]").click(function(){
				if ($('.per').hasClass('index')) {
					newDefault = $('.per.index').data('id');
				}else{
					newDefault = 0;
				}

				var data={
					id:newDefault,
					business_id:Number(urlData.business_id),
				}

				if(!newDefault){
					alert("请选择联络人");
				}else{
					linemer(data);
				}
			});

			function linemer(datas){
				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.defaultbd,
					type : 'POST',
					datatype : 'json',
					data : datas
				}).done(function(data){
					console.log(data);

					if (data.code === 0) {
						//
						window.location.href = "perMsg.html?" + lm.lmParam({id : urlData.id});
						//window.history.go(-1);

					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});
			}
		});
		
	});
});



