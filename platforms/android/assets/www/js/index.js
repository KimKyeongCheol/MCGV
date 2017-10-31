
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        app.index.onCreate();
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
app.index = (()=> {
    var onCreate=() =>{
        setContentView();
    };
    var setContentView=()=> {
        $('body').empty();
        $('body').html(app.compUI.div('wrapper'));
        $('#wrapper').html(app.compUI.div('container')).css({'width':'100%'});
        $('#container').html(cgvUI.movie()).css({'width':'auto','margin-right':'8px'});

        /*css({'width':'100%', 'height':'auto'});
        $('#wrapper').append(cgvUI.movie()).css({'width':'auto','margin-right':'8px'});*/



    };
    return {onCreate:onCreate};
})();
app.member = (()=>{

})();
var cgvUI={
    login:()=>{
        return 	'<div class="skipnav">'
            +'   <a href="#ContainerView">본문으로 바로가기</a>'
        +' </div>'
        +' <section id="all_wrap">'

            +'  <header id="header_wrap" style="height: 94px;">'


            +'    <!-- 20140210 모바일광고 -->'
        +'  <div style="width:100%;display:inline-block;text-align:center;">'
            +'    <iframe id="iframe" title="모바일광고" src="http://ad.cgv.co.kr/NetInsight/html/CGV/CGV_201401/mobile_05@web_login" width="100%" height="50px" frameborder="0" scrolling="no" topmargin="0" leftmargin="0" marginwidth="0" marginheight="0"></iframe>'
            +'   </div>'
            +'    <!-- 20140210 모바일광고 -->'

            +'    <div class="header_inbox">'
            +'    <a href="javascript:siteMap();" title="전체메뉴"><div class="ico_lt"><img id="siteMapBtn" src="http://img.cgv.co.kr/WebApp/images/common/btn_gnbV4.png" alt="전체메뉴"></div></a>'

        +'  <strong class="title_pg">'
            +'   <a href="">로그인</a>'
            +'   </strong>'

            +'  <ul class="btn_wrap">'

            +'    </ul>'

            +'  </div><!--// header_inbox -->'



        +'  </header>'
        +'  <section class="allview_wrap" id="siteMap">'
            +'     <div id="fogbg" onclick="javascript:close_sitemap();"></div>'
            +'     <article class="allview_box_wrap">'
            +'      <div class="allview_box_in">'
            +'      <h2 class="hidden">전체메뉴</h2>'

            +'      <div class="allview_header">'
            +'      <a href="/" class="cgv_logo">CGV 홈</a>'
        +'   </div>'
        +'    <div class="area">'
            +'       <ul class="group_wrap">'

            +'      <li><a href="#" title="My CGV" ><b>My CGV</b></a></li>'

        +'   <li><a href="#" ><b>빠른예매</b></a></li>'
        +'   <li><a href="#" ><b>상영시간표</b></a></li>'
        +'   </ul>'
        +'   <ul class="group_wrap">'
            +'      <li><a href="#"  title="CGV안내">CGV안내</a></li>'
        +'  <li><a href="#"  title="티켓·팝콘스토어">티켓·팝콘스토어</a></li>'
        +'   <li><a href="#"  title="아트하우스">아트하우스</a></li>'
        +'   <li><a href="#" title="CGV할인정보">CGV할인정보</a></li>'
        +'   <li><a href="#"  title="이벤트">이벤트</a></li>'
        +'   <li><a href="#"  title="매거진">매거진</a></li>'
        +'   </ul>'
        +'   <ul class="group_wrap">'
            +'       <li><a href="#"  title="IMAX">IMAX</a></li>'
        +'   <li><a href="#"  title="4DX">4DX</a></li>'
        +'   <li><a href="#"  title="Cine de CHEF">CINE de CHEF</a></li>'
        +'  <li><a href="#"  title="GOLD CLASS">GOLD CLASS</a></li>'
        +'  <li><a href="#"  title="STARIUM">STARIUM</a></li>'
        +'  <li><a href="#"   title="THE PRIVATE CINEMA">THE PRIVATE CINEMA</a></li>'
        +'  <li><a href="#"  title="SWEETBOX">SWEETBOX</a></li>'
        +'  <li><a href="#"   title="VEATBOX">VEATBOX</a></li>'
        +'  <li><a href="#"  title="Screen X">Screen X</a></li>'
        +'  <li><a href="#"   title="Sound X">Sound X</a></li>'
        +'  <li><a href="#"   title="CINE KIDS">CINE KIDS</a></li>'
        +'  <li><a href="#"   title="SphereX">Sphere X</a></li>'
        +'   <li><a href="#"  title="TEMPUR CINEMA">TEMPUR CINEMA</a></li>'
        +'   </ul>'
        +'  <ul class="group_wrap">'
            +'     <li><a href="#" title="고객센터">고객센터</a></li>'
            +' <li><a href="#"  title="Club서비스">Club서비스</a></li>'
        +' </ul>'
        +' </div>'
        +' <button type="button" class="btn_close" onclick="javascript:close_sitemap();">창 닫기</button>'
        +' </div>'
        +'</article>'
        +'</section>'



        +'<form name="frmLogin" method="post" action="/webapp/member/Login.aspx" id="frmLogin">'
            +'  <div>'
            +'  <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwULLTEyOTEyNzM1MjkPZBYCZg9kFgICAg9kFgICAQ9kFgJmD2QWBAICDw9kFgQeB29ua2V5dXAFLnJldHVybiBjbGlja0J1dHRvbihldmVudCwnYnRuX2xvZ2luJywgJ2RpdkNrJykeB29udG91Y2gFLnJldHVybiBjbGlja0J1dHRvbihldmVudCwnYnRuX2xvZ2luJywgJ2RpdkNrJylkAgMPD2QWBB8ABS9yZXR1cm4gY2xpY2tCdXR0b24oZXZlbnQsJ2J0bl9sb2dpbicsICdkaXZDazEnKR8BBS9yZXR1cm4gY2xpY2tCdXR0b24oZXZlbnQsJ2J0bl9sb2dpbicsICdkaXZDazEnKWRkwmXlicJuAmlhN1lCEXF5WtfSnoY=">'
            +'  </div>'

            +'  <div>'

            +'   <input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="4FD93E7D">'
            +'  <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEdAAaW58z3QHlYlCSJ/9reoMhT+LioyHtWiU48HzE92fvKH+O/urRzVmiUgmH84GTJS2kxOIRr4knU7i0k3iDEVoMP90vuIMgHftVGvSWb93FoIiiDQvb2u7/mzoXkMZdW+umZg7WYtp0w0PjspC4D8TbgIToVRQ==">'
            +'  </div>'
            +'  <input type="hidden" name="ctl00$mainContentPlaceHolder$Login$hfRedirectURL" id="mainContentPlaceHolder_Login_hfRedirectURL" value="%2fSchedule%2f%3ftc%3d0001%26t%3dT%26ymd%3d20171016%26src%3d">'
            +'  <!-- 로그인 -->'
            +'   <input type="hidden" name="ctl00$mainContentPlaceHolder$Login$hfPassword" id="mainContentPlaceHolder_Login_hfPassword">'
            +'   <input type="hidden" id="cbAutoLogin" name="cbAutoLogin" value="1">'
            +'   <div id="ContainerView">'
            +'  <section class="content1_wrap">'
            +'  <div id="form_base" class="wrap_login">'
            +'  <div class="favor_card">'
            +'  <ul class="cd_cho">'
            +'   <li>'
            +'    <div id="divCk" class="ck"></div>'
            +'   <div class="tit">아이디</div>'
            +'  <div class="entry">'
            +'   <label for="crd_card" class="data"></label>'
            +'    <div class="fit-textinput-unit" data-index="0" style="position: relative;">'
            +'    <label class="hidden" for="ctl00_mainContentPlaceHolder_Login_tbUserID">CGV 아이디</label>'
        +' <input name="ctl00$mainContentPlaceHolder$Login$tbUserID" type="text" maxlength="50" id="mainContentPlaceHolder_Login_tbUserID" tabindex="1" placeholder="CGV 아이디" onkeyup="return data-index="0">'
            +' <div class="fit-clear-btn" data-index="0" style="position: absolute; z-index: 100; cursor: pointer; right: 0px; top: 0px; display: none;"><a href="#none" tabindex="1">삭제</a></div>'
        +'  </div>'
        +'  </div>'
        +'   </li>'
        +'   <li>'
        +'     <div id="divCk1" class="ck"></div>'
            +'    <div class="tit non">비밀번호</div>'
            +'   <div class="entry non">'
            +'  <label for="crd_card" class="data"></label>'
            +'    <div class="fit-textinput-unit" data-index="1" style="position: relative;">'
            +'    <label class="hidden" for="ctl00_mainContentPlaceHolder_Login_tbPassword">CGV 비밀번호</label>'
        +'<input name="ctl00$mainContentPlaceHolder$Login$tbPassword" type="password" maxlength="50" id="mainContentPlaceHolder_Login_tbPassword" tabindex="3" placeholder="CGV 비밀번호"  data-index="1">'
            +'     <div class="fit-clear-btn" data-index="1" style="position: absolute; z-index: 100; cursor: pointer; right: 0px; top: 0px; display: none;"><a href="#none" tabindex="4">삭제</a></div>'
        +' </div>'
        +' </div>'
        +'  </li>'
        +' </ul>'
        +' <div class="agree"><a href="javascript:agreeOkShow();"><span id="sagreeOk" class="ckbox ok"></span></a><input name="ctl00$mainContentPlaceHolder$Login$hidAgree" type="hidden" id="mainContentPlaceHolder_Login_hidAgree" value="1"><span class="txt">아이디 저장</span></div>'
        +' <div class="message01">정보보호를 위해 아이디, 비밀번호와 함께 자동입력 방지문자를 입력하셔야 합니다.</div>'


        +' <div class="captcha">'
            +'    <div class="captcha_box" id="image_captcha">'
            +'   <input type="hidden" id="captchaNum" value="741573">'
            +'    <span class="captcha_img"><img id="captchaImg" src="/WebApp/Common/captcha.aspx?num=741573"></span>'

            +'    <audio id="audio" style="display:none;"><source src="http://img.cgv.co.kr/images/captcha/7.mp3" type="audio/mpeg"><source src="http://img.cgv.co.kr/images/captcha/7.wav" type="audio/wav"></audio>'

            +'    <a href="javascript:changeCaptcha();" class="btn_refresh"><span class="sp">새로고침</span></a>'
        +'  <a href="javascript:audioCaptcha();" class="btn_sound"><span class="sp">음성듣기</span></a>'
        +' </div>'
        +'   <div class="input_row" id="chptcha_area">'
            +'     <span class="input_box">'
            +'     <label for="chptcha" class="lbl" id="label_chptcha_area">자동입력 방지문자</label><input type="text" id="captchaText" name="txtCaptcha" placeholder="자동입력 방지문자를 입력하세요" class="int">'
        +'  </span>'
        +'  </div>'
        +'  </div>'

        +'  <div class="btn_area">'
            +'    <button type="button" class="bigbtn rtype" onclick="javascript:clickLogin();"><span>로그인</span></button>'
        +'  <div class="message02">※ 아이디/비밀번호 찾기는 CGV홈페이지(www.cgv.co.kr)에서 가능합니다.</div>'
        +'  </div>'

        +'  <div class="guide_re">'
            +'     <p class="guide_retxt">아이디가 없으시면<br>CJ ONE 통합회원 가입을 해주세요.</p>'
        +'  <a href="https://m.cjone.com:8443/cjmmobile/member/meberjoinstep1.do?coopco_cd=7010&amp;brnd_cd=1000&amp;mcht_no=1000" target="_blank" title="새창 열기" class="btn_alink">CJ ONE 회원가입</a>'
        +'  </div>'
        +'  </div>'

        +'     </div>  '
        +' <div id="debugPannel"></div>'
        +'   </section>'
            +'    <div style="display:none;"><img src="http://img.cgv.co.kr/WebApp/images/common/icon_chk1.png" alt="체크하기"></div>'
            +'   </div> '
            +'   </form>'

            +'   <footer>'
            +'    <section>'
            +'    <div class="fot">'
            +'   <p class="fot_p">'
            +'   <a class="fot_pa" id="a_footer_login_btn" );">로그인</a>'
            +'     <a id="footer_pc" class="fot_pa" >PC버전</a>'
            +'     </p>'
            +'     <p class="fot_p2">'
            +'     <a href="/Agreement/Agreement_Provision.aspx?type=10" class="fot_p2a" title="이용약관">이용약관</a>'
            +'    <a href="/Agreement/Agreement_Provision.aspx?type=11" class="fot_p2a" title="개인정보 처리방침"><b style="color:red;">개인정보 처리방침</b></a>'
        +'  <a href="http://www.cgv.co.kr/rules/disclaimer.aspx" class="fot_p2a" target="_blank" title="새창 열기">법적고지</a>'
            +'     <a href="http://corp.cgv.co.kr/company/cgv/" class="fot_p2a" target="_blank" title="새창 열기" onclick="">회사소개</a>'
            +'     </p>'
            +'      <p class="fot_p2">'
            +'      <a href="javascript:refuseMail();" class="fot_p3a" target="_blank" title="새창 열기">이메일무단수집거부</a>'
            +'       <a href="tel:1544-1122" class="fot_p3a">고객센터 : 1544-1122</a>'
        +'    <a href="mailto:cjcgvmaster@cj.net" class="fot_p3a">대표이메일</a>'
            +'      </p>'
            +'      <address class="fot_p4">'
            +'       <span class="fot_p4a">서울특별시 용산구 한강대로 23길 55,<br>아이파크몰 6층(한강로동)</span>'
        +'    </address>'
        +' <p class="fot_p8">'
            +'   <span class="fot_p3a">대표이사 : 서정</span>'
        +'<span class="fot_p3a">사업자등록번호 : 104-81-45690</span>'
        +'</p>'
        +'<p class="copy">'
            +'  <span class="fot_p3a">개인정보보호책임자 : 정종민</span>'
        +' <a href="http://www.ftc.go.kr/info/bizinfo/communicationList.jsp" class="fot_p3a" target="_blank" title="새창 열기">통신판매업신고 : 2017-서울 용산-0662</a>'
       +' <br><span class="fot_p3a">ⓒ CJ CGV</span>'
       + '</p>'
        +'</div>'
        +'</section>'
        +'</footer>'

    },
    movie:()=>{
        return  '<div class="item">'
        +'<article class="movie_box">'
        +'<div class="img_look">'
        +'    <a href="">'
        +'       <img id="event_img" src="http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79960/79960_20170912_0_320.jpg" alt="범죄도시">'
        +'    </a>'
        +'    <div class="ico_theater">'
        +'   </div>'
        +'   <span class="ico_now">2017.10.03 개봉</span>'
        +'   <span class="rel_date"></span>'
        +'</div>'
        +'<div class="txt_look inbtn">'
        +'  <strong class="tit">범죄도시</strong>'
        +'   <div class="egg-gage small">'
        +'       <span class="egg great"></span><span class="percent">98%</span>'
        +'   </div>'
        +'   <span class="per_reserve">예매율 27.0%</span>'
        +'   <div class="accur_count">누적관람객 380.6만 명</div>'
        +'   <a id="movieChartList1"  class="btn_reserve">지금 예매</a>'
        +'</div>'
        +'</article>'
        +'</div>'
    }
};

var introUI={

    navbar : ()=>{
        return '	<input type="checkbox" id="menu-toggle"/>'
            +'	  <label id="trigger" for="menu-toggle"></label>'
            +'	  <label id="burger" for="menu-toggle"></label>'
            +'	  <ul id="menu">'
            +'    <li><a href="#">Home</a></li>'
            +'    <li><a href="#">About</a></li>'
            +'    <li><a href="#">Portfolio</a></li>'
            +'    <li><a href="#">Contact</a></li>'
            +' </ul>'
    }
};
app.compUI = {
    br    :()=>{return $('<br/>');},
    div   : x=>{return $('<div/>',{id:x});},
    h1    : x=>{return $('<h1/>',{id:x});},
    span  : x=>{return $('<span/>',{id:x});},
    iTxt  : x=>{return $('<input/>',{id:x,type:'text'});},
    aBtn  : x=>{return $('<a/>',{href:'#', role: 'button', id:x});},
    iBtn  : x=>{return $('<input/>',{id:x,type:'button'});},
    image : (x,y)=>{return $('<img/>',{id:x,src:y});},
    table : x=>{return $('<table/>',{id:x})},
    tr :()=>{return $('<tr/>')},
    td :()=>{return $('<td/>')},
    input : (x,y)=>{return $('<input/>',{id:x,type:y});},
    btn : x=>{return $('<button>',{id:x})},
    nav: x=>{return $('<nav/>',{id: x});},
    ul : (x,y)=>{return $('<ul/>',{id:x,class:y})},
    li : (x,y)=>{return $('<li/>',{id:x,class:y})},
    a : ()=>{return $('<a/>',{href:'#'})}
};



    app.initialize();
