// Path: js/cart.js
// cart.js
// Create a map to store the prices and quantities of each product

const productPrices = new Map();
const productQuantities = new Map();
productPrices.set('BalanceOil',54);
productPrices.set('Zinobiotic',64);
productPrices.set('ZinzinoXtend',79);

// Handle the product quantity change
function calculateTotalAmount() {
    let totalAmount = 0;
    for (let [productName, quantity] of productQuantities) {
        const productPrice = productPrices.get(productName);
        if (typeof productPrice === 'number' && typeof quantity === 'number') {
            totalAmount += productPrice * quantity;
        }
    }
    return totalAmount;
}
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productName = event.target.parentElement.getAttribute('data-product-name');
        const cartItemsList = document.querySelector('#cart-items-list');
        let quantity = productQuantities.get(productName) || 0;
        productQuantities.set(productName, ++quantity);

        let listItem = document.querySelector(`#cart-items-list .${productName}`);
        if (!listItem) {
            listItem = document.createElement('li');
            listItem.classList.add(productName);
            listItem.innerHTML = `
                <img src="./Image/${productName}.webp" alt="${productName}" width="20" height="25">
                <span>${productName}</span>
                <button class="decrease" title="Ubrať">-</button>
                <span class="quantity" title="Počet daného tovaru v ks">${quantity}</span>
                <button class="increase" title="Pridať">+</button>
                <button class="remove"title="Odstráň položku">X</button>
                `;
            cartItemsList.appendChild(listItem);

            listItem.querySelector('.increase').addEventListener('click', () => {
                productQuantities.set(productName, ++quantity);
                listItem.querySelector('.quantity').textContent = quantity;
                document.querySelector('#total-amount').textContent = calculateTotalAmount();
            });

            listItem.querySelector('.decrease').addEventListener('click', () => {
                if (quantity > 0) {
                    productQuantities.set(productName, --quantity);
                    listItem.querySelector('.quantity').textContent = quantity;
                }
                document.querySelector('#total-amount').textContent = calculateTotalAmount();
            });

            listItem.querySelector('.remove').addEventListener('click', () => {
                productQuantities.delete(productName);
                listItem.remove();
                document.querySelector('#total-amount').textContent = calculateTotalAmount();
            });
        } else {
            listItem.querySelector('.quantity').textContent = quantity;
        }

        document.querySelector('#cart-items').textContent = Array.from(productQuantities.values()).reduce((a, b) => a + b, 0);
        document.querySelector('#total-amount').textContent = calculateTotalAmount();
    });
});


    // Send the token to your server
    function stripeTokenHandler(token) {
        // Insert the token ID into the form so it gets submitted to the server
        var form = document.getElementById('payment-form');
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);
        // Submit the form
        form.submit();
    }


// Handle the product quantity change
function calculateTotalAmount() {
    let totalAmount = 0;
    for (let [productName, quantity] of productQuantities) {
        const productPrice = productPrices.get(productName);
        if (typeof productPrice === 'number' && typeof quantity === 'number') {
            totalAmount += productPrice * quantity;
        }
    }
    return totalAmount;
}




var stripe = Stripe('pk_live_51OgVgeFdjXAPBwqY0TXa5UxlblPDSIGFY5U0fa9bU4VSLuvBwSuyXb1gBwMVjj5eW4XHadFOZ8s0toAAgiUWD8vw00tAAx835T');

async function payWithCard(stripe, card, clientSecret) {
  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: { card },
  });

  if (error) {
    // Payment has failed
    console.log('Payment failed:', error);
    // Display error message to your customer
  } else {
    if (paymentIntent.status === 'succeeded') {
      // Payment has succeeded
      console.log('Payment succeeded:', paymentIntent.id);
      // Display success message to your customer
    }
  }
}


// Handle the payment process
function processPayment() {
    stripe.redirectToCheckout({
        // Replace with the ID of your SKU
        items: [{sku: 'pmc_1OgVzPFdjXAPBwqYvJ1Nr799', quantity: 1}],
        successUrl: 'https://buy.stripe.com/4gweXJgm2caC2dy3cc/success',
        cancelUrl: 'https://buy.stripe.com/4gweXJgm2caC2dy3cc/canceled',
    }).then(function (result) {
        if (result.error) {
            // If redirectToCheckout fails due to a browser or network error, display the localized error message to your customer.
            var displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
        }
    });
}




























