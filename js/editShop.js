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
 		'jquery.ui.widget' : './upload/vendor/jquery.ui.widget',
 		iframe : './upload/jquery.iframe-transport',
 		fileupload : './upload/jquery.fileupload',
 	},
 });

define(['jquery','template','tpl','lm','fileupload'],function($,template,tpl,lm,fileupload){
	
	$(document).ready(function() {


		lm.Lm_init(function(){
			var self = this;
			var sessionIndex = ['map', 'area', 'cate'];
			var urlData = lm.getPathName()||{};
			var sessionUrl = lm.getPathName((lm.lmGetStorage('url')||{}).url)||urlData;
			/*
				type --- 1 为添加商户-----2 为修改商户
			*/
			sessionUrl.type = 2;

			/*
				清除缓存数据
					编辑的商户ID改变时，清除上一个商户的缓存数据
			*/
			(function(){
				var len = sessionIndex.length;
				if (sessionUrl.id&&sessionUrl.id === lm.lmGetStorage('editId')) {
					for (var i = 0; i < len; i++) {
						if (sessionUrl[sessionIndex[i]]!=1) {
							lm.lmClearStorage(sessionIndex[i]);
						}
					}
				}else{
					for (var i = 0; i < len; i++) {
						lm.lmClearStorage(sessionIndex[i]);
					}
					lm.lmClearStorage('editInfo');
					lm.lmClearStorage('url');
				}
				lm.lmSetStorage('editId', sessionUrl.id);
				
			})();
			/*
				获取商户详情
			*/

			self.areaShow = false;
			var cache = lm.lmGetStorage('editInfo');
			if (!cache) {
				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.business,
					type : 'GET',
					datatype : 'json',
					data : {
						id : urlData.id,
					},
				}).done(function(data){
					console.log(data);

					if (data.code === 0) {
						self.imgarr=data.data.business_img;
						self.shopList = data.data;

						self.areaArray = [];
						self.imgArray = {};

						for (var i = 0; i < self.shopList.business_area.length; i++) {
							self.areaArray.push(self.shopList.business_area[i].name_cn);
						}
						self.areaStr = self.areaArray.join('·')||'请选择';
						self.shopList.cate_name_cn = self.shopList.cate_name_cn||'请选择';
						if(self.shopList.cate_id==0){
							self.shopList.cate_id='';
						}

						editSetData();
					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});
			}else{
				self.shopList = cache.shopList;
				self.areaStr = cache.areaStr;
				self.areaArray = cache.areaArray;
				self.imgArray = cache.imgArray;
				rendInputImg(self.imgArray);

				console.log(self.shopList);
				lm.lmReadyBind.call(self);
				/*
					获取session数据
				*/
				getSession();
			}
			
			function getSession(){

				var sesstionMsg=lm.lmGetStorage("map");
				var sesstionArea=lm.lmGetStorage("area");
				var sesstionCate=lm.lmGetStorage("cate");

				if(sesstionMsg){
					//$(".mark_map").html('<img class="_ic1" src="images/m_03.png">  '+sesstionMsg.name_cn);
					$(".mark_map").html('<img class="_ic1" src="images/m_03.png">');
					
					self.shopList.lat = sesstionMsg.lat;
					self.shopList.lng = sesstionMsg.lng;
				}

				if (sesstionArea) {
					
					self.areaArray.pop();
					self.areaArray.push(sesstionArea.text);
					self.areaStr = self.areaArray.join('·')||'请选择';
					self.shopList.business_area_id = sesstionArea.id;
				}

				if (sesstionCate) {
					self.shopList.cate_name_cn = sesstionCate.text;
					self.shopList.cate_id = sesstionCate.id;
				}
			}

			/*
				缓存数据
			*/
			function editSetData(){
				var editInfo = {
					shopList : self.shopList,
					areaStr : self.areaStr,
					areaArray : self.areaArray,
					imgArray : self.imgArray||{},
				};
				lm.lmSetStorage('editInfo', editInfo);
			}
				

			/*
				选择地区列表
			*/
			self.areaListRender = function(e){
				sessionUrl.area = 1;
				lm.ucReload();
				window.location.href = 'addArea.html?' + lm.lmParam(sessionUrl);
				
			};
			/*
				选择经营类目列表
			*/
			self.cateListRender = function(e){
				sessionUrl.cate = 1;
				lm.ucReload();
				window.location.href = 'addCate.html?' + lm.lmParam(sessionUrl);
			};

			/*
				地图
			*/
			self.mapRender = function(e){
				sessionUrl.map = 1;
				sessionUrl.lat = self.shopList.lat||-1;
				sessionUrl.lng = self.shopList.lng||-1;
				lm.ucReload();
				window.location.href = 'setMap.html?' + lm.lmParam(sessionUrl);
			};

			/*
				input失去焦点保存数据
			*/
			self.blur = function(e){
				self.shopList[$(e).attr('name')] = $(e).val()||$(e).html();
				editSetData();
			};

			/*
				保存
			*/
			$('[data-submit]').click(function(){

					$('#load').removeClass('none');
					if($('[name="area_id"]').val()==0){
						$('[name="area_id"]').val("");
					}
					/*if(urlData.id&&$('[lm-repeat-target="editImgScript"]').children().size()==0){
						alert("请上传图片");
						return false;
					}*/
					var validateType = $(this).attr('lm-target');
					var isPass = lm.validate(validateType);

					if (!isPass.code) {
						alert(isPass.msg);
						$('#load').addClass('none');
						return false;
					}

					$.ajax({
						url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.updatebusiness,
						type : 'POST',
						datatype : 'json',
						data : $('#addForm').serialize(),
					}).done(function(data){
						console.log(data);

						if (data.code === 0) {
							/*
								清理缓存
							*/
							lm.lmClearStorage('url');
							lm.lmGetStorage("map");
							lm.lmGetStorage("area");
							lm.lmGetStorage("cate");
							
							if (typeof urlData.add !== 'undefined'&&urlData.add === '1') {
								//alert($('#addForm').serialize())
								sessionStorage.setItem("per_name_id",urlData.id+":"+$("[name='name_cn']").val())
								window.location.href = './noqrcode.html';
			
							}else{
								window.location.href = './shopDetail.html?id='+urlData.id;
								//alert($('#addForm').serialize())
							}
						}else{
							alert('错误代码：' + data.code + '错误信息：' + data.msg);
						}
						$('#load').addClass('none');
					});
			});

			/*
				删除图片
			*/
			$(".lm-js-del").click(function(){
				$($(this).attr('lm-target')).addClass("_close");

				$(".mer_img ._close").click(function(){
					var imgSelf = $(this);
					$.ajax({
						url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.delphoto,
						type : 'GET',
						datatype : 'json',
						data : {id : $(this).data('id')},
					}).done(function(data){
						console.log(data);

						if (data.code === 0) {

							if (self.imgArray[imgSelf.attr('lm-target')]) {
								delete self.imgArray[imgSelf.attr('lm-target')];
								for(var i=0 ; i<self.shopList.business_img.length ; i++){
									if (self.shopList.business_img[i].target===imgSelf.attr('lm-target')) {
										self.shopList.business_img.splice(i, 1);
									}
								}
								rendInputImg(self.imgArray);
								editSetData();
							}

							imgSelf.remove();
							$(imgSelf.attr('lm-target')).remove();
						}else{
							alert('错误代码：' + data.code + '错误信息：' + data.msg);
						}
					});
				});
			});

			/*
				根据缓存渲染图片
			*/
			function rendInputImg(imgObj){
				console.log(imgObj);
				for(var i in imgObj){
					$('#imgInput').append(imgObj[i]);
				}
			}

			/*
				上传照片
			*/
			$("#upd_files").fileupload({  
		        url: lm.apiClass.root + lm.apiClass.publicUrl + lm.apiClass.apiInd.upload,  
		        sequentialUploads: true  
		    }).bind('fileuploadsend',function(e, data){
				$('#load').removeClass('none');
			}).bind('fileuploaddone', function (e, data) {
		        
		        if (data.result.code === 0) {
		        	var d = (new Date()).getTime();
					var str =   '<section class="upd_img" lm-target="#img_' + d + '">\
									<img src="' + data.result.thumbnail + '">\
								</section>';

					$($(this).attr('lm-target')).append('<input name="imgs[]" id="img_' + d + '" type="hidden" value="' + data.result.path + '" />');

					self.shopList.business_img.push({thumbnail : data.result.thumbnail,img : data.result.img, target : '#img_' + d});
					self.imgArray['#img_' + d] = '<input name="imgs[]" id="img_' + d + '" type="hidden" value="' + data.result.path + '" />';
					editSetData();

					$('.lm-js-container').append(str);


				}else{
					alert('错误代码：' + data.code + '错误信息：' + data.msg);
				}
				$('#load').addClass('none');
		    });

		});
		
	});
});



