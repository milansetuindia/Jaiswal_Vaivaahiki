/*==========================================================
                    FORM.JS
            STEP 2 - FORM CONTROLLER
==========================================================*/

/*
============================================================
                GLOBAL VARIABLES
============================================================
*/

let currentStep = 1;

const totalSteps = 10;

/*
============================================================
                COMPLETE BIODATA
============================================================
*/


const biodata = {

    personal:{},

    education:{},

    work:{},

    family:{},

    partner:{},

    contact: {

        mobileNumber: "",

        currentAddress: "",

        permanentAddress: ""

    },

    declaration: {

        senderName: "",

        senderMobile: ""

    },

    photos:{},

    template: "template1"

};




/*
============================================================
                INITIALIZATION
============================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeForm();

});


/*
============================================================
                INITIALIZE FORM
============================================================
*/

function initializeForm(){

    const nextButton = document.getElementById("nextStepBtn");

    const previousButton = document.getElementById("previousStepBtn");

    if(nextButton){

        nextButton.addEventListener("click", nextStep);

    }

    if(previousButton){

        previousButton.addEventListener("click", previousStep);

    }

    showStep(currentStep);

}


/*
============================================================
                SHOW STEP
============================================================
*/

function showStep(step){

    const steps = document.querySelectorAll(".form-step");

    steps.forEach((section) => {

        section.classList.add("d-none");

        section.classList.remove("active-step");

    });

    const currentSection = document.querySelector(

        `.form-step[data-step="${step}"]`

    );

    if(currentSection){

        currentSection.classList.remove("d-none");

        currentSection.classList.add("active-step");

    }

    updateProgressBar();

    updateNavigationButtons();

}


/*
============================================================
                NEXT STEP
============================================================
*/

function nextStep(){

    /*
    ============================================
            VALIDATE CURRENT STEP
    ============================================
    */

    console.log("nextStep() called");

    if(!validateCurrentStep(currentStep)){

        return;

    }


    /*
    ============================================
            SAVE CURRENT STEP DATA
    ============================================
    */

    switch(currentStep){

        case 1:
            savePersonalData();
            break;

        case 2:
            saveEducationData();
            break;

        case 3:
            saveWorkData();
            break;

        case 4:
            saveFamilyData();
            break;

        case 5:
            savePartnerData();
            break;

        case 6:
            saveContactData();
            break;

        case 7:

            if(!savePhotoData()){
                return;
            }

            break;

        case 8:

            saveDeclarationData();

            /*
            Validate complete biodata
            before moving to template selection
            */

            if(!validateCompleteForm()){

                return;

            }

            break;


        case 9:

            /*
            Save selected template
            */

            if(!saveSelectedTemplate()){

                return;

            }

            /*
            Prepare review page
            */

            populateReview();

            break;

    }


    /*
    ============================================
            FINAL STEP
    ============================================
    */

    if(currentStep === totalSteps){

        completeForm();

        return;

    }


    /*
    ============================================
            MOVE TO NEXT STEP
    ============================================
    */

    currentStep++;

    showStep(currentStep);

}



/*
============================================================
                PREVIOUS STEP
============================================================
*/

function previousStep(){

    if(currentStep <= 1){

        return;

    }

    currentStep--;

    showStep(currentStep);

}


/*
============================================================
                UPDATE PROGRESS BAR
============================================================
*/

function updateProgressBar(){

    const progressBar = document.getElementById("formProgressBar");

    if(!progressBar){

        return;

    }

    const percentage = (currentStep / totalSteps) * 100;

    progressBar.style.width = percentage + "%";

    progressBar.innerHTML = currentStep + " / " + totalSteps;

}


/*
============================================================
                UPDATE BUTTONS
============================================================
*/

function updateNavigationButtons(){

    const previousButton =
        document.getElementById("previousStepBtn");

    const nextButton =
        document.getElementById("nextStepBtn");


    if(previousButton){

        previousButton.disabled =
            currentStep === 1;

    }


    if(nextButton){

        if(currentStep === totalSteps){

            const finishText =
                typeof translateText === "function"
                    ? translateText("Finish")
                    : "Finish";


            nextButton.innerHTML = `
                ${finishText}
                <i class="fa-solid fa-check"></i>
            `;

        }

        else{

            const nextText =
                typeof translateText === "function"
                    ? translateText("Next")
                    : "Next";


            nextButton.innerHTML = `
                ${nextText}
                <i class="fa-solid fa-arrow-right"></i>
            `;

        }

    }

}

/*==========================================================
            STEP 6 - STORE EDUCATION DATA
==========================================================*/

/*
============================================================
                TEMPORARY FORM DATA
============================================================
*/


/*
============================================================
            SAVE EDUCATION INFORMATION
============================================================
*/


function saveEducationData(){

    biodata.education = {

        highestQualification : getInputValue("highestQualification"),

        college : getInputValue("college"),

        Board12th : getInputValue("Board12th"),

        Board10th : getInputValue("Board10th"),

        specialSkill : getInputValue("specialSkill"),

        educationOther : getInputValue("educationOther")

    };

    debugLog(
        "Education Data Saved",
        biodata.education
    );

}




function saveWorkData(){

    biodata.work = {

        profession : getInputValue("profession"),

        designation : getInputValue("designation"),

        organization : getInputValue("organization"),

        workPlace : getInputValue("workPlace"),

        income : getInputValue("income")

    };

    debugLog(

        "Work Data Saved",

        biodata.work

    );

}



/*
============================================================
            GET INPUT VALUE
============================================================
*/

function getInputValue(id){

    const element = document.getElementById(id);

    if(!element){

        return "";

    }

    return element.value.trim();

}




/*==========================================================
            STEP 8 - STORE FAMILY DATA
==========================================================*/

/*
============================================================
            SAVE FAMILY INFORMATION
============================================================
*/

function saveFamilyData(){

    biodata.family = {

        fatherName : getInputValue("fatherName"),

        fatherOccupation : getInputValue("fatherOccupation"),

        motherName : getInputValue("motherName"),

        motherOccupation : getInputValue("motherOccupation"),

        siblingsDetails : getInputValue("siblingsDetails")

    };

    debugLog(
        "Family Data Saved",
        biodata.family
    );

}





/*==========================================================
            STEP 10 - STORE PARTNER PREFERENCE DATA
==========================================================*/

/*
============================================================
            SAVE PARTNER PREFERENCE
============================================================
*/

function savePartnerData(){

    biodata.partner = {

        preferredQualification :
            getInputValue("preferredQualification"),

        preferredProfession :
            getInputValue("preferredProfession"),

        preferredLocation :
            getInputValue("preferredLocation"),

        preferredCaste :
            getInputValue("preferredCaste"),

        otherExpectations :
            getInputValue("otherExpectations")

    };

    debugLog(
        "Partner Preference Saved",
        biodata.partner
    );
}



/*==========================================================
            STEP 12 - STORE CONTACT DETAILS
==========================================================*/

/*
============================================================
            SAVE CONTACT INFORMATION
============================================================
*/

function saveContactData(){

    biodata.contact = {

        mobileNumber : getInputValue("mobileNumber"),

        currentAddress : getInputValue("currentAddress"),

        permanentAddress : getInputValue("permanentAddress"),

    };

    debugLog(
        "Contact Details Saved",
        biodata.contact
    );

}

/*
============================================================
            SAVE DECLARATION INFORMATION
============================================================
*/

function saveDeclarationData(){

    biodata.declaration = {

        declaration: document.getElementById("declaration").value,

        senderName: getInputValue("senderName"),

        senderMobile: getInputValue("senderMobile")

    };

    debugLog(
        "Declaration Data Saved",
        biodata.declaration
    );

}


/*
============================================================
            SAVE SELECTED TEMPLATE
============================================================
*/

function saveSelectedTemplate(){

    const selectedTemplate = document.querySelector(

        'input[name="biodataTemplate"]:checked'

    );

    if(!selectedTemplate){

        alert("Please select a biodata template.");

        return false;

    }

    biodata.template = selectedTemplate.value;

    debugLog(

        "Template Selected",

        biodata.template

    );

    return true;

}


/*
============================================================
                SAVE PERSONAL DETAILS
============================================================
*/


function savePersonalData(){

    biodata.personal = {

        fullName : getInputValue("fullName"),

        dob : getInputValue("dob"),

        timeOfBirth:

            getInputValue("birthHour")

            + ":"

            + getInputValue("birthMinute")

            + " "

            + getInputValue("birthPeriod"),

        placeOfBirth : getInputValue("placeOfBirth"),

        religion : getInputValue("religion"),

        gotra : getInputValue("gotra"),

        caste : getInputValue("caste"),

        subCaste : getInputValue("subCaste"),

        rashi : getInputValue("rashi"),

        gan : getInputValue("gan"),

        height : getInputValue("height"),

        complexion : getInputValue("complexion"),

        maritalStatus : getInputValue("maritalStatus"),

        manglik : getInputValue("manglik"),

        language : getInputValue("language"),

        diet : getInputValue("diet"),

        hobbies : getInputValue("hobbies"),

        other : getInputValue("other")

    };

}


/*
============================================================
                REVIEW PAGE
============================================================
*/

function populateReview(){

    fillReviewSection(
        "reviewPersonal",
        biodata.personal
    );

    fillReviewSection(
        "reviewEducation",
        biodata.education
    );

    fillReviewSection(
        "reviewWork",
        biodata.work
    );

    fillReviewSection(
        "reviewFamily",
        biodata.family
    );

    fillReviewSection(
        "reviewPartner",
        biodata.partner
    );

    fillReviewSection(
        "reviewContact",
        {
            mobileNumber: biodata.contact.mobileNumber
        }
    );

    fillReviewSection(
    "reviewDeclaration",
        {
            declaration: biodata.declaration.declaration,
            senderName: biodata.declaration.senderName,
            senderMobile: biodata.declaration.senderMobile
        }
    );

    fillReviewSection(
        "reviewAddress",
        {
            currentAddress: biodata.contact.currentAddress,
            permanentAddress: biodata.contact.permanentAddress
        }
    );

    populatePhotoReview();

}





/*
============================================================
                REVIEW HELPER
============================================================
*/

function fillReviewSection(

    containerId,

    data

){

    const container = document.getElementById(containerId);

    if(!container){

        return;

    }

    let html = "";

    for(const key in data){

        html += `

            <div class="review-item">

                <strong>

                    ${formatLabel(key)}

                </strong>

                :

                ${data[key] || "-"}

            </div>

        `;

    }

    if(html === ""){

        html = "<p>No data available.</p>";

    }

    container.innerHTML = html;

}


/*
============================================================
                PHOTO REVIEW
============================================================
*/

function populatePhotoReview(){

    const container = document.getElementById("reviewPhotos");

    if(!container){

        return;

    }

    container.innerHTML = "";

    for(const key in biodata.photos){

        const photo = biodata.photos[key];

        const image = document.createElement("img");

        image.src = photo.preview;

        image.className =

            "img-fluid rounded shadow-sm";

        container.appendChild(image);

    }

}

/*
============================================================
                LABEL FORMAT
============================================================
*/


function formatLabel(text){

    const labels = {

        /* PERSONAL */
        fullName: {
            en: "Full Name",
            hi: "पूरा नाम"
        },

        dob: {
            en: "Date Of Birth",
            hi: "जन्म तिथि"
        },

        timeOfBirth: {
            en: "Time Of Birth",
            hi: "जन्म का समय"
        },

        placeOfBirth: {
            en: "Place Of Birth",
            hi: "जन्म स्थान"
        },

        religion: {
            en: "Religion",
            hi: "धर्म"
        },

        gotra: {
            en: "Gotra",
            hi: "गोत्र"
        },

        caste: {
            en: "Caste",
            hi: "जाति"
        },

        subCaste: {
            en: "Sub Caste",
            hi: "उपजाति"
        },

        rashi: {
            en: "Rashi",
            hi: "राशि"
        },

        gan: {
            en: "Gan",
            hi: "गण"
        },

        height: {
            en: "Height",
            hi: "कद"
        },

        complexion: {
            en: "Complexion",
            hi: "रंग"
        },

        maritalStatus: {
            en: "Marital Status",
            hi: "वैवाहिक स्थिति"
        },

        manglik: {
            en: "Manglik",
            hi: "मांगलिक"
        },

        language: {
            en: "Language",
            hi: "भाषा"
        },

        diet: {
            en: "Diet",
            hi: "आहार"
        },

        hobbies: {
            en: "Hobbies",
            hi: "शौक"
        },

        other: {
            en: "Other",
            hi: "अन्य"
        },


        /* EDUCATION */
        highestQualification: {
            en: "Highest Qualification",
            hi: "उच्चतम शैक्षणिक योग्यता"
        },

        college: {
            en: "College",
            hi: "कॉलेज"
        },

        Board12th: {
            en: "12th Board",
            hi: "12वीं बोर्ड"
        },

        Board10th: {
            en: "10th Board",
            hi: "10वीं बोर्ड"
        },

        specialSkill: {
            en: "Special Skill",
            hi: "विशेष कौशल"
        },

        educationOther: {
            en: "Education Other",
            hi: "अन्य शिक्षा"
        },


        /* WORK */
        profession: {
            en: "Profession",
            hi: "पेशा"
        },

        designation: {
            en: "Designation",
            hi: "पद"
        },

        organization: {
            en: "Organization",
            hi: "संस्था"
        },

        workPlace: {
            en: "Work Place",
            hi: "कार्य स्थान"
        },

        income: {
            en: "Income",
            hi: "आय"
        },


        /* FAMILY */
        fatherName: {
            en: "Father's Name",
            hi: "पिता का नाम"
        },

        fatherOccupation: {
            en: "Father's Occupation",
            hi: "पिता का व्यवसाय"
        },

        motherName: {
            en: "Mother's Name",
            hi: "माता का नाम"
        },

        motherOccupation: {
            en: "Mother's Occupation",
            hi: "माता का व्यवसाय"
        },

        siblingsDetails: {
            en: "Siblings Details",
            hi: "भाई-बहनों की जानकारी"
        },


        /* PARTNER */
        preferredQualification: {
            en: "Preferred Qualification",
            hi: "पसंदीदा शैक्षणिक योग्यता"
        },

        preferredProfession: {
            en: "Preferred Profession",
            hi: "पसंदीदा पेशा"
        },

        preferredLocation: {
            en: "Preferred Location",
            hi: "पसंदीदा स्थान"
        },

        preferredCaste: {
            en: "Preferred Caste",
            hi: "पसंदीदा जाति"
        },

        otherExpectations: {
            en: "Other Expectations",
            hi: "अन्य अपेक्षाएँ"
        },


        /* CONTACT */
        mobileNumber: {
            en: "Mobile Number",
            hi: "मोबाइल नंबर"
        },


        /* ADDRESS */
        currentAddress: {
            en: "Current Address",
            hi: "वर्तमान पता"
        },

        permanentAddress: {
            en: "Permanent Address",
            hi: "स्थायी पता"
        },


        /* DECLARATION */
        declaration: {
            en: "Declaration",
            hi: "घोषणा"
        },

        senderName: {
            en: "Sender Name",
            hi: "भेजने वाले का नाम"
        },

        senderMobile: {
            en: "Sender Mobile",
            hi: "भेजने वाले का मोबाइल नंबर"
        }

    };


    const language =
        typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : "en";


    if(labels[text]){

        return labels[text][language] ||
               labels[text].en;

    }


    /*
     * Fallback for any future field
     */
    return text
        .replace(/([A-Z])/g," $1")
        .replace(/^./,str => str.toUpperCase());

}




/*==========================================================
            STEP 17 - OPEN BIODATA FORM
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeCreateBiodataButton();

});


/*
============================================================
        INITIALIZE CREATE BIODATA BUTTON
============================================================
*/




function initializeCreateBiodataButton(){

    const heroButton =
        document.getElementById("createBiodataBtn");

    const previewButton =
        document.getElementById("previewCreateBtn");

    if(heroButton){

        heroButton.addEventListener(
            "click",
            openBiodataForm
        );

    }

    if(previewButton){

        previewButton.addEventListener(
            "click",
            openBiodataForm
        );

    }

}





/*
============================================================
            OPEN BIODATA FORM
============================================================
*/

function openBiodataForm(){

    /*
    ============================================
            HIDE LANDING PAGE SECTIONS
    ============================================
    */

    hideSection("hero");

    hideSection("features");

    hideSection("support");

    hideSection("join-portal");

    hideSection("preview");

    hideSection("how-it-works");

    hideSection("faq");

    hideSection("footer");


    /*
    ============================================
            SHOW FORM SECTION
    ============================================
    */

    const formSection = document.getElementById(

        "biodataFormSection"

    );

    if(formSection){

        formSection.classList.remove("d-none");

    }


    /*
    ============================================
            RESET FORM
    ============================================
    */

    currentStep = 1;

    showStep(currentStep);


    /*
    ============================================
            SCROLL TO TOP
    ============================================
    */

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


/*
============================================================
            HIDE SECTION
============================================================
*/

function hideSection(id){

    const section = document.getElementById(id);

    if(section){

        section.style.display = "none";

    }

}


/*
============================================================
            SHOW SECTION
============================================================
*/

function showSection(id){

    const section = document.getElementById(id);

    if(section){

        section.style.display = "";

    }

}


/*
============================================================
        RETURN TO LANDING PAGE
============================================================
*/

function returnToLandingPage(){

    showSection("hero");

    showSection("features");

    showSection("preview");

    showSection("how-it-works");

    showSection("faq");

    showSection("footer");

    const formSection = document.getElementById(

        "biodataFormSection"

    );

    if(formSection){

        formSection.classList.add("d-none");

    }

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}





/*==========================================================
            STEP 18 - FINAL CLEANUP
==========================================================*/

/*
============================================================
                FORM CONFIGURATION
============================================================
*/

const FORM_CONFIG = {

    totalSteps: 10,

    version: "1.0.0",

    autoSave: false,

    debug: true

};


/*
============================================================
                RESET COMPLETE FORM
============================================================
*/

function resetCompleteForm(){

    const form = document.querySelector("#multiStepForm");

    if(form){

        form.reset?.();

    }

    currentStep = 1;

    showStep(currentStep);

    resetFormData();

}


/*
============================================================
                RESET STORED DATA
============================================================
*/

function resetFormData(){

    biodata.personal = {};

    biodata.education = {};

    biodata.work = {};

    biodata.family = {};

    biodata.partner = {};

    biodata.contact = {};

    biodata.declaration = {};

    biodata.photos = {};

    biodata.template = "template1";

}

/*
============================================================
                FORM COMPLETED
============================================================
*/

function completeForm(){

    console.log("================================");

    console.log("Biodata Form Completed");

    console.log("================================");

    debugLog("Biodata Form Completed", biodata);

}


/*
============================================================
                SAFE GET ELEMENT
============================================================
*/

function safeElement(id){

    const element = document.getElementById(id);

    if(!element){

        if(FORM_CONFIG.debug){

            console.warn(

                "Element not found:",

                id

            );

        }

        return null;

    }

    return element;

}


/*
============================================================
                DEBUG LOG
============================================================
*/

function debugLog(title,data){

    if(!FORM_CONFIG.debug){

        return;

    }

    console.group(title);

    console.log(data);

    console.groupEnd();

}


/*
============================================================
                EXPORT DATA
============================================================
*/

function exportFormData(){

    return JSON.parse(

        JSON.stringify(biodata)

    );

}


/*
============================================================
                FINAL INITIALIZATION
============================================================
*/

document.addEventListener("DOMContentLoaded",()=>{

    debugLog(

        "Form Module",

        "Initialized Successfully"

    );

});




document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeTemplateCardSelection();

    }
);




/*==========================================================
        STEP 9 - CLICK ENTIRE TEMPLATE CARD
==========================================================*/

function initializeTemplateCardSelection() {

    const templateCards =
        document.querySelectorAll(
            ".template-option"
        );

    templateCards.forEach(card => {

        const radio =
            card.querySelector(
                'input[name="biodataTemplate"]'
            );

        if (!radio) {
            return;
        }

        card.addEventListener(
            "click",
            function(event) {

                /*
                 * If user clicked the radio button
                 * or label, browser already handles it.
                 */
                if (
                    event.target === radio ||
                    event.target.tagName === "LABEL"
                ) {
                    updateSelectedTemplateCard();
                    return;
                }

                /*
                 * Clicking anywhere else on the
                 * template selects the radio button.
                 */
                radio.checked = true;

                radio.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );

                updateSelectedTemplateCard();

            }
        );

        radio.addEventListener(
            "change",
            function() {

                updateSelectedTemplateCard();

            }
        );

    });

    updateSelectedTemplateCard();

}


/*==========================================================
        UPDATE SELECTED TEMPLATE VISUAL
==========================================================*/

function updateSelectedTemplateCard() {

    const cards =
        document.querySelectorAll(
            ".template-option"
        );

    cards.forEach(card => {

        const radio =
            card.querySelector(
                'input[name="biodataTemplate"]'
            );

        if (
            radio &&
            radio.checked
        ) {

            card.classList.add(
                "selected"
            );

        } else {

            card.classList.remove(
                "selected"
            );

        }

    });

}




