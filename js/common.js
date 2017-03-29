function getQueryString(name,str) {
    str=str|| decodeURIComponent(window.location.search);
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = str.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/*微信支付*/
function weChatPay(backTitle,recommendid,price){
    if(localStorage.getItem("userLogin") != "login"){
            location.href="/login.html";
            return false;
        }
        var backUrl=encodeURIComponent('http://h5.wingoalclub.com/pay/pay.html');
        //var backUrl=encodeURIComponent('http://h5.wingoalclub.com/pay/pay.html');
        var backcontent=backTitle+"string"+recommendid+"string"+price;
        location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa223d1531ef58b9e&redirect_uri="+backUrl+"&response_type=code&scope=snsapi_base&state="+backcontent+"#wechat_redirect";
}
function jumpExpert(that){
    if(!that) return false;
    localStorage.removeItem("expertId");
    localStorage.removeItem("expertImg");
    localStorage.removeItem("expertName");
    localStorage.removeItem("expertIntro");
    localStorage.setItem("expertId",that.attr("expertid"));
    localStorage.setItem("expertImg",that.attr("expertimg"));
    localStorage.setItem("expertName",that.attr("expertname"));
    localStorage.setItem("expertIntro",that.attr("expertintro"));
    location.href="expert.html?expertid="+that.attr("expertid");
}
/*用户是否登录*/
$.ajax({
    type:"get",
    url:"http://h5.wingoalclub.com/zucai/inf/isUserLogin",
    data:{timer:new Date().getTime()},
    dataType:"json",
    error:function (){
        getCodeForWechat();
    },
    success:function (data){
        if(data && data.status ==200 && data.error == null){
            localStorage.setItem("userLogin","login");
            if(localStorage.getItem("weChatLoginInfo")==null){
                getCodeForWechat();
            }else{
                localStorage.setItem("userID",JSON.parse(localStorage.getItem("weChatLoginInfo")).userId);
            }
        }else{
            localStorage.removeItem("userLogin");
            localStorage.removeItem("weChatLoginInfo");
            getCodeForWechat()
        }
    }
});
function getCodeForWechat(){
    var weChatCode=getQueryString("code");
    var channelId=getQueryString("channelId") || "none";
    if(localStorage.getItem("weChatLoginInfo")==null && weChatCode==null){
        var backUrl=encodeURIComponent(location.href);
        
        location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa223d1531ef58b9e&redirect_uri="+backUrl+"&response_type=code&scope=snsapi_base&state="+channelId+"#wechat_redirect";
    }else{
        if(localStorage.getItem("weChatLoginInfo") == null){//此时绑定微信用户code

            $.ajax({
                type:"get",
                url:"http://h5.wingoalclub.com/zucai/inf/wxLogin",
                data:{code:weChatCode,channelId:channelId,timer:new Date().getTime()},
                dataType:"json",
                error:function (error){
                    var errormsg=error.error || "暂时无法登录，请您退出后重试!";
                    console.error(errormsg);
                },
                success:function (data){
                    if(data && data.status ==200 && data.error == null){
                        var obj=data.data;
                        localStorage.setItem("weChatLoginInfo",'{"userId":'+obj.userId+',"userName":'+obj.userName+'}');
                    }else{
                        var errormsg=data.error || "暂时无法登录，请您退出后重试!";
                        console.error(errormsg);
                    }
                }
            });          
            // localStorage.setItem("weChatLoginInfo",'{"username":"test","userId":"test","channelId":'+channelId+'}');
        }
    }
}
/*
    var weChatCode=getQueryString("code");

    if(localStorage.getItem("weChatLoginInfo")==null && weChatCode==null){
        var backUrl=encodeURIComponent(location.href);
        var channelId=getQueryString("channelId") || "channelId";
        location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa223d1531ef58b9e&redirect_uri="+backUrl+"&response_type=code&scope=snsapi_base&state="+channelId+"#wechat_redirect";
    }else{
        if(localStorage.getItem("weChatLoginInfo") == null){//此时绑定微信用户code
            alert(location.href);
        }
    }
 */
$(function (){
    var loadDom=document.getElementById("loading");
    loadDom.setAttribute("class","outloading");
    setTimeout(function (){
        document.body.removeChild(loadDom);
    },500);

});