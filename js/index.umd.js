const button = document.querySelector('google-pay-button');
button.paymentRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['MASTERCARD', 'VISA'],
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example',
          gatewayId: '1234567890',
        },
      },
    },
  ],
  merchantInfo: {
    merchantId: '17613812255336763067',
    merchantName: 'Demo Merchant',
  },
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPriceLabel: 'Total',
    totalPrice: '100.00',
    currencyCode: 'USD',
    countryCode: 'US',
  },
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
        description: '$5.00 - Arrives in 1 to 3 days',
      },
    ],
  },
};

button.addEventListener('loadpaymentdata', event => {
  console.log('load payment data', event.detail);
});

button.addEventListener('error', event => {
  console.log('error', event.error);
});

button.addEventListener('cancel', event => {
  console.log('cancelled', event.detail);
});
