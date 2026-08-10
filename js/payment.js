//js/payment.js


async function startPayment() {

    try {

        const response = await fetch(
            window.API_URL + "/api/payment/create-order",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            }
        );

        const data = await response.json();

        if (!data.success) {

            alert("Unable to create payment.");

            return;

        }

        const options = {

            key: window.RAZORPAY_KEY,

            amount: data.order.amount,

            currency: data.order.currency,

            name: window.APP_NAME,

            description: "Matrimonial Biodata PDF",

            order_id: data.order.id,

            handler: async function(response) {

                console.log("Payment Success");

                const verify = await fetch(
                    window.API_URL + "/api/payment/verify-payment",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(response)
                    }
                );

                const verifyData = await verify.json();

                localStorage.setItem(
                    "downloadToken",
                    verifyData.token
                );

                await downloadPDF();

            },

            theme: {

                color: "#b35a1f"

            }

        };

        const rzp = new Razorpay(options);

        rzp.open();

    }

    catch (err) {

        console.error(err);

        alert("Payment Failed.");

    }

}


window.startPayment = startPayment;