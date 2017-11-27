$(function(){
    if(!location.hash){
        location.hash='#add';
    }
    let tbody=$('tbody');
    let sub=$('[type=submit]');
    let select=$('.form-control');
    let gnameobj=$('input');
    ///////////////////////////////////////////////////////////////////////
    //选项卡
    $(window).on('hashchange',function(){
        $('.nav>li').removeClass('active');
        $('.tab-pane').removeClass('active');
        $(location.hash).addClass('active');
        $(location.hash+'-tab').addClass('active');
        if(location.hash=='#list'){
            $.ajax({
                url:'/ktv/index.php/game/show',
                dataType:'json',
                success:function(data){
                    render(data);
                }
            })
        }
        if(location.hash=='#add'){
            $.ajax({
                url:'/ktv/index.php/game/typeCate',
                dataType:'json',
                success:function(data){
                    rendertype(data);
                }
            })
        }
    })
    $(window).triggerHandler('hashchange');
    ///////////////////////////////////////////////////////////////////////////////
    //可编辑表格的内容排版
    function render(data){
        tbody.empty();
        let str='';
        data.forEach(v=>{
            str+=`
            <tr id="${v.gid}">
              <td valign="middle" >${v.gid}</td>
              <td type="game"><input type="text" value="${v.game}"></td>
              <td type="type"><input type="text" value="${v.type}"></td>
              <td><button class="btn btn-info">删除</button></td>
            </tr>
            `;
        })
        tbody.html(str);
    }
    ///////////////////////////////////////////////////////////////////////////////
    //游戏类型的内容排版
    function rendertype(data){
        select.empty();
        let str='';
        data.forEach(v=>{
            str+=`
            <option id=${v.gid}>${v.gid}</option>
            `;
        })
        select.html(str);
    }
    /////////////////////////////////////////////////////////////////////////////////
    //添加游戏
    sub.on('click',function(){
        let game=gnameobj.val();
        let option=$('option:selected');
        let ids=option.attr('id');

        // let data=$('form').serialize();
        // let data=new FormData($('form')[0]);

        $.ajax({
            url:'/ktv/index.php/game/insert',
            data:{game,ids},
            // method:'post',
            // processDate:false,
            // contentType:false,
            success:function(data){
                if(data=='ok'){
                    // location.href=`/ktv/index.php/game/index#list`;
                    location.hash='#list';
                }else if(data=='error'){
                   alert('错误')
                }
            }
        })
        return false;
    })
    /////////////////////////////////////////////////////////////////////////////////
    //删除游戏
    tbody.on('click','.btn',function(e){
        console.log($(this));
        let ids=$(this).closest('tr').attr('id');
        $.ajax({
            url:'/ktv/index.php/game/delete',
            data:{id:ids},
            success:function(data){
                if(data=='ok'){
                    $(`tr[id=${ids}]`).remove();
                }else if(data=='error'){
                    alert('删除失败');
                }
            }
        })
    })
    ///////////////////////////////////////////////////////////////////////////////
    //更新游戏
    tbody.on('blur','input',function(){
        let ids=$(this).closest('tr').attr('id');
        let type=$(this).closest('td').attr('type');
        let value=$(this).val();
        $.ajax({
            url:'/ktv/index.php/game/update',
            data:{id:ids,type,value},
            success:function(data){
                if(data=='ok'){
                    alert('success');
                }else if(data='error'){
                    alert('fail');
                }
            }
        })
    })
})