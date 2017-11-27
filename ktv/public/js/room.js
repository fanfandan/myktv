$(function () {
    let myScroll=new  IScroll('.wrapper');
    let scroller=$('.scroller');
    let chooselist=JSON.parse(localStorage.shop);
    let totalnum=$('.totolprice');
    let totalsl=$('.totalsl');

    render(scroller,chooselist);
    myScroll=new  IScroll('.wrapper');

    //////提交数据////////////////
    $('.last').on('click',function () {
        let newarr=[];
        chooselist.forEach(element=>{
             let obj={cid:element.cid,num:element.num,price:element.price};
             newarr.push(obj);
            })
      console.log(newarr);
        $.ajax({
            url:'/ktv/index.php/shop/submit',
            data:{order:JSON.stringify(newarr)},
            method:'post',

            success:function (data) {
                if(data=='ok'){
                   location.href='/ktv/index.php/shop/shopsure';
                }
                else if(data=='error'){
                    alert('fail');
                }
            }
        })

    })

    //////////加///////////
    $('.scroller').on('click','.plus',function () {
        let goods=JSON.parse($(this).closest('li').attr('data')) ;
        let v= chooselist.filter(element=>
            element.cid==goods.cid);
        if(v.length){
            console.log(v)
            v[0].num++;
            $(this).prev().html(v[0].num);
            localStorage.shop=JSON.stringify(chooselist);
            $(this).parent().next().html((v[0].num*v[0].price).toFixed(2));
        }
        $(this).find('.oneprice').html(v[0].num*v[0].price)
        totalnum.text(calctotal());
        totalsl.text(totalnm());

    })

    /////////减///////////

    $('.scroller').on('click','.reduce',function () {
        let good=JSON.parse($(this).closest('li').attr('data'));
        let v=chooselist.filter(element=>
            element.cid==good.cid)
        if(v.length){
            v[0].num--;
            if(!v[0].num){
                chooselist= chooselist.filter(ele=>ele.cid!=good.cid);
                localStorage.shop=JSON.stringify(chooselist);
                $(this).closest('li').animate({'marginLeft':'-100%'}).queue(function () {
                    $(this).closest('li').remove();
                })
            }
            // $(this).next().html(v[0].num);
            $(this).parent().next('.oneprice').html((v[0].num*v[0]['price']).toFixed(2));
        }

        totalnum.text(calctotal());
        totalsl.text(totalnm());
    })

    ////////总价格///////////
    function calctotal() {
        let num=0;
        chooselist.forEach(element=>{
            num+=element.num * element.price;
        })
        return num.toFixed(2);
    }

    ////////总数量//////////
    function totalnm() {
        let num=0;
        chooselist.forEach(element=>{
            num+=element.num ;
        })
        return num
    }

    ///////函数////////////////////
    function render(obj,data) {
        obj.empty();
        let str='';
        for(let i=0;i<data.length;i++){
            let str=`
                 <li data='${JSON.stringify(data[i])}' class="list">
            <div class="tu">
                <img src="${data[i]['img']}" alt="">
            </div>
            <div class="text">
                 <span class="s1"><b>${data[i]['name']}</b></span>
                <div class="miaoshu">
                    <h3>${data[i]['content']}</h3>  <span class="s2">${data[i]['volume']}</span>
                </div>
                <div class="price">
                    <div class="content">
                       <div class="reduce"></div>
                       <div class="wenzi">${data[i]['num']}</div>
                       <div class="plus"></div>
                    </div>
                    <span class="oneprice">${(data[i]['num']*data[i]['price']).toFixed(2)}</span>
                </div>
            </div>
        </li>
           `;
            obj.html(function(i,val){
                return (val+str);
            })
        }
        totalnum.text(calctotal());
        totalsl.text(totalnm());

    }
    // $('.last').on('click',function () {
    //     location.href='/ktv/index.php/shop/shopsure';
    // })

})