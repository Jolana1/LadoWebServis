'use strict';
/**
 *Google Pay API configuration.
 *@see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|apiVersion in PaymentDataRequest}
 */



const tokenizationSpecification = {
	type: 'PAYMENT_GATEWAY',
	parameters: {
		'gateway': 'example',
		'gatewayMerchantId': 'gatewayMerchantId',
	}
}

const cardPaymentMethod = {
	type:'CARD',
	tokenizationSpecification:tokenizationSpecification;
	parameters: {
		allowedCardNetworks: ["VISA","MASTERCARD"],
		allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],

	}
}

const googlePayConfiguration = {
const baseRequest =
	apiVersion, '2':any
	apiVersionMinor, '0': any
	allowedPaymentMethods:[cardPaymentMethod],
}

/**
 * Card networks supported by your site and your gateway
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 * @todo confirm card networks supported by your site and gateway

const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "MIR", "VISA"];*/

/**
 * Card authentication methods supported by your site and your gateway
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 * @todo confirm your processor supports Android device tokens for your
 * supported card networks

const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];*/

/**
 * Identify your gateway and your site's gateway merchant identifier
 *
 * The Google Pay API response will return an encrypted payment method capable
 * of being charged by a supported gateway after payer authorization
 *
 * @todo check with your gateway on the parameters to pass
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway|PaymentMethodTokenizationSpecification}

const tokenizationSpecification = {
	type: 'PAYMENT_GATEWAY',
	parameters: {
		'gateway': 'example',
		'gatewayMerchantId': 'exampleGatewayMerchantId'
	}
};*/

/**
 * Describe your site's support for the CARD payment method and its required
 * fields
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 */
const baseCardPaymentMethod = {
	type: 'CARD',
	parameters: {
		allowedAuthMethods: allowedCardAuthMethods,
		allowedCardNetworks: allowedCardNetworks
	}
};

/**
 * Describe your site's support for the CARD payment method including optional
 * fields
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 */
const cardPaymentMethod = Object.assign({},
	baseCardPaymentMethod, {
		tokenizationSpecification: tokenizationSpecification
	}
);

let googlePayClient;
/**
 * An initialized google.payments.api.PaymentsClient object or null if not yet set
 *
 * @see {@link getGooglePaymentsClient}
 */

function onGooglePayLoaded() {

	googlePayClient = new google.payments.api.PaymentsClient({
	environment:'Test',
	});

	googlePayClient.isReadyToPay(googlePayConfiguration)
	 .then(response => {
		if(response.result){
	       createAndAddButton();
		} else {
		// The cuurent user cannot pay using Google Pay.Offer another
		// payment method
		}
	})
	.catch(error =>console.error('isReadyToPay error: ',error));
}
function createAndAddButton(){
    const googlePayButton = googlePayClient.createButton({
		onClick: onGooglePaymentButtonClicked,
	});
	document.getElementById('buy-now').appendChild(googlePayButton);
}

function onGooglePayButtonClicked(){
	const paymentDataRequest = {...googlePayConfiguration};
	paymentDataRequest.merchantInfo = {
		merchantId:'BCR2DN6TV6MZVMS7',
        merchantName: 'BalanceOil',

	},

    paymentDataRequest.transactionInfo = {

	totalPriceStatus: 'FINAL',
    totalPriceLabel: 'Total',
  //totalPriceLabel: 'selectedItem.price',
    totalPrice: '35.50',
    currencyCode: 'EUR',
    countryCode: 'SK',
  shippingAddressRequired: true,
   shippingOptionRequired: true,
   shippingOptionParameters: {
     defaultSelectedOptionId: 'free',
     shippingOptions: [
      {
        id: 'free',
        label: 'Free shipping',
        description: 'Arrives in 5 to 7 days',
      },
      {
        id: 'express',
        label: 'Express shipping',
        description: '€5.00 - Arrives in 1 to 3 days',
      },
    ],
  },

  };
	googlePayClient.loadPaymentData(paymentDataRequest)
	.then(paymentData => process.PaymentData(paymentData))
	.catch(error =>console.error('loadPaymentData error: ',error));

}
function processPaymentData(paymentData){
	fetch(ordersEndpointUrl ,{
		method:'POST',
		headers:{
			'Content-Type' : 'application/json'
		},
	body: paymentData
	})

}

/**
 * Configure your site's support for payment methods supported by the Google Pay
 * API.
 *
 * Each member of allowedPaymentMethods should contain only the required fields,
 * allowing reuse of this base request when determining a viewer's ability
 * to pay and later requesting a supported payment method
 *
 * @returns {object} Google Pay API version, payment methods supported by the site
 */
function getGoogleIsReadyToPayRequest() {
	return Object.assign({},
		baseRequest, {
			allowedPaymentMethods: [baseCardPaymentMethod]
		}
	);
}

/**
 * Configure support for the Google Pay API
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}
 * @returns {object} PaymentDataRequest fields
 */
function getGooglePaymentDataRequest() {
	const paymentDataRequest = Object.assign({}, baseRequest);
	paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
	paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
	paymentDataRequest.merchantInfo = {
		// @todo a merchant ID is available for a production environment after approval by Google
		// See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
		// merchantId: '12345678901234567890',
		merchantName: 'Example Merchant'
	};
	return paymentDataRequest;
}

/**
 * Return an active PaymentsClient or initialize
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
 * @returns {google.payments.api.PaymentsClient} Google Pay API client
 */
function getGooglePaymentsClient() {
	if (paymentsClient === null) {
		paymentsClient = new google.payments.api.PaymentsClient({
			environment: 'TEST'
		});
	}
	return paymentsClient;
}

/**
 * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
 *
 * Display a Google Pay payment button after confirmation of the viewer's
 * ability to pay.

function onGooglePayLoaded() {
	const paymentsClient = getGooglePaymentsClient();
	paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
		.then(function (response) {
			if (response.result) {
				addGooglePayButton();
				// @todo prefetch payment data to improve performance after confirming site functionality
				// prefetchGooglePaymentData();
			}
		})
		.catch(function (err) {
			// show error in developer console for debugging
			console.error(err);
		});
}*/

/**
 * Add a Google Pay purchase button alongside an existing checkout button
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions|Button options}
 * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
 */
function addGooglePayButton() {
	const paymentsClient = getGooglePaymentsClient();
	const button =
		paymentsClient.createButton({
			onClick: onGooglePaymentButtonClicked,
			allowedPaymentMethods: [baseCardPaymentMethod]
		});
	document.getElementById('container').appendChild(button);
}

/**
 * Provide Google Pay API with a payment amount, currency, and amount status
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo|TransactionInfo}
 * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest

function getGoogleTransactionInfo() {
	return {
		countryCode: 'US',
		currencyCode: 'USD',
		totalPriceStatus: 'FINAL',
		// set to cart total
		totalPrice: '1.00'
	};
}*/

/**
 * Prefetch payment data to improve performance
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
 */
function prefetchGooglePaymentData() {
	const paymentDataRequest = getGooglePaymentDataRequest();
	// transactionInfo must be set but does not affect cache
	paymentDataRequest.transactionInfo = {
		totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
		currencyCode: 'USD'
	};
	const paymentsClient = getGooglePaymentsClient();
	paymentsClient.prefetchPaymentData(paymentDataRequest);
}

/**
 * Show Google Pay payment sheet when Google Pay payment button is clicked
 */
function onGooglePaymentButtonClicked() {
	const paymentDataRequest = getGooglePaymentDataRequest();
	paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

	const paymentsClient = getGooglePaymentsClient();
	paymentsClient.loadPaymentData(paymentDataRequest)
		.then(function (paymentData) {
			// handle the response
			processPayment(paymentData);
		})
		.catch(function (err) {
			// show error in developer console for debugging
			console.error(err);
		});
}
/**
 * Process payment data returned by the Google Pay API
 *
 * @param {object} paymentData response from Google Pay API after user approves payment
 * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData|PaymentData object reference}
 */
function processPayment(paymentData) {
	// show returned data in developer console for debugging
	console.log(paymentData);
	// @todo pass payment token to your gateway to process payment
	paymentToken = paymentData.paymentMethodData.tokenizationData.token;
}
