/*轮播图*/
var mySwipe = new Swiper(".swiper-container",{
	autoplay:5000,
	pagination:".swiper-pagination"
});

function getUserInfo(){/*获取用户登录态*/
	
}

$(function (){
    
    function loadExpert(op){/*专家推荐*/
        var defaultOption={role:2,type:1,page_index:1,page_num:10};/*默认北京专场，第一页每页10条*/;
        var option=$.extend(defaultOption,op);
        $.ajax({
            type:"get",
            url:"http://h5.wingoalclub.com/zucai/inf/expertRecommend",
            data:option,
            dataType:"json",
            success:function (data){
                /*data=[
                    {"imageHref":"图片超链接地址",
                    "imageSrc":"图片地址",
                    "nickName":"专家昵称',
                    "title":"标题",
                    "begin_match_time":"开始时间",
                    "home_team":"主场",
                    "guest_team":"客场",
                    "content":"内容",
                    "create_time":"创建时间",
                    "is_hit":"荐中状态(1:荐中 2：未荐中 3：未开奖)"
                    "price":"价格" //price和is_hit互斥
                    }
                ]
                    */
                if(data.status==200){
                    var list=data.data;
                    var experthtml="";
                    for(var i=0;i<list.length;i++){
                        experthtml+='<li class="commen_per ng-scope" expertid="'+list[i].expertid+'" recommendid="'+list[i].recommendid+'"><div class="js_cell"><img src="'+list[i].imageSrc+'"></div><span class="name_hut">'+list[i].nickName+'</span></li>';
                    }
                    $("#experts").empty().html(experthtml);
                }
            }
        });
    }
    function loadProficient(op){/*高手推荐*/
        var defaultOption={role:3,type:1,page_index:1,page_num:10};/*默认北京专场，第一页每页10条*/;
        var option=$.extend(defaultOption,op);
        $.ajax({
            type:"get",
            url:"http://h5.wingoalclub.com/zucai/inf/expertRecommend",
            data:option,
            dataType:"json",
            success:function (data){
                if(data.status==200){
                    var list=data.data;
                    var recommendhtml='<a href="recommend.html"><dt>高手推荐<span class="more_icon">更多</span></dt></a>';
                    /*
                    data={"status":"200","error":null,"data":[{"imageSrc":"http://www.wingoalclub.com/dist/avatars/20160529063744-35.jpg","nickname":"真正的周神","expertid":"16","recommendid":"10046","title":"美职-芝加哥火焰vs哥伦布机员","begin_match_time":"2016-10-14 08:30:00","home_team":"芝加哥火焰","guest_team":"哥伦布机员","content":"芝加哥火焰击败费城联合之后近5轮联赛1平4负的战绩表现不佳，球队战绩不佳主要是因为防守存在较大问题，5场比赛失球多到12个。\n  相比主队，客队的状态就要好很多了，他们近4场联赛赢了3场，其中包括了上场联赛3:0完胜了今天的对手芝加哥火焰，哥伦布机员无疑是在反弹的路上越走越稳。哥伦布机员近期前场进攻球员的状态确实不错，首席射手奥拉卡马拉，在对阵奥兰多城和新英格兰革命的比赛中攻入4球，帮助球队取得今年联赛的第二次连胜.\n  盘面数据告诉我们，不论初盘和即时盘口，都是相对看好客场作战的哥伦布机员。\n  单场官方不让球，推荐10。","create_time":"2016-10-13 22:11:02","is_hit":"未荐中","price":"50.00"}],"records":"2","objectNode":{},"arrayNode":[]}

                     */
                    var typeName=["北京单场","北京单场","胜负玩法","竞彩玩法"];
                    for(var i=0;i<list.length;i++){
                        var type=option.type || 1;
                        recommendhtml+='<dd class="ng-scope" expertid="'+list[i].expertid+'" recommendid="'+list[i].recommendid+'" title="'+list[i].title+'"><section class="expert_case"><a href="expert.html?expertid='+list[i].expertid+'"><span class="head_cap"><img src="'+list[i].imageSrc+'"></span></a><div class="cap_cont"><em class="ng-binding">'+list[i].nickname+'</em><mark class="ng-binding">高级专家</mark><span class="add_bgb"><i class="ng-binding">18中13</i></span></div></section><section class="ball_detail"><div class="ball_time"><small class="ng-binding">周一002</small><br ng-class="sethosStyle(1)"><em class="ng-binding">非洲杯</em><p id="contr_time" class="ng-binding">'+list[i].begin_match_time.substring(5,16)+'</p></div><p class="span_contr"><strong>'+list[i].title+'</strong><span class="star_box" style="position: absolute;right:10px">￥<em class="ng-binding">'+list[i].price+'</em></span></p><p class="ball_case txt_contr2"><span>类型：<a class="ng-binding">'+typeName[type]+'</a></span></p><p class="ball_case txt_contr2">推荐语:<a  class="ng-binding">'+list[i].content+'</a></p><span class="tag ng-binding">购买</span></section></dd>';
                    }
                    $("#recommendlist").empty().html(recommendhtml);
                }
            }
        });
    }
    loadExpert();
    loadProficient();
    
    /*
    <dd class="ng-scope">
            <span class="hide_all isBuyPlan ng-binding">1</span>
            <section class="expert_case">
                <span class="expertId ng-binding">39db671794144693879a25328bcef687</span>
                <span class="plan_id ng-binding">af7a9482abd94d619127e0ddae2ea0f6</span>
                <span class="plan_id3 ng-binding">竞彩单关</span>
                <span class="expertNickName ng-binding">黄庆</span>
                <a href="expert.html?expertid=39db671794144693879a25328bcef687">
                        <span class="head_cap">
                            <img src="https://baoying365.oss-cn-shanghai.aliyuncs.com/bycimg_header_prod/Bkz4zmEjsi.jpeg">
                        </span>
                </a>
                <div class="cap_cont">
                    <em class="ng-binding">黄庆</em>
                    <mark class="ng-binding">高级专家</mark>
                    <span class="add_bgb">
                        <i class="ng-binding">18中13</i>
                      </span>
                </div>
            </section>
            <section class="ball_detail">
                <div class="ball_time">
                    <small class="ng-binding">周一002</small>
                    <br ng-class="sethosStyle(1)">
                    <em class="ng-binding">非洲杯</em>
                    <p id="contr_time" class="ng-binding">01-24 03:00</p>
                </div>
                <p class="span_contr">
                    <strong><a class="ng-binding">塞内加尔</a> VS <a class="ng-binding">阿尔及利</a></strong>
                    <span class="star_box" style="position: absolute;right:10px">￥<em class="ng-binding">58.00</em></span>
                </p>
                <p class="ball_case txt_contr2"><span>类型：<a class="ng-binding">竞彩单关</a></span></p>
                <p class="ball_case txt_contr2">推荐语:<a  class="ng-binding">塞内加尔真会放水？那可是上届的仇人</a></p>
                <span class="tag ng-binding">购买</span>
            </section>
        </dd>
     */
});
