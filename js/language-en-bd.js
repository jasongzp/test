/*
*	龙门客栈 语言包 by@lev
*	html 元素添加语言属性  <div lm-id-lang="1语言文本测试1</div>
*	属性的值与数组下标进行关联
*
*	替换html页面中的语言文字
*	for(var i=0;i<languageArray.length;i++){
*		$("[lm-id-lang='"+(i+1)+"']").text(languageArray[i][0])
*	}
*/


/*
 	BD端 英文
*/

 var languageEnArray = [

		/*所在地区
			4_3_2_商户_添加商户_所在地区
		*/
		/*1*/   'Area',
		/*2*/   'Area',

		/*添加商户
			4_3_1_商户_添加商户
			4_3_2_商户_添加商户_所在地区
			4_3_3_商户_添加商户_经营类目
			4_3_4_商户_添加商户(已填写)
			4_3_5_商户_添加商户(已填写)_删除照片
		*/

		/*3*/   'Add Store',
		/*4*/   'Edit Store Profile',
		/*5*/   'Save',
		/*6*/   'Store Chinese Name',
		/*7*/   'Input Store Chinese Name',
		/*8*/   'Store English Name',
		/*9*/   'Input Store English Name',
		/*10*/   'Contact Person',
		/*11*/   'Location',
		/*12*/   'Mark on the map',
		/*13*/   'Input Address',
		/*14*/   'Category',
		/*15*/   'Category Description',
		/*16*/   'Store Staff',
		/*17*/   'Add',
		/*18*/   'Store Photo',
		/*19*/   'Upload',
		/*20*/   'Delete',
		/*21*/   'Save',

		/*编辑商户信息
			4_3_1_商户_添加商户
			4_3_2_商户_添加商户_所在地区
			4_3_3_商户_添加商户_经营类目
			4_3_4_商户_添加商户(已填写)
			4_3_5_商户_添加商户(已填写)_删除照片
		*/
		/*22*/   'Edit Store Profile',
		/*23*/   'Edit Store Profile',
		/*24*/   'Save',
		/*25*/   'Input Store Chinese/English Name',
		/*26*/   'Store Chinese Name',
		/*27*/   'Input Store Chinese Name',
		/*27*/   'Store English Name',
		/*28*/   'Input Store English Name',
		/*28*/   'Location',
		/*29*/   'Please Choose',
		/*30*/   'Input Store Address in Chinese/English(at least 1) ',
		/*31*/   'Please Input Store Address(Chinese)',
		/*32*/   'Please Input Store Address(English)',
		/*33*/   'Mark on the map',
		/*34*/   'Slide Map Selection',
		/*35*/   'Category',
		/*36*/   'Please Choose',
		/*37*/   'Category Description',
		/*38*/   'Store Photo',
		/*39*/   'Note',
		/*40*/   'Save',

		/*选择城市
			2_1_1_选择城市
		*/
		/*41*/   'Choose City',
		/*42*/   'Choose City',

		/*选择地推员*/
		/*43*/   'Choose Store Staff',
		/*44*/   'Choose Store Staff',
		/*45*/   'Please choose the store staff you want to search(at least 1)',
		/*46*/   'Confirm',

		/*编辑商户信息
			4_3_1_商户_添加商户
			4_3_2_商户_添加商户_所在地区
			4_3_3_商户_添加商户_经营类目
			4_3_4_商户_添加商户(已填写)
			4_3_5_商户_添加商户(已填写)_删除照片
		*/

		/*47*/   'Edit Store Profile',
		/*48*/   'Edit Store Profile',
		/*49*/   'Save',
		/*50*/   'Input Store Name in Chinese/English(at least 1)',
		/*51*/   'Input Store Chinese Name',
		/*52*/   'Please Input Store Chinese Name',
		/*53*/   'Input Store English Name',
		/*54*/   'Please Input Store English Name',
		/*54*/   'Location',
		/*55*/   'Input Store Address in Chinese/English(at least 1)',
		/*56*/   'Please Input Store Address(Chinese)',
		/*57*/   'Please Input Store Address(English)',
		/*58*/   'Mark on the map',
		/*59*/   'Category',
		/*60*/   'Please Choose',
		/*61*/   'Category Descripton',
		/*62*/   'Store Photo',
		/*63*/   'Upload',
		/*64*/   'Delete',
		/*65*/   'Note',
		/*66*/   'Save',
		/*67*/   'Please enter store name',

		/*编辑地推员信息
		5_1_2_地推员_编辑地推员信息(未填写)
		5_1_3_地推员_编辑地推员信息_选择关联商户
		5_1_5_地推员_编辑地推员信息(已填写)
		*/

		/*68*/   'Edit Store Staff Profile',
		/*69*/   'Edit Store Staff Profile',
		/*70*/   'Save',
		/*71*/   'Chinese Name',
		/*72*/   'Please Input Store Staff Chinese Name',
		/*73*/   'English Name',
		/*74*/   'Please Input Store Staff English Name',
		/*75*/   'Handphone Number',
		/*76*/   'Please Input Store Staff Handphone Number',
		/*77*/   'Wechat ID',
		/*78*/   'Please Input Store Staff Wechat ID',
		/*79*/   'QQ ID',
		/*80*/   'Please Input Store Staff QQ ID',
		/*81*/   'LINE ID',
		/*82*/   'Please Input Store Staff LINE ID',
		/*84*/   'Email Address',
		/*83*/   'Please Input Store Staff Email Address',
		/*85*/   'Store',
		/*86*/   'Please Choose',
		/*87*/   'Username',
		/*88*/   '默认使用英文名',
		/*89*/   'Password',
		/*90*/   'Generate Password',
		/*91*/   'Username has been registered',

		/*首页
		3_1_1_首页
		3_1_2_首页_暂无消息通知
		*/

		/*92*/   'Home Page',
		/*93*/   'Home Page',
		/*94*/   'Add Store',
		/*95*/   'Add Store Staff',
		/*96*/   'Notification',
		/*101*/   'No Notification',
		/*97*/   'Home Page',
		/*98*/   'Commission',
		/*99*/   'Store Staff',
		/*100*/   'more',

		/*登陆
		1_1_1_登录_初始状态
		1_1_2_登录_按钮可用
		1_1_3_登录_正在登录

	
		*/
		/*102*/   'Login',
		/*103*/   'Chinese',
		/*104*/   'Enter Username',
		/*105*/   'Enter Password',
		/*106*/   'Please Enter Username',
		/*107*/   'Login',
		/*108*/   'Chinese',
		/*109*/   'English',
		/*110*/   'Thai',

		/*所在地区
			9_1_1_地图
			9_1_2_地图_标记商户
		*/

		/*111*/   'Location',
		/*112*/   'Location',
		/*113*/   'Confirm',
		/*114*/   'Please enter store name',

		/*消息通知
		6_1_1_通知_提现申请
		*/

		/*115*/   'Notification',
		/*116*/   'Notification',
		/*117*/   'History',
		/*117*/   'Request Withdrawal',
		/*118*/   'Request Material',

		/*物料申请
			8_1_6_更多_全部二维码_二维码已发送
		*/

		/*119*/   'Request Material',
		/*120*/   'Request Material',
		/*121*/   'Have been sent to your email address！',
		/*122*/   'Material file have been sent to your email！',
		/*123*/   'Back',

		/*地推员详情
			5_3_1_地推员_地推员详情(已上线)
			5_3_2_地推员_地推员详情(已上线)_右上角按钮
			5_3_3_地推员_地推员详情(已下线)
			5_3_4_地推员_地推员详情(已下线)_右上角按钮
		*/

		/*124*/   'Store Staff Details',
		/*125*/   'Store Staff Details',
		/*126*/   'Online Time',
		/*127*/   'Total Commsion',
		/*128*/   'Total Sales',
		/*129*/   '共',
		/*130*/   '条',
		/*131*/   'Contact Number',
		/*132*/   'Store',
		/*133*/   'MaxCard',
		/*134*/   'Edit Store Staff Information',
		/*135*/   'Offline this staff',

		/*地推
			5_1_1_地推员
		*/

		/*136*/   'Store Staff',
		/*137*/   'Store Staff',
		/*138*/   'Store',
		/*139*/   'Store Staff',
		/*140*/   'All',
		/*141*/   'Online',
		/*142*/   'Offline',
		/*143*/   'Please enter store staff name',
		/*144*/   'Cancel',
		/*145*/   'Add Store',
		/*146*/   'Add Store Staff',

		/*选择二维码编号
			
		*/

		/*147*/   'Choose QR Code Number',
		/*148*/   'Choose QR Code Number',
		/*149*/   'Input QR Code Number',
		/*150*/   'Cancel',

		/*二维码信息
			8_1_8_更多_扫描二维码_已占用

		*/

		/*151*/   'QR Code Info',
		/*152*/   'QR Code Info',
		/*153*/   'Number',
		/*154*/   'Already Occupied',
		/*155*/   'Store Staff',

		/*二维码信息
			8_1_7_更多_扫描二维码_未占用

		*/

		/*156*/   'QR Code Info',
		/*157*/   'QR Code Info',
		/*158*/   'Number',
		/*159*/   'Not Occupied',
		/*160*/   'Add Store Staff',

		/*全部二维码
			8_1_4_更多_全部二维码

			8_1_5_更多_全部二维码_申请二维码
		*/

		/*161*/   'All QR Code',
		/*162*/   'All QR Code',
		/*163*/   'Input QR Code Number',
		/*164*/   'Cancel',
		/*165*/   'Requesting Material File',
		/*166*/   'Choose Quantity',
		/*167*/   'Confirm',

		/*选择关联商户
			
		 5_1_3_地推员_编辑地推员信息_选择关联商户
		*/

		/*168*/   'Choose Store',
		/*169*/   'Choose Store',
		/*171*/   'Please enter store name',
		/*170*/   'Cancel',
		/*172*/   'Add Store',

		/*物料申请
			8_1_6_更多_全部二维码_二维码已发送

		*/

		/*173*/   'Request Material',
		/*174*/   'Request Material',
		/*175*/   'Have been sent to your email address！',
		/*176*/   'Material file have been sent to your email！',
		/*177*/   'Back',

		/*更多
			8_1_1_更多
		*/

		/*178*/   'more',
		/*179*/   'more',
		/*180*/   'Profile',
		/*181*/   'View all materials',
		/*182*/   'Switch City',
		/*183*/   'Language',
		/*184*/   'Logout',

		/*个人信息
			8_1_2_更多_个人信息
		*/

		/*185*/   'Profile',
		/*186*/   'Profile',
		/*187*/   'Name',
		/*188*/   'Contact Number',
		/*189*/   'Email',
		/*190*/   'Job',
		/*191*/   'Panda Trip Regional Manager',
		/*192*/   'Responsible Area',

		/*语言选择
			8_1_9_更多_语言选择
		*/

		/*193*/   'Choose Language',
		/*194*/   'Choose Language',

		/*地推
			4_1_1_商户
			4_1_3_商户_暂无商户
			4_2_1_商户_点击搜索框
			4_2_2_商户_搜索框输入

		*/

		/*195*/   'Store Staff',
		/*196*/   'Store Staff',
		/*197*/   'Store',
		/*198*/   'Store Staff',
		/*199*/   'All',
		/*200*/   'Completing....',
		/*201*/   'Online',
		/*202*/   'Offline',
		/*203*/   'Please enter store name',
		/*204*/   'Cancel',
		/*205*/   'No Store',
		/*206*/   'Add Store',
		/*207*/   'Add Store',
		/*208*/   'Add Store Staff',

		/*商户详情
		4_4_1_商户_商户详情
		4_6_1_商户_商户详情_已上线
		4_6_2_商户_商户详情_待完善
		4_6_3_商户_商户详情_已下线
		4_6_4_商户_商户详情_已下线_右上角菜单
		4_6_5_商户_商户详情_已下线_选择地推员

		*/
		/*209*/   'Store Details',
		/*210*/   'Store Details',
		/*211*/   'Offline Time',
		/*212*/   'Contact Person',
		/*213*/   'Contact Number',
		/*214*/   'Email',
		/*215*/   'Area',
		/*216*/   'Address',
		/*217*/   'Store Staff',
		/*218*/   'View All',
		/*219*/   'Store Photo',
		/*220*/   'No Photo',
		/*221*/   'Add Store Staff',
		/*222*/   'Edit Store Information',
		/*223*/   'Launch this store',
		/*224*/   'Please choose the store staff you want to search(at least 1)',
		/*225*/   'Confirm',
		/*226*/   'Panda Staff has received the request',
		/*227*/   'Store information is not complete，please complete it first',
		/*228*/   'Complete Information',
		/*229*/   'Not Online',
		/*230*/   'Panda Staff has received the request',
		/*231*/   'Store information is not complete，please complete it first',
		/*232*/   'Complete Information',
		/*233*/   'Not Online',

		/*提现申请
			6_1_2_通知_提现申请详情(未提现)
		*/

		/*234*/   'Request Withdrwal',
		/*235*/   'Request Withdrwal',
		/*236*/   'Withdrawal Amount',
		/*237*/   'Applicant',
		/*238*/   'Contact Number',
		/*239*/   'Email',
		/*240*/   'Store',
		/*241*/   'Address',
		/*242*/   'Change Photo',
		/*243*/   'Upload Receipt',

		/*提现申请记录
			7_1_2_记录_提现记录详情(已提现)
			7_1_3_记录_提现记录详情(已取消)
		*/

		/*244*/   'Withdrawal',
		/*245*/   'Request Withdrawal History',
		/*246*/   'Withdrawal Amount',
		/*247*/   'Applicant',
		/*248*/   'Contact Number',
		/*249*/   'Email',
		/*250*/   'Store',
		/*251*/   'Address',
		/*252*/   'Requesting Time',
		/*253*/   'Withdrawal Number',
		/*254*/   '折合人民币',
		/*255*/   'Complete Time',

		/*消息处理记录
			7_2_1_记录_物料发放记录

		*/

		/*256*/   'Message Record',
		/*257*/   'Message Record',
		/*258*/   'Withdraw Record',
		/*259*/   '物料发放记录',
		/*260*/   'Total',
		/*261*/   'Withdraw Record',
		/*262*/   'Total Withdrawal',
		/*263*/   '折合',

		/*物料申请
			6_2_2_通知_物料申请详情(备料中)
			6_2_2_通知_物料申请详情(未发放)

		*/

		/*264*/   'Request Material',
		/*265*/   'Request Material',
		/*266*/   'Material Number',
		/*267*/   'Applicant',
		/*268*/   'Contact Number',
		/*269*/   'Email',
		/*270*/   'Store',
		/*271*/   'Address',
		/*272*/   'Requesting Time:',
		/*273*/   'Application No:',
		/*274*/   'Note',
		/*275*/   'Material has been issued',
		/*276*/   'Request Material File',

		/*物料申请
			6_2_3_通知_物料申请详情(未发放)_物料文件已发送至邮箱
		*/

		/*277*/   'Request Material',
		/*278*/   'Request Material',
		/*279*/   'Have been sent to your email address！',
		/*280*/   'Material file have been sent to your email！',
		/*281*/   'Back'

	];

	 localStorage.setItem("lang",languageEnArray)
	//console.log(localStorage.getItem("lang"))
