<?php
  class shopmanage{
      function __construct(){
          $this->mysql='';
          $obj=new db();
          $this->mysql=$obj->mysql;
      }

      function  index(){
         $title='商店管理';
          include 'APP/views/shopmanage.html';
      }
      function  insert(){
          $data=$_POST;
          print_r($data);

          $keys=array_keys($data);
          $str='(';
            for($i=0;$i<count($keys);$i++){
                $str.=$keys[$i].',';
            }
          $str=substr($str,0,-1);
          $str.=') values  (';
          foreach ($data as $v){
              $str.="'{$v}',";
          }
          $str=substr($str,0,-1);
          $str.=')';
          $sql="insert into shop $str";
          echo($sql);
          $this->mysql->query($sql);
          if($this->mysql->affected_rows){
              echo 'ok';
          }else{
              echo 'error';
          }
      }

      function  show(){
          $sql="select * from shop";
          $data=$this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);
          $result=json_encode($data);
          echo $result;
      }
      function del(){
          $id=$_GET['id'];
          $sql="delete from shop where cid=$id";
          $this->mysql->query($sql);
          if($this->mysql->affected_rows){
              echo 'ok';
          }else{
              echo 'error';
          }
      }
      function upload(){
//          var_dump($_FILES['file'])
          if(is_uploaded_file($_FILES['file']['tmp_name'])){
              if(!file_exists('public/upload')) {
                  mkdir('public/upload');
              }
                 $data=date('y-m-d');
                 if(!file_exists('public/upload/'.$data)){
                     mkdir('public/upload/'.$data);
                 }
                 $path='public/upload/'.$data.'/'.$_FILES['file']['name'];
                 if(move_uploaded_file($_FILES['file']['tmp_name'],$path)){
                     echo '/ktv/'.$path;
                 }
              }
          }

      function update(){
          $id=$_REQUEST['id'];
          $type=$_REQUEST['type'];
          $value=$_REQUEST['value'];
          $sql="update shop set '{$type}'='{$value}' where id=$id";
          $this->mysql->query($sql);
          if ($this->mysql->affected_rows){
              echo 'ok';
          }else{
              echo 'error';
          }
      }
  }