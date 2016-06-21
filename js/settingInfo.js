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
			/*
				获取城市列表
			*/

			lm.ajax({
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.userinfo,
				type : 'GET',
				datatype : 'json',
			}).done(function(data){
				if (data.code === 0) {
					
					self.userinfo = data.data;
					self.areaArray = [];
					for (var i = 0; i < self.userinfo.area.length; i++) {
						self.areaArray.push(self.userinfo.area[i].name_cn);
					}
					self.areaStr = self.areaArray.join('·')||'请选择';
				}else{
					alert('错误代码：' + data.code + '错误信息：' + data.msg);
				}
			});

		});
		
	});
});



