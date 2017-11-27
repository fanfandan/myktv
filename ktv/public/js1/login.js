$(function () {
    let user=$('#user');
    let pass=$('#pass');
    let sub=$('.btn');
    let form=$('form');

    //验证//
/*    let flagu=false;
    let flagp=false;
    let trimReg=/^\s+|\s+$/g;
    let userReg=/[a-zA-Z]{3,6}/;
   $('input').on('blur',function () {
        let value=$(this).val().replace(trimReg,'');
        $(this).closest('.form-group').find('.help').remove();
        if(!value.length){
            $(this).closest('.form-group').find('.help').remove();
            $('<div>').addClass('help').html('必填项').insertAfter(this);
        }
        else {
            if(userReg.test(value)){
                flagu=true;
            }
            else{
                $('<div>').addClass('help').html('格式错误').insertAfter(this);
            }
        }
    })*/

$('input').on('blur',function () {
    $(this).closest('.form-group').find('.help').remove();
    let e=$(this);
    let value=e.val().trim();
    if(e.attr('data-validata')){
        let validata=e.attr('data-validata').split(';');

        for(let i=0;i<validata.length;i++){
            let arr=validata[i].split(':');
            let flag=true;
            console.log(arr);
            if(!validataType(value,arr[0])){
                $('<div>').addClass('help').insertAfter(e).html(arr[1]);
                flag=false;
                break;
            }
            // if(flag){
            //     $('<div>').addClass('help').insertAfter(this).html(arr[1]);
            // }
        }

    }
})
    function validataType(value,type) {
        switch (type){
            case 'require':
                 return /[^(^\s*|\s*$)]/.test(value);
               // return value.length;
                break;
            case 'username':
                return /^[a-zA-Z0-9]{1,6}$/.test(value);
                break;
            case 'password':
                return /^[0-9A-Za-z]{1,6}$/.test(value);
                break;
        }
    }


    sub.on('click',function () {
        $('input').trigger('blur');
        let length=$('.form-group .help').length;
        if(length){
            return ;
        }
       // trigger
       /* if(! flagu || !flagp ){
            return ;
        }*/
        let data={user:user.val(),pass:pass.val()};
        // [{name:'user',value:'admin'}]
        // let data=form.serializeArray();
        // let obj={};

        $.ajax({
            url:'/ktv/index.php/login/check',
            data:data,
            success:function (data) {
                if(data =='ok'){
                   location.href= '/ktv/index.php/game/index';
                    alert('success');
                }else if(data == 'error'){
                    alert('登录失败');
                }
            }
        })
        return false;
    })
})