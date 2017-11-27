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
                url: '/ktv/index.php/song/show',
                dataType: 'json',
                success: function (data) {
                    render(data);
                }

            })
        }
    });
    let btn=$('.btn');
    let tbody = $('tbody');

    btn.on('click', function () {
        let data = new FormData($('form')[0]);
        console.log(data);
        $.ajax({
            url: '/ktv/index.php/song/insert',
            data: data,
            method: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data == 'ok') {
                    alert('ok');
                    location.hash='#profile';
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
           <tr id="${v.id}">
              <td type="id"><input type="text" value="${v.id}"></td>
              <td type="sname"><input type="text" value="${v.sname}"></td>
               <td type="author"><input type="text" value="${v.author}"></td>
              <td type="time"><input type="text" value="${v.time}"></td>
              <td type="img"><img src=${v.img} alt="" style="width: 50px; height: 50px"></td>  
               <td type="music"><input type="text" value="${v.music}"></td>           
              <td><button class="del">删除</button></td>
            </tr>
            `
            tbody.html(str);
        })
    }

    ///////删除////////

    tbody.on('click', '.del', function () {
        let ids = $(this).closest('tr').attr('id');
        $.ajax({
            url: '/ktv/index.php/song/del',
            data: {id:ids},
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
            xml.open('post', '/ktv/index.php/song/upload', true);
            xml.send(formatdata);
        })
    }

    let music1 = $('#music1');
    let music = $('#music');
    console.log(music);
    music1.on('change',function(){
        [...this.files].forEach((ele,i)=>{
            let mType = ele.type.split('/')[1];
            let read = new FileReader();
            read.readAsDataURL(ele);
            read.onload =function (e){
                console.log(e.target.result);
                let audios = $('<audio>').attr('src','e.target.result');
                $('.musicBox').append(audios);
                let data = new FormData();
                data.append('file',ele);
                let xml = new XMLHttpRequest();
                xml.upload.onprogress = function (e) {
                    $('.bar')[i].style.width = `${e.loaded / e.total * 100}%`;
                };
                xml.open('post','/ktv/index.php/song/uploadmusic',true);
                xml.send(data);
                /*数据返回来*/
                xml.onload = function () {
                    $('#music').val(xml.response);
                }

            }
        })
    })

    //////////更新///////////
    tbody.on('blur','input',function () {
        let id= $(this).closest('tr').attr('id');
        let type=$(this).closest('td').attr('type');
        let value=$(this).val();
        $.ajax({
            url:'/ktv/index.php/song/update',
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