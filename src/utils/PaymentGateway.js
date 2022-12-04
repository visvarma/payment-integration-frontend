export default async function displayRazorpay(formValues) {
  const data = await fetch(
    "https://payment-integration-backend-production.up.railway.app/app/order/create",
    {
      method: "POST",
      body: JSON.stringify({
        product_id: "6389b7f795c2a02733bff316",
        ...formValues,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((t) => t.json());

  const options = {
    key: "rzp_test_1ORDQAcByw8j1A",
    currency: data.order.currency,
    amount: data.order.amount,
    description: "Wallet Transaction",
    image:
      "https://payment-integration-backend-production.up.railway.app/logo.jpg",
    order_id: data._order.id,
    handler: (response) => {
      alert("Payment Successfull");
      window.location = "/";
    },
    prefill: {
      name: "Vishal Varma",
      email: "visvarma2021@gmail.com",
      contact: "9999999999",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
