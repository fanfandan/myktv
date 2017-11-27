<?php
 class router{
    static function run(){
       if(!isset($_SERVER['PATH_INFO']) || $_SERVER['PATH_INFO']=='/') {
              $model='game';
              $fn='add';
       }
       else{
           $pathinfo=explode('/',substr($_SERVER['PATH_INFO'],1));
           $model=$pathinfo[0];
           $fn=isset($pathinfo[1])?$pathinfo[1]: 'home';
       }
       if(file_exists("APP/$model.php")){
           include 'APP/'.$model.'.php';
           if(class_exists($model)){
               $pages=new $model();
               if(method_exists($pages,$fn)){
                   $pages->$fn();
               }
               else{
                   include 'APP/views/404.html';
               }
           }
           else{
               include 'APP/views/404.html';
           }
       }
        else{
           include 'APP/views/404.html';
        }
     }
 }


