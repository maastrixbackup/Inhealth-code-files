<?php include_once("../../config/session.php");
include_once("../../config/config.php");
if($_SESSION["uemail"]==""){
	header("Location:account.php?page=sign-in&rurl=user-dashboard");
	}
			///Upgrade Membership type
				if($_SESSION["payment_type"]=="upgrade"){
					 $rs_transfer=mysql_query("select * from dm_mem_package where id='".$_POST["service_id"]."'");
			$row_transfer=mysql_fetch_array($rs_transfer);
			$unique_id=md5(uniqid(rand()));
mysql_query("insert into dm_payments values (null,'".$_SESSION["uemail"]."','".$row_transfer["sms_price"]."','0','".$unique_id."','UPGRADE MEMBERSHIP TYPE',null,0)") or die(mysql_error());
$merchant_signature="";
$sms_price=$row_transfer["package_amount"];
			 }else{
				 
$rs_payment=mysql_query("select * from dm_plan_master where id='".$_POST["service_id"]."'");
$row_payment=mysql_fetch_array($rs_payment);
$unique_id=md5(uniqid(rand()));
mysql_query("insert into dm_payments values (null,'".$_SESSION["uemail"]."','".$row_payment["sms_price"]."','".$row_payment["credits"]."','".$unique_id."','".$row_payment["for_plan"]."',null,0)") or die(mysql_error());
$merchant_signature=$row_payment["merchant_signature"];
$sms_price=$row_payment["sms_price"];
				 }

?>
<?php
require_once 'Mobilpay/Payment/Request/Abstract.php';
require_once 'Mobilpay/Payment/Request/Card.php';
require_once 'Mobilpay/Payment/Invoice.php';
require_once 'Mobilpay/Payment/Address.php';
#for testing purposes, all payment requests will be sent to the sandbox server. Once your account will be active you must switch back to the live server https://secure.mobilpay.ro
#in order to display the payment form in a different language, simply add the language identifier to the end of the paymentUrl, i.e https://secure.mobilpay.ro/en for English
$paymentUrl = 'http://sandboxsecure.mobilpay.ro';
//$paymentUrl = 'https://secure.mobilpay.ro';
// this is the path on your server to the public certificate. You may download this from Admin -> Conturi de comerciant -> Detalii -> Setari securitate
$x509FilePath 	= 'public.cer';
try
{
	srand((double) microtime() * 1000000);
	$objPmReqCard 						= new Mobilpay_Payment_Request_Card();
	#merchant account signature - generated by mobilpay.ro for every merchant account
	#semnatura contului de comerciant - mergi pe www.mobilpay.ro Admin -> Conturi de comerciant -> Detalii -> Setari securitate
	if($merchant_signature==""){
	$objPmReqCard->signature 			= '81F7-XCWN-U18H-SW5N-YME1';
	}else{
		$objPmReqCard->signature 			= $merchant_signature;
		}
	#you should assign here the transaction ID registered by your application for this commercial operation
	#order_id should be unique for a merchant account
	$objPmReqCard->orderId 				= $unique_id;
	#below is where mobilPay will send the payment result. This URL will always be called first; mandatory
	$objPmReqCard->confirmUrl 			= 'http://maasinfotech24x7.com/dezmembraripenet/dez_payment/test_card/cardConfirm.php'; 
	#below is where mobilPay redirects the client once the payment process is finished. Not to be mistaken for a "successURL" nor "cancelURL"; mandatory
	$objPmReqCard->returnUrl 			= 'http://maasinfotech24x7.com/dezmembraripenet/dez_payment/test_card/cardReturn.php'; 
	
	#detalii cu privire la plata: moneda, suma, descrierea
	#payment details: currency, amount, description
	$objPmReqCard->invoice = new Mobilpay_Payment_Invoice();
	#payment currency in ISO Code format; permitted values are RON, EUR, USD, MDL; please note that unless you have mobilPay permission to 
	#process a currency different from RON, a currency exchange will occur from your currency to RON, using the official BNR exchange rate from that moment
	#and the customer will be presented with the payment amount in a dual currency in the payment page, i.e N.NN RON (e.ee EUR)
	$objPmReqCard->invoice->currency	= 'RON';
	if($sms_price==""){
	$objPmReqCard->invoice->amount= '215';
	}else{
	$objPmReqCard->invoice->amount= $sms_price;
		}
	#available installments number; if this parameter is present, only its value(s) will be available
	//$objPmReqCard->invoice->installments= '2,3';
	#selected installments number; its value should be within the available installments defined above
	//$objPmReqCard->invoice->selectedInstallments= '3';
	$objPmReqCard->invoice->details		= 'Plata cu card-ul prin mobilPay';
	
	#detalii cu privire la adresa posesorului cardului
	#details on the cardholder address (optional)
	$billingAddress 				= new Mobilpay_Payment_Address();
	$billingAddress->type			= $_POST['billing_type']; //should be "person"
	$billingAddress->firstName		= $_POST['billing_first_name'];
	$billingAddress->lastName		= $_POST['billing_last_name'];
	$billingAddress->address		= $_POST['billing_address'];
	$billingAddress->email			= $_POST['billing_email'];
	$billingAddress->mobilePhone		= $_POST['billing_mobile_phone'];
	$objPmReqCard->invoice->setBillingAddress($billingAddress);
	
	#detalii cu privire la adresa de livrare
	#details on the shipping address
	$shippingAddress 				= new Mobilpay_Payment_Address();
	$shippingAddress->type			= $_POST['shipping_type'];
	$shippingAddress->firstName		= $_POST['shipping_first_name'];
	$shippingAddress->lastName		= $_POST['shipping_last_name'];
	$shippingAddress->address		= $_POST['shipping_address'];
	$shippingAddress->email		= $_POST['shipping_email'];
	$shippingAddress->mobilePhone		= $_POST['shipping_mobile_phone'];
	$objPmReqCard->invoice->setShippingAddress($shippingAddress);

	#uncomment the line below in order to see the content of the request
	//echo "<pre>";print_r($objPmReqCard);echo "</pre>";
	$objPmReqCard->encrypt($x509FilePath);
}
catch(Exception $e)
{
}//echo $objPmReqCard->invoice->amount;
?>
<div class="span-15 prepend-1">

<?php if(!($e instanceof Exception)):?>
<p>
	<form name="frmPaymentRedirect" id="frmPaymentRedirect" method="post" action="<?php echo $paymentUrl;?>">
	<input type="hidden" name="env_key" value="<?php echo $objPmReqCard->getEnvKey();?>"/>
	<input type="hidden" name="data" value="<?php echo $objPmReqCard->getEncData();?>"/>
	
	</form>
</p>
<!--
<script type="text/javascript" language="javascript">
	window.setTimeout(document.frmPaymentRedirect.submit(), 5000);
</script> -->
<?php else:?>
<p><strong><?php echo $e->getMessage();?></strong></p>
<?php endif;?>
<script type="text/javascript">
	document.getElementById('frmPaymentRedirect').submit();</script>
