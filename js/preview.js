function formatDOB(dateString) {
    if (!dateString) {
        return "";
    }

    const parts = dateString.split("-");

    if (parts.length !== 3) {
        return dateString;
    }

    const [year, month, day] = parts;

    return `${day}-${month}-${year}`;
}

// =========================================
// preview.js
// =========================================


function renderPreviewContainer() {


    /* =========================================
            SELECT BIODATA TEMPLATE
    ========================================= */

    const selectedTemplate =
        biodata.template || "template1";


    const config =
        TEMPLATE_CONFIG[selectedTemplate] ||
        TEMPLATE_CONFIG.template1;


    /*
    =============================================
            UPDATE TEMPLATE BACKGROUND IMAGE
    =============================================
    */

    const templateImage =
        document.querySelector(".pdf-template");


    if(templateImage && config){

        templateImage.src = config.image;

    }



    /* ==========================
            Personal Details
    ========================== */

    document.getElementById("previewName").textContent =
        biodata.personal.fullName || "";

    document.getElementById("previewDOB").textContent =
        formatDOB(biodata.personal.dob);

    document.getElementById("previewTime").textContent =
        biodata.personal.timeOfBirth || "";

    document.getElementById("previewPlace").textContent =
        biodata.personal.placeOfBirth || "";

    document.getElementById("previewReligion").textContent =
        biodata.personal.religion || "";

    document.getElementById("previewGotra").textContent =
        biodata.personal.gotra || "";

    document.getElementById("previewSubCaste").textContent =
        biodata.personal.subCaste || "";

    document.getElementById("previewRashi").textContent =
        biodata.personal.rashi || "";

    document.getElementById("previewGan").textContent =
        biodata.personal.gan || "";

    document.getElementById("previewHeight").textContent =
        biodata.personal.height || "";

    document.getElementById("previewComplexion").textContent =
        biodata.personal.complexion || "";

    document.getElementById("previewMaritalStatus").textContent =
        biodata.personal.maritalStatus || "";

    document.getElementById("previewCaste").textContent =
        biodata.personal.caste || "";

    document.getElementById("previewManglik").textContent =
        biodata.personal.manglik || "";

    document.getElementById("previewLanguage").textContent =
        biodata.personal.language || "";

    document.getElementById("previewDiet").textContent =
        biodata.personal.diet || "";

    document.getElementById("previewHobbies").textContent =
        biodata.personal.hobbies || "";

    document.getElementById("previewOther").textContent =
        biodata.personal.other || "";



    /* ==========================
            Education
    ========================== */

    document.getElementById("previewHighestQualification").textContent =
        biodata.education.highestQualification || "";

    document.getElementById("previewCollege").textContent =
        biodata.education.college || "";

    document.getElementById("previewBoard12th").textContent =
        biodata.education.Board12th || "";

    document.getElementById("previewBoard10th").textContent =
        biodata.education.Board10th || "";

    document.getElementById("previewSpecialSkill").textContent =
        biodata.education.specialSkill || "";

    document.getElementById("previewEducationOther").textContent =
        biodata.education.educationOther || "";



    /* ==========================
            Work & Career
    ========================== */

    document.getElementById("previewProfession").textContent =
        biodata.work.profession || "";

    document.getElementById("previewDesignation").textContent =
        biodata.work.designation || "";

    document.getElementById("previewOrganization").textContent =
        biodata.work.organization || "";

    document.getElementById("previewWorkPlace").textContent =
        biodata.work.workPlace || "";

    document.getElementById("previewIncome").textContent =
        biodata.work.income || "";



    /* ==========================
            Family Details
    ========================== */

    document.getElementById("previewFatherName").textContent =
        biodata.family.fatherName || "";

    document.getElementById("previewFatherOccupation").textContent =
        biodata.family.fatherOccupation || "";

    document.getElementById("previewMotherName").textContent =
        biodata.family.motherName || "";

    document.getElementById("previewMotherOccupation").textContent =
        biodata.family.motherOccupation || "";

    document.getElementById("previewSiblingsDetails").textContent =
        biodata.family.siblingsDetails || "";



    /* ==========================
            Partner Preference
    ========================== */

    document.getElementById("previewPartnerQualification").textContent =
        biodata.partner.preferredQualification || "";

    document.getElementById("previewPartnerProfession").textContent =
        biodata.partner.preferredProfession || "";

    document.getElementById("previewPartnerLocation").textContent =
        biodata.partner.preferredLocation || "";

    document.getElementById("previewPartnerCaste").textContent =
        biodata.partner.preferredCaste || "";

    document.getElementById("previewPartnerOther").textContent =
        biodata.partner.otherExpectations || "";



    /* ==========================
            Contact Details
    ========================== */

    document.getElementById("previewMobile").textContent =
        biodata.contact.mobileNumber || "";

    document.getElementById("previewSenderName").textContent =
        biodata.declaration.senderName || "";

    document.getElementById("previewSenderMobile").textContent =
        biodata.declaration.senderMobile || "";



    /* ==========================
            Address
    ========================== */

    document.getElementById("previewCurrentAddress").textContent =
        biodata.contact.currentAddress || "";

    document.getElementById("previewPermanentAddress").textContent =
        biodata.contact.permanentAddress || "";



    /* ==========================
            Profile Photo
    ========================== */

    document.getElementById("previewPhoto").src =
        biodata.photos.profilePhoto?.preview ||
        "assets/images/defaults/default-profile.png";



    /* =========================================
            APPLY SELECTED TEMPLATE POSITIONS
    ========================================= */

    applyPositions(

        config.positions

    );

}








/* =========================================
            APPLY TEMPLATE POSITIONS
========================================= */

function applyPositions(positions) {


    /*
    =============================================
            SAFETY FALLBACK
    =============================================
    */

    if(!positions){

        console.error(

            "Template positions not found."

        );

        return;

    }


    Object.entries(positions).forEach(

        ([id, p]) => {


            const e = document.getElementById(id);


            if(!e){

                return;

            }


            /*
            =========================================
                    BASIC POSITION
            =========================================
            */

            e.style.position = "absolute";

            e.style.left = p.left + "px";

            e.style.top = p.top + "px";


            /*
            =========================================
                    WIDTH
            =========================================
            */

            if(p.width){

                e.style.width = p.width + "px";

            }


            /*
            =========================================
                    HEIGHT
            =========================================
            */

            if(p.height){

                e.style.height = p.height + "px";

            }


            /*
            =========================================
                    FONT SIZE
            =========================================
            */

            if (p.fontSize !== undefined) {
                e.style.setProperty("font-size", p.fontSize + "px", "important");
            }


            /*
            =========================================
                    FONT WEIGHT
            =========================================
            */

            if (p.fontWeight !== undefined) {
                e.style.setProperty("font-weight", p.fontWeight, "important");
            }


            /*
            =========================================
                    DEFAULT LINE HEIGHT
            =========================================
            */

            e.style.lineHeight = "1.3";


            /*
            =========================================
                    PREMIUM NAME STYLE
            =========================================
            */

            if(id === "previewName") {


                e.style.fontFamily =
                    "'Playfair Display', serif";


                /*
                =====================================
                NOTE:

                Template-specific position values
                can still control left/top/width.

                These styles currently remain common
                for all templates.
                =====================================
                */

                e.style.color = "#003153";

                e.style.textAlign = "left";

                e.style.fontStyle = "italic";

                e.style.textShadow =
                    "0 1px 0 #fff, 0 2px 3px rgba(0,0,0,0.35)";

                e.style.textTransform = "uppercase";

            }


            /*
            =========================================
                    MULTI-LINE SUPPORT
            =========================================
            */

            if(p.multiline){


                e.style.whiteSpace = "normal";

                e.style.wordBreak = "break-word";

                e.style.overflowWrap = "break-word";

                e.style.overflow = "hidden";

                e.style.lineHeight = "1.3";


                if(p.height){

                    e.style.height =
                        p.height + "px";

                }

            }


            else{


                e.style.whiteSpace = "nowrap";

                e.style.overflow = "visible";

                e.style.display = "block";

                e.style.webkitLineClamp = "";

                e.style.webkitBoxOrient = "";

            }


        }

    );

}
