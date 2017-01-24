var requestParams = getRequest();
var expertUserId = requestParams['expertUserId'];//获取专家id

//测试固定id
//expertUserId = "75d2f2c8668847919be3eeac6d9e23bc";

var loginUserId = getLoginUserId();//登陆用户id
$('.ball-obj>li').click(function () {
    var num = $(this).index();
    //获取方案类型
    var plantp = $(this).index() + 1;
    $(this).addClass('current_tab').siblings().removeClass();
    $('.score_tab>li').eq(num).show().siblings().hide();//比赛内容切换
    $('.score-box>li').eq(num).show().siblings('li').hide();//比赛数据统计切换
});

//关注/取消关注
$('.expert_gz').click(
    function () {
        if (loginUserId == "" || loginUserId == null) {
            alert("请先登陆");
            var jumpUrl = "expert-intr.html?expertUserId="
                + requestParams['expertUserId'];
            goLoginPage(jumpUrl);
        } else {
            $(this).toggleClass('expert_gz2');
            //专家id;
            var expertUserId = $("#expertUserId").val();
            var body = new Object;
            body.loginUserId = loginUserId;
            body.userId = expertUserId;
            var txt = $('#isFocusedStatusName').text();
            var isFocusedStatusName = document
                .getElementById("isFocusedStatusName");
            var focus_status = document.getElementById("focus_status");
            //取消关注
            if (txt.indexOf("+") < 0) {
                portalAjaxRequest('cancelFocus', body, 'focus/cancelFocus',
                    '');
                focus_status.setAttribute("class", "expert_gz");
                isFocusedStatusName.innerHTML = "+关注";
                //添加关注
            } else {
                portalAjaxRequest('addFocus', body, 'focus/addFocus', '');
                focus_status.setAttribute("class", "expert_gz2");
                isFocusedStatusName.innerHTML = "已关注";
            }
        }
    });

//获取数据---专家介绍
var expertApp = angular.module("expertApp", []);

expertApp.controller("expertInfoContr", function ($scope, $http) {
    //接口加工
    var object = new Object;
    var header = createHeader(loginUserId, 'getExpertInfoForExpertDetail');
    var body = new Object;
    body.loginUserId = loginUserId;
    body.userId = expertUserId;
    //字符串加密处理：
    object.header = header;//此方法衔接部分见jiami.js
    object.body = body;
    var encoded = JSON.stringify(object);
    //加密字符串
    var str = encryptByDES(encoded, encryptKey);
    var sign = hashCode(str);

    $http({
        method: 'POST',
        url: portalUrl + 'expert/getExpertInfoForExpertDetail',
        params: {
            token: "",
            jsonParams: str,
            sign: sign,
            requestSource: 4
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(
        function (data) {

            //回调函数
            var ret = trim(data.retValue, 'g');
            var val = decryptByDES(ret, encryptKey);
            var obj = jQuery.parseJSON(val);
            $scope.expertInfo = obj.body.data;
            //专家基础信息
            var info = JSON.stringify(obj.body.data);
            sessionStorage.setItem('expertInfo', info);
            //设置关注的状态
            var isFocused = obj.body.data.isFocused;
            var className = "";
            var focusedName = "";
            //设置关注的样式:0已关注 1未关注 2自己
            if (isFocused == 0) {
                className = "expert_gz2";
                focusedName = "已关注";
            } else if (isFocused == 1) {
                className = "expert_gz";
                focusedName = "+关注";
            }
            var focus_status = document.getElementById("focus_status");
            focus_status.setAttribute("class", className);
            var isFocusedStatusName = document
                .getElementById("isFocusedStatusName");
            isFocusedStatusName.innerHTML = focusedName;
            //专家预测成绩状态走势
            //单关
            $scope.singleHitMap = obj.body.data.singleHitInfo;
            //串关
            $scope.punHitMap = obj.body.data.punHitInfo;
            //亚盘
            $scope.asianHitMap = obj.body.data.asianHitInfo;
            //大小球
            $scope.dxqHitMap = obj.body.data.dxqHitInfo;
        });
});

//单关
var app1 = angular.module('myApp1', ['infinite-scroll']);
app1.controller('app1Ctrl', function ($scope, Demo) {
    $scope.demo = new Demo();
    goPlanDetailPage($scope);
});
app1.factory('Demo', function ($http) {
    var Demo = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
    };

    Demo.prototype.nextPage = function ($scope) {

        if (this.busy)
            return;
        this.busy = true;
        //接口加工
        var object = new Object;
        var header = createHeader(loginUserId, 'getPlanForExpertDetail');
        var body = new Object;
        body.loginUserId = loginUserId;
        body.userId = expertUserId;
        body.planType = '1';
        body.currPage = this.page.toString();
        body.pageSize = pageSize;
        //字符串加密处理：
        object.header = header;//此方法衔接部分见jiami.js
        object.body = body;
        var encoded = JSON.stringify(object);
        //加密字符串
        var str = encryptByDES(encoded, encryptKey);
        var sign = hashCode(str);
        $http({
            method: 'POST',
            url: portalUrl + 'expert/getPlanForExpertDetail',
            params: {
                token: "",
                jsonParams: str,
                sign: sign,
                requestSource: 4
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            var ret = trim(data.retValue, 'g');
            var val = decryptByDES(ret, encryptKey);
            var obj = jQuery.parseJSON(val);
            var items = obj.body.data;
            //console.log(obj.body.data);

            //if (items == "" || items == null) {
            //    //alert(1)
            //    $scope.isShow = true;
            //}
            //if(items.length==0){
            //    $(".data_no").css("display","block");
            //    $(".loading_no").css("display","none");
            //}

            for (var i = 0; i < items.length; i++) {
                //if(items[0].length==0){
                //    $(".data_no").css("display","block");
                //    $(".loading_no").css("display","none");
                //}
                var item = setItemVal(items[i], 0);
                this.items.push(item);
            }

            this.after = "t3_" + this.items[this.items.length - 1].planId;
            this.busy = false;
            this.page += 1;



            /********页面无数据时的友好提醒样式********/
            //if (items == "" || items == null) {
            //    $('#catch_data>li:eq(0)').addClass('intr_tj');
            //}
            ////无活动列表时友好提示
            //if(items.length==0){
            //    $(".data_no").css("display","block");
            //    $(".loading_no").css("display","none");
            //
            //}
        }.bind(this));
    };
    return Demo;
});
angular.bootstrap(document.getElementById("app1div"), ['myApp1']);

//串关
var app2 = angular.module('myApp2', ['infinite-scroll']);
app2.controller('app2Ctrl', function ($scope, Demo) {
    $scope.demo = new Demo();
    goPlanDetailPage($scope);
});
app2.factory('Demo', function ($http) {
    var Demo = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
    };

    Demo.prototype.nextPage = function ($scope) {

        if (this.busy)
            return;
        this.busy = true;
        //接口加工
        var object = new Object;
        var header = createHeader(loginUserId, 'getPlanForExpertDetail');
        var body = new Object;
        body.loginUserId = loginUserId;
        body.userId = expertUserId;
        body.planType = '2';
        body.currPage = this.page.toString();
        body.pageSize = pageSize;
        //字符串加密处理：
        object.header = header;//此方法衔接部分见jiami.js
        object.body = body;
        var encoded = JSON.stringify(object);
        //加密字符串
        var str = encryptByDES(encoded, encryptKey);
        var sign = hashCode(str);
        $http({
            method: 'POST',
            url: portalUrl + 'expert/getPlanForExpertDetail',
            params: {
                token: "",
                jsonParams: str,
                sign: sign,
                requestSource: 4
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            var ret = trim(data.retValue, 'g');
            var val = decryptByDES(ret, encryptKey);
            var obj = jQuery.parseJSON(val);
            var items = obj.body.data;
            //if(items.length==0){
            //    $(".data_no").css("display","block");
            //    $(".loading_no").css("display","none");
            //}

            for (var i = 0; i < items.length; i++) {
                //if(items[0].length==0){
                //    $(".data_no").css("display","block");
                //    $(".loading_no").css("display","none");
                //}
                var item = setItemVal(items[i], 1);
                this.items.push(item);
            }

            this.after = "t3_" + this.items[this.items.length - 1].planId;
            this.busy = false;
            this.page += 1;

            /********页面无数据时的友好提醒样式********/
            //if (items == "" || items == null) {
            //	$('#catch_data>li:eq(0)').addClass('intr_tj');
            ////}
            //if(items.length==0){
            //    $(".data_no").css("display","block");
            //    $(".loading_no").css("display","none");
            //
            //}
        }.bind(this));
    };
    return Demo;
});
angular.bootstrap(document.getElementById("app2div"), ['myApp2']);

//亚盘
var app3 = angular.module('myApp3', ['infinite-scroll']);
app3.controller('app3Ctrl', function ($scope, Demo) {
    $scope.demo = new Demo();
    goPlanDetailPage($scope);
});
app3.factory('Demo', function ($http) {
    var Demo = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
    };

    Demo.prototype.nextPage = function ($scope) {

        if (this.busy)
            return;
        this.busy = true;
        //接口加工
        var object = new Object;
        var header = createHeader(loginUserId, 'getPlanForExpertDetail');
        var body = new Object;
        body.loginUserId = loginUserId;
        body.userId = expertUserId;
        body.planType = '3';
        body.currPage = this.page.toString();
        body.pageSize = pageSize;
        //字符串加密处理：
        object.header = header;//此方法衔接部分见jiami.js
        object.body = body;
        var encoded = JSON.stringify(object);
        //加密字符串
        var str = encryptByDES(encoded, encryptKey);
        var sign = hashCode(str);
        $http({
            method: 'POST',
            url: portalUrl + 'expert/getPlanForExpertDetail',
            params: {
                token: "",
                jsonParams: str,
                sign: sign,
                requestSource: 4
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            var ret = trim(data.retValue, 'g');
            var val = decryptByDES(ret, encryptKey);
            var obj = jQuery.parseJSON(val);
            var items = obj.body.data;
            //if(items.length==0){
            //    $(".data_no").css("display","block");
            //    $(".loading_no").css("display","none");
            //}

            for (var i = 0; i < items.length; i++) {
                //if(items[0].length==0){
                //    $(".data_no").css("display","block");
                //    $(".loading_no").css("display","none");
                //}
                var item = setItemVal(items[i], 2);
                this.items.push(item);
            }

            this.after = "t3_" + this.items[this.items.length - 1].planId;
            this.busy = false;
            this.page += 1;

            /********页面无数据时的友好提醒样式********/
            //if (items == "" || items == null) {
            //	$('#catch_data>li:eq(0)').addClass('intr_tj');
            ////}
            //if(items.length==0){
            //    $(".data_no").css("display","block");
            //    $(".loading_no").css("display","none");
            //
            //}
        }.bind(this));
    };
    return Demo;
});
angular.bootstrap(document.getElementById("app3div"), ['myApp3']);

//大小球
var app4 = angular.module('myApp4', ['infinite-scroll']);
app4.controller('app4Ctrl', function ($scope, Demo) {

    $scope.demo = new Demo();
    goPlanDetailPage($scope);
});
app4.factory('Demo', function ($http) {
    var Demo = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
        this.page = 1;
    };

    Demo.prototype.nextPage = function ($scope) {

        if (this.busy)
            return;
        this.busy = true;
        //接口加工
        var object = new Object;
        var header = createHeader(loginUserId, 'getPlanForExpertDetail');
        var body = new Object;
        body.loginUserId = loginUserId;
        body.userId = expertUserId;
        body.planType = '4';
        body.currPage = this.page.toString();
        body.pageSize = pageSize;
        //字符串加密处理：
        object.header = header;//此方法衔接部分见jiami.js
        object.body = body;
        var encoded = JSON.stringify(object);
        //加密字符串
        var str = encryptByDES(encoded, encryptKey);
        var sign = hashCode(str);
        $http({
            method: 'POST',
            url: portalUrl + 'expert/getPlanForExpertDetail',
            params: {
                token: "",
                jsonParams: str,
                sign: sign,
                requestSource: 4
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data) {
            var ret = trim(data.retValue, 'g');
            var val = decryptByDES(ret, encryptKey);
            var obj = jQuery.parseJSON(val);
            var items = obj.body.data;

            //if(items.length==0){
            //    $(".data_no").css("display","block");
            //    $(".loading_no").css("display","none");
            //}

            for (var i = 0; i < items.length; i++) {
                //if(items[0]==""){
                //    $(".data_no").css("display","block");
                //    $(".loading_no").css("display","none");
                //}
                var item = setItemVal(items[i], 3);
                this.items.push(item);
                //console.log(item);
            }

            this.after = "t3_" + this.items[this.items.length - 1].planId;
            this.busy = false;
            this.page += 1;

            //if(items.length==0){
            //    $(".data_no").css("display","block");
            //    $(".loading_no").css("display","none");
            //
            //}

        }.bind(this));
    };
    return Demo;
});
angular.bootstrap(document.getElementById("app4div"), ['myApp4']);

//微信公众号支付
$(document).ready(
    function () {
        //设置微信支付请求参数
        var requestType = 'weixinPayOauth2';
        var body = new Object;
        body.orderType = '2'; //订单类型 1-充值 2-购买
        var obj = initRequestParam(requestType, body);
        var url = weixinUrl + 'pay/weixinPayOauth2';
        //获取微信oauth2认证URI
        crossDomainAjaxRequest(url, obj.token, obj.encParam, obj.signParam,
            successFunction);
    });

//设置支付按钮认证URI
function successFunction(authUrl) {
    $("#payUrl").val(authUrl);
}

window.onload = function () {
    setTimeout("$('.creat_sheet').css('display','none')", 500);
}

function setItemVal(obj, index) {

    //是否已停售 0是1否
    var isStopSale = obj.isStopSale;
    //未开奖
    if (obj.isHit == "0") {
        //已购买
        if (obj.isBuyPlan == 0) {
            obj.planStatusClass = 1;
            obj.planStatusName = "已购买";
            obj.planStatusCss = 'proj_2';

            //未购买
        } else if (obj.isBuyPlan == 1) {
            //已停售
            if (isStopSale == 0) {
                obj.planStatusClass = 1;
                obj.planStatusName = "已停售";
                obj.planStatusCss = 'proj_2';
                obj.planPriceCss = 'hide_a';
            } else {
                obj.planStatusClass = 2;
                obj.planStatusName = "购买";
                //$('.goods_txt:eq(3)').show();
                $(".goods_txt:eq(" + index + ")").show();
                obj.planStatusCss = 'proj_1';
            }
            //自己查看
        } else if (obj.isBuyPlan == 2) {
            obj.planStatusClass = 3;
            obj.planStatusName = "查看";
            obj.planStatusCss = 'proj_6';
        }
        //已有结果
    } else {
        //赢
        if (obj.isHit == "1") {
            obj.planStatusClass = 5;
            obj.planStatusName = "赢";
            obj.planStatusCss = 'proj_3';
            obj.planPriceCss = 'hide_a';
            //输
        } else if (obj.isHit == "2") {
            obj.planStatusClass = 4;
            obj.planStatusName = "输";
            obj.planStatusCss = 'proj_4';
            obj.planPriceCss = 'hide_a';
            //走
        } else {
            obj.planStatusClass = 6;
            obj.planStatusName = "走";
            obj.planStatusCss = 'proj_5';
            obj.planPriceCss = 'hide_a';
        }
    }

    return obj;
}

function goPlanDetailPage(obj) {

    obj.goPlanDetailPage = function (productId, planType, isHit, isBuyPlan,
                                     orderAmount, isStopSale) {
        //未开奖
        if (isHit == 0) {
            //是否未购买-去购买
            if (isBuyPlan == 1) {
                //已停售
                if (isStopSale == 0) {
                    alert("已停售状态无法查看");
                    return;
                    //未停售
                } else {

                    if (loginUserId == "" || loginUserId == null) {
                        alert("请先登陆");
                        var jumpUrl = "expert-intr.html?expertUserId="
                            + requestParams['expertUserId'];
                        //var jumpUrl = "expert-int-page.html";
                        goLoginPage(jumpUrl);
                    }
                    var userNickName = $("#expertNickName").val();
                    var expertUserId = $("#expertUserId").val();
                    //单关包次校验
                    var requestType = 'getSurplusNum';
                    var body = new Object;
                    body.loginUserId = loginUserId;
                    body.planId = productId;
                    var obj = initRequestParam(requestType, body);
                    var url = portalUrl + "/plan/getSurplusNum";
                    var requestSource = '3';
                    crossDomainPortalRequestParams(url, obj.encParam,
                        obj.signParam, expertUserId, userNickName,
                        productId, planType, orderAmount, checkPackNum);

                }
            } else {
                window.location.href = 'bgfan.html?planId=' + productId;
            }
        } else {
            window.location.href = 'bgfan.html?planId=' + productId;
        }
    }
}