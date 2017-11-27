<?php
 class shop{
     function __construct(){
         $this->mysql='';
         $obj=new db();
         $this->mysql=$obj->mysql;
     }

     function  index(){
         include 'APP/views/shop.html';
     }
     function query(){
         $sql = "select * from shop  ";
         $data = $this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);
         echo json_encode($data);
     }
     function room(){
         include 'APP/views/room.html';
     }

     function shopsure(){
         include 'APP/views/shopsure.html';
     }
     function submit(){
         $order=$_REQUEST['order'];
         $orderobj=json_decode($order);
         var_dump($orderobj);
         $sql="insert into orders (user,status) values ('zhangsan',0)";
         ///可以再修改
         $this->mysql->autocommit(false);

         $this->mysql->query($sql);


         $oid=$this->mysql->insert_id;
         //插入附表/////
         $str= '';
         for($i=0;$i<count($orderobj);$i++){
             $str.='(';

             foreach ($orderobj[$i] as $v){
                 $str.=$v .',';

             }
             $str.= $oid . ' ),';

         }
         $str=substr($str,0,-1);
         echo $str;
         $sql="insert into orderextra (`sid`,`count`,`price`,`oid`) values ".$str;
         var_dump($sql);
         exit;
         var_dump($sql);
         $this->mysql->query($sql);

         if($this->mysql->affected_rows){
             $this->mysql->commit();
             alter('成功');
         }
         else{
             $this->mysql->rollback();
             alter('失败');
         }
         $this->mysql->autocommit(true);
     }

 }