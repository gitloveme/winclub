//登陆用户id
var loginUserId = getLoginUserId();

//登陆用户类型
var expertLevel = getExpertLevel();

//非专家隐藏发布按钮
window.onload = function () {
    if (expertLevel == 0) {
        $('.pop_win').hide();
    } else {
        setTimeout("$('.pop_win').css('right','-70px')", 2000);
    }
}

//-----专家列表模块-----
var leadApp = angular.module("leadApp", []);

leadApp.controller("expertListController", function ($scope, $http) {
    //接口加工
    var object = new Object;
    var header = createHeader(loginUserId, 'getHomeExpertList');
    var body = new Object;
    body.loginUserId = loginUserId;
    //字符串加密处理：
    object.header = header;//此方法衔接部分见jiami.js
    object.body = body;
    var encoded = JSON.stringify(object);
    //加密字符串
    var str = encryptByDES(encoded, encryptKey);
    var sign = hashCode(str);
    $http({
        method: 'POST',
        url: portalUrl + '/home/getHomeExpertList',
        params: {
            token: "",
            jsonParams: str,
            sign: sign,
            requestSource: 4
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function (response) {
        //回调函数
        var res0 = trim(response.retValue, 'g');
        var ret = decryptByDES(res0, encryptKey);

        var ret = jQuery.parseJSON(ret);
        //console.log(ret);
        $scope.expertList = ret.body.data;
        //console.log(ret.body.data);
    });
});

//点击头像查看专家详情方法：
$('.expert_cell2').on('click', '.commen_per', function () {
    var expertUserId = $(this).find('.plan_id ').text();
    window.location.href = "expert-intr.html?expertUserId=" + expertUserId;
});

//-----banner模块 ----- 		  		  
leadApp.controller("banner-controller", function ($scope, $http) {
    //接口加工
    var object = new Object;
    var header = createHeader(loginUserId, 'getBannerList');
    var body = new Object;
    body.deviceType = '0';
    body.size = '0';
    //字符串加密处理：
    object.header = header;//此方法衔接部分见jiami.js
    object.body = body;
    var encoded = JSON.stringify(object);
    //加密字符串
    var str = encryptByDES(encoded, encryptKey);
    var sign = hashCode(str);
    $http({
        method: 'POST',
        url: portalUrl + 'basic/getBannerList',
        params: {
            token: "",
            jsonParams: str,
            sign: sign,
            requestSource: 4
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function (response) {
        //回调函数
        var res0 = trim(response.retValue, 'g');
        var ret = decryptByDES(res0, encryptKey);
        var ret = jQuery.parseJSON(ret);
        var ret = ret.body.data;
        var str = "";
        //console.log(ret);
        $.each(ret, function (i, item) {

            $("#banner_").append("<div class='swiper-slide swiper-slide-prev' data-swiper-slide-index=" + i + "> <a href=" + item.htmlUrlPath + "> 	<img src=" + item.imgUrl + "> </a> </div>").trigger("create");
            //$("#banner_").append("<div class='swiper-slide swiper-slide-prev' data-swiper-slide-index=" + i + "> <a href=" + item.htmlUrlPath + '|' + item.shareTitle + '|' + item.shareContent + '|' + item.shareImg + '|' + item.shareUrl + "> <img src=" + item.imgUrl + "> </a> </div>").trigger("create");
        });
        var mySwiper = new Swiper(".swiper-container", {
            direction: "horizontal", /*横向滑动*/
            loop: true, /*形成环路（即：可以从最后一张图跳转到第一张图*/
            pagination: ".swiper-pagination", /*分页器*/
            prevButton: ".swiper-button-prev", /*前进按钮*/
            nextButton: ".swiper-button-next", /*后退按钮*/
            autoplay: 2000
            /*每隔3秒自动播放*/
        });
    });
});
/*//以下是轮播图方法：
 var swiper = new Swiper('#module_1.swiper-container', {
 pagination: '.swiper-pagination',
 paginationClickable: true,
 loop: true,
 loopAdditionalSlides: 0,
 autoplay: 2000, //可选选项，自动滑动
 autoplayDisableOnInteraction: false
 });*/

//-----方案推荐列表------
leadApp.controller("hotPlancontr", function ($scope, $http) {
    var object = new Object;
    var header = createHeader(loginUserId, 'getHomePlan');
    var body = new Object;
    body.loginUserId = loginUserId;
    //字符串加密处理：
    object.header = header;//此方法衔接部分见jiami.js
    object.body = body;
    var encoded = JSON.stringify(object);
    //加密字符串
    var str = encryptByDES(encoded, encryptKey);
    var sign = hashCode(str);

    $http({
        method: 'POST',
        url: portalUrl + 'home/getHomePlan',
        params: {
            token: "",
            jsonParams: str,
            sign: sign,
            requestSource: 4
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function (response) {
        //回调函数
        var res0 = trim(response.retValue, 'g');
        var ret = decryptByDES(res0, encryptKey);
        var ret = jQuery.parseJSON(ret);
        $scope.planCommonList = ret.body.data.planCommonList;
        $scope.newsHomeList = ret.body.data.newsHomeList;//最in资讯
        //console.log(ret.body.data.planCommonList);
        //console.log(ret.body.data.newsHomeList);
        newsHomeList = ret.body.data.newsHomeList;
        //console.log(ret);


        //普通方案数据处理
        rem = ret.body.data.planCommonList;

        $.each(rem, function (i, item) {
            if (item.isBuyPlan == "0") {
                item.isBuyPlanName = "已购买"
            } else if (item.isBuyPlan == "1") {
                item.isBuyPlanName = "购买"
            } else if (item.isBuyPlan == "2") {
                item.isBuyPlanName = "查看"
            }
        });


        $scope.planDiyList = ret.body.data.planDiyList;
        //diy方案数据处理
        san = ret.body.data.planDiyList;
        //console.log(ret.body.data.planDiyList);
        //"planStatus": "1", --方案状态  1预售 2在售
        //"isBuyPlan": "2", --是否已购买 0已购买 1未购买 2自己
        $.each(san, function (i, item) {
            // --方案状态  1预售 2在售
            var planStatus = item.planStatus;
            // --是否已购买 0已购买 1未购买 2自己
            var isBuyPlan = item.isBuyPlan;
            //已购买
            if (isBuyPlan == 0) {
                //预售
                if (planStatus == 1) {
                    item.planStatusName = "已预定";
                    //销售
                } else {
                    item.planStatusName = "查看";
                }
                //未购买
            } else if (isBuyPlan == 1) {
                //预售
                if (planStatus == 1) {
                    item.planStatusName = "预约";
                    //销售
                } else {
                    item.planStatusName = "购买";
                }
                //自己
            } else if (isBuyPlan == 2) {
                item.planStatusName = "查看";
            }
        });

        //如果资讯列表为空，则不显示最新资讯标题
        if (newsHomeList.length == "") {
            $(".innews").hide();
        }

    });

//如果是非竞彩数据，就隐藏列表左边周几的盒子，3亚盘，4，大小球
    $scope.sethosStyle = function (args) {
        //已关注
        if (args == 3)
            return 'hide_a';
        //未关注
        else if (args == 4)
            return 'hide_a';
    };
})
;

//普通方案列表模块点击事件
$('.hot_obj').on('click', '.hot_obj>dd', function () {
//$('.hot_obj').on('click', '.hot_obj>dd>.ball_detail', function () {
    if (loginUserId == "") {
        alert('请先登录');
        var jumpURL = "index.html";
        goLoginPage(jumpURL);
        //去购买
    } else {
        //isBuyPlan"--是否已购买 0已购买 1未购买 2自己
        var isBuyPlan = $(this).find('.isBuyPlan').text();
        if (isBuyPlan == 1) {

            var expertName = $(this).find('.expertNickName').text();
            var expertId = $(this).find('.expertId').text();
            var planType = $(this).find('.plan_id3').text();
            //设置微信支付信息
            var prodId = $(this).find('.plan_id').text();
            var amount = $(this).find('.star_box em').text();
            // var title="购买【"+expertName+"】专家的方案，价格:"+amount+" 元";

            var requestType = 'getSurplusNum';
            var body = new Object;
            body.loginUserId = loginUserId;
            body.planId = prodId;
            var obj = initRequestParam(requestType, body);
            var url = portalUrl + "/plan/getSurplusNum";
            var requestSource = '3';
            crossDomainPortalRequestParams(url, obj.encParam, obj.signParam, expertId, expertName, prodId, planType, amount, checkPackNum);

            //查看
        } else if (isBuyPlan == 0 || isBuyPlan == 2) {
            var productId = $(this).find('.plan_id').text();

            window.location.href = "bgfan.html?planId=" + productId;
        }
    }
});


//三串一方案列表模块点击事件	
$('.add_bd').on('click', '.add_bd>dd', function () {
    if (loginUserId == "") {
        alert('请先登录')
        var jumpURL = "index.html";
        goLoginPage(jumpURL);
    } else {
        //--是否已购买 0已购买 1未购买 2自己
        var isBuyPlan = $(this).find('.isBuyPlan').text();
        var planStatus = $(this).find('.planStatus').text();
        //设置微信支付信息
        var productId = $(this).find('.plan_id').text();
        var expertId = $(this).find('.expertId').text();
        var planType = $(this).find('.plan_id3').text();
        var orderAmount = $(this).find('.star_box em').text();
        var userNickName = $(this).find('.cap_cont em').text();
        if (isBuyPlan == 1) {

            var planTypeName = "竞彩";
            if (planType == 6) {
                planTypeName = "亚盘";
            }
            var orderAmount = $(this).find('.star_box em').text();
            var title = "购买【" + userNickName + "】的" + planTypeName + "三场精选方案，价格:" + orderAmount + " 元";
            //1CZ-充值 2GM-购买普通方案 3购买DIY方案 4BC-包次 5BY-包月
            var orderType = '3';
            var jumpUrl = html5Url + "/index.html";
            setPayObject(title, productId, loginUserId, expertId, orderAmount, orderType, jumpUrl);
            //微信回调支付界面
            var url = $("#payUrl").val();
            window.location.href = url;
        } else if (isBuyPlan == 0) {

            //1预售 2在售
            if (planStatus == 1) {
                alert("专家尚未发布方案详情,请耐心等待");
            } else if (planStatus == 2) {
                window.location.href = "fan_detail.html?planId=" + productId + "&expertUserId=" + expertId;
            }

        } else if (isBuyPlan == 2) {
            //自己
            window.location.href = "fan_detail.html?planId=" + productId + "&expertUserId=" + expertId;

        } else {
            //
        }
    }
});

//-----其他-----
//纯属测试包月用户：		
$('.baoy').click(function () {
    if (loginUserId == "") {
        alert("请先登录");
        var jumpURL = "index.html";
        goLoginPage(jumpURL);
    } else {
        $('.pop_sheet').fadeIn(200);
        $('.alert_win').fadeIn(200);
    }
});

//点击蒙版关闭弹窗：
function shutWin() {
    $('.pop_sheet').fadeOut(200);
    $('.alert_win').fadeOut(200);
};


//以下是点击悬窗发布方案的方法
$('.foot_nav').click(function () {
    $(this).css('color', 'red');
});

var num = 1;
$('.pop_win').click(function () {
    if (expertLevel == 0) {
        alert("非专家不能发布方案");
        return false;
    }
    if (num == 1) {
        $('.pop_win').animate({'right': '0px'}, 500);
        num = 2
    }
    else {
        $('.pop_win').animate({'right': '-70px'}, 500);
        num = 1
    }
});

//需要用户登录时出现的登录窗体效果
function to_log() {
    $('.log_wrap').fadeIn(500);
}

leadApp.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});