<?php
  $email = $_REQUEST['email'] ;
  $message = $_REQUEST['message'] ;
  $name = $_REQUEST['name'] ;

  $from="From: $name<$email>\r\nReturn-path: $email"; 
        $subject="Message sent using your contact form"; 
        mail("a.m.sopkin@gmail.com", $subject, $message, $from);
        
        header("Location: http://localhost:3000/#/about");
?>