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

			/*
				获取城市列表
			*/

			lm.ajax({
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.business,
				type : 'GET',
				datatype : 'json',
				data : urlData,
			}).done(function(data){
				console.log(data);

				if (data.code === 0) {
					
					self.bdList = data.data.promoter;
					for(var i=0;i<self.bdList.length;i++){
						perarr.push(self.bdList[i].id)
					}

				}else{
					alert('错误代码：' + data.code + '错误信息：' + data.msg);
				}
			});

			/*self.setCity = function(id){
				/*
					获取城市列表
			

				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.citylist,
					type : 'GET',
					datatype : 'json',
					data : {
						city_id : id
					}
				}).done(function(data){

					if (data.code === 0) {
						
						window.location.href = 'shop.html';

					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});
			};*/
			/*
				选择地推员
			*/
			self.togglenick = function(e){

				if($(e).parent().hasClass("_active")){
					$(e).parent().removeClass("index");
					$(e).parent().removeClass("_active");
				}else{
					$(e).parent().addClass("_active");
				}

				
			};
			self.togglestar = function(e){

				if($(e).parent().hasClass("index")){
					$(e).parent().removeClass("index");
				}else{
					$(e).parent().addClass("index").siblings().removeClass("index");
					$(e).parent().addClass("_active");
				}
				
			};

			$("[data-submit]").click(function(){
				var arr=[];
				var is_id=null;
				for(var i=0;i<perarr.length;i++){
					if($(".per_list .per").eq(i).hasClass("_active")){
						arr.push(perarr[i]);
					}
					if($(".per_list .per").eq(i).hasClass("index")){
						is_id=perarr[i];
					}
				}
				var data={
					id:arr,
					business_id:Number(urlData.id),
					is_default_id:is_id

				}
				console.log(data)
				//console.log(perarr)
				if(!is_id){
					alert("请选择联络人");
				}else{
					linemer(data);
				}
			});

			function linemer(datas){
				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.bdOnline,
					type : 'POST',
					datatype : 'json',
					data : datas
				}).done(function(data){
					console.log(data);

					if (data.code === 0) {
						//
						//window.location.href = "shop.html";
						window.history.go(-1);

					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});
			}
		});
		
	});
});



