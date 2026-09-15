/*==========================================================
                WHATSAPP BIODATA SUBMISSION
==========================================================*/


/*==========================================================
                WHATSAPP CONFIGURATION
==========================================================*/

const WHATSAPP_CONFIG = {

    // WhatsApp number
    // Country code 91 + 7050510511
    phoneNumber: "917050510511"

};


/*==========================================================
                GET WHATSAPP MESSAGE
==========================================================*/

function getWhatsAppMessage() {

    /*
     * Get the currently selected website language.
     * This function comes from language.js.
     */
    const language =
        typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : "en";


    /*======================================================
                    HINDI MESSAGE
    ======================================================*/

    if (language === "hi") {

        return (
            "नमस्ते Jaiswal Vaivaahiki Admin,\n\n" +

            "मैं अपना बायोडाटा Jaiswal Vaivaahiki वैवाहिक वेबसाइट पर जोड़ना चाहता/चाहती हूँ।\n\n" +

            "मैंने अपना बायोडाटा PDF डाउनलोड कर लिया है और इसे यहाँ अपलोड करने के लिए भेज रहा/रही हूँ।\n\n" +

            "धन्यवाद।"
        );

    }


    /*======================================================
                    ENGLISH MESSAGE
    ======================================================*/

    return (
        "Hello Jaiswal Vaivaahiki Admin,\n\n" +

        "I want to add my biodata to the Jaiswal Vaivaahiki matrimonial website.\n\n" +

        "I have downloaded my biodata PDF and will send it here for uploading.\n\n" +

        "Thank you."
    );

}


/*==========================================================
                GET POPUP TEXT
==========================================================*/

function getWhatsAppPopupText() {

    const language =
        typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : "en";


    /*======================================================
                    HINDI
    ======================================================*/

    if (language === "hi") {

        return {

            title: "WhatsApp खोलें",

            subtitle:
                "हमसे संपर्क करने के लिए विकल्प चुनें।",

            whatsapp:
                "WhatsApp",

            whatsappDescription:
                "WhatsApp Messenger खोलें",

            business:
                "WhatsApp Business",

            businessDescription:
                "WhatsApp Business खोलें",

            cancel:
                "रद्द करें"

        };

    }


    /*======================================================
                    ENGLISH
    ======================================================*/

    return {

        title: "Choose WhatsApp",

        subtitle:
            "Select how you want to contact us.",

        whatsapp:
            "WhatsApp",

        whatsappDescription:
            "Open WhatsApp Messenger",

        business:
            "WhatsApp Business",

        businessDescription:
            "Open WhatsApp Business",

        cancel:
            "Cancel"

    };

}


/*==========================================================
                SHOW WHATSAPP CHOICE POPUP
==========================================================*/

function showWhatsAppChoicePopup(event) {

    /*
     * Prevent the default action.
     *
     * Important for the homepage <a> element
     * because it already contains a WhatsApp href.
     */
    if (event) {

        event.preventDefault();

    }


    /*
     * Prevent multiple popups.
     */
    const existingPopup =
        document.getElementById(
            "whatsappChoicePopup"
        );


    if (existingPopup) {

        return;

    }


    /*
     * Get popup text according to
     * current website language.
     */
    const text =
        getWhatsAppPopupText();


    /*======================================================
                    CREATE OVERLAY
    ======================================================*/

    const overlay =
        document.createElement("div");


    overlay.id =
        "whatsappChoicePopup";


    overlay.className =
        "whatsapp-choice-overlay";


    /*======================================================
                    CREATE POPUP
    ======================================================*/

    const popup =
        document.createElement("div");


    popup.className =
        "whatsapp-choice-popup";


    /*
     * Prevent clicks inside popup from
     * triggering overlay click.
     */
    popup.addEventListener(
        "click",
        function(e) {

            e.stopPropagation();

        }
    );


    /*======================================================
                    POPUP HTML
    ======================================================*/

    popup.innerHTML = `

        <!-- CLOSE BUTTON -->

        <button
            type="button"
            class="whatsapp-popup-close"
            id="closeWhatsappPopup"
            aria-label="Close">

            <i class="fa-solid fa-xmark"></i>

        </button>


        <!-- HEADER -->

        <div class="whatsapp-choice-header">


            <!-- WHATSAPP ICON -->

            <div class="whatsapp-choice-icon">

                <i class="fa-brands fa-whatsapp"></i>

            </div>


            <!-- TITLE -->

            <h3>
                ${text.title}
            </h3>


            <!-- SUBTITLE -->

            <p>
                ${text.subtitle}
            </p>


        </div>


        <!-- OPTIONS -->

        <div class="whatsapp-choice-options">


            <!-- NORMAL WHATSAPP -->

            <button
                type="button"
                class="whatsapp-option-card"
                id="normalWhatsappBtn">


                <div class="whatsapp-option-icon">

                    <i class="fa-brands fa-whatsapp"></i>

                </div>


                <div class="whatsapp-option-content">

                    <div class="whatsapp-option-title">
                        ${text.whatsapp}
                    </div>

                    <div class="whatsapp-option-description">
                        ${text.whatsappDescription}
                    </div>

                </div>


                <div class="whatsapp-option-arrow">

                    <i class="fa-solid fa-chevron-right"></i>

                </div>


            </button>


            <!-- WHATSAPP BUSINESS -->

            <button
                type="button"
                class="whatsapp-option-card"
                id="businessWhatsappBtn">


                <div class="whatsapp-option-icon">

                    <i class="fa-brands fa-whatsapp"></i>

                </div>


                <div class="whatsapp-option-content">

                    <div class="whatsapp-option-title">
                        ${text.business}
                    </div>

                    <div class="whatsapp-option-description">
                        ${text.businessDescription}
                    </div>

                </div>


                <div class="whatsapp-option-arrow">

                    <i class="fa-solid fa-chevron-right"></i>

                </div>


            </button>


        </div>


        <!-- CANCEL -->

        <button
            type="button"
            class="whatsapp-cancel-btn"
            id="cancelWhatsappBtn">

            ${text.cancel}

        </button>


    `;


    /*======================================================
                    ADD POPUP
    ======================================================*/

    overlay.appendChild(popup);

    document.body.appendChild(overlay);


    /*
     * Prevent body scrolling while popup
     * is open.
     */
    document.body.classList.add(
        "whatsapp-popup-open"
    );


    /*======================================================
                    NORMAL WHATSAPP
    ======================================================*/

    const normalButton =
        document.getElementById(
            "normalWhatsappBtn"
        );


    if (normalButton) {

        normalButton.addEventListener(
            "click",
            function() {

                openWhatsApp("normal");

            }
        );

    }


    /*======================================================
                    BUSINESS WHATSAPP
    ======================================================*/

    const businessButton =
        document.getElementById(
            "businessWhatsappBtn"
        );


    if (businessButton) {

        businessButton.addEventListener(
            "click",
            function() {

                openWhatsApp("business");

            }
        );

    }


    /*======================================================
                    CLOSE BUTTON
    ======================================================*/

    const closeButton =
        document.getElementById(
            "closeWhatsappPopup"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function() {

                closeWhatsAppChoicePopup();

            }
        );

    }


    /*======================================================
                    CANCEL BUTTON
    ======================================================*/

    const cancelButton =
        document.getElementById(
            "cancelWhatsappBtn"
        );


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function() {

                closeWhatsAppChoicePopup();

            }
        );

    }


    /*======================================================
                    CLICK OUTSIDE
    ======================================================*/

    overlay.addEventListener(
        "click",
        function(e) {

            if (e.target === overlay) {

                closeWhatsAppChoicePopup();

            }

        }
    );


    /*======================================================
                    ESC KEY
    ======================================================*/

    document.addEventListener(
        "keydown",
        handleWhatsAppEscape
    );

}


/*==========================================================
                CLOSE POPUP
==========================================================*/

function closeWhatsAppChoicePopup() {

    const popup =
        document.getElementById(
            "whatsappChoicePopup"
        );


    if (!popup) {

        return;

    }


    popup.remove();


    document.body.classList.remove(
        "whatsapp-popup-open"
    );


    document.removeEventListener(
        "keydown",
        handleWhatsAppEscape
    );

}


/*==========================================================
                ESC KEY HANDLER
==========================================================*/

function handleWhatsAppEscape(event) {

    if (event.key === "Escape") {

        closeWhatsAppChoicePopup();

    }

}


/*==========================================================
                ANDROID DETECTION
==========================================================*/

function isAndroidDevice() {

    return /Android/i.test(
        navigator.userAgent
    );

}


/*==========================================================
                OPEN NORMAL WHATSAPP
==========================================================*/

function openNormalWhatsApp(message) {

    const encodedMessage =
        encodeURIComponent(message);


    /*
     * Android:
     *
     * Try to open normal WhatsApp specifically.
     */
    if (isAndroidDevice()) {

        const intentUrl =
            "intent://send?phone=" +
            WHATSAPP_CONFIG.phoneNumber +
            "&text=" +
            encodedMessage +
            "#Intent;" +
            "scheme=whatsapp;" +
            "package=com.whatsapp;" +
            "end";


        window.location.href =
            intentUrl;


        return;

    }


    /*
     * Desktop / iPhone / other devices:
     *
     * Use standard WhatsApp URL.
     */
    const url =
        "https://wa.me/" +
        WHATSAPP_CONFIG.phoneNumber +
        "?text=" +
        encodedMessage;


    window.open(
        url,
        "_blank"
    );

}


/*==========================================================
                OPEN WHATSAPP BUSINESS
==========================================================*/

function openBusinessWhatsApp(message) {

    const encodedMessage =
        encodeURIComponent(message);


    /*
     * Android:
     *
     * WhatsApp Business package.
     */
    if (isAndroidDevice()) {

        const intentUrl =
            "intent://send?phone=" +
            WHATSAPP_CONFIG.phoneNumber +
            "&text=" +
            encodedMessage +
            "#Intent;" +
            "scheme=whatsapp;" +
            "package=com.whatsapp.w4b;" +
            "end";


        window.location.href =
            intentUrl;


        return;

    }


    /*
     * Desktop / iPhone / other devices:
     *
     * Standard WhatsApp fallback.
     */
    const url =
        "https://wa.me/" +
        WHATSAPP_CONFIG.phoneNumber +
        "?text=" +
        encodedMessage;


    window.open(
        url,
        "_blank"
    );

}


/*==========================================================
                OPEN SELECTED WHATSAPP
==========================================================*/

function openWhatsApp(type) {

    /*
     * Get language-specific message.
     */
    const message =
        getWhatsAppMessage();


    /*
     * Close popup.
     */
    closeWhatsAppChoicePopup();


    /*======================================================
                    NORMAL WHATSAPP
    ======================================================*/

    if (type === "normal") {

        openNormalWhatsApp(
            message
        );

        return;

    }


    /*======================================================
                    WHATSAPP BUSINESS
    ======================================================*/

    if (type === "business") {

        openBusinessWhatsApp(
            message
        );

        return;

    }

}


/*==========================================================
                INITIALIZE WHATSAPP BUTTONS
==========================================================*/

function initializeWhatsAppButton() {

    /*
     * Find BOTH WhatsApp buttons.
     *
     * Homepage:
     * .whatsapp-button
     *
     * Step 10:
     * #sendWhatsappBtn
     */
    const buttons =
        document.querySelectorAll(
            ".whatsapp-button, #sendWhatsappBtn"
        );


    if (!buttons.length) {

        return;

    }


    /*======================================================
                    INITIALIZE EACH BUTTON
    ======================================================*/

    buttons.forEach(
        function(button) {


            /*
             * Prevent duplicate initialization.
             */
            if (
                button.dataset.whatsappInitialized ===
                "true"
            ) {

                return;

            }


            /*
             * Mark as initialized.
             */
            button.dataset.whatsappInitialized =
                "true";


            /*
             * Show popup on click.
             */
            button.addEventListener(
                "click",
                showWhatsAppChoicePopup
            );


        }
    );

}


/*==========================================================
                PAGE INITIALIZATION
==========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeWhatsAppButton();

    }
);


/*==========================================================
                GLOBAL EXPORTS
==========================================================*/

window.sendBiodataOnWhatsApp =
    showWhatsAppChoicePopup;


window.initializeWhatsAppButton =
    initializeWhatsAppButton;


window.getWhatsAppMessage =
    getWhatsAppMessage;


window.openWhatsApp =
    openWhatsApp;


window.closeWhatsAppChoicePopup =
    closeWhatsAppChoicePopup;