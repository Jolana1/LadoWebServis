let googlePayClient;

function onGooglePayLoaded() {

  googlePayClient = new google.payments.api.PaymentsClient({})
}
