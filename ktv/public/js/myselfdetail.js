

$(function () {
    var myScroll = new IScroll('.wrapper1', { mouseWheel: true });
    var navBtn = $('nav>ul>li');
    var wrapper = $('.wrapper');
    var footer = $('footer');
    var current = $('.wrapper2');

    navBtn.on('click', function () {
        navBtn.removeClass('active');
        $(this).addClass('active');
        wrapper.removeClass('active');
        wrapper.eq($(this).index()).addClass('active');
    });

    if (current.hasClass('active')) {
        alert(1);
        footer.css({ bottom: '-100px' });
    }
    /////////////////////////////////////////me///////////////////////////////
    var chooseList = JSON.parse(localStorage.shop);
    var scroll = $('.drink');
    var totalNum = $('.totalNum');
    var totalPrice = $('.totalPrice');

    ///////////////////////往页面添加数据////////////////////////////////////
    function render1(obj, data) {
        obj.empty();

        var _loop = function _loop(i) {
            var str = '\n        <li data=\'' + JSON.stringify(data[i]) + '\'>\n            <div class="left">\n                <img src="' + data[i]['simg'] + '" alt="">\n            </div>\n            <div class="right">\n                <div>\n                    <span>' + data[i]['sname'] + '</span>\n                </div>\n                <div>\n                    <span>' + data[i]['sdescription'] + '</span>\n                    <span>' + data[i]['scapacity'] + '</span>\n                </div>\n                <div>\n                                        <span>' + data[i]['num'] + '</span>\n                                      <i><b class="toPrice">' + data[i]['num'] * data[i]['sprice'] + '</b>RMB</i>\n                </div>\n            </div>\n        </li>\n                ';
            obj.html(function (index, value) {
                return value += str;
            });
        };

        for (var i = 0; i < data.length; i++) {
            _loop(i);
        }
        totalNum.text(calcTotalNum());
        totalPrice.text(calctotalPrice());
        myScroll.refresh();
    }

    render1(scroll, chooseList);
    var myScroll = new IScroll('.wrapper1', { mouseWheel: true });
    ////////////////////////////合计/////////////////////////////
    function calcTotalNum() {
        var num = 0;
        chooseList.forEach(function (element) {
            num += element.num;
        });
        return num; //保留两位小数
    }

    function calctotalPrice() {
        var num = 0;
        chooseList.forEach(function (element) {
            num += element.num * element.sprice;
        });
        return num.toFixed(2); //保留两位小数
    }
    ///////////////////////////已选歌曲////////////////////////////////////////////////
    var myScroll = new IScroll('#wrapper');
    var list = [];
    render();
    var myScroll = new IScroll('#wrapper');

    function render() {
        $('.scroller').empty();
        list = JSON.parse(localStorage.list) ? JSON.parse(localStorage.list) : [];
        $('.num').html(list.length);
        var str = '';
        list.forEach(function (value, index) {
            str += '\n            <li id=\'' + value.eid + '\'>\n                <a href="/ktv/index.php/song/play?id=' + value.eid + '">\n                    <div class="img">\n                        <div>\n                           <img src="' + value.eimg + '" alt="" class="simg">\n                        </div>\n                        <div></div>\n                    </div>\n                    <div class="songT">\n                        <p>' + value.ename + '</p>\n                        <p>' + value.etime + '</p>\n                    </div>\n                </a>\n                <a href="" class="remove"></a>\n                <a href="" class="top"></a>\n            </li>\n            ';
        });
        $('.scroller').html(str);
    }

    ////////////////////////////置顶//////////////////////////////
    $('.scroller').on('click', '.top', function (e) {
        e.preventDefault();
        var id = $(this).closest('li').attr('id');
        var index = void 0;

        for (var i = 0; i < list.length; i++) {
            if (list[i].eid == id) {
                index = i;
            }
        }

        list.unshift(list.splice(index, 1)[0]);
        localStorage.list = JSON.stringify(list);

        render();
        var myScroll = new IScroll('#wrapper');
    });

    /////////////////////////////删除//////////////////////////////
    $('.scroller').on('click', '.remove', function (e) {
        e.preventDefault();
        var id = $(this).closest('li').attr('id');
        var index = void 0;

        for (var i = 0; i < list.length; i++) {
            if (list[i].eid == id) {
                index = i;
            }
        }

        list.splice(index, 1);
        localStorage.list = JSON.stringify(list);

        render();
        var myScroll = new IScroll('#wrapper');
    });
});