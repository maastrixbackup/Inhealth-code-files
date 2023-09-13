<?php
error_reporting(0);
session_name("CAKEPHP");
 session_start();
 date_default_timezone_set("Africa/Lagos");
      require_once 'resizeimg.php';
      $servername = "localhost";
      $username = "root";
      $password = "inhealth@123!";

      $link = mysql_connect($servername , $username , $password);
      if (!$link) {
          die('Could not connect: ' . mysql_error());
      }      
      mysql_select_db('inhealth') or die(mysql_error()); 
      //define('URL', 'http://maas-user/nbchat/');	
	 define('URL', 'https://'.$_SERVER['HTTP_HOST'].'/chat2/');
	 define('URL1', 'https://'.$_SERVER['HTTP_HOST'].'/chat/');
       define('BASEURL', 'https://'.$_SERVER['HTTP_HOST'].'/html/');
        define('SITEURL', 'https://'.$_SERVER['HTTP_HOST']);

      
	 
 ?>