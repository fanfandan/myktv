$(function () {
    let playlist = JSON.parse(localStorage.song);
    render();

    //向上
    $('.gequ').on('click', '.tupian2', function () {
        let id = $(this).closest('li').attr('id');
        let index = 0;
        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i].id == id) {
                index = i;
            }
        }
        playlist.unshift(playlist.splice(index, 1)[0]);
        localStorage.song = JSON.stringify(playlist);
        render();
    })

    //删除
    $('.gequ').on('click', '.tupian1', function () {
        $(this).closest('li').animate({'marginLeft': '-100%'}).queue(function () {
            $(this).closest('li').remove();
        })
    })

    function render() {
        if (localStorage.song) {
            playlist = JSON.parse(localStorage.song);
        }
        $('.gequ').empty();
        let str = '';
        playlist.forEach(v => {
            str += `
              <li id="${v.id}">
                   <a href="/ktv/index.php/shoucang/geci?id=${v.id}">
                     <img src="${v.img}" alt="" class="touxiang">
                   </a>
                    <div class="text">
                      <h3>${v.sname}</h3>
                      <h4>${v.time}</h4>
                     </div>
                      <img src="/ktv/public/img/btnd.png" alt="" class="tupian1">
                      <img src="/ktv/public/img/btnt.png" alt="" class="tupian2">
                 </li>
                 `;
        })
        $('.gequ').html(str);
        $('.shoucang').html(`共${playlist.length}首`);
    }
})