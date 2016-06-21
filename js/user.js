
/*
	require配置
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
	/**
	 * 页面加载入口
	 */
	$(document).ready(function() {
		loadMui();
		LoadMenus();
	});
	/**
	 * 加载mui框架
	 */
	function loadMui() {
		mui.init({
			swipeBack: true //启用右滑关闭功能
		});
		mui.previewImage();
	}
	/**
	 * 页面菜单加载方法
	 */
	function LoadMenus() {
		mui.init();
		//侧滑容器父节点
		var offCanvasWrapper = mui('#offCanvasWrapper');
		//主界面容器
		var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
		//菜单容器
		var offCanvasSide = document.getElementById("offCanvasSide");
		if (!mui.os.android) {
			//document.getElementById("move-togger").classList.remove('mui-hidden');
			var spans = document.querySelectorAll('.android-only');
			for (var i = 0, len = spans.length; i < len; i++) {
				spans[i].style.display = "none";
			}
		}
		//移动效果是否为整体移动
		var moveTogether = false;
		//侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
		var classList = offCanvasWrapper[0].classList;
		//变换侧滑动画移动效果；
		mui('.mui-input-group').on('change', 'input', function() {
			if (this.checked) {
				offCanvasSide.classList.remove('mui-transitioning');
				offCanvasSide.setAttribute('style', '');
				classList.remove('mui-slide-in');
				classList.remove('mui-scalable');
				switch (this.value) {
					case 'main-move':
						if (moveTogether) {
							//仅主内容滑动时，侧滑菜单在off-canvas-wrap内，和主界面并列
							offCanvasWrapper[0].insertBefore(offCanvasSide, offCanvasWrapper[0].firstElementChild);
						}
						break;
					case 'main-move-scalable':
						if (moveTogether) {
							//仅主内容滑动时，侧滑菜单在off-canvas-wrap内，和主界面并列
							offCanvasWrapper[0].insertBefore(offCanvasSide, offCanvasWrapper[0].firstElementChild);
						}
						classList.add('mui-scalable');
						break;
					case 'menu-move':
						classList.add('mui-slide-in');
						break;
					case 'all-move':
						moveTogether = true;
						//整体滑动时，侧滑菜单在inner-wrap内
						offCanvasInner.insertBefore(offCanvasSide, offCanvasInner.firstElementChild);
						break;
				}
				offCanvasWrapper.offCanvas().refresh();
			}
		});
		//	//主界面‘显示侧滑菜单’按钮的点击事件
		//	document.getElementById('offCanvasShow').addEventListener('tap', function() {
		//		offCanvasWrapper.offCanvas('show');
		//	});
		//	//菜单界面，‘关闭侧滑菜单’按钮的点击事件
		//	document.getElementById('offCanvasHide').addEventListener('tap', function() {
		//		offCanvasWrapper.offCanvas('close');
		//	});


		//主界面和侧滑菜单界面均支持区域滚动；
		mui('#offCanvasSideScroll').scroll();
		mui('#offCanvasContentScroll').scroll();
		//实现ios平台原生侧滑关闭页面；
		if (mui.os.plus && mui.os.ios) {
			mui.plusReady(function() { //5+ iOS暂时无法屏蔽popGesture时传递touch事件，故该demo直接屏蔽popGesture功能
				plus.webview.currentWebview().setStyle({
					'popGesture': 'none'
				});
			});
		}
	}

	lm.Lm_init(function(){
		var self = this;

		rendPage();

		/*
			钱包页面数据渲染
		*/
		function rendPage() {

			/*
				渲染数据
			*/
			//lm.lmBind.call(self);init
			lm.ajax({
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.userinfo,
				type : 'GET',
				datatype : 'json',
			}).done(function(data){
				console.log(data);

				if (data.code === 0) {

					self.userinfo = data.data;

				}else{
					alert('错误代码：' + data.code + '错误信息：' + data.msg);
				}
			});

		}

		/*
			申请物料
		*/
		this.apply = function(){
			lm.ajax({
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.materiel,
				type : 'GET',
				datatype : 'json',
			}).done(function(data){
				console.log(data);

				if (data.code === 0) {
					
					self.mobile = data.data;
					$('#infoModal').removeClass('none');
					$("#btn_tuxiang_wuliao").attr("lm-lang-id","13");
					//$("#btn_tuxiang_wuliao").text(lm.getLanguage()[13-1]||"申请中");
					$("[lm-lang-id='13']").text(lm.getLanguage()[13-1]);
					$('#callPhone').attr({
						href: 'TEL:'+self.mobile,
					});

				}else{
					alert('错误代码：' + data.code + '错误信息：' + data.msg);
				}
			});
		};


		self.scaleQrcode = function(){
			if ($('.erweima_div').hasClass('none')) {
				$('.erweima_div').removeClass('none');
			}else{
				$('.erweima_div').addClass('none');
			}
		};
		/*
			跳转到我的钱包
		*/
		this.jumpWallet = function(){
			window.location.href = './myPanda.html';
		};
		/*
			跳转到设置
		*/
		this.jumpShezhi = function(){
			window.location.href = './shezhi.html';
		};
		/*
			跳转到个人信息
		*/
		this.jumpUser = function(){
			window.location.href = './user.html';
		};

	});


});
