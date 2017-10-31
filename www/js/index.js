
var kc = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
      kc.main.onCreate();
      //  kc.moviereservationSeat.onCreate();
       // kc.myPage.onCreate();
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


kc.main=(() => {
    var onCreate= (x) => {
        setContentView();

    };
    var setContentView= () => {
        //body지우고 body를 생성
        $('body').empty();
        $('body').html(kc.compUI.div('wrapper')).css({'background':'white','margin':'o auto'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));

        $('#content').html(kc.compUI.div('titleBar'));
        $('#content').append(introUI.navbar());fu();
        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));
        $('#title').text('CGV').css({
            'height':'60px',
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'red'
            ,   'color':'white'

        });
        $('#content').append(kc.compUI.table('movie-div'));




        $.getJSON('./json/movie.json' , (date)=>{
            var listTitle='';
            var listPoster='';
            var listinfo='';
            listTitle+='<tr>';
            $.each(date,(i,j)=>{
                listTitle+='<td id="'+date[i].movieTitle+'" >'
                listTitle+='<span id='+date[i].movieTitle+'>'+date[i].movieTitle+'</span><br>';

                listTitle+='</td>';
            });

            listTitle+='</tr>';
            listPoster+='<tr>';
            $.each(date,(i,j)=>{
                listPoster+='<td id="'+date[i].moviePoster+'" >'
                +'<a onclick="kc.main.selectPoster('+'\''+date[i].movieTitle+'\','+'\''+date[i].moviePoster+'\','+'\''+date[i].movieStory+'\','+'\''+date[i].movieVideo+'\')"> <img src="'+date[i].moviePoster+'" style="height:300px"></a><br>'
                +'</td>'
            });
            listPoster+='</tr>';
            listinfo+='<tr>';
            $.each(date,(i,j)=>{
                listinfo+='<td id="info'+i+'" >';
                listinfo+=
                    ' <span id='+date[i].movieGenre+'>장르:'+date[i].movieGenre+'</span><br>'
                    +' <span id='+date[i].movieActor+'>배우:'+date[i].movieActor+'</span><br>'
                    +' <span id='+date[i].movieDirector+'>감독:'+date[i].movieDirector+'</span><br>'
                    + '<span id='+date[i].movieDay+'>개봉일:'+date[i].movieDay+'</span><br>'
                    +' <span id='+date[i].movieAge+'>'+date[i].movieAge+'</span><br>';
                listinfo+='</td>';
            });


            listinfo+='</tr>';
            var videolist='';
            videolist+='<tr>';
            $.each(date,(i,j)=>{
                videolist+='<td id="video-group-item"'+i+'"> <a onclick="kc.main.select('+'\''+date[i].movieVideo+'\')" id="video-group-item"><iframe width="250px" height="150px" src="'+date[i].movieVideo+'?controls=0" ></iframe><br></a></td>';
                // videolist+='<td>'+date[i].Movievideo+'</td>'

            });
            videolist+='</tr>'
            $('#movie-div').append(listTitle);
            $('#movie-div').append(listPoster);
            $('#movie-div').append(listinfo).css({'width':'150px'});
            $('#content').append(kc.compUI.table('video-table'));
            $('#video-table').append(videolist);

        });









    };

    var selectPoster=(x,y,z,e)=>{
        alert('영화제목'+x+'포스터'+y+'줄거리'+z+'비디오'+e);


        sessionStorage.setItem('MT',x);
        sessionStorage.setItem('MP',y);
        sessionStorage.setItem('MS',z);
        sessionStorage.setItem('MV',e);

        kc.movieDetail.onCreate();

    };
    return{onCreate:onCreate,selectPoster:selectPoster};
})();

//영화 상세페이지
/*kc.movieDetail=(function () {
    var onCreate=function () {
        setContentView();
        $('#movieResBtn').click((e)=>{
            e.preventDefault();
            kc.login.onCreate();
        });
    };
    var setContentView=function () {
        $('body').empty();
        $('body').html(kc.compUI.div('wrapper')).css({'background':'white','margin':'o auto'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));

        $('#content').html(kc.compUI.div('titleBar'));
        $('#content').append(introUI.navbar());fu();
        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));
        $('#title').text('CGV').css({
            'height':'60px',
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'red'
            ,   'color':'white'

        });

        $('#content').css({'width':'100%','height':'100%'});

        $('#content').append(kc.compUI.div('videoLayout'));
        $('#videoLayout').append(kc.compUI.h1('h1'));

        $('#videoLayout').css({'width':'auto','height':'150','margin':'10px','margin-top':'30px','background':'#c3f6ff', 'resize': 'none'});
        $('#h1').html().css({'margin-top':'20px'});

        $('#content').append(kc.compUI.textarea('story'));

        $('#story').text(' 줄거리 출력 위치').css({'margin-top':'20px'});

        $('#story').css({'width':'98%','height':'500px','margin':'10px','margin-top':'30px','background':'rgb(247, 246, 200)', 'resize': 'none'});
        $('#content').append(kc.compUI.div('movieRes'));
        $('#movieRes').append(kc.compUI.span('movieResBtn'));
        $('#movieResBtn').text('예매');
        $('#movieResBtn').css({'margin-top':'50px','margin-left':'95%'});
    };
    var select=(x)=>{
        alert('가지오 온 쿠키값값'+kc.min.getCookie('movieList'));
        kc.cookie.setCoockie(x);
    };
    return{onCreate:onCreate,select:select};
})();*/
//로그인화면구성
kc.login=(function () {
    var onCreate=function () {
        setContentView();
        $('#signin-btn').click(e=>{
            e.preventDefault();
            var id = $('#id').val();
            var pass= $('#password').val();
            console.log('입력된 id,password:    ' + id +','+pass );
            $.ajax({
                async : false,
                url:'json/member.json',
                type: 'post',
                data: {id:id,pass:pass},
                dataType:'json',
                success:d=>{
                    $.each(d,(i,o)=>{
                        if(o.id===id && o.pass === pass){
                            checkval = true;
                            return false;
                        }else{
                            checkval = false;
                        }
                    });
                    if(checkval==true){
                        alert('SUCCESS!');
                        kc.movieChoice.onCreate();
                    }else{
                        alert('FAIL');
                        $('#id').val('');
                        $('#password').val('');

                    }
                },
                error:e=>{
                    alert('error');
                }
            });

        });
        $('#signup-btn').click(e=>{
            e.preventDefault();
            kc.join.onCreate();
        });
    };
    var setContentView=function () {
        $('body').empty();

        $('body').html(kc.compUI.div('wrapper')).css({'background':'white'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));
        $('#content').append(introUI.navbar());fu();
        $('#content').html(kc.compUI.div('titleBar'));

        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));
        //$('#title').text(kc.cookie.getCookie('dest')+'   상세 페이지').css({
        $('#title').append(/*kc.cookie.getCookie('dest')+*/'   로그인 페이지');
        $('#title').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'red'


        });

        $('#content').css({ 'width':'50%',
            'height': '100%',
            'margin': '0 auto',
            'margin-top': '15%'});
        $('#content').html(kc.compUI.input('id','text'));
        $('#id').attr('value','hong').css({'width':'100%', 'height':'50px','margin':'30px 0px 5px 0px'});
        $('#content').append(kc.compUI.input('password','password'));
        $('#password').attr('value','1').css({'width':'100%', 'height':'50px','margin':'5px 0px 10px 0px'});
        $('#content').append(kc.compUI.btn('signin-btn'));
        $('#content').append(kc.compUI.btn('signup-btn'));
        $('#signin-btn').text('로그인');
       // $('#signup-btn').text('회원가입');






    };
    return{onCreate:onCreate};
})();
//메인화면 구성
/*kc.main=(() => {
    var onCreate= (x) => {
        setContentView();

    };
    var setContentView= () => {
        //body지우고 body를 생성
        $('body').empty();
        $('body').html(kc.compUI.div('wrapper')).css({'background':'white','margin':'o auto'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));

        $('#content').html(kc.compUI.div('titleBar'));
        $('#content').append(introUI.navbar());fu();
        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));
        $('#title').text('메인페이지').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'#ffdeec'
        });

        $('#content').css({'width':'100%','height':'100%'});
        $('#content').append(kc.compUI.table('movie-table'));
        $('#movie-table').css({'white-space':'nowrap'});
        $('#movie-table').append(kc.compUI.dl('movie-dl'));
        $('#movie-dl').append(kc.compUI.dd('movie-dd'));
        $('#movie-dl').append(kc.compUI.dt('movie-dt'));


  var movietitle=['지오스톰','범죄도시','대장김창수','노게임 노 라이프','남한산성','마더!'];
        var post=['http://img.cgv.co.kr/Movie/Thumbnail/Poster/000080/80060/80060_185.jpg',
            'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79960/79960_185.jpg',
            'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79978/79978_185.jpg'
            ,'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000080/80089/80089_185.jpg',
            'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79902/79902_185.jpg',
            'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79968/79968_185.jpg'];
        var minfo=['지오스톰 <br>예매율 30.7% <br>2017.10.19개봉<br>',
            '범죄도시<br> 예매율 24.0% <br>2017.10.03개봉<br>',
            '대장 김창수<br> 예매율 8.2%<br> 2017.10.19개봉<br>',
            '노게임 노라이프~ 제로- <br>예매율 3.5% <br>2017.10.19개봉<br>',
            '남한산성<br> 예매율 2.0% <br>2017.10.03개봉<br>',
            '마더~!<br> 예매율 1.8% <br>2017.10.19개봉<br>'];
        var dd='',div='',dt='',info='';
        dd+='<h1>영화 추천</h1>';
        $.each(movietitle,(i,j)=>{
            dd+= '<dl id="movie-dl-1"  "><dd id="list-group-item" >'
                +title[i]
                +'</dd>'
                +'<a onclick="kc.main.select('+'\''+movietitle[i]+post[i]+minfo[i]+'\')" id="poster-group-item"><img src='+post[i]+'></a><br>'
                +minfo[i]
                + '<button id="btn'+[i]+'">'+movietitle[i]+' 예약하기</button>'
                +'</dl>';
        }) ;

         $.each(post,(i,j)=>{
             dt+='<dt id="poster-group-item" data-target="#myCarousel"  data-slide-to="i">'
             +'<a onclick="kc.main.select('+'\''+post[i]+'\')" id="poster-group-item"><img src='+post[i]+'></a>'
             +'</dt>';
         });
        $.each(minfo,(i,y)=>{
            info+='<dt id="info-group-item" >'
                +'<a onclick="kc.main.select('+'\''+minfo[i]+'\')" id="info-group-item">'+minfo[i]+'</dt>';


        });









        $('#movie-dl').append(kc.compUI.a1('w3-btn-floating'));

        $('#movie-dl dl').css({'float':'left','margin':'0 ', 'resize': 'none'});

        $('#content').append(kc.compUI.table('video-table'));
        $('#video-table').append(kc.compUI.dl('video-dl')).css({'margin-top':'30px'});
        $('#video-dl').append(kc.compUI.dd('video-dd'));
        $('#video-dl').append(kc.compUI.dt('video-dt'));
        // $('#movie-table').append(kc.compUI.tr());
        var video=['https://www.youtube.com/embed/B3QpqsQMuo0',
            'https://www.youtube.com/embed/sweyAhR9fsc',
            'https://www.youtube.com/embed/UOPLteb--P4',
            'https://www.youtube.com/embed/TmUJQdQ3BkU',
            'https://www.youtube.com/embed/s2KFCmJ3XOM',
            'https://www.youtube.com/embed/qaeInnJ42bw'];
        var ifra='';
        ifra+='<h1>영화 동영상</h1>';
        $.each(video,(i,j)=>{
            ifra+= '<dl id="video-dl-1"><dd id="video-group-item" >'
                +'<a onclick="kc.main.select('+'\''+title[i]+'\')" id="'+title[i]+'">'+ title[i]+'</a>'
                +'</dd>'
            ifra+='<dt id="video-group-item" > <a onclick="kc.main.select('+'\''+video[i]+'\')" id="video-group-item"><iframe width="250px" height="150px" src="'+video[i]+'?controls=0" ></iframe><br>'+title[i]+' 예고편</a></dt>'

                +'</dl>';
        }) ;
        $('#video-group-item').css({'width':'15$','margin':'0 auto','border-style':'dotted','border-color':'red'});
        $('#video-table').html(ifra);
        $('#video-dl dl').css({'float':'left','width':'200px','height':'150px'});


        //영상 예고
       $('#content').append(kc.compUI.div('video-table'));
        $('#video-table').append(kc.compUI.dl('video-dl'));
        $('#video-dl').append(kc.compUI.dd('video-dd'));
        $('#video-dl').append(kc.compUI.dt('video-dt'));
        // $('#movie-table').append(kc.compUI.tr());
        var video=['https://www.youtube.com/embed/B3QpqsQMuo0',
            'https://www.youtube.com/embed/sweyAhR9fsc',
            'https://www.youtube.com/embed/UOPLteb--P4',
            'https://www.youtube.com/embed/TmUJQdQ3BkU',
            'https://www.youtube.com/embed/s2KFCmJ3XOM',
            'https://www.youtube.com/embed/qaeInnJ42bw'];
        var ifra='';

        $.each(video,(i,j)=>{
            ifra+= '<dl id="video-dl-1"><dd id="video-group-item" >'
                +'<a onclick="kc.main.select('+'\''+title[i]+'\')" id="'+title[i]+'">'+ title[i]+'</a>'
                +'</dd>'
            ifra+='<dt id="video-group-item" > <a onclick="kc.main.select('+'\''+video[i]+'\')" id="video-group-item"><iframe width="250px" height="150px" src="'+video[i]+'?controls=0" ></iframe><br>'+title[i]+' 예고편</a></dt>'

                +'</dl>';
        }) ;
        $('#video-group-item').css({'width':'15$','margin':'0 auto','border-style':'dotted','border-color':'red'});
        $('#video-table').html(ifra);
        $('#video-dl dl').css({'float':'left','width':'200px','height':'150px'});
    };

    var select=x=>{
        alert('선택한 영화는 ' + x +'입니다      ');

        kc.movieDetail.onCreate();


    };

    return{onCreate:onCreate,select:select,setContentView:setContentView};
})();*/

/*kc.movietitleList=(()=>{
    var title =()=>{
        kc.movieposterList.poster();
        var movietitle=['지오스톰','범죄도시','대장김창수','노게임 노 라이프','남한산성','마더!'];
        var titleList = '';
        $.each(movietitle,(i,j)=>{
            titleList+= '<dl id="'+i+'"  ">'
                +'<a onclick="'+ movietitle[i] +'"> '+ movietitle[i] +'</a>'
                +'</dl>';

        });
        $('#datatable').html(titleList);

        $.each((i,j)=> {
            $('#' + i + '').click(() => {
                $('#movie-table-tr').html(movietitle[i]);

            });//clickend
        //each end
        });

    };

    var select=x=>{

        alert('선택한 제목은 ' +  x );
        kc.cookie.setCoockie('mt',x);

    };
    return{title:title,select:select};
})();*/
/*kc.movieposterList=(()=>{

    var poster=()=>{
        var posterimgURL=['http://img.cgv.co.kr/Movie/Thumbnail/Poster/000080/80060/80060_185.jpg',
            'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79960/79960_185.jpg',
            'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79978/79978_185.jpg'
            ,'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000080/80089/80089_185.jpg',
            'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79902/79902_185.jpg',
            'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79968/79968_185.jpg'];
        var posterList = '';
        $.each(posterimgURL,(k,v)=>{
            posterList+= posterimgURL[k];
        });

    };
    return{poster:poster};
})();
kc.movieInfoList=(()=>{

    var movieInfo=()=>{
        var minfo=['지오스톰 <br>예매율 30.7% <br>2017.10.19개봉<br>',
            '범죄도시<br> 예매율 24.0% <br>2017.10.03개봉<br>',
            '대장 김창수<br> 예매율 8.2%<br> 2017.10.19개봉<br>',
            '노게임 노라이프~ 제로- <br>예매율 3.5% <br>2017.10.19개봉<br>',
            '남한산성<br> 예매율 2.0% <br>2017.10.03개봉<br>',
            '마더~!<br> 예매율 1.8% <br>2017.10.19개봉<br>'];
        var minfoList='';
        $.each(minfo,(k,v)=>{
            minfo+= minfo[i];
        });
        var select=x=>{
            alert('선택한 제목은 ' + x +'입니다      ');

            kc.movieDetail.onCreate();


        };
    };
    return{movieInfo:movieInfo};
})();*/
//영화 상세페이지
kc.movieDetail=(function () {
    var onCreate=function (x,z,e,y) {
        alert(' 가저온 정보'+sessionStorage.getItem("MP"));
        setContentView();
        $('#movieResBtn').click((e)=>{
            e.preventDefault();
            kc.login.onCreate();
        });
    };
    var setContentView=function () {

        $('body').empty();

        $('body').html(kc.compUI.div('wrapper')).css({'background':'white'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));
        $('#content').html(kc.compUI.div('titleBar'));
        $('#content').append(introUI.navbar());fu();
        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));

        $('#title').append(sessionStorage.getItem("MT")+'   상세 페이지');
        $('#title').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'#ff001e'
            ,'color':'#fef9ff'

        });
        $('#content').css({'width':'100%','height':'100%'});

        $('#content').append(kc.compUI.div('videoLayout'));
         $('#videoLayout').append(kc.compUI.h1('h1'));

        $('#videoLayout').html('<iframe width="450px" height="350px" style="margin:0 auto;" src='+sessionStorage.getItem("MV")+'?controls=0" ></iframe>');
        $('#videoLayout').css({'margin':'0 auto','width':'450px'});
        $('#content').append(kc.compUI.div('StoryDiv'));
        $('#StoryDiv').append(kc.compUI.span('story'));

        $('#story').html(sessionStorage.getItem("MS"));

        $('#story').css({'width':'98%','height':'500px','margin':'10px','margin-top':'30px','background':'rgb(247, 246, 200)', 'resize': 'none'});

    };
    var select=(x,y,z)=>{

        kc.cookie.setCoockie(x);
    };
    return{onCreate:onCreate,select:select};
})();
//로그인화면구성
kc.login=(function () {
    var onCreate=function () {
        setContentView();
        $('#signin-btn').click(e=>{
            e.preventDefault();
            var id = $('#id').val();
            var pass= $('#password').val();
            console.log('입력된 id,password:    ' + id +','+pass );
            $.ajax({
                async : false,
                url:'json/member.json',
                type: 'post',
                data: {id:id,pass:pass},
                dataType:'json',
                success:d=>{
                    $.each(d,(i,o)=>{
                        if(o.id===id && o.pass === pass){
                            checkval = true;
                            return false;
                        }else{
                            checkval = false;
                        }
                    });
                    if(checkval==true){
                        alert('SUCCESS!');
                        kc.main.onCreate();

                        $('#login').text('로그아웃');
                        $('#login').attr('id','logout');
                        $('#join').attr('id','hiddenjoinBtn');
                        $('#hiddenjoinBtn').remove();
                        $('#resBtn').attr('id','loginResBtn');



                    }else{
                        alert('FAIL');
                        $('#id').val('');
                        $('#password').val('');

                    }
                },
                error:e=>{
                    alert('error');
                }
            });

        });
        $('#signup-btn').click(e=>{
            e.preventDefault();
            kc.join.onCreate();
        });
    };
    var setContentView=function () {
        $('body').empty();

        $('body').html(kc.compUI.div('wrapper')).css({'background':'white'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));
        $('#content').append(introUI.navbar());fu();
        $('#content').html(kc.compUI.div('titleBar'));

        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));
        //$('#title').text(kc.cookie.getCookie('dest')+'   상세 페이지').css({
        $('#title').append(/*kc.cookie.getCookie('dest')+*/'   로그인 페이지');
        $('#title').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'#ff001e'
            ,'color':'#fef9ff'
        });

        $('#content').css({ 'width':'50%',
            'height': '100%',
            'margin': '0 auto',
            'margin-top': '15%'});
        $('#content').html(kc.compUI.input('id','text'));
        $('#id').attr('value','hong').css({'width':'100%', 'height':'50px','margin':'30px 0px 5px 0px'});
        $('#content').append(kc.compUI.input('password','password'));
        $('#password').attr('value','1').css({'width':'100%', 'height':'50px','margin':'5px 0px 10px 0px'});
        $('#content').append(kc.compUI.btn('signin-btn'));
        $('#content').append(kc.compUI.btn('signup-btn'));
        $('#signin-btn').text('로그인');
       // $('#signup-btn').text('회원가입');





    };
    return{onCreate:onCreate};
})();



//회원가입화면 구성
/*kc.join=(function () {
    var onCreate=function () {
        setContentView();

        $('#okBtn').click(()=>{
            alert('회원등록 완료하였습니다.');
           kc.main.onCreate();
        });
        $('#cancelBtn').click(()=>{
            kc.main.onCreate()
        });

    };
    var setContentView =()=>{
        $('body').empty();

        $('body').html(kc.compUI.div('wrapper')).css({'background':'white'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));
         $('#content').html(kc.compUI.div('titleBar'));
        $('#content').append(introUI.navbar());fu();

        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));
        //$('#title').text(kc.cookie.getCookie('dest')+'   상세 페이지').css({
        $('#title').append(/!*kc.cookie.getCookie('dest')+*!/'   회원가입 페이지');
        $('#title').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'#ffdeec'
        });
        $('#content').append(kc.compUI.table('join_table'));
       /!* $('#join_table').css({'width':'100%','height':'100%'});
        $('#join_table').append(kc.compUI.tr1('join_tr'));
        $('#join_tr').css({'width':'100%','height':'30px;'});
        $('#join_tr').append(kc.compUI.td1('join_td'));
        $('#join_td').css({'width':'100%','height':'30px;'});*!/
        $('#join_table').append (kc.compUI.tr1('join_name_tr'));
        $('#join_name_tr').append(kc.compUI.td1('join_name_td'));
        $('#join_name_td').text('이름');
        $('#join_name_td').append(kc.compUI.input('name_input'))
        $('#name_input').css({'width':'100px','height':'30px'}).attr('maxlength','12').attr('placeholder','이름');
        $('#join_name_td').append(kc.compUI.span('name_span'));
        $('#name_span').val();
        $('#name_span').css({'color':'red'})
        $('#name_input').keyup(()=>{
            var name= /^[a-zA-Z가-힣]{2,20}$/;
            var nameCheck=$('#name_input').val();

            if(name.test(nameCheck)){
                $('#name_span').text('입력가능한 이름입니다.');
            }else{
                $('#name_span').text('형식에 맞지 않는 이름입니다');
            };
        });
        $('#join_table').append (kc.compUI.tr1('join_id_tr'));
        $('#join_id_tr').append(kc.compUI.td1('join_id_td'));
        $('#join_id_td').text('아이디');
        $('#join_id_td').append(kc.compUI.input('id_input'));
        $('#id_input').css({'width':'100px','height':'30px'}).attr('maxlength','12').attr('placeholder','아이디');
        $('#id_input').append(kc.compUI.bBtn('id_btn'));
        $('#join_id_td').append(kc.compUI.span('id_span'));
        $('#id_span').val();
        $('#id_span').css({'color':'red'});
        $('#id_btn').text('중복확인').css({'width':'100px','height':'30px'});
        //입력된 문자 정규식
        $('#id_input').keyup(()=>{
            var id=/^[a-zA-Z](?=.*[0-9]).{3,12}/;
            var idCheck=$('#id_input').val();

            if(id.test(idCheck)){
                $('#id_span').text('입력가능한 아이디 입니다.');
            }else{
                $('#id_span').text('형식에 맞지 않는 아이디입니다');
            };
        });
        //아이디 중복확인
        //디비연결 후 확인 가능


        $('#join_table').append (kc.compUI.tr1('join_pass1_tr'));
        $('#join_pass1_tr').append(kc.compUI.td1('join_pass1_td'));
        $('#join_pass1_td').text('비밀번호');
        $('#join_pass1_td').append(kc.compUI.input('pass1_input','password'));
        $('#pass1_input').css({'width':'100px','height':'30px'}).attr('maxlength','12').attr('placeholder','비밀번호');
        $('#join_pass1_td').append(kc.compUI.span('pass1_span'));
        $('#pass1_span').val();
        $('#pass1_span').css({'color':'red'});

        $('#pass1_input').keyup(()=>{
            var pass1=/^(?=.*[a-zA-Z])(?=.*[!@#$%^&])(?=.*[0-9]).{8,12}/;
            var pass1Check=$('#pass1_input').val();

            if(pass1.test(pass1Check)){


                    $('#pass1_span').text('입력가능합니다.');
                    $('#pass2_input').removeAttr('disabled','');


            }else{
                $('#pass1_span').text('비밀번호는 8~15(특수문자 포함),잘못된 입력입니다.');

            };
        });


        $('#join_table').append (kc.compUI.tr1('join_pass2_tr'));
        $('#join_pass2_tr').append(kc.compUI.td1('join_pass2_td',));
        $('#join_pass2_td').text('비밀번호 확인');
        $('#join_pass2_td').append(kc.compUI.input('pass2_input','password'));
        $('#pass2_input').css({'width':'100px','height':'30px'}).attr('disabled','');
        $('#join_pass2_td').append(kc.compUI.span('pass2_span'));
        $('#pass2_span').val();
        $('#pass2_span').css({'color':'red'});

        $('#pass2_input').keyup(()=>{
            var pass1=$('#pass1_input').val();
            var pass2=$('#pass2_input').val();
            if(pass2==pass1){
                $('#pass2_span').text('비밀번호가 일치합니다');
            }else{
                $('#pass2_span').text('비밀번호가 일치하지 않습니다');
            }
        });

        $('#join_table').append (kc.compUI.tr1('join_email_tr'));
        $('#join_email_tr').append(kc.compUI.td1('join_email_td',));
        $('#join_email_td')
            .html('<span>이메일</span></span><span class="input_txt w110" data-skin="form">' +
            '  <input type="text" class="text small" title="이메일 아이디 입력" name="email_first" id="email_first" value="" placeholder="이메일 아이디" data-format="email">' +
            ' </span>' +
            '   <span class="symbol">@</span>' +
            '  <span class="input_txt w110">' +
            '   <input type="text" class="text small" title="이메일 도메인 입력" name="email_input" id="email_input" value="" data-format="email">' +
            '  </span>' +
            '  <span class="select w100" data-skin="form">' +
            '   <select title="이메일 도메인 선택" name="email_last" id="email_last">' +
            '<option value="hanmail.net">hanmail.net</option>'
              +  '<option value="naver.com">naver.com</option>'
                +  '<option value="gmail.com">gmail.com</option>'
                +  '<option value="nate.com">nate.com</option>'
                +  '<option value="laycos.co.kr">laycos.co.kr</option>'
                +'<option value="inputEmail">직접입력</option>'
            +' </select>' +
            '  <span id="em""></span></span>' +
            ' </div>');
        $('#email_first').keyup(()=>{
            var email=/^[a-zA-Z](?=.*[0-9]).{8,12}/;
            var emailCheck=$('#email_first').val();

            if(email.test(emailCheck)){
                $('#em').text('입력가능합니다.');

            }else{
                $('#em').text('비밀번호는 8~15(특수문자 포함),잘못된 입력입니다.');

            };
        });


        $('#email_last').click(()=>{
            var email_last=$('#email_last').val();
            if(email_last=='inputEmail'){
                $('#email_input').val('');
            }else{
                $('#email_input').val(email_last);
            }
        });






        $('#join_table').append (kc.compUI.tr1('join_phone_tr'));
        $('#join_phone_tr').append(kc.compUI.td1('join_phone_td',));
        $('#join_phone_td')
            .html('<span>전화번호</span></span>' +
                '<select title="전화번호" id="phone1">' +
                '                <option value="010">010</option>' +
                '                <option value="011">011</option>' +
                '                <option value="016">016</option>' +
                '               <option value="019">019</option>' +
                '               </select>'
        +'   <span class="symbol1">-</span>'
         +   '  <input type="text" title="전화" id="phone2" value=""  data-format="phone" onkeyPress="if ((event.keyCode<48) || (event.keyCode>57)) event.returnValue=false;">'
          +      '   <span class="symbol">-</span>'
          +      '   <input type="text"  id="phone3" value="" data-format="phone" onkeyPress="if ((event.keyCode<48) || (event.keyCode>57)) event.returnValue=false;">'
          +      '  </span>'
           +     '  <span id="em""></span></span>'
           +     ' </div>');




        $('#join_table').append (kc.compUI.tr1('join_day_tr'))
        $('#join_day_tr').append(kc.compUI.td1('join_day_td'));
        $('#join_day_td').text('생년월일');
        $('#join_day_td').append(kc.compUI.input('dat_input','text'));
        $('#dat_input').css({'width':'100px','height':'30px'}).attr('placeholder','생년월일');
        $(()=>{
            $('#dat_input').datepicker();
        });

        $('#join_table').append (kc.compUI.tr1('join_addr_tr'));
        $('#join_addr_tr').append(kc.compUI.td1('join_addr_td'));
        $('#join_addr_td').text('주소');
        $('#join_addr_td').append(kc.compUI.input('sample4_postcode'));
        $('#addr_input').css({'width':'100px','height':'30px'}).attr('placeholder','우편번호');
        $('#join_addr_td').append(kc.compUI.bBtn('addrBtn'));
        $('#addrBtn').text('조회');
        $('#join_table').append (kc.compUI.tr1('join_addr_tr1'))
        $('#join_addr_tr1').append(kc.compUI.td1('join_addr_td1'));
        $('#join_addr_td1').append(kc.compUI.input('sample4_roadAddress','text')).attr('placeholder','도로명 주소');
        $('sample4_roadAddress','text').append(kc.compUI.input('detailAddr',''))
        $('#join_addr_td1').append(kc.compUI.input('sample4_jibunAddress','text')).attr('placeholder','지번 주소');
        $('#addrBtn').click(()=>{

            kc.zipcode.sample4_execDaumPostcode();
            var zipcode=$('#sample4_postcode').val();
            var address=$('#sample4_roadAddress').val();
            var address=$('#sample4_postcode').val();
        });

        $('#join_table').append(kc.compUI.bBtn('okBtn'));
        $('#okBtn').text('확인');
        $('#join_table').append(kc.compUI.bBtn('cancelBtn'));
        $('#cancelBtn').text('취소');


    };
    return{onCreate:onCreate};
})();*/
/*
kc.zipcode=(()=>{
    var sample4_execDaumPostcode=()=>{
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 도로명 조합형 주소 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }
                // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
                if(fullRoadAddr !== ''){
                    fullRoadAddr += extraRoadAddr;
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample4_postcode').value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('sample4_roadAddress').value = fullRoadAddr;
                document.getElementById('sample4_jibunAddress').value = data.jibunAddress;

                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                if(data.autoRoadAddress) {
                    //예상되는 도로명 주소에 조합형 주소를 추가한다.
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    document.getElementById('guide').innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';

                } else if(data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    document.getElementById('guide').innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';

                } else {
                    document.getElementById('guide').innerHTML = '';
                }
            }
        }).open();
    };





    return {
        sample4_execDaumPostcode : sample4_execDaumPostcode
    }


})();*/
//영화예매 - 영화선택
kc.movieChoice=(function () {
    var onCreate=function () {
        setContentView();



    };
    var setContentView=function () {
        $('body').empty();

        $('body').html(kc.compUI.div('wrapper')).css({'background':'white'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));
        $('#content').html(kc.compUI.div('titleBar'));
        $('#content').append(introUI.navbar());fu();
        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));

        $('#title').append(/*kc.cookie.getCookie('dest')+*/'   예매 - 영화 선택 페이지');
        $('#title').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'#ff001e'
            ,'color':'#fef9ff'
        });


        $('#content').append(kc.compUI.table('movie-table'));
        $('#movie-table').append(kc.compUI.tr1('movie-table-tr'));
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-poster'));
        $('#movie-table-td-poster').html('<img src="./img/menu_movie.png">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-cinema'));
        $('#movie-table-td-cinema').html('<img src="./img/menu_theater.png">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-day'));
        $('#movie-table-td-day').html('<img src="./img/menu_date_off.png">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-time'));
        $('#movie-table-td-time').html('<img src="./img/menu_time_off.png">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)'});

        $('#content').append(kc.compUI.table('datatable'));

        $.getJSON('./json/movie.json',(date)=>{
            var movie_t='';
            $.each(date,(i,j)=>{
                movie_t+='<tr id="mList"><td id="'+date[i].movieTitle+'"><a onclick="kc.movieChoice.select('+'\''+date[i].movieTitle+'\','+'\''+date[i].moviePoster+'\') ">'+date[i].movieTitle+'</a></td></tr>'
            });
            $('#datatable').append(kc.compUI.h1('title-movie'));
            $('#title-movie').html('<h2>상영중인 영화</h2>');
            $('#datatable').append(movie_t).css({'color':'red'});

            $('#content').append(kc.compUI.img('next','./img/nextlogo.jpg'));
            $('#next').attr('type','hidden');


        })


    };
    var select=(x,y)=>{
        alert('예매된 영화는'+x,y);
        sessionStorage.setItem("TitleMT",x);
        sessionStorage.setItem("ResMT",y);
        $('#movie-table-td-poster').attr('id','cg-poster');
        $('#cg-poster').html('<img src="'+ sessionStorage.getItem("ResMT")+'">');
        $('#next').attr('type','');

       /* $('#content').append(kc.compUI.html('next','./img/nextlogo.jpg'));
            $('#next').click(()=>{
            kc.movieLocalchoice.onCreate();
        });*/
        $('#next').click(()=>{
            kc.movieLocalchoice.onCreate();
        });

    };
    return{onCreate:onCreate,select:select};
})();
//영화예매 - 지역선택
kc.movieLocalchoice=(function () {
    var onCreate=function () {
        setContentView();
    };
    var setContentView=function () {
        $('body').empty();

        $('body').html(kc.compUI.div('wrapper')).css({'background':'white'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));
        $('#content').html(kc.compUI.div('titleBar'));



        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));

        $('#title').append(/*kc.cookie.getCookie('dest')+*/'   예매 - 지역 선택 페이지');
        $('#title').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'#ff001e'
            ,'color':'#fef9ff'
        });


        $('#content').append(kc.compUI.table('movie-table'));
        $('#movie-table').append(kc.compUI.tr1('movie-table-tr'));
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-poster'));
        $('#movie-table-td-poster').html('<img src="'+ sessionStorage.getItem("ResMT")+'">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-cinema'));
        $('#movie-table-td-cinema').html('<img src="./img/menu_theater.png">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-day'));
        $('#movie-table-td-day').html('<img src="./img/menu_date_off.png">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-time'));
        $('#movie-table-td-time').html('<img src="./img/menu_time_off.png">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)'});

        $('#content').append(kc.compUI.table('datatable'));
        $('#datatable').append(kc.compUI.span('localSpan'));
        /*극장리스트*/
        $.getJSON('./json/region.json',(date)=>{
            var localList='';
            var localStore='';
            $.each(date,(i,j)=>{

                localList+='<span><a onclick="kc.movieLocalchoice.select('+'\''+date[i].local+'\','+'\''+date[i].city+'\','+'\''+date[i].city1+'\') ">'+date[i].local+'</a></td></tr></span><br>';
                //   localStore+='<span><a onclick="kc.movieLocalchoice.select('+'\''+date[i].local+'\','+'\''+date[i].store+'\') ">'+date[i].store+'</a></td></tr></span>'
            });
            $('#movie-table').append(kc.compUI.h1('title-movie'));
            $('#title-movie').html('<h2>지역</h2>');
            $('#title-movie').append(localList).css({'color':'red'});
            //  $('#datatable').append(localStore);

        });




    };
    var select=(x,y,z)=>{
        alert('지역'+x);
        sessionStorage.setItem("LocalMT",x);
        sessionStorage.setItem("StoreMT",y);
        sessionStorage.setItem("Store1MT",z);
        $('#movie-table-td-cinema').attr('id','cg-local');
        $('#cg-local').html('<span>'+sessionStorage.getItem("LocalMT")+'</span>');
        $('#title-movie').empty();

        $('#content').append(kc.compUI.table('datatable'));
        $('#movie-table').append(kc.compUI.h1('title-movie'));
        $('#title-movie').html('<h2>지역</h2>');
        $('#datatable').append(kc.compUI.span('storeSpan'));
        $('#storeSpan').attr('name', sessionStorage.getItem("Store1MT")).html(sessionStorage.getItem("StoreMT")+'<br>');
        $('#storeSpan').click((x)=>{
            $('#cg-local').html('<span>'+sessionStorage.getItem("LocalMT")+'</span><br>').css({'text-align': 'center','color':'white'});
            $('#cg-local').append('<span>'+sessionStorage.getItem("StoreMT")+'</span>').css({'text-align': 'center','color':'white'});
           /* $('#content').append(kc.compUI.image('next','./img/nextlogo.jpg'));*/

            $('#content').append(kc.compUI.img('next','./img/nextlogo.jpg'));
            $('#next').attr('type','hidden');

            $('#next').click(()=>{
                sessionStorage.removeItem("Store1MT");
                kc.movieDateChoice.onCreate(x);
            });


        });

        $('#datatable').append(kc.compUI.span('storeSpan1'));
        $('#storeSpan1').attr('name', sessionStorage.getItem("Store1MT")).html(sessionStorage.getItem("Store1MT"));
        $('#storeSpan1').click((x)=>{
            $('#cg-local').html('<span >'+sessionStorage.getItem("LocalMT")+'</span><br>');
            $('#cg-local').append('<span >'+sessionStorage.getItem("Store1MT")+'</span>');
            $('#cg-local').css({'text-align': 'center','color':'white'});
            $('#next').attr('type','');
            $('#next').click(()=>{
                sessionStorage.removeItem("StoreMT");

                kc.movieDateChoice.onCreate(x);
            });

        });


    };
    return{onCreate:onCreate,select:select};
})();
//영화예매 - 상영시간 선택
kc.movieDateChoice=(function () {
    var onCreate=function () {
        setContentView();
    };
    var setContentView=function () {
        // $('body').empty();

        $('body').html(kc.compUI.div('wrapper')).css({'background':'white'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));
        $('#content').html(kc.compUI.div('titleBar'));

        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));

        $('#title').append(/*kc.cookie.getCookie('dest')+*/'   예매 - 예매일 선택 페이지');
        $('#title').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'#ff001e'
            ,'color':'#fef9ff'
        });


        $('#content').append(kc.compUI.table('movie-table'));
        $('#movie-table').append(kc.compUI.tr1('movie-table-tr'));
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-poster'));
        $('#movie-table-td-poster').html('<img src="'+ sessionStorage.getItem("ResMT")+'">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-cinema'));

        if(sessionStorage.getItem("StoreMT")==null){
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("Store1MT")).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});

        }else{
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("StoreMT")).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        }
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-day'));
        $('#movie-table-td-day').html('<img src="./img/menu_date_off.png">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-time'));
        $('#movie-table-td-time').html('<img src="./img/menu_time_off.png">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});

        $('#content').append(kc.compUI.table('datatable'));
        $('#datatable').append(kc.compUI.input('day','text'));
        $('#day').attr('placeholder','입력창을 클릭하세요');

        $('#day').datepicker({
            dateFormat: 'yy.mm.d DD',
            prevText: '이전 달',
            nextText: '다음 달',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            dayNames: ['일','월','화','수','목','금','토'],
            dayNamesShort: ['일','월','화','수','목','금','토'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
            showMonthAfterYear: true,
            changeMonth: true,
            changeYear: true,
            yearSuffix: '년',
            maxDate:7,
            minDate:0
        });

        $('#content').append(kc.compUI.img('next','./img/nextlogo.jpg'));


            $('#next').click(()=>{
                if($('#day').val()!=''){
                    sessionStorage.setItem('daysession',$('#day').val());
                    alert(sessionStorage.getItem('daysession'));
                    $('#movie-table-td-day').attr('id','M-Day');
                    $('#M-Day').html(sessionStorage.getItem('daysession')).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});;

                    kc.movieCinemaChoice.onCreate();
                }else{
                    alert('입력이 안되었습니다. 날짜를 입력하세요');
                }
            });









    };
    var select=(z,x,c,v)=>{
        alert(z,x,c,v);

    };

    return{onCreate:onCreate,select:select};
})();
kc.movieCinemaChoice=(function () {
    var onCreate=function () {
        setContentView();
    };
    var setContentView=function () {
        // $('body').empty();

        $('body').html(kc.compUI.div('wrapper')).css({'background':'white'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));
        $('#content').html(kc.compUI.div('titleBar'));

        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));

        $('#title').append(/*kc.cookie.getCookie('dest')+*/'   예매 - 시간 선택 페이지');
        $('#title').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'#ff001e'
            ,'color':'#fef9ff'
        });


        $('#content').append(kc.compUI.table('movie-table'));
        $('#movie-table').append(kc.compUI.tr1('movie-table-tr'));
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-poster'));
        $('#movie-table-td-poster').html('<img src="'+ sessionStorage.getItem("ResMT")+'">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-cinema'));

        if(sessionStorage.getItem("StoreMT")==null){
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("Store1MT")).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});

        }else{
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("StoreMT")).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        }
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-day'));
        $('#movie-table-td-day').html(sessionStorage.getItem('daysession')).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-time'));
        $('#movie-table-td-time').html('<img src="./img/menu_time_off.png">').css({'width':'150px','background':'rgb(51, 51, 51)','color':'white'});

        $('#content').append(kc.compUI.table('datatable'));
        $('#datatable').append(kc.compUI.tr1('dataTr'));
        $('#dataTr').append(kc.compUI.td1('dataTd'));
        $.getJSON('./json/cinema1.json',(date)=>{

            var cinemalist='';
            $.each(date,(i,j)=>{
                cinemalist+='<tr id="'+date[i].cinema+'">';
                cinemalist+='<td><a  onclick="kc.movieCinemaChoice.select('+'\''+date[i].cinema+'\')">'+date[i].cinema+'</a> '
                         +'</td>'
             cinemalist+='</tr>';
            });
            $('#dataTr').html(cinemalist);

        });
        $('#content').append(kc.compUI.img('next','./img/nextlogo.jpg'));
        $('#next').attr('type','hidden');







    };
    var select=(z)=>{
        alert('선택된 영화관'+z);
        sessionStorage.setItem('cinema',z);

        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-time'));
        $('#movie-table-td-time').html(sessionStorage.getItem('cinema')).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
       $('#next').attr('type','');
        $('#next').click(()=>{

            kc.movieTimeChoice.onCreate();
        })

    };

    return{onCreate:onCreate,select:select};
})();
kc.movieTimeChoice=(function () {
    var onCreate=function () {
        setContentView();
    };
    var setContentView=function () {
        // $('body').empty();

        $('body').html(kc.compUI.div('wrapper')).css({'background':'white'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));
        $('#content').html(kc.compUI.div('titleBar'));

        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));

        $('#title').append(/*kc.cookie.getCookie('dest')+*/'   예매 - 시간 선택 페이지');
        $('#title').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'#ffdeec'
        });


        $('#content').append(kc.compUI.table('movie-table'));
        $('#movie-table').append(kc.compUI.tr1('movie-table-tr'));
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-poster'));
        $('#movie-table-td-poster').html('<img src="'+ sessionStorage.getItem("ResMT")+'">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-cinema'));

        if(sessionStorage.getItem("StoreMT")==null){
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("Store1MT")).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});

        }else{
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("StoreMT")).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        }
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-day'));
        $('#movie-table-td-day').html(sessionStorage.getItem('daysession')).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-time'));
        $('#movie-table-td-time').html(sessionStorage.getItem('cinema')).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});


        $('#content').append(kc.compUI.table('datatable'));
        $('#datatable').append(kc.compUI.tr1('dataTr'));
        $('#dataTr').append(kc.compUI.td1('dataTd'));
        $.getJSON('./json/cinema1.json',(date)=>{

            var timelist='';
            $.each(date,(i,j)=>{
                timelist+='<tr id="'+date[i].time+'">';
                timelist+='<td><a  onclick="kc.movieTimeChoice.select('+'\''+date[i].time+'\')">'+date[i].time+'</a> '
                    +'</td>'
                timelist+='</tr>';
            });
            $('#dataTr').html(timelist);

        });


        $('#content').append(kc.compUI.img('next','./img/nextlogo.jpg'));
        $('#next').attr('type','hidden');





    };
    var select=(z)=>{
        alert('선택된 시간'+z);
        sessionStorage.setItem('time',z);
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-time'));
        $('#movie-table-td-time').html(sessionStorage.getItem('cinema')).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-td-time').append(kc.compUI.th('movie-table-td-times'));
        $('#movie-table-td-times').append(sessionStorage.getItem('time')).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});

        $('#next').attr('type','');
        $('#next').click(()=>{
            $('#movie-table-td-time').css({'background':'rgb(255, 0, 0)'});
            kc.moviereservationSeat.onCreate();
        })

    };

    return{onCreate:onCreate,select:select};
})();
/*kc.movieTime=(()=>{
    var onCreate=()=>{
        setContentView();
    };
    var setContentView=()=>{
        $('body').empty();
        $('body').html(kc.compUI.div('wrapper')).css({'background':'white'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));
        $('#content').html(kc.compUI.div('titleBar'));
        $('#content').append(introUI.navbar());fu();
        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));

        $('#title').append(/!*kc.cookie.getCookie('dest')+*!/'   예매 - 시간 선택 페이지');
        $('#title').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'#ffdeec'
        });


        $('#content').append(kc.compUI.table('movie-table'));
        $('#movie-table').append(kc.compUI.tr1('movie-table-tr'));
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-poster'));
        $('#movie-table-td-poster').html('<img src="'+ sessionStorage.getItem("ResMT")+'">').css({'height':'150px','background':'#d1eef0'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-cinema'));

        if(sessionStorage.getItem("StoreMT")==null){
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("Store1MT")).css({'height':'150px','background':'#d1eef0'});

        }else{
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("StoreMT")).css({'height':'150px','background':'#d1eef0'});
        }
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-day'));
        $('#movie-table-td-day').html(sessionStorage.getItem('setCinema')).css({'height':'150px','background':'#d1eef0'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-time'));
        $('#movie-table-td-time').text('해당 상영시간 들어갈 공간').css({'height':'150px','background':'#d1eef0'});


    };
    var select=()=>{

    };
    return{onCreate:onCreate,select:select};
})();*/



var count=0;
var total=0;
var totalCount=0;
var adultCount=0;
var youthCount=0;
var childCount=0;
//영화 -좌석 선택
kc.moviereservationSeat=(function () {
    var onCreate=function (x,y) {
        setContentView();
        kc.moviereservationSeat.select(x);

    };
    var setContentView=function () {
        $('body').html(kc.compUI.div('wrapper')).css({'background':'white'});
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%'});
        $('#container').html(kc.compUI.div('content'));
        $('#content').html(kc.compUI.div('titleBar'));

        $('#titleBar')
            .css({'width':'100%'
                ,'height':'10%'
            }).append(kc.compUI.h1('title'));

        $('#title').append(/*kc.cookie.getCookie('dest')+*/'   예매 - 좌석 선택 페이지');
        $('#title').css({
            'text-align': 'center'
            ,'padding-top':'10px'
            , 'padding-bottom': '10px'
            ,'border-style': 'dashed'
            ,'border-color': '#f5c692'
            ,'font-size': '30px'
            ,'background':'#ff001e'
            ,'color':'#fef9ff'
        });
        var num=0;
        sessionStorage.setItem('cnt',num);

        $('#content').append(kc.compUI.table('movie-table'));
        $('#movie-table').append(kc.compUI.tr1('movie-table-tr'));
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-poster'));
        $('#movie-table-td-poster').html('<img src="'+ sessionStorage.getItem("ResMT")+'">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-cinema'));

        if(sessionStorage.getItem("StoreMT")==null){
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("Store1MT")).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});

        }else{
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("StoreMT")).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        }
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-day'));
        $('#movie-table-td-day').html(sessionStorage.getItem('daysession')).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-time'));
        $('#movie-table-td-time').html(sessionStorage.getItem('cinema')).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-td-time').append(kc.compUI.th('movie-table-td-times'));
        $('#movie-table-td-times').html(sessionStorage.getItem('time')).css({'width':'150px','background':'rgb(51, 51, 51)','color':'white'});

        $('#content').append(kc.compUI.div('cinemaReservation'));
        $('#cinemaReservation').append(kc.compUI.table('cinemaRes'));
        $('#cinemaReservation').css({'margin':'0 auto','width':'200px'});
       /* var cinema_re=
        var change='';
        var reservation='';
        $.each(cinema_re,(i,j)=>{
            reservation+='';
        });*/
        var arr = ['A','B','C','D','E','F'];
        $('#cinemaRes').css({'border-collapse': 'collapse','width':'auto'});
        var tr ='';
        var c=0;
        for(var i=1;i<7;i++){
            tr += '<tr id="table-tr">'
            for(var j=1;j<6;j++){
                c=c+1;
                tr += '<td id="'+c+'" value="0"><a onclick="kc.moviereservationSeat.select('+'\''+c+'\','+'\''+arr[i-1]+j+'\')"> '+arr[i-1]+j+'</a></td>>'
            }
        tr+='</tr>'
        }

             $('#cinemaRes').html(tr).css({'margin-top': '20px'});

           /*$('#cinemaRes').html(tr).css({'margin-top': '20px'});*/


        $('tr').css({'border':'1px solid black','height':'50px','width':'50px'});
         $('td').css({'border':'1px solid black','height':'50px','width':'50px','text-align':'center'});
/*


        $('#next').click(()=>{

           kc.confirm.onCreate();
        });
*/
        $('#content').append(kc.compUI.img('next','./img/nextlogo.jpg'));
        $('#next').attr('type','hidden');

         var pc=['0','1','2','3','4','5','6','7','8'];
         var adult=['adult'];
         var yuth=['youth'];
         var chlidren=['child'];

         var price=['8000','11000'];
         var adultList='';
         var yuthList='';
         var childrenList='';


       $.each(adult,(index,value)=>{
            adultList+='<tr id="adultList"><td id="'+value+'" value="'+value+'">'+value+'</td>';
            $.each(pc,(i,j)=>{
                adultList+='<td id="'+value+i+'" value="'+0+'"><a onclick="kc.moviereservationSeat.select1('+'\''+pc[i]+'\','+'\''+value+'\')">'+pc[i]+'</a></td>';
            });
            adultList+='</tr>';
        });
        $.each(yuth,(index,value)=>{
            yuthList+='<tr id="yuthList"><td id="'+value+'" value="'+value+'">'+value+'</td>';
            $.each(pc,(i,j)=>{
                yuthList+='<td id="'+value+i+'" value="'+0+'"><a onclick="kc.moviereservationSeat.select1('+'\''+pc[i]+'\','+'\''+value+'\')">'+pc[i]+'</a></td>';
            });
            yuthList+='</tr>';
        });
        $.each(chlidren,(index,value)=>{
            childrenList+='<tr id="childrenList"><td id="'+value+'" value="'+value+'">'+value+'</td>';
            $.each(pc,(i,j)=>{
                childrenList+='<td id="'+value+i+'" value="'+0+'"><a onclick="kc.moviereservationSeat.select1('+'\''+pc[i]+'\','+'\''+value+'\')">'+pc[i]+'</a></td>';
            });
            childrenList+='</tr>';
        });

        $('#movie-table').append(kc.compUI.table('adultTable'));
        $('#movie-table').append(kc.compUI.table('yuthTable'));
        $('#movie-table').append(kc.compUI.table('childrenTable'));
        $('#adultTable').html(adultList);
        $('#yuthTable').html(yuthList);
        $('#childrenTable').html(childrenList);
           /* $('#content').append(kc.compUI.image('next','./img/nextlogo.jpg'));*/
           // kc.confirm.onCreate();



    };

    /*인원 수 체크 */
    var select1=(x,y)=>{
        alert(x+'인원 수 ,'+y+'가 왔나?');
        sessionStorage.setItem('adult',y);
        /*alert($('#'+x).attr('value')+'#########');
            if($('#'+x).attr('value')==0){
                $('#'+x).css({'background-color':'red'});
                $('#'+x).attr('value','1');
                $('#'+x).attr('disabled','true');
                alert("if문 안 0일때 1로 바꿈");
        }
        else if($('#'+x).attr('value')==1){
            $('#'+x).css({'background-color':'white'});
            $('#'+x).attr('value','0'); $('#'+x).attr('disabled','false');
            alert("if문 안 1일때 0로 바꿈");
        }*/

        $('#content').append(kc.compUI.input('adultCount','hidden'));
        $('#content').append(kc.compUI.input('youthCount','hidden'));
        $('#content').append(kc.compUI.input('childCount','hidden'));
        $('#content').append(kc.compUI.input('totalCount','hidden'));
        $('#content').append(kc.compUI.input('total','hidden'));
        if (y==="adult") {
            $('#adultCount').val(x);
            alert($('#adultCount').val());
            total=Number($('#adultCount').val());
            alert('일반');
            if (total>=9) {
                alert('예약가능 인원수는 8명 이하입니다');
                $('#adultCount').val('0');
                return false;
            }else{$('#adultList td a').attr('onclick','false');
                $('#'+y+x).attr('class','selected').css({'background-color':'red'});
                alert('너냐? :'+total);
                sessionStorage.setItem('total',total);

            }

        };


        if (y==="youth") {
            alert('청소년');
            $('#youthCount').val(x);
            alert($('#youthCount').val());
           alert(Number($('#adultCount').val())+Number($('#youthCount').val()));
            if(Number($('#adultCount').val())+Number($('#youthCount').val())<9){
                total=Number(total)+Number($('#youthCount').val());
                if (total>=9) {
                    alert('예약가능 인원수는 8명 이하입니다');
                    return false;
                }else{
                    $('#yuthList td a').attr('onclick','false');
                    $('#'+y+x).attr('class','selected').css({'background-color':'red'});
                    alert(total);
                    sessionStorage.setItem('total',total);

                }
            }else{
                alert('안되 임마!')
                return false;
            }
        }
        if (y==="child") {
            alert('어린이');
            $('#childCount').val(x);
            alert(Number($('#childCount').val())+'ChildCount -----------');
            alert(Number($('#childCount').val())+Number($('#adultCount').val())+Number($('#youthCount').val())+'################');
            if(Number($('#childCount').val())+Number($('#adultCount').val())+Number($('#youthCount').val())<=9){
                total=Number(total)+Number($('#childCount').val());
                if (total>9) {
                    alert('예약가능 인원수는 8명 이하입니다');
                    return false;
                }else {
                    $('#childrenList td a').attr('onclick', 'false');
                    $('#' + y + x).attr('class', 'selected').css({'background-color': 'red'});
                    alert(total);
                    sessionStorage.setItem('total',total);

                }
            }else{
                alert('안되 임마');
                return false;
            }

            }
        adultCount=parseInt($('#adultCount').val());
        youthCount=parseInt($('#youthCount').val());
        childCount=parseInt($('#childCount').val());



        /*alert('adult'+adultCount
            +'yuth'+youthCount
            +'childern'+childCount
        );*/



    };


    /*     좌석   */
    var select=(x,y)=>{

                 alert('예매된 좌석은'+x+'입니다.'+'좌석'+y);
               //sessionStorage.setItem('seat',y);

    var sc=sessionStorage.getItem('total');

    sessionStorage.setItem('resBtn',x);
alert($('#'+x).attr('value')+'#########');

        var s=[];

    if($('#'+x).attr('value')==0){

        alert(sc+'sc');
        alert('선택할수 있는 좌석 갯수는 : '+sc+'개 입니다');

        if(sc<=0){
            alert('선택한 인원수를 초과하여 좌석을 선택하였습니다.');
            return false;
        }else{
            $('#'+x).css({'background-color':'red'});
            $('#'+x).attr('value','1');
            $('#'+x).attr('disabled','true');
            $('#'+x).attr('class','seated');
            sc=sc-1;
            sessionStorage.setItem('total',sc);
            var cnt=(sessionStorage.getItem('cnt')*1)+1;
            sessionStorage.setItem('cnt',cnt);
            $('#'+x+' a').attr('onclick', 'false');



           alert("if문 안 0일때 1로 바꿈");
        }


    }
    else if($('#'+x).attr('value')==1){
        $('#'+x).css({'background-color':'white'});
        $('#'+x).attr('value','0'); $('#'+x).attr('disabled','false');
        sc=sc+1;
        sessionStorage.setItem('total',sc);
        alert("if문 안 1일때 0로 바꿈");
        $('#'+x).removeClass('seated');
        var cnt= (sessionStorage.getItem('cnt')*1)-1;
        sessionStorage.setItem('cnt',cnt);

        alert(sc);
    }
if(sessionStorage.getItem('cnt')==total){
    $('#adultCount').text(adultCount * 11000);
    $('#youthCount').text(youthCount * 7000);
    $('#childCount').text(childCount * 5000);
    $('#totalCount').text(adultCount*11000+youthCount*7000+childCount*5000 ||adultCount*11000+youthCount*7000||+youthCount*7000+childCount*5000||adultCount*11000 +childCount*5000||adultCount * 11000 ||youthCount * 7000 ||childCount*5000);
    sessionStorage.setItem('price', $('#totalCount').text());
}


       $('#movie-table-td-times').append(kc.compUI.th('people'));
        $('#people').html(sessionStorage.getItem('cnt')+'명').css({'width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-td-times').append(kc.compUI.span('seatST'));
        $('#seatST').css({'width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-td-times').append(kc.compUI.div('priceDiv'));
        $('#priceDiv').append(kc.compUI.span('price'));
        $('#price').append(sessionStorage.getItem('price')).css({'width':'150px','background':'rgb(51, 51, 51)','color':'white'});

       if ($('#seatST').text()==="") {

           $('#seatST').text(y).text;

       }
       else {
           var text = $('#seatST').text();
           $('#seatST').text(text+','+y+'  ');


       }
       $('#nate').attr('type','');
        $('#next').click(()=>{

            kc.confirm.onCreate();
        });
       sessionStorage.setItem('seat',text);


    /*    var text='';

        if($('#seat').text() !== "") {
            alert(' null값이 아닐때');
            text = $('#seat').text();
            $('#seat').text(text + "," + y);
            alert( $('#seat').text(text + "," + y)+'확인중입니다.');
        }
        else if ($('#seat').text()==="") {
            alert(' null값일때');
            $("#seat").text(y);
            alert($("#seat").text(y).val()+'확인 중');

        }*/


    };


    return{onCreate:onCreate,select:select,select1:select1};
})();
//영화예매 - 인증페이지
kc.confirm=( ()=> {
    var onCreate= ()=> {
        setContentView();
    };
    var setContentView= ()=> {
        $('body').empty();
        $('body').html(kc.compUI.div('wrapper'));
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%','background':'white'});
        $('#container').html(kc.compUI.div('content'));
        $('#content').append(introUI.navbar());fu();
        $('#content').html(kc.compUI.div('titleBar'))
            .css({'width':'100%'
                ,'height':'10%'
                ,'text-align': 'center'
                ,'padding-top':'10px'
                , 'padding-bottom': '10px'
                ,'border-style': 'dashed'
                ,'border-color': '#f5c692'
                ,'font-size': '30px'
                ,'background':'#ff001e'
                ,'color':'#fef9ff'
            }).text('인증 페이지');


        $('#container').append(kc.compUI.table('movie-table'));
        $('#movie-table').append(kc.compUI.tr1('movie-table-tr'));
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-poster'));
        $('#movie-table-td-poster').html('<img src="'+ sessionStorage.getItem("ResMT")+'">').css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-cinema'));

        if(sessionStorage.getItem("StoreMT")==null){
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("Store1MT")).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});

        }else{
            $('#movie-table-td-cinema').html(sessionStorage.getItem("LocalMT")+'<br>'+ sessionStorage.getItem("StoreMT")).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        }
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-day'));
        $('#movie-table-td-day').html(sessionStorage.getItem('daysession')).css({'height':'200px','width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-tr').append(kc.compUI.th('movie-table-td-time'));
        $('#movie-table-td-time').html(sessionStorage.getItem('cinema')).css({'width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-td-time').append(kc.compUI.th('movie-table-td-times'));
        $('#movie-table-td-times').html(sessionStorage.getItem('time')).css({'width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-td-times').append(kc.compUI.th('people'));
        $('#people').html(sessionStorage.getItem('cnt')+'명').css({'width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table-td-times').append(kc.compUI.th('movie-table-td-times1'));
        $('#movie-table-td-times1').html('<br><h3>좌석번호 : </h3>'+sessionStorage.getItem('seat')).html('<br>').css({'width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#seatST').html('<br>');
        $('#movie-table-td-times').append(kc.compUI.span('price'));
        $('#price').append(sessionStorage.getItem('price')).css({'width':'150px','background':'rgb(51, 51, 51)','color':'white'});
        $('#movie-table').append(kc.compUI.div('okDiv'));
        $('#okDiv').append(kc.compUI.input('okBtn','button'));
        $('#okBtn').attr('value','나가기');
            $('#container').append(kc.compUI.div('location'));
            $('#container').append(kc.compUI.div('googlemap'));
            $('#googlemap').css({'width':'500px','height':'380px'});


            function  myLocation() {
                //객체가 존재하면
                if(navigator.geolocation){
                    //getCurrentPosition메서드 호출(위치를 가져오는 핸들러함수를 피라미터로)
                    navigator.geolocation.getCurrentPosition(successHandler,errorHandler);
                }else{
                    alert('not support geolocation');
                }
            }

            //위치정보를 가져오는 사용자정의 핸들러 함수
            function  successHandler(position) {
                var latitude=position.coords.latitude;
                var longitude=position.coords.longitude;
                var loc=document.getElementById('location');
                loc.innerHTML='현재위치는 위도'+latitude+',경도'+longitude;
                showMap(position.coords);
            }
            //실패한 경우
            function  errorHandler(error) {
                var errorCode=error.code;
                var errorMessage=error.message;

                var loc=document.getElementById('location');
                loc.innerHTML='실패 : '+errorCode+'/'+errorMessage;
            }
            //google지도위에 보여주기
            function showMap(coords) {
                //구글맵 객체 생성자 (위도 경도)
                var googleLatLng=new google.maps.LatLng(coords.latitude,coords.longitude);
                //지도가 보이는 형태
                var googleOption={
                    zoom:15,
                    center:googleLatLng,
                    mapTypeId : google.maps.MapTypeId.ROADMAP

                };
                var map=document.getElementById('googlemap');
                //지도보이기
                new google.maps.Map(map,googleOption);
            }
            window.onload=myLocation();


        $('#okBtn').text('나가기').click(()=>{
           kc.main.onCreate();
        });


    };

    return{onCreate:onCreate};
})();
//위화면 구성다하면
//마이페이지
kc.myPage=(function () {
    var onCreate=function () {
        setContentView();
    };
    var setContentView=function () {
        $('body').empty();
        $('body').html(kc.compUI.div('wrapper'));
        $('#wrapper').html(kc.compUI.div('container'))
            .css({'width':'100%','height':'100%','background':'white'});
        $('#container').html(kc.compUI.div('content'));

        $('#content').html(kc.compUI.div('titleBar'))
            .css({'width':'100%'
                ,'height':'10%'
                ,'text-align': 'center'
                ,'padding-top':'10px'
                , 'padding-bottom': '10px'
                ,'border-style': 'dashed'
                ,'border-color': '#f5c692'
                ,'font-size': '30px'
            }).text('구글 페이지');
       /* $('#container').append(kc.compUI.input('button','button'));
                    $('#button').attr('value','내위치 위도,경도 알아내기버튼');
        $('#container').append(kc.compUI.input('start','button'));
        $('#start').attr('value','위치추적시작버튼');
        $('#container').append(kc.compUI.input('stop','button'));
        $('#stop').attr('value','위치추적중단버튼');


        $(document).ready(function(){

            $('#button').on('click',function(){
                window.navigator.geolocation.getCurrentPosition(success, error);//()를 붙여 자동호출하는것 x
            });
        });

        function success(position){
            $('div').text("내 위치 위도 = " + position.coords.latitude
                +" 내 위치 경도 = " + position.coords.longitude);
        }
        function error(err){
            $('div').text("조회 실패 ==>" + err.code);
        }


        $(document).ready(function(){
            $('#start').on('click',function(){
                id = window.navigator.geolocation.watchPosition(success, error, {
                    enableHighAccuracy : true,
                    maximumAge : 0
                });
            });
            $('#stop').on('click',function(){
                window.navigator.geolocation.clearWatch(id);
                $('div').text("위치추적 중단합니다.");
            });
        });


        $('#container').append(kc.compUI.div('googleMap'));
        $('#googleMap').css({'width':'500px','height':'380px'});

        function initialize() {
            var mapProp = {
                center:new google.maps.LatLng(37.566535, 126.977969),
                zoom:5,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
        }
        google.maps.event.addDomListener(window, 'load', initialize);



        function getLocation() {
        if(navigator.geolocation){//GSP를 지원하면
            navigator.geolocation.getCurrentPosition(function (position) {
                alert(position.coords.latitude+'  '+position.coords.longitude)
            },function (error) {
                console.error(error);
            },{
               enableHighAccuracy:false,
               maximumAge:0,
               timeout:Infinity
            });

        }else{
            alert('GPS를 지원하지 않습니다.')
        }
        }
        getLocation();
*/
       $('#container').append(kc.compUI.div('location'));
        $('#container').append(kc.compUI.div('googlemap'));
        $('#googlemap').css({'width':'500px','height':'380px'});


    function  myLocation() {
        //객체가 존재하면
        if(navigator.geolocation){
            //getCurrentPosition메서드 호출(위치를 가져오는 핸들러함수를 피라미터로)
            navigator.geolocation.getCurrentPosition(successHandler,errorHandler);
        }else{
         alert('not support geolocation');   
        }
    }
    
    //위치정보를 가져오는 사용자정의 핸들러 함수
        function  successHandler(position) {
            var latitude=position.coords.latitude;
            var longitude=position.coords.longitude;
            var loc=document.getElementById('location');
            loc.innerHTML='현재위치는 위도'+latitude+',경도'+longitude;
            showMap(position.coords);
        }
    //실패한 경우
        function  errorHandler(error) {
            var errorCode=error.code;
            var errorMessage=error.message;

            var loc=document.getElementById('location');
            loc.innerHTML='실패 : '+errorCode+'/'+errorMessage;
        }
        //google지도위에 보여주기
        function showMap(coords) {
            //구글맵 객체 생성자 (위도 경도)
            var googleLatLng=new google.maps.LatLng(coords.latitude,coords.longitude);
            //지도가 보이는 형태
            var googleOption={
                zoom:15,
                center:googleLatLng,
                mapTypeId : google.maps.MapTypeId.ROADMAP

        };
            var map=document.getElementById('googlemap');
            //지도보이기
            new google.maps.Map(map,googleOption);
        }
        window.onload=myLocation();


    };
    return{onCreate:onCreate};
})();
//관리자페이지
kc.adminPage=(function () {
    var onCreate=function () {
        setContentView();
    };
    var setContentView=function () {

    };
    return{onCreate:onCreate};
})();
//회원정보 수정
kc.memberInfoUpdate=(function () {
    var onCreate=function () {
        setContentView();
    };
    var setContentView=function () {

    };
    return{onCreate:onCreate};
})();
var introUI={

    navbar : ()=>{
        return '<nav id="primary_nav">'
            +'<a href="#" id="mobile_nav">&#9776;</a>'
            +' <ul>'
            +' <li><a href="#" id="home">CGV HOME</a></li>'
            +' <li><a href="#" id="login">로그인</a>'
            +' <li><a href="#" id="resBtn">예매하기</a></li>'

            +'  </ul>'
            +' </nav>'
    }

};

fu=()=>{
    return $(document).ready(function() {
        $("#mobile_nav").click(function () {
            //toggles nav and ensures other elements play nice too
            if ($("#primary_nav").css('left') < "0px") {
                $("#primary_nav").animate({left: "0px"}, 200);
                $("#wrapper_main_content").animate({left: "170px"}, 200);
                $("#wrapper_main_content").css("overflow-y", "hidden");
                $("body").css("overflow-x", "hidden");
                $("#primary_nav").css("overflow-y", "hidden");
            } else {
                $("#primary_nav").animate({left: "-140px"}, 200);
                $("#wrapper_main_content").animate({left: "0px"}, 200);
                $("#wrapper_main_content").css("overflow-y", "hidden");
                $("body").css("overflow-x", "hidden");
            }
            $('#home').click(() => {
                kc.main.onCreate();
            });
            $('#login').click(() => {
                kc.login.onCreate();
            });
            $('#resBtn').click(() => {
                kc.login.onCreate();
                $('#login').text('로그아웃');
                $('#login').attr('id','logout');
                $('#resBtn').attr('id','loginResBtn');
                $('#loginResBtn').attr('id','cancelResBtn');
                $('#cancelResBtn').remove();


         });

            $('#loginResBtn').click(()=>{
                kc.movieChoice.onCreate();
                $('#login').text('로그아웃');
                $('#login').attr('id','logout');
                $('#resBtn').attr('id','loginResBtn');
                $('#loginResBtn').attr('id','cancelResBtn');
                $('#cancelResBtn').remove();

            });
            $('#next').click(()=>{

                $('#login').text('로그아웃');
                $('#login').attr('id','logout');
                $('#resBtn').attr('id','loginResBtn');
                $('#loginResBtn').attr('id','cancelResBtn');
                $('#cancelResBtn').remove();


            });

            //logout
                 $('#logout').click(()=>{
                     kc.main.onCreate();
                sessionStorage.clear();


            });
                });
            });

};





//cookie
kc.cookie={
    setCoockie:(k,v)=>{
        document.cookie = k+"=" +v;
    },
    getCookie:k=>{
        var x = k+ "=";
        var i = 0;
        var arr= document.cookie.split(';');
        for(i=0;i<arr.length;i++){
            var j = arr[i];
            while(j.charAt(0)==''){
                j=j.substring(1,j.length)
            }
            if(j.indexOf(x)==0){
                return j.substring(x.length,j.length);
            }
            return null;
        }

    },
    removeCookie: k=>{

    }
};


//compUI
kc.compUI = {
    br    :()=>{return $('<br/>');},
    div   : x=>{return $('<div/>',{id:x});},
    h1    : x=>{return $('<h1/>',{id:x});},
    span  : x=>{return $('<span/>',{id:x});},
    span1  : (x,y)=>{return $('<span/>',{id:x,class:y});},
    iTxt  : (x,y)=>{return $('<input/>',{id:x,type:'text',value:y});},
    aBtn  : x=>{return $('<a/>',{href:'#', role: 'button', id:x});},
    iBtn  : x=>{return $('<input/>',{id:x,type:'button'});},
    bBtn  : x=>{return $('<button/>',{id:x,type:'button'});},
    image : (x,y)=>{return $('<img/>',{id:x,src:y});},
    img : (x,y,z)=>{return $('<img/>',{id:x,src:y,alt:z});},
    table : x=>{return $('<table/>',{id:x})},
    tr :()=>{return $('<tr/>');},
    td :()=>{return $('<td/>')},
    tr1:(x)=>{return $('<tr/>',{id:x})},
    td1 :(x)=>{return $('<td/>',{id:x})},
    input : (x,y)=>{return $('<input/>',{id:x,type:y});},
    input2 : x=>{return $('<input/>',{id:x});},
    input1 : (x,y,z)=>{return $('<input/>',{type:x,src:y,alt:z});},
    btn : x=>{return $('<button>',{id:x})},
    nav: x=>{return $('<nav/>',{id: x});},
    ul : (x,y)=>{return $('<ul/>',{id:x,class:y})},
    li : (x,y)=>{return $('<li/>',{id:x,class:y})},
    li1: ()=>{return $('<li/>')},
    a : ()=>{return $('<a/>',{href:'#'})},
    video:(x,y)=>{return $('<video/>',{id:x,src:y});},
    dl   : x=>{return $('<dl/>',{id:x});},
    dd   : x=>{return $('<dd/>',{id:x});},
    dt   : x=>{return $('<dt/>',{id:x});},
    textarea : x=>{return $('<textarea/>',{id:x});},
    a1 : x=>{return $('<a/>',{id:x});},
    a2 : (x,y)=>{return $('<a/>',{id:x,class:y});},

    a3 : (x,y)=>{return $('<a/>',{id:x,href:'#'});},
    strong : (x,y)=>{return $('<strong/>',{id:x,class:y});},
    section : (x,y)=>{return $('<section/>',{id:x,class:y});},
    section1 : (x)=>{return $('<section/>',{class:x});},
    section2 : (x)=>{return $('<section/>',{id:x});},
    article : (x)=>{return $('<article/>',{class:x});},
    label : (x)=>{return $('<label/>',{id:x});},
    select : (x)=>{return $('<select/>',{id:x});},
    option : (x)=>{return $('<option/>',{id:x});},
    canvas : x=>{return $('<canvas/>',{id:x});},
    th:x=> {return $('<th/>',{id:x});},
};

kc.session=
    {
        init : (x)=>{
            sessionStorage.setItem('x',x);
            sessionStorage.setItem('j',x+'/www/js');
            sessionStorage.setItem('c',x+'/www/css');
            sessionStorage.setItem('i',x+'/www/img');
            sessionStorage.setItem('n',x+'/www/json');
        },
        getPath : (x)=>{
            return sessionStorage.getItem(x);
        }
    };
var $$ = (x)=>{return lsy.session.getPath(x);};

kc.valid ={
    isNumber : x=>{
        return typeof x === 'number' && isFinite(x);
    },
    pwChecker : x=>{
        var pw_regex = /^[0-9a-zA-Z]{4,10}$/;
        return pw_regex.test(x)?"yes":"no";
    },


};

$(function () {
    kc.initialize();
});
kc.initialize();