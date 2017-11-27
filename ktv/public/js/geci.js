$(function () {
    let playlist=JSON.parse( localStorage.song);
    let id=location.search.slice(4,6);
    let index=0;
    let lyric=[];
    console.log(playlist)
    ////////查找歌曲/////////
    playlist.forEach((element,i)=>{
        if(element.id == id){
            index = i;
            console.log(index);
        }
    })

    //////////播放暂停///////////////////
    let audio=$('.audio1');
    $('.zanting').on('click',function () {
        if(audio[0].paused){
            audio[0].play();
        }else{
            audio[0].pause();
        }
        console.log($(this))
    })

    ////////上一首//////////////////////
   $('.prev').on('click',function () {
       lyric.length=0;
       index --;
       console.log(index);
       if(index<0){
           index=playlist.length-1;
       }
       $.ajax({
           url:'/ktv/public/json/'+ playlist[index].sname+'.json',
           success:function (data) {
               let value=data.lrc.lyric.split('\n');
               value.forEach(ele=>{
                   let  t=ele.substr(1,5);
                   let  c=ele.substr(ele.indexOf(']')+1);
                   lyric.push({t,c});
                   //数组 --对象
               })
               //位置 歌词
               render(playlist[index],lyric);
           }
       })
   })

    /////////下一首/////////////////
    $('.next').on('click',function () {
        lyric.length=0;
        index ++;
        if(index > playlist.length){
            index=0;
        }
        $.ajax({
            url:'/ktv/public/json/'+ playlist[index].sname+'.json',
            success:function (data) {
                let value=data.lrc.lyric.split('\n');
                value.forEach(ele=>{
                    let  t=ele.substr(1,5);
                    let  c=ele.substr(ele.indexOf(']')+1);
                    lyric.push({t,c});
                    //数组 --对象
                })
                //位置 歌词
                render(playlist[index],lyric);
            }
        })
    })

    ////////同步歌词/////////////////
    let a=0;
    let z=0;
    audio[0].ontimeupdate = function(){
        let geci=$('.geci');
        let ct = timeModel(this.currentTime) ;
        let dt = timeModel(this.duration) ;
        let bili = this.currentTime / this.duration;
        let w=$('.jindu').outerWidth()/2;
        $('.ctime').text(ct);
        $('.duration').text(dt);
        $('.red').css('width',bili*86+'%');

        lyric.forEach((ele,i)=> {
            ////t==currentime///
            if (ele.t == ct) {
                a=i;
                z=i;
                if(a<=3){
                    a=0;
                }else{
                    a -=3;
                }
                let str='';
                geci.empty();
                for(let j=a;j<lyric.length;j++){
                    str +=`
                    <li class="lis${j}">${lyric[j]['c']}</li> `;
                }
                geci.html(str);
                $('.lis'+z).css('color','green');
            }

        })


    }

    function timeModel(time) {
      let m= Math.floor(time/60)<10 ?'0'+Math.floor(time/60):Math.floor(time/60);
      let s= Math.floor(time%60)<10 ?'0'+Math.floor(time%60):Math.floor(time%60);

      return m +':'+s;
    }

    //发请求拿歌词
    $.ajax({
        url:'/ktv/public/json/'+ playlist[index].sname+'.json',
        success:function (data) {
             let value=data.lrc.lyric.split('\n');
             value.forEach(ele=>{
                 let  t=ele.substr(1,5);
                 let  c=ele.substr(ele.indexOf(']')+1);
                 lyric.push({t,c});
                 //数组 --对象
             })
            //位置 歌词
            render(playlist[index],lyric);
        }
    })


    function  render(song,lyric) {
        audio.attr('src',song.music);
        $('.nav>h3').html(song.sname);
        $('.ctime').text('00:00');
        $('.duration').text(song.time);
        $('.geci').empty();
        let str='';
        lyric.forEach((v,i)=>{
            str +=`
             <li class="lis${i}"> ${v.c}</li>
            `;
        })
        $('.geci').html(str);

        // $('.ctime').text(song.time);
    }


})