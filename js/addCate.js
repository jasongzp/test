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

/*

	
*/

define(['jquery','template','tpl','lm'],function($,template,tpl,lm){

	$(document).ready(function() {


		lm.Lm_init(function(){
			var self = this;

			/*

				url链接参数type --- {1:添加商户，2：编辑商户}
			*/
			var urlData = lm.getPathName()||{};

			/*
				选择经营类目列表
			*/
			cateListRender();
			function cateListRender(){
				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.cate,
					type : 'GET',
					datatype : 'json',
				}).done(function(data){
					console.log(data);

					if (data.code === 0) {
						self.cateList = data.data;
						self.cateShow = true;

					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});
				
			};

			/*
				确认经营类目
			*/
			self.selectCate = function(e, id){
				var urlStr = lm.lmGetStorage('url')||'';
				var sessionData = {
					id : id,
					text : $(e).text(),
					ctime : +new Date(),
				}

				lm.lmSetStorage('cate', sessionData);
				if (lm.isNull(urlData)||urlData.type==='1') {
					urlStr = 'addShop.html?' + lm.lmParam(urlData);
				}else if(urlData.type==='2'){
					urlStr = 'editShop.html?' + lm.lmParam(urlData);
				}

				lm.lmSetStorage('url',{url : urlStr});

				window.history.go(-1);
				
			};

		});
		
	});
});



