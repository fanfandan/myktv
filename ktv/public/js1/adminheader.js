$(function(){
    $(window).ajaxStart(function(){
        $('.tips').animate({width:'80%'});
    })
    $(window).ajaxComplete(function(){
        $('.tips').stop().animate({width:'100%'}).queue(function(){
            $(this).css('width',0);
        });
    });

    let dropdown=$('.dropdown');
    dropdown.on('click',function(){
        $(this).find('.dropdown-menu').slideToggle();
    })
})