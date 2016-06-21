/**
 * 
 * @authors Gary_zhou (you@example.org)
 * @date    2016-04-25
 * @version $Id$
 * 龙门客栈公用JS
 * 		1> 根地址
 * 		2> 请求API接口地址
 * 		3> 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

(function(root,factory){

	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'template','tpl'],factory);
	} else if( typeof exports === 'object'){

		module.exports = factory(require('jquery'));
	} else{
		/*全局window加载jquery*/
		if (typeof root.jQuery === 'undefined'||typeof root.template === 'undefined') {
			throw new Error('未加载jQuery或者template！！！');
		}else{
			root.lm = factory(root.jQuery,root.template,root.tpl);
			console.log(root.lm.apiClass);
		}
	}

})(typeof window !== 'undefined' ? window : this ,function($,template,tpl,undefined){

	function Lm(options) {

		this.options = $.extend({}, this.constructor.defaultOptions);
		$.extend(this.options, options);

		this.init();
		//this.lmRepeatBind();
		this.modalClose();
	}
	/*
		启动控制器
	*/
	Lm.prototype.Lm_init = function(scopeConstructor,options){
		//var lm = new Lm(options||{});
		var self = this;
		var lmScope = new scopeConstructor();
		
		$.extend(self.options, options);

		self.lmWatch.subscribe('bind',function(e,scope){
			self.lmBind.call(scope||lmScope);
			self.lmStyle.call(scope||lmScope);
			self.lmImg.call(scope||lmScope);
			self.lmRepeatBind.call(scope||lmScope);
			self.lmValue.call(scope||lmScope);
			self.lmShow.call(scope||lmScope);
			self.lmHref.call(scope||lmScope);
			self.setImgSrc();
		});

		if (self.options.isRendNow||typeof self.options.isRendNow === 'undefined') {
			/*
				数据绑定
			*/
			self.lmReadyBind.call(lmScope);
		}
		
		/*
			事件绑定
		*/
		self.lmAddEventListener.call(lmScope);
	}

	Lm.defaultOptions = {
		userinfo : null,
		always : null,				//	临时

	};
	Lm.prototype.init = function(options) {
		//this.lmAddEventListener();
		var self = this;
		self.setImgSrc();

		/*
			清理缓存
		*/
		self.lmClearStorage('ADD_STEP_INFO',true);

		if (window.location.pathname.indexOf('login')<0) {
			self.lmHasLogin();
		}

		self.lmBack();
		self.setHistroy();
		//self.lmGetUserInfo();	
	};

	/*
		观察者模式
	*/
	Lm.prototype.lmWatch = (function(){

		var o = $({});
		return {
		    subscribe : function () {
		        o.on.apply(o, arguments);
		    },

		    unsubscribe : function () {
		        o.off.apply(o, arguments);
		    },

		    publish : function () {
		        o.trigger.apply(o, arguments);
		    }
		};

	})($);
	/*
		使用session的key值
	*/
	Lm.prototype.sessionClass = {
		addBdSe : 'ADD_STEP_INFO',		//	添加地推员
		addBdShop : 'ADD_STEP_SHOP',		//	关联商户
	};
	/*
		请求接口类
	*/
	Lm.prototype.apiClass = {
		root : 'http://piao.pandauu.com/',
		imgUrl : 'img/',		//无需登录可调用接口
		publicUrl : 'public/',		//无需登录可调用接口
		apiUrl : 'bapi/',			//需登录可调用接口
		apiInd : {
			adminlogin : 'adminlogin',		//BD登录接口 params {usernam --- password}
			islogin : 'is-login',		//城市列表
			citylist : 'citylist',		//城市列表
			city : 'city',		//设置城市
			businesslist : 'businesslist',		//商户列表
			addbusiness : 'add-business',		//添加商户
			business : 'business',		//获取商户信息
			updatebusiness : 'update-business',		//修改商户
			upload : 'upload',		//上传照片
			arealist : 'arealist',		//地区列表
			cate : 'cate',		//经营类目
			delphoto : 'del-photo',		//删除照片
			offline : 'business-offline',		//下线
			online : 'business-online',		//上线
			bdlist : 'bdlist',		//bd列表
			bd : 'bd',		//地推员详情
			update_bd : 'update-bd',		//修改地推员
			buserstatus : 'buser-status',		//地推员状态
			withdrawalslist : 'withdrawalslist',		//提现记录列表
			withdrawals : 'withdrawals',		//提现详情
			materiellist : 'materiellist',		//物料列表
			materiel : 'materiel',		//物料详情
			userinfo : 'userinfo',		//个人信息
			qrcodelist : 'qrcodelist',		//二维码列表
			qrcode : 'qrcode',		//二维码详情
			sendmateriel : 'send-materiel',		//申请物料
			addbd : 'add-bd',		//添加地推员
			businessstatus : 'business-status',		//商户状态
			time : 'time',		//当天时间戳
			msg:"msg" ,   //index
			haveUsername:"have-username",  //监测用户名是否唯一
			bdOnline:"bd-online",
			userinfo:"userinfo",
			contactlist:"contactlist", //获取已经上线的地推员
			defaultbd:"default-bd", //获取已经上线的地推员
			orders:"update-orders",//上传凭证
			logout:"logout",//登出
		},
	};
	/*
	 订阅事件类型
	*/
	Lm.prototype.subType = {
		bind : '',
	};
	/*
		表单验证类
	*/
	Lm.prototype.validateClass = {
		userLogin : {
			username : {
				rules : 'required',
				label : '用户名不能为空'
			},
			password : {
				rules : 'required',
				label : '密码不能为空'
			},
		},
		userEdit : {
			oldpwd : {
				rules : 'required',
				label : '密码不能为空'
			},
			newpwd : {
				rules : 'required',
				label : '新密码不能为空'
			},
		},
		addShop : {
			name_cn : {
				rules : 'required',
				group : '1',
				label : '中文名称或英文名称不能为空'
			},
			name_en : {
				rules : 'required',
				group : '1',
				label : '中文名称或英文名称不能为空'
			},
			address_cn : {
				rules : 'required',
				group : '2',
				label : '中文地址或英文地址不能为空'
			},
			address_en : {
				rules : 'required',
				group : '2',
				label : '中文地址或英文地址不能为空'
			},
			area_id:{
				rules : 'required',
			
				label : '请选择所在地区'
			},
			cate_id:{
				rules : 'required',
			
				label : '请选择经营类目'
			}
		},
		addBd : {
			name_cn : {
				rules : 'required',
				label : '中文姓名不能为空'
			},
			name_en : {
				rules : 'required',
				label : '英文姓名不能为空'
			},
			mobile : {
				rules : 'required',
				label : '手机号不能为空'
			},
			business_id : {
				rules : 'required',
				label : '所属商户不能为空'
			},
		},
	};
	/*
		表单验证方法
		根据validateClass内的验证规则判断验证是否通过
		return true||false
	*/
	Lm.prototype.validate = function(index){

		
		if (!index) {
			return false;
		}
		var self = this;
		var validateDom = $('[lm-validate = ' + index + ']');
		var requiredArray = [];
		var groupArray = {};
		var result = null;
		var code = '';  //错误代码

		for(var k in self.validateClass[index]){
			var isRequired = !!self.validateClass[index][k].rules.match(/required/i);
			if (isRequired) {
				requiredArray.push(k);
			}

			if (self.validateClass[index][k].group) {
				if (!groupArray[self.validateClass[index][k].group]) {
					groupArray[self.validateClass[index][k].group] = {};
				}
				groupArray[self.validateClass[index][k].group].ok = false;
			}

		}


		validateDom.each(function(item){

			if (requiredArray.indexOf($(this).attr('name'))>=0) {
				var hasValue = false;
				var groupValidate = false;
				
				if (self.validateClass[index][$(this).attr('name')].group&&!groupArray[self.validateClass[index][$(this).attr('name')].group].ok) {

						console.log($(this).attr('name'));

					for(var k in self.validateClass[index]){
						if (typeof groupArray[self.validateClass[index][k].group] === 'undefined') {
							continue;
						}

						if (!groupArray[self.validateClass[index][k].group].ok&&self.validateClass[index][k].group === self.validateClass[index][$(this).attr('name')].group) {

							groupValidate = $('[name="' + k + '"]').val().trim()?true:false;

							if (!groupValidate) {
								
								console.log(k);
								groupArray[self.validateClass[index][k].group]['name'] = k;
								groupArray[self.validateClass[index][k].group].ok = groupValidate;
							}else{
								groupArray[self.validateClass[index][k].group].ok = groupValidate;
							
							}
							
						}
					}

					hasValue = groupArray[self.validateClass[index][$(this).attr('name')].group].ok;
					
				}else{
					hasValue = $(this).val().trim()?true:false;
				}

				var name = $(this).attr('name');

				if (typeof groupArray[self.validateClass[index][$(this).attr('name')].group] !== 'undefined') {
					hasValue = groupArray[self.validateClass[index][$(this).attr('name')].group].ok;
				}
				
				if (!hasValue) {
					result = {
						code : false,
						name : name,
						msg : self.validateClass[index][name].label
					};
					return false;
					
				}
			}
		});
		
		return (code = result?result.code:true,result = result||{},result.code = code,result);
	};
	/*
		判断是否登录
	*/
	Lm.prototype.lmHasLogin = function(){
		var self = this;
		self.ajax({
			url : self.apiClass.root + self.apiClass.apiUrl + self.apiClass.apiInd.islogin,
			type : 'GET',
			datatype : 'json',
		}).done(function(data){
			if (data.code !== 0) {
				window.location.href = 'login.html';
			}
		});
			
	};
	/*
		保存历史纪录
	*/
	Lm.prototype.setHistroy = function(){
		var self = this;
		var index = 0;
		var data = null;
		var str = '';

		//self.lmSetStorage('histroy',data.join('-'));
		//console.log(self.lmGetStorage('histroy'));
		// if (self.lmGetStorage('histroy')) {
		// 	data = self.lmGetStorage('histroy').split(',');
		// 	index = +;
		// }
		/*self.lmSetStorage('histroy',{url : window.location.href});*/
	};
	/*
		回退功能
	*/
	Lm.prototype.lmBack = function(){
		var self = this;
		
		$('[lm-back]').unbind('click').bind('click', function (){
			window.history.go(-1);
		});
			
	};
	/*
		获取时间信息
	*/
	Lm.prototype.lmGetTime = function(callback){
		var self = this;
		self.ajax({
			url : self.apiClass.root + self.apiClass.apiUrl + self.apiClass.apiInd.time,
			type : 'GET',
			datatype : 'json',
		}).done(function(data){
			callback(data.data);
		});
			
	};
	/*
		缓存信息
	*/
	Lm.prototype.lmGetUserInfo = function(callback){
		var self = this;
		if (!self.lmHasStorage()) {
			self.ajax({
				url : self.apiClass.root + self.apiClass.apiUrl + self.apiClass.apiInd.userinfo,
				type : 'GET',
				datatype : 'json',
			}).done(function(data){
				self.options.userinfo = data.data;
				self.lmSetStorage("userinfo",data.data);
				callback(data.data);
			});
		}else{
			this.options.userinfo = self.lmGetStorage('userinfo');
			callback(self.lmGetStorage('userinfo'));
		}
			
	};

	/*
		缓存信息
	*/
	Lm.prototype.lmSetStorage = function(index,data){

		if (!data) {
			alert('参数不完整');

			return false;
		}

		if (!data.ctime) {
			data.ctime = +new Date();
		}

		sessionStorage.setItem(index, JSON.stringify(data));

		
	};
	/*
		获取缓存信息
	*/
	Lm.prototype.lmGetStorage = function(index){

		return JSON.parse(sessionStorage.getItem(index));
	};
	/*
		清理缓存信息
		功能：
			1 手动清除
			2 清除10分钟以前的缓存
		参数说明：
			index----缓存key值
			isTimeOut ---是否启动清除10分钟以前的缓存(true -- 启动，false--不启动)
	*/
	Lm.prototype.lmClearStorage = function(index,isTimeOut){
		var data = JSON.parse(sessionStorage.getItem(index));

		isTimeOut = data?isTimeOut:false;
		index = index||'';

		if (isTimeOut) {
			var d = (new Date()).getTime();
			if (Math.abs(d-data.ctime)>20*60*1000) {
				sessionStorage.removeItem(index);

				return true;
			}else{
				return false;
			}
		}else{

			sessionStorage.removeItem(index);

			return true;
		}

	};
	/*
		判断是否有缓存信息
	*/
	Lm.prototype.lmHasStorage = function(data){
		if (sessionStorage.getItem("userinfo")) {
			return true;
		}else{
			return false;
		}
	};

	/*
		龙门客栈事件
		lm-click
		lm-input
	*/
	Lm.prototype.lmAddEventListener = function(argument) {
		var self = this;
		var proto = Lm.prototype;
		/*
			输入框input事件
		*/
		$('[lm-input]').each(function(index, el) {
			if (!$(this).attr('lm-input')) {
				return false;
			}
			//var inputEvent = eval('self.' + $(this).attr('lm-input'));
			var inputEvent = new Function('e=arguments[0];return this.' + $(this).attr('lm-input'));

			$(this).unbind('input').bind('input', lmEvent);

			function lmEvent(event) {

				event.stopPropagation(); 
				event.preventDefault(); 

				if (typeof inputEvent.call(self,this) === 'function') {
					inputEvent.call(self)(this);
				}

				proto.lmReadyBind.call(self);


				/*inputEvent.call(this,event);
				proto.lmReadyBind.call(self);*/
			}

		});
		/*
			tap事件
		*/
		$('[lm-tap]').each(function(index, el) {
			if (!$(this).attr('lm-tap')) {
				return false;
			}
			var clickEvent = eval('self.' + $(this).attr('lm-tap'));

			$(this)[0].addEventListener('tap',function (event) {

				clickEvent.call(this,event);
				proto.lmReadyBind.call(self);

			});

		});
		/*
			click事件
		*/
		$('[lm-click]').each(function(index, el) {
			if (!$(this).attr('lm-click')) {
				return false;
			}

			//var clickEvent = eval('self.' + $(this).attr('lm-click'));
			var clickEvent = new Function('e=arguments[0];return this.' + $(this).attr('lm-click'));

			$(this).unbind('click').bind('click',function(event){
				this.lmEventRender = true;
				//clickEvent.call(this,event);
				if (typeof clickEvent.call(self,this) === 'function') {
					clickEvent.call(self)(this);
					
					if (self.lmEventRender) {
						proto.lmReadyBind.call(self);
					}
				}


			});

		});
		/*
			blur事件
		*/
		$('[lm-blur]').each(function(index, el) {
			if (!$(this).attr('lm-blur')) {
				return false;
			}
			var blurEvent = new Function('e=arguments[0];return this.' + $(this).attr('lm-blur'));

			$(this).unbind('blur').bind('blur',function(event){

				if (typeof blurEvent.call(self,this) === 'function') {
					blurEvent.call(self)(this);
				}
				proto.lmReadyBind.call(self);

			});

		});

		/*
			focus事件
		*/
		$('[lm-focus]').each(function(index, el) {
			if (!$(this).attr('lm-focus')) {
				return false;
			}
			var clickEvent = new Function('var e=arguments[0];return this.' + $(this).attr('lm-focus'));

			$(this).unbind('focus').bind('focus',function(event){
				
				if (typeof clickEvent.call(self,this) === 'function') {

					clickEvent.call(self)(this);
				}
				
				proto.lmReadyBind.call(self);

			});

		});

		/*
			keydown事件
		*/
		$('[lm-keydown]').each(function(index, el) {
			if (!$(this).attr('lm-keydown')) {
				return false;
			}
			var clickEvent = new Function('var e=arguments[0];return this.' + $(this).attr('lm-keydown'));

			$(this).unbind('keydown').bind('keydown',function(event){
				self.lmEvent = event;

				if (typeof clickEvent.call(self,this) === 'function') {

					clickEvent.call(self)(this);
				}
				
				proto.lmReadyBind.call(self);

			});

		});
		/*
			keydown事件
		*/
		$('[lm-touchstart]').each(function(index, el) {
			if (!$(this).attr('lm-touchstart')) {
				return false;
			}
			var clickEvent = new Function('var e=arguments[0];return this.' + $(this).attr('lm-touchstart'));

			$(this).unbind('touchstart').bind('touchstart',function(event){
				self.lmEvent = event;

				if (typeof clickEvent.call(self,this) === 'function') {

					clickEvent.call(self)(this);
				}
				
				//proto.lmReadyBind.call(self);

			});

		});

	};
	/*
		龙门客栈数据绑定
	*/
	Lm.prototype.lmBind = function(argument) {
		var self = this;

		$('[lm-bind]').each(function(index, el) {
			var scopeDataStr = $(this).attr('lm-bind').split('.')[0];
			console.log(scopeDataStr);
			if (!scopeDataStr) {
				return false;
			}
			try{
				if (eval('self.' + scopeDataStr)) {
					var data = eval('self.' + $(this).attr('lm-bind'));
					$(this).html(data);
				}
			}catch(e){
				console.log(e);
				if (self[scopeDataStr]) {
					var data = eval('self.' + $(this).attr('lm-bind'));
					$(this).html(data);
				}
			}
			
		});

	};
	/*
		龙门客栈加载后数据绑定
	*/
	Lm.prototype.lmReadyBind = function(argument) {
		var self = this;
		var proto = Lm.prototype;
		/*
			数据绑定
		*/
		(function(){
			for(var k in self){
				if (typeof self[k] !== 'function'&&self[k] != null &&typeof self[k] !== 'undefined') {
					proto.lmWatch.publish('bind',self);
				}
			}
		})();

	};
	/*
		龙门客栈循环遍历数据绑定
	*/
	Lm.prototype.lmRepeatBind = function(argument) {
		var self = this;
		var proto = Lm.prototype;

		$('[lm-repeat-target]').each(function(index, el) {
			console.time('aaa');
			
			var domThis = this;
			var tplIndex = $(domThis).attr('lm-repeat-tpl');
			var tplId = $(domThis).attr('lm-repeat-target');

			if ($('#'+tplId).length<=0) {
				var scriptTpl = '<script type="text/html" id="' + tplId + '"></script>';
			
				$('html').append(scriptTpl);
			}

			var htmlStr = tpl.selectTpl(tplIndex);

			$('#'+tplId)[0].innerHTML = htmlStr;

			var dataObj = eval('self.' + $(domThis).attr('lm-repeat'));
			var tplScript = template(tplId,{list : dataObj});

			$(domThis)[0].innerHTML = (tplScript);
			console.timeEnd('aaa');
			/*
				事件绑定
			*/
			proto.lmAddEventListener.call(self);

		});
	};
	/*
		龙门客栈lm-style事件
	*/
	Lm.prototype.lmStyle = function(argument) {
		var self = this;

		$('[lm-style]').each(function(index, el) {
			

			var styleStr = $(this).attr('lm-style');	//样式对象字符串

			var styleParam = styleStr.match( /{{[^\}]+}}/g);//获取样式变量
			var data = '';
			var len = 0;
			var objData = {};
			var bindData = null;
			/*
				将对象字符串转换为对象
			*/
			if (styleParam) {
				for (var i = styleParam.length - 1; i >= 0; i--) {
					if (self[styleParam[i].match( /{{([^\}]*)}}/)[1].split('.')[0]]) {
						if (eval('typeof self.' + styleParam[i].match( /{{([^\}]*)}}/)[1]) !== 'undefined') {
							console.log(styleParam[i].match( /{{([^\}]*)}}/)[1].split('.'));
						
							bindData = eval('self.' + styleParam[i].match( /{{([^\}]*)}}/)[1]);
							data = styleStr.replace(styleParam[i],bindData);
						}
					}else{
						continue;
					}
				}
				if (data) {
					len = data.split(',').length;
					var dataObj = data.match( /\{([^\}]*)}/)[1];
					for(var i=0 ; i < len; i++ ){
					 	objData[dataObj.split(',')[i].split('&')[0].trim()] = dataObj.split(',')[i].split('&')[1];
					}

				}
			}else{
				console.log(styleStr.match( /\{([^\}]*)}/)[1]);
				for (var i = styleStr.match( /\{([^\}]*)}/)[1].split(',').length - 1; i >= 0; i--) {
					for (var j = styleStr.match( /\{([^\}]*)}/)[1].split(',')[i].split('&').length - 1; j >= 0; j--) {
						
							objData[styleStr.match( /\{([^\}]*)}/)[1].split(',')[i].split('&')[0].trim()] = styleStr.match( /\{([^\}]*)}/)[1].split(',')[i].split('&')[1];
					}
				}
			}
			$(this).css(objData);
		});

		return true;

	};
	/*
		龙门客栈img绑定数据事件
	*/
	Lm.prototype.lmImg = function(argument) {
		var self = this;

		$('[lm-bImg]').each(function(index, el) {
			var scopeDataStr = $(this).attr('lm-bImg').split('.')[0];
			if (self[scopeDataStr]) {
				var data = eval('self.' + $(this).attr('lm-bImg'));
				$(this).attr({'data-lm-imgurl' : data});
			}
			
		});

	};
	/*
		龙门客栈input---value绑定数据事件
	*/
	Lm.prototype.lmValue = function(argument) {
		var self = this;

		$('[lm-bValue]').each(function(index, el) {
			var scopeDataStr = $(this).attr('lm-bValue').split('.')[0];
			if (self[scopeDataStr]) {
				var data = eval('self.' + $(this).attr('lm-bValue'));
				$(this).attr({'value' : data});
			}
			
		});

	};
	/*
		龙门客栈lm-show事件
	*/
	Lm.prototype.lmShow = function(argument) {
		var self = this;
		$('[lm-show]').each(function(index, el) {
			var scopeDataStr = '';

			/*if ($(this).attr('lm-show').indexOf('!')>=0) {

				scopeDataStr = $(this).attr('lm-show').split('!')[1].split('.')[0];
			}else{
				scopeDataStr = $(this).attr('lm-show').split('.')[0]
			}

			if (typeof self[scopeDataStr] !== 'undefined') {
				var data = null ;

				if ($(this).attr('lm-show').indexOf('!')>=0) {
					data = !eval('self.' + $(this).attr('lm-show').split('!')[1]);
				}else{
					data = eval('self.' + $(this).attr('lm-show'));
				}

				if (data) {
					$(this).css({'display' : "block"});
				}else{
					
					$(this).css({'display' : "none"});
				}
				
			}*/
			var str = $(this).attr('lm-show');

			try{
				var show = new Function('var self = this;return ' + $(this).attr('lm-show') );
				console.log(!!show.call(self));
				if (!!show.call(self)) {
					$(this).css({'display' : "block"});
				}else{
					$(this).css({'display' : "none"});
				}
			}catch(e){
				console.log(e);
			}
				
			
		});

	};
	/*
		龙门客栈href绑定数据事件
	*/
	Lm.prototype.lmHref = function(argument) {
		var self = this;
		$('[lm-bHref]').each(function(index, el) {
			var scopeDataStr = $(this).attr('lm-bHref').split('.')[0];
		console.log(eval('self.' + $(this).attr('lm-bHref')));
			if (self[scopeDataStr]) {
				var data = eval('self.' + $(this).attr('lm-bHref'));
				$(this).attr({'href' : data});
			}
			
		});

	};
    /*
	* 设置img标签src属性----jquery
	* demo:<img data-lm-imgurl="qrcode_for_gh_74e9c5cf44c1_860.jpg" src="">
	* data-lm-imgdefer="1" --- 添加css效果
    */
    Lm.prototype.setImgSrc = function(){
    	var self = this;
    	var index = '';
    	var url = '';

    	$('img[data-lm-imgurl]').each(function(index, el) {
    		var selector = this;
    		var imgUrlStr = $(this).data('lm-imgurl');
	    	if (!$(this).data('lm-imgurl')) {
	    		return false;
	    	}
    		index = $(this).data('lm-imgurl');

    		if (index.indexOf('imgs') >= 0) {
    			url = self.apiClass.root + self.apiClass.imgUrl + imgUrlStr;
    		}else if(index.indexOf('uploads') >= 0){
    			url = self.apiClass.root + imgUrlStr;
    		}else{
    			url = self.apiClass.imgUrl + imgUrlStr;
    		}

    		if ($(selector).data('lm-imgdefer') === 1) {
    			var img = new Image();
    			img.onload = function(){
		    		setTimeout(function(){
		    			$(selector).attr({'src':img.src}).css({opacity:0}).animate({ 
			 				opacity: 1,
			 			}, 1000);
		    		},50);
			    		
		    	};
	    		img.src = url;
    		}else{
    			$(this).attr({
		    		src: url,
		    	});
    		}
		    	
    	});
    };
    /*
	* 点击延迟加载图片----jquery
	* demo: <img data-lm-imgurl="qrcode_for_gh_74e9c5cf44c1_860.jpg" src="" data-lm-imgdefer="1">
	* data-lm-imgload="0" 表示该图片未加载  1---已经加载
    */
    Lm.prototype.deferLoadImg = function(imgUrl , selector , clickDom,callback){
    	var img = new Image();
    	if (typeof clickDom === 'undefined') {
    		clickDom = $(selector).parents('.modal');
    	}
    	clickDom.find('[data-lm-dismiss]').css({
    		opacity: 0,
    	});
    	$(selector).css({
    		background : '#000',
    		opacity : '0.5',
    	});
    	img.onload = function(){
    		//$(selector).attr({'src':imgUrl});
    		setTimeout(function(){
    			$(selector).data({'lm-imgload' : '1'});
    			$(selector).attr({'src':img.src}).css({
    				opacity:0,
	 				background : '#fff',
	 			}).animate({ 
	 				opacity: 1,
	 			}, 1000);
    			clickDom.find('[data-lm-dismiss]').css({opacity:1});
    			if (typeof callback ==='function') {
    				callback();
    			}
    		},1000);
	    		
    	};
    	img.src = imgUrl;

    };

	/*
		ajax请求
	*/
	Lm.prototype.ajax = function(options){
		var self = this;

		if(typeof self.options.ajaxData === 'undefined'){
			self.options.ajaxData = {};
		}

		self.options.ajaxData = options;

		return self;
	};
	Lm.prototype.lmAjax = function(options){
		var self = this;

		var deffer = $.ajax(options).done(function (data) {
			if (typeof data.code === 'undefined') {
				if(typeof self.options.data === 'undefined'){
					self.options.data = {};
				}
				
				self.options.data = data;
			}else{
				if (window.location.pathname.indexOf('login')<0&&data.code === 100) {
					window.location.href = 'login.html';
					throw ("未登录");
				}
				// if (data.code === 0) {

				// 	if(typeof self.options.data === 'undefined'){
				// 		self.options.data = {};
				// 	}
					
					self.options.data = data;

				// }else{
				// 	alert('错误代码：' + data.code + '错误信息：' + data.msg);
				// }
			}
		}).error(function(error){
			alert(JSON.stringify(error));
			alert('连接失败！！');
		}).always(function(){
			console.log('complete');
		});

		return deffer;
	};
	Lm.prototype.done = function(callback){
		var self = this;
		var proto = Lm.prototype;

		proto.lmAjax.call(self,self.options.ajaxData).then(function(){
			//callback(self.options.data);
			callback(arguments[0]);
			if (self.options.isRendNow||typeof self.options.isRendNow === 'undefined') {
				self.lmWatch.publish('bind');
			}

		}).always(function(){
			if (typeof self.options.always === 'function') {
				self.options.always();
			}
		});

		return self;
	};
	Lm.prototype.always = function(callback){
		var self = this;
		self.options.always = callback;
	};
    /*
	* 获取浏览器url
    */
    Lm.prototype.getPathName = function(data) {
        // body...
        var pathName = [];
        var params = null ;
        if(window.location.hash){
            pathName = window.location.hash.split('#')[1];
            if (pathName.indexOf('?v=') >=0) {
                pathName = pathName.split('?v=')[0];
            }else if(pathName.indexOf('&v=') >=0){
                pathName = pathName.split('&v=')[0];
            };

            return pathName;
        }else{
            pathName = window.location.pathname + window.location.search;
        	
            var pathNameArray = pathName.split('/');
            
            pathName = data?data:pathNameArray[pathNameArray.length-1];

            if (pathName.indexOf('?') >=0) {
                pathName = pathName.split('?')[1].split('&');
                for (var i = pathName.length - 1; i >= 0; i--) {
                	if (!params) {
                		params = {};
                	}
                	params[pathName[i].split('=')[0].trim(
                		)] = pathName[i].split('=')[1];
                }
            }

            return params;
        }
    }
	/*
		模态框关闭事件
	*/
	Lm.prototype.modalClose = function(callback){
		var self = this;
		$('[lm-modal-miss]').each(function(index, el) {
			var id = $(this).attr('lm-modal-miss');

			$(this)[0].addEventListener('tap',function (event) {
				$(id).addClass('none');
			});
			$(this).unbind('click').bind('click',function (event) {
				$(id).addClass('none');
			});
		});
	};
	/*
		tip
	*/
	Lm.prototype.tip = function(selector, data, time){
		var self = this;
		var height = 0;
		
		selector.html(data);
		$(selector.attr('lm-tip-target')).removeClass('none');

		height = selector.height() + parseFloat(selector.css('padding-top')) + parseFloat(selector.css('padding-bottom'));
		selector.css({'border-radius' : height/2});

		setTimeout(function() {
			selector.addClass('none');
		}, time||1000);
	};
	/*
		判断是否为空对象
	*/
	Lm.prototype.isNull = function(obj){
		if (typeof obj === 'object') {
			for(var k in obj){

				return false;
			};

			return true;
		}else{
			return true;
		}
	};
	/*
		将URL参数对象序列化
	*/
	Lm.prototype.lmParam = function(obj){
		var tempArray = [];

		if (typeof obj === 'object') {
			for(var k in obj){
				tempArray.push(k + '=' + obj[k]);
			};
		}else{
			tempArray = obj;
		}

		return tempArray.join('&');
	};

	/*
		uc浏览器回退强制刷新
	*/
	Lm.prototype.ucReload = function(){
		if (navigator.userAgent.indexOf("UCBrowser")>-1) {
			setTimeout(function(){
				window.location.reload()
			},200);
		}
	};
	/*
		表单验证
	*/
	Lm.prototype.patternObj={
		qq:{
			pattern:"^[1-9][0-9]{4,10}$",
			title:"请输入正确的QQ"
		},
		phone:{
			pattern:"^[0-9]+$",
			title:"请输入正确的手机号码"
		},
		email:{
			pattern:"^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$",
			title:"请输入正确的邮箱"
		}
	}
	Lm.prototype.pattern=function(){
		var self=this;
		$("[pattern-type]").each(function(){
				var input_pattern=self.patternObj[$(this).attr("pattern-type")].pattern;
				var input_title=self.patternObj[$(this).attr("pattern-type")].title;
				$(this).blur(function(){
					if($(this).val()){
						var res=new RegExp(input_pattern).test($(this).val());
						if(!res){
							alert(input_title);
							$(this).focus();
							return false;
						}
					}
				})
		})
	}




	//return new Lm();
	return new Lm();
});