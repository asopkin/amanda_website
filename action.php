<?php
header('Content-Type: application/json');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
if(isset($_POST)) {
 
     
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
 
    $email_to = "a.m.sopkin@gmail.com";
 
    $email_subject = "web form";
 
   
 
     
 
    function died($error) {
 
        // your error code can go here
 
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
 
        echo "These errors appear below.<br /><br />";
 
        echo $error."<br /><br />";
 
        echo "Please go back and fix these errors.<br /><br />";
 
        die();
 
    }
 
     
 
    $name = $_POST['name'];
 
    $email_from = $_POST['email'];
 
    $message = $_POST['message'];
 

    $email_message = "Form details below.\n\n";
 
     
 
    function clean_string($string) {
 
      $bad = array("content-type","bcc:","to:","cc:","href");
 
      return str_replace($bad,"",$string);
 
    }
 
     
 
    $email_message .= "Name ".clean_string($name)."\n";

    $email_message .= "Email: ".clean_string($email_from)."\n";
 
    $email_message .= "Message: ".clean_string($email_message)."\n";
 
 
     
 
     
 
// create email headers
 
$headers = 'From: '.$email_from."\r\n".
 
'Reply-To: '.$email_from."\r\n" .
 
'X-Mailer: PHP/' . phpversion();
 
/*----
Un-comment to enable email sending
----*/
// mail($email_to, $email_subject, $email_message, $headers); 
 
?>
{
    <!-- console degugger check to see if the form submitted correctly -->
    "success": true,
} 
 
<?php
 
} else {
?>   
{
    "success": false
} 

<?php
}
 