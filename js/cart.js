// Initialize Stripe with your publishable key and the locale to use C:\Users\kseni\Desktop\pk.txt


// Create an instance of Elements
document.addEventListener('DOMContentLoaded', (event) => {
    // Your Stripe.js code here
    // Create a map to store the prices and quantities of each product

const productPrices = new Map();
const productQuantities = new Map();
productPrices.set('Basic',35);
//productPrices.set('Premium',499);
productPrices.set('BalanceOil',54);
productPrices.set('Zinobiotic',64);
productPrices.set('Zinobiotic+PortionPack',50);
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
                <img src="./Image/${productName}.webp" alt="${productName}" width="35" height="28">
                <span>${productName}</span>
                <button class="decrease"title="Odobrať ks">-</button>
                <span class="quantity" title="Počet daného tovaru v ks">${quantity}</span>
                <button class="increase" title="Pridať ks">+</button>
                <button class="remove"title="Odstráň položku">x</button>
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
    async function listAllProducts() {
        const products = await stripe.products.list();
    
        return products;
      }
    
      listAllProducts().then(products => console.log(products));
        // Set up Stripe.js and Elements to use in checkout form
        var style = {
            base: {
                color: "#32325d",
            }
        };
        var elements = stripe.elements({
            fonts: [
                {
                    cssSrc: 'https://fonts.googleapis.com/css?family=Montserrat',
                },
            ],
            // Stripe's examples are localized to specific languages, but if
            // you wish to have Elements automatically detect your user's locale,
            //use `locale: 'auto'` instead.
            locale: window.__exampleLocale
        });
        // Create an instance of the card Element
        var card = elements.create('card', { style: style });
        // Add an instance of the card Element into the `card-element` <div>
        card.mount('#card-element');
        // Handle real-time validation errors from the card Element
        card.addEventListener('change', function (event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        }
        );
        // Handle form submission
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            // Disable the submit button to prevent repeated clicks
            document.getElementById('submit').disabled = true;
            var options = {
                name: document.getElementById('name').value,
                address_line1: document.getElementById('address').value,
                address_city: document.getElementById('city').value,
                address_state: document.getElementById('state').value,
                address_zip: document.getElementById('zip').value,
            }
            stripe.createToken(card, options).then(function (result) {
                if (result.error) {
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                    // Enable the submit button
                    document.getElementById('submit').disabled = false;
                } else {
                    // Send the token to your server
                    stripeTokenHandler(result.token);
                }
            }
            );
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
    
    
    if (!stripe) {
        const stripe = Stripe('pk_test_51OgVgeFdjXAPBwqYJ4wjgTwVAVhGa2uJbHwYLC3ne3LPkLCOATB0akg3kLY3fChDWaJaFLman5GhowOpA8tdp0pa00P1Msh1vz');
    }
    
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
    
    // Get the clientSecret from your server and call payWithCard
    var clientSecret = 'your-client-secret-from-server';
    var card = elements.create('card');
    payWithCard(stripe, card, clientSecret);
    
    // Create a PaymentIntent with the cart details
    var createPaymentIntent = function (items) {
        return fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: items,
            }),
        }).then(function (result) {
            return result.json();
        });
    };
    
    // Handle the payment process
    function processPayment() {
        stripe.redirectToCheckout({
            // Replace with the ID of your SKU
            items: [{sku: 'pmc_1OgVzPFdjXAPBwqYvJ1Nr799', quantity: 1}],
            successUrl: 'https://buy.stripe.com/4gweXJgm2caC2dy3cc/successful',
            cancelUrl: 'https://buy.stripe.com/4gweXJgm2caC2dy3cc/canceled',
        }).then(function (result) {
            if (result.error) {
                // If redirectToCheckout fails due to a browser or network error, display the localized error message to your customer.
                var displayError = document.getElementById('error-message');
                displayError.textContent = result.error.message;
            }
        });
    }
    var elements = stripe.elements();
    var card = elements.create('card');
    card.mount('#card-element');
});

























































































