$(function () {
    let sid = location.search.split('=')[1];
    let list=[];
    localStorage.song ? JSON.parse(localStorage.song) : [];
      $.ajax('/ktv/index.php/sing/gequ',{
            data:{sid},
            dataType:'json',
            success:function (data) {
               render(data[0]);
            }
        })
        function render(data){
            $('.gequ').empty();
            let str='';
            for(let i=0;i<data.length;i++){
                str=`
                   <li data='${JSON.stringify(data[i])}' class="songlist">
                        <span>${i+1}</span>
                         <div class="text">
                            <h3>${data[i]['sname']}-${data[i]['author']}</h3>
                             <h4>${data[i]['time']}</h4>
                         </div>
                         <img src="/ktv/public/img/add_07.png" alt="" class="tupian">
                    </li>
                `;
                $('.gequ').html(function(i,val){
                    return (val+str);
                })
            }
        }



   $('.gequ').on('click','.tupian',function (e) {
       let tops=$(this).offset().top;
       let lefts=$(this).offset().left;
       console.log($(this))
       let song=JSON.parse($(this).closest('li').attr('data'));

       if($(this).hasClass('xuanzhuan')){
           list= list.filter(ele=>ele.sname !=song.sname);
       }
       else{
           list.push(song);
           localStorage.song=JSON.stringify(list);
       }

       $(this).toggleClass('xuanzhuan');
       $('<div>').css({width:'0.5rem',height:'0.5rem',background:'red',borderRadius:'50%',position:'absolute',top:tops, left:lefts}).appendTo(document.body).animate({top:$('.shoucang').offset().top,left:$('.shoucang').offset().left}).queue(function () {
           $(this).remove();
       })

    })
    })