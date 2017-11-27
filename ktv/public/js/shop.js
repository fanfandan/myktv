$(function () {
    let myScroll=new  IScroll('.Winelist');
    let myScroll1=new  IScroll('.Snacklist');
    let Winelist=$('.Winelist>.scroller');
    let Snacklist=$('.Snacklist>.scroller');
    let Winedata=[];
    let Snackdata=[];
    let btn=$('button');
    let wrapper=$('.wrapper');

    ///////选项卡////////
    btn.on('click',function () {
        btn.removeClass('active');
        $(this).addClass('active');
        wrapper.removeClass('active');
        wrapper.eq($(this).index()).addClass('active');
    })
    $.ajax({
            url:'/ktv/index.php/shop/query',
            method:'post',
            dataType:'json',
            success:function (data) {
              Winedata=data.filter(element=>{
                  return element.type=='酒水';
              })
                Snackdata=data.filter(element=>{
                    return element.type=='零食';
                })



                render(Winelist,Winedata);
                render(Snacklist,Snackdata);
                myScroll=new  IScroll('.Winelist');
                myScroll1=new  IScroll('.Snacklist');

            }
        })
    $('.b1').triggerHandler('click');
    let winenum=$('.winenum');
    let snacknum=$('.snacknum');
    let totalnum=$('.totalnum');
    let xuanze=$('.xuanze');
    let more=$('.more');
    let chooselist=[];

    //////////加///////////
    $('.scroller').on('click','.plus',function () {
        let goods=JSON.parse($(this).closest('li').attr('data')) ;
        let v= chooselist.filter(element=>
            element.cid==goods.cid);
        if(v.length){
            console.log(v)
           v[0].num++;
           $(this).prev().html(v[0].num);
        }
        else{
            goods.num=1;
            $(this).prev().html(1);
            chooselist.push(goods);
        }
        winenum.text(calcwin());
        snacknum.text(calcsnack());
        totalnum.text(calctotal());
        renderchoose(chooselist.slice(0,3));
        if(isshow()){
            more.addClass('active');
        }
        else{
            more.removeClass('active');
        }
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
            }
            $(this).next().html(v[0].num);
        }
        winenum.text(calcwin());
        snacknum.text(calcsnack());
        totalnum.text(calctotal());
        renderchoose(chooselist.slice(0,3));
        if(isshow()){
            more.addClass('active');
        }
        else{
            more.removeClass('active');
        }
    })

    /////////选好了////////////
    $('.xuan').on('click',function (e) {
        e.preventDefault();
        localStorage.setItem('shop',JSON.stringify(chooselist));
        location.href='/ktv/index.php/shop/room';
    })


    ////////酒水数量//////////
    function calcwin() {
        let num=0;
        chooselist.filter(element=>element.type=='酒水').forEach(element=>{
            num+=element.num;
        })
        return num;
    }
    /////////零食数量//////////
    function calcsnack() {
        let num=0;
        chooselist.filter(element=>element.type=='零食').forEach(element=>{
            num+=element.num;
        })
        return num;
    }
    ////////总价格///////////
    function calctotal() {
        let num=0;
        chooselist.forEach(element=>{
            num+=element.num * element.price;
        })
        return num.toFixed(2);
    }
    ////////小火花///////////
    function creathot(data) {
        let str='';
        for(let i=0;i<data.length;i++){
            str+='<img src="/ktv/public/img/sd20.png" alt="">';
        }
        return str;
    }

    /////////显示...is show/////////
    function isshow() {
        return $('.xuanze>div').length==3? true:false;
    }

    ////////底部显示已选////////////////
    function renderchoose(data){
        xuanze.empty();
        for(let i=0;i<data.length;i++){
            $('<div>').html(`${data[i]['name']} ${data[i]['num']} `).appendTo(xuanze);
        }
    }




  //////购物车//////////////////////数组 添加/累加
   /* 事件委派  this 最近的'.list' 的attr('data') JSON.parse
    v=element.sid==goods.sid  v.length

    添加 push /.prev().html()
    累加  v[0].num++*/
    ///////////合计//////////////

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
                       <h3><b>${data[i]['name']}</b></h3>
                        <div class="hot">
                           ${creathot(data[i]['hot'])}
                         </div>
                       <div class="price"><span class="s1">￥</span><span class="s2">${data[i]['price']}
                                 </span></div>
                       <div class="content">
                           <div class="reduce"></div>
                           <div class="wenzi">0</div>
                           <div class="plus"></div>
                       </div>
                   </div>
               </li>
           `;
           obj.html(function(i,val){
               return (val+str);
           })
       }
    }
})




