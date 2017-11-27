$(function () {
    let main=$('.main');
    let page=$('.page');
    let nav=$('.nav');
    let btn=$('button');
    let type=location.search.slice(-1);
    main.on('click','li',function () {
        if($('.main>li.active').length==1){
            page.addClass('active');
        }
        $(this).css({transform:'rotateY(360deg)'});
    })
    main.on('webkitTransitionEnd','li',function () {
        $(this).addClass('active');

    })

    ////////换一批点击//////////

    let clicknum=1;
    nav.on('click','.page',function () {
        clicknum++;
        $.ajax({
            url:'/ktv/index.php/gameindex/page',
            data:{type,page:clicknum},
            dataType:'json',
            success:function(data){
                if(data.length==0){
                    alert('没有了！');
                    page.removeClass('active');
                    return;
                }
                render(data);
            }

        })
    })

    //////////////////////按钮点击///////////
     btn.on('click',function () {

         btn.removeClass('active');
         $(this).addClass('active');
         type=$(this).prop('id');
         $.ajax({
             url:'/ktv/index.php/gameindex/page',
             dataType:'json',
             data:{type,page:1},
             success:function (data) {
                 render(data);
             }
         })
     })



    function  render(data) {
       page.removeClass('active');
       main.empty();
       data.forEach(v=>{
           $('<li>').html(v.game).appendTo(main);
       })
    }

})