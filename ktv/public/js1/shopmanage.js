$(function () {
    if (!location.hash) {
        location.hash = '#home';
    }
    $(window).on('hashchange', function () {
        $('.nav>li').removeClass('active');
        $('.tab-pane').removeClass('active');
        $(location.hash).addClass('active');
        $(location.hash + '-tab').addClass('active');

        if (location.hash == '#profile') {
            $.ajax({
                url: '/ktv/index.php/shopmanage/show',
                dataType: 'json',
                success: function (data) {
                    render(data);
                }

            })
        }
    });


    let form = $('form');
    let btn = $('.btn');

    let name = $('#name').val();
    let type = $('.form-control').val();
    let price = $('#price').val();
    let volume = $('#volume').val();
    let content = $('#content').val();
    let hot = $('#hot').val();

    ////添加//////
    btn.on('click', function () {
        let data = new FormData($('form')[0]);
        $.ajax({
            url: '/ktv/index.php/shopmanage/insert',
            data: data,
            method: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data == 'ok') {
                    location.href=`/ktv/index.php/shopmanage/index #profile`;
                }
                else if (data == 'error') {
                    alert('fail');
                }
            }
        })
        return false;
    })


    function render(data) {
        let tbody = $('tbody');
        tbody.empty();
        let str = '';
        data.forEach(v => {
            str += `
           <tr id="${v.cid}">
              <td type="cid"><input type="text" value="${v.cid}"></td>
              <td type="type"><input type="text" value="${v.type}"></td>
              <td type="name"><input type="text" value="${v.name}"></td>
              <td type="price"><input type="text" value="${v.price}"></td>
              <td type="img"><img src=${v.img} alt="" style="width: 50px; height: 50px"></td>
              <td type="volume"><input type="text" value="${v.volume}"></td>
              <td type="content"><input type="text" value="${v.content}"></td>
              <td type="hot"><input type="text" value="${v.hot}"></td>
              <td><button class="del">删除</button></td>
            </tr>
            `
            tbody.html(str);
        })
    }

    ///////删除////////
    let tbody = $('tbody');
    tbody.on('click', '.del', function () {
        let ids = $(this).closest('tr').attr('id');
        $.ajax({
            url: '/ktv/index.php/shopmanage/del',
            data: {id: ids},
            success: function (data) {
                if (data == 'ok') {
                    $(`tr[id=${ids}]`).remove();
                }
                else if (data == 'error') {
                    alert('fail');
                }
            }
        })
    })
    let img1 = $('#img')[0];
    let thumb = $('#thumb')[0];
    let imgbox = document.querySelector('.imgbox');
    img1.onchange = function () {
        let data=this.files;
        [...this.files].forEach((element,index) => {
            let reader = new FileReader();
            reader.readAsDataURL(element);
            reader.onload = function (e) {
                let img = new Image();
                img.width=200;
                img.height=200;
                img.src = e.target.result;
                imgbox.appendChild(img);
            }
                let formatdata = new FormData();
                formatdata.append('file', element);
                let xml = new XMLHttpRequest();
                xml.upload.onprogress=function (e) {
                    document.querySelectorAll('.progress-bar')[index].style.width
                    =`${e.loaded/e.total*100}%`;
                };
                console.log(xml);
                xml.onload = function () {
                    document.querySelector('.yz').value+=xml.response;
                }
               xml.open('post', '/ktv/index.php/shopmanage/upload', true);
               xml.send(formatdata);
        })
    }
    //////////更新///////////
     tbody.on('blur','input',function () {
            let id= $(this).closest('tr').attr('id');
            let type=$(this).closest('td').attr('type');
            let value=$(this).val();
            $.ajax({
                url:'/ktv/index.php/shopmanage/update',
                data:{id,type,value},
                success:function (data) {
                    if(data=='ok'){
                        alert('ok');
                    }
                    else if(data=='error'){
                        alert('error');
                    }
                }
            })
     })
    
})
/*
单文件上传
let data=this.files[0];
let reader=new FileReader();
reader.readAsDataURL(data);
reader.onload=function (e) {
    thumb.src=e.target.result;
    console.log(e);

    let formdata=new FormData();
    formdata.append('file',data);
    let xml=new XMLHttpRequest();
    xml.open('post','/ktv/index.php/shopmanage/upload',true);
    xml.send(formdata);
    xml.onload=function () {
        console.log(xml.response);
        $(':hidden').val(xml.response);
    }
}
}*/
