/* ==========================================
   PAYMENT WITH DOWNLOAD RECOVERY
========================================== */

const PENDING_PAYMENT_KEY = "jv_pending_paid_pdf_v1";

let paymentBusy = false;


/* ==========================================
   GET EXISTING PAYMENT RECORD
========================================== */

function getPendingPayment() {

    for (const store of [sessionStorage, localStorage]) {

        try {

            const value = store.getItem(
                PENDING_PAYMENT_KEY
            );

            if (value) {
                return JSON.parse(value);
            }

        } catch (error) {

            console.warn(
                "Cannot read saved payment:",
                error
            );

        }

    }

    return null;

}


/* ==========================================
   SAVE PAYMENT RECORD
========================================== */

function savePendingPayment(value) {

    const json = JSON.stringify(value);

    let saved = false;

    for (const store of [sessionStorage, localStorage]) {

        try {

            store.setItem(
                PENDING_PAYMENT_KEY,
                json
            );

            saved = true;

        } catch (error) {

            console.warn(
                "Payment recovery storage error:",
                error
            );

        }

    }

    return saved;

}


/* ==========================================
   CLEAR COMPLETED PAYMENT RECORD
========================================== */

function clearPendingPayment() {

    for (const store of [localStorage, sessionStorage]) {

        try {
            store.removeItem(PENDING_PAYMENT_KEY);
        } catch (error) {
            console.warn(error);
        }

    }

}


/* ==========================================
   CALL BACKEND API
========================================== */

async function paymentPost(route, payload) {

    const response = await fetch(

        window.API_URL + "/api/payment/" + route,

        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(payload)
        }

    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Payment service unavailable"
        );
    }

    return data;

}


/* ==========================================
   RECOVER PREVIOUSLY PAID DOWNLOAD
========================================== */

async function recoverPaidDownload() {

    const pending = getPendingPayment();

    if (!pending) {
        return false;
    }

    try {

        // If a valid token was already saved,
        // use it instead of starting another payment.

        if (pending.token) {

            const status = await paymentPost(
                "verify-download",
                {
                    token: pending.token
                }
            );

            if (status.success) {

                await downloadPDF();

                return true;

            }

        }

        let data;

        // Try the Razorpay callback details first.

        if (pending.razorpayResponse) {

            try {

                data = await paymentPost(
                    "verify-payment",
                    pending.razorpayResponse
                );

            } catch (error) {

                console.warn(
                    "Payment callback verification pending:",
                    error.message
                );

            }

        }

        // If the callback could not be verified,
        // ask the backend to check Razorpay directly.

        if (!data || !data.success) {

            data = await paymentPost(
                "recover-payment",
                {
                    orderId: pending.orderId,
                    recoveryKey: pending.recoveryKey
                }
            );

        }

        if (data.success && data.token) {

            pending.token = data.token;

            if (!savePendingPayment(pending)) {

                alert(
                    "Payment verified, but recovery details " +
                    "could not be saved. Keep this page open."
                );

            }

            await downloadPDF();

        } else {

            alert(
                data.message ||
                "Payment confirmation is pending. " +
                "Please retry without paying again."
            );

        }

    } catch (error) {

        console.error(
            "Payment Recovery Error:",
            error
        );

        if (error.message === "Download already used") {

            clearPendingPayment();

            try {
                localStorage.removeItem("downloadToken");
            } catch (_) {}

            alert(
                "This paid download was already confirmed as used. " +
                "A new PDF download requires a new payment."
            );

        } else {

            alert(
                "Unable to check your previous payment. " +
                "Please click Download PDF again later. " +
                "Do NOT pay again.\n\n" +
                error.message
            );

        }

    }

    return true;

}


/* ==========================================
   START PAYMENT OR RECOVER DOWNLOAD
========================================== */

async function startPayment() {

    if (paymentBusy) {
        return;
    }

    paymentBusy = true;

    try {

        // Check any previously verified token.

        const oldToken =
            localStorage.getItem("downloadToken");

        if (oldToken && !getPendingPayment()) {

            try {

                const data = await paymentPost(
                    "verify-download",
                    {
                        token: oldToken
                    }
                );

                if (data.success) {

                    await downloadPDF();

                    return;

                }

            } catch (error) {

                if (
                    error.message === "Download already used" ||
                    error.message === "Download token not found"
                ) {

                    localStorage.removeItem("downloadToken");

                } else {

                    throw error;

                }

            }

        }

        // Never create a new order while an earlier
        // payment is unresolved.

        const recovered = await recoverPaidDownload();

        if (recovered) {
            return;
        }

        // Create a new order only if there is
        // no outstanding payment record.

        const data = await paymentPost(
            "create-order",
            {}
        );

        if (
            !data.success ||
            !data.order?.id ||
            !data.recoveryKey
        ) {
            throw new Error(
                "Unable to create payment order"
            );
        }

        const pending = {

            orderId: data.order.id,

            recoveryKey: data.recoveryKey

        };

        // Save recovery details BEFORE opening Razorpay.

        if (!savePendingPayment(pending)) {

            throw new Error(
                "Cannot save payment recovery details. " +
                "Back up your biodata and free browser storage " +
                "before making payment."
            );

        }

        const options = {

            key: window.RAZORPAY_KEY,

            amount: data.order.amount,

            currency: data.order.currency,

            name: window.APP_NAME,

            description: "Matrimonial Biodata PDF",

            order_id: data.order.id,

            handler: async function(response) {

                // Save the Razorpay response immediately.

                pending.razorpayResponse = response;

                savePendingPayment(pending);

                // Verify existing payment and download.
                // Do NOT create a second order.

                await recoverPaidDownload();

            },

            theme: {
                color: "#b35a1f"
            }

        };

        const razorpay = new Razorpay(options);

        razorpay.open();

    } catch (error) {

        console.error(
            "Payment Error:",
            error
        );

        alert(
            error.message ||
            "Payment unavailable. Please retry later."
        );

    } finally {

        paymentBusy = false;

    }

}


/* ==========================================
   GLOBAL FUNCTIONS
========================================== */

window.startPayment = startPayment;

window.getPendingPayment = getPendingPayment;

window.savePendingPayment = savePendingPayment;

window.clearPendingPayment = clearPendingPayment;

window.paymentPost = paymentPost;