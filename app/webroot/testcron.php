<?php
$con=mysql_connect('localhost', 'dezmem_classfied','dezmem@world!');
mysql_select_db('dezmem_classified');
$currentDate=date("Y-m-d");
$promotionChk=mysql_query("insert into testcron (name) values('chittaranjan')");
?>