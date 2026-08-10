/*==========================================================
                PDF-TEMPLATE.JS
        STEP 1 - MODULE FOUNDATION
==========================================================*/

/*
============================================================
                PDF TEMPLATE CONFIGURATION
============================================================
*/

const PDF_TEMPLATE = {

    version : "1.0.0",

    author : "Mayank Kumar",

    pageWidth : 210,

    pageHeight : 297,

    orientation : "portrait",

    debug : true,

    containerId : "pdfTemplate"

};


/*
============================================================
                PDF CONSTANTS
============================================================
*/

const PDF_CONSTANTS = {

    TITLE :

        "Kalwar Vaivahiki",

    SUBTITLE :

        "Professional Matrimonial Biodata",

    PHONE :

        "+91-XXXXXXXXXX",

    DEFAULT_PROFILE :

        "assets/images/defaults/default-profile.png",

    GANESH_IMAGE :

        "assets/images/pdf/ganesh.png",

    HEADER_LOGO :

        "assets/images/pdf/logo.png",

    BORDER_IMAGE :

        "assets/images/pdf/border.png"

};


/*
============================================================
                MODULE INITIALIZATION
============================================================
*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializePDFTemplate();

    }

);


/*
============================================================
            INITIALIZE PDF TEMPLATE
============================================================
*/

function initializePDFTemplate(){

    initializeTemplate();

}


/*
============================================================
                DEBUG LOGGER
============================================================
*/

function pdfTemplateLog(

    message,

    data = ""

){

    if(!PDF_TEMPLATE.debug){

        return;

    }

    console.group(

        "[PDF TEMPLATE]"

    );

    console.log(

        message

    );

    if(data !== ""){

        console.log(

            data

        );

    }

    console.groupEnd();

}


/*
============================================================
            CREATE PDF CONTAINER
============================================================
*/

function createPDFContainer(){

    let container = document.getElementById(

        PDF_TEMPLATE.containerId

    );

    if(container){

        return container;

    }

    container = document.createElement(

        "div"

    );

    container.id =

        PDF_TEMPLATE.containerId;

    container.style.display = "none";

    document.body.appendChild(

        container

    );

    pdfTemplateLog(

        "PDF Container Created"

    );

    return container;

}


/*
============================================================
            CLEAR PDF CONTAINER
============================================================
*/

function clearPDFContainer(){

    const container =

        createPDFContainer();

    container.innerHTML = "";

}


/*
============================================================
            GET PDF CONTAINER
============================================================
*/

function getPDFContainer(){

    return createPDFContainer();

}


/*
============================================================
            RENDER COMPLETE TEMPLATE
============================================================
*/

function renderPDFTemplate(){

    const container =

        createPDFContainer();

    container.innerHTML = `

        <div class="pdf-page">

            ${renderHeader()}

            ${renderBody()}

            ${renderFooter()}

        </div>

    `;

    pdfTemplateLog(

        "Template Rendered Successfully"

    );

}


/*==========================================================
                HEADER
==========================================================*/

function renderHeader(){

    return `

        <header class="pdf-header">

            <div class="pdf-header-left">

                <h1 class="pdf-title">

                    ${PDF_CONSTANTS.TITLE}

                </h1>

                <div class="pdf-subtitle">

                    ${PDF_CONSTANTS.SUBTITLE}

                </div>

                <div class="pdf-phone">

                    📞 ${PDF_CONSTANTS.PHONE}

                </div>

            </div>

            <div class="pdf-header-center">

                <img

                    src="${PDF_CONSTANTS.GANESH_IMAGE}"

                    class="pdf-ganesh"

                    alt="Ganesh"

                >

            </div>

            <div class="pdf-header-right">

                <img

                    src="${PDF_CONSTANTS.HEADER_LOGO}"

                    class="pdf-logo"

                    alt="Logo"

                >

            </div>

        </header>

    `;

}


/*==========================================================
                BODY
==========================================================*/

function renderBody(){

    return `

        <main class="pdf-body">

            <div class="pdf-left-column">

                ${renderPersonalSection()}

                ${renderEducationSection()}

                ${renderCareerSummary()}

                ${renderFamilySection()}

                ${renderPartnerSection()}

                ${renderContactSection()}

                ${renderPhotoGallery()}

                ${renderDeclaration()}

            </div>

            <div class="pdf-right-column">

                ${renderProfilePhoto()}

                ${renderQRCode()}

            </div>

        </main>

    `;

}



/*==========================================================
                FOOTER
==========================================================*/

function renderFooter(){

    return `

        <footer class="pdf-footer">

            <div class="pdf-footer-line"></div>

            <div class="pdf-footer-text">

                Generated by Kalwar Vaivahiki

            </div>

        </footer>

    `;

}



/*==========================================================
                PERSONAL SECTION
==========================================================*/

function renderPersonalSection(){

    return `

        <section class="pdf-card">

            <div class="pdf-card-title">

                👤 PERSONAL DETAILS

            </div>

            <table class="pdf-table">

                <tr>

                    <td>Name</td>

                    <td>:</td>

                    <td>${biodata.personal.fullName || ""}</td>

                </tr>

                <tr>

                    <td>Gender</td>

                    <td>:</td>

                    <td>${biodata.personal.gender || ""}</td>

                </tr>

                <tr>

                    <td>Date of Birth</td>

                    <td>:</td>

                    <td>${biodata.personal.dob || ""}</td>

                </tr>

                <tr>

                    <td>Age</td>

                    <td>:</td>

                    <td>${biodata.personal.age || ""}</td>

                </tr>

                <tr>

                    <td>Height</td>

                    <td>:</td>

                    <td>${biodata.personal.height || ""}</td>

                </tr>

                <tr>

                    <td>Weight</td>

                    <td>:</td>

                    <td>${biodata.personal.weight || ""}</td>

                </tr>

                <tr>

                    <td>Blood Group</td>

                    <td>:</td>

                    <td>${biodata.personal.bloodGroup || ""}</td>

                </tr>

                <tr>

                    <td>Religion</td>

                    <td>:</td>

                    <td>${biodata.personal.religion || ""}</td>

                </tr>

                <tr>

                    <td>Caste</td>

                    <td>:</td>

                    <td>${biodata.personal.caste || ""}</td>

                </tr>

                <tr>

                    <td>Gotra</td>

                    <td>:</td>

                    <td>${biodata.personal.gotra || ""}</td>

                </tr>

                <tr>

                    <td>Mother Tongue</td>

                    <td>:</td>

                    <td>${biodata.personal.motherTongue || ""}</td>

                </tr>

                <tr>

                    <td>Marital Status</td>

                    <td>:</td>

                    <td>${biodata.personal.maritalStatus || ""}</td>

                </tr>

            </table>

        </section>

    `;

}







/*==========================================================
                EDUCATION SECTION
==========================================================*/

function renderEducationSection(){

    return `

        <section class="pdf-card">

            <div class="pdf-card-title">

                🎓 EDUCATION & CAREER

            </div>

            <table class="pdf-table">

                <tbody>

                    <tr>

                        <td>Highest Qualification</td>

                        <td>:</td>

                        <td>${biodata.education.highestQualification || "-"}</td>

                    </tr>

                    <tr>

                        <td>College</td>

                        <td>:</td>

                        <td>${biodata.education.college || "-"}</td>

                    </tr>

                    <tr>

                        <td>University</td>

                        <td>:</td>

                        <td>${biodata.education.university || "-"}</td>

                    </tr>

                    <tr>

                        <td>Passing Year</td>

                        <td>:</td>

                        <td>${biodata.education.passingYear || "-"}</td>

                    </tr>

                    <tr>

                        <td>Occupation</td>

                        <td>:</td>

                        <td>${biodata.education.occupation || "-"}</td>

                    </tr>

                    <tr>

                        <td>Company</td>

                        <td>:</td>

                        <td>${biodata.education.company || "-"}</td>

                    </tr>

                    <tr>

                        <td>Designation</td>

                        <td>:</td>

                        <td>${biodata.education.designation || "-"}</td>

                    </tr>

                    <tr>

                        <td>Annual Income</td>

                        <td>:</td>

                        <td>${biodata.education.annualIncome || "-"}</td>

                    </tr>

                </tbody>

            </table>

        </section>

    `;

}





/*==========================================================
                CAREER SUMMARY
==========================================================*/

function renderCareerSummary(){

    const qualification = biodata.education.highestQualification || "-";

    const occupation = biodata.education.occupation || "-";

    const company = biodata.education.company || "-";

    const designation = biodata.education.designation || "-";

    const income = biodata.education.annualIncome || "-";

    return `

        <section class="pdf-card">

            <div class="pdf-card-title">

                💼 CAREER SUMMARY

            </div>

            <table class="pdf-table">

                <tbody>

                    <tr>

                        <td>Qualification</td>

                        <td>:</td>

                        <td>${qualification}</td>

                    </tr>

                    <tr>

                        <td>Occupation</td>

                        <td>:</td>

                        <td>${occupation}</td>

                    </tr>

                    <tr>

                        <td>Company</td>

                        <td>:</td>

                        <td>${company}</td>

                    </tr>

                    <tr>

                        <td>Designation</td>

                        <td>:</td>

                        <td>${designation}</td>

                    </tr>

                    <tr>

                        <td>Annual Income</td>

                        <td>:</td>

                        <td>${income}</td>

                    </tr>

                </tbody>

            </table>

        </section>

    `;

}





/*==========================================================
                FAMILY DETAILS
==========================================================*/

function renderFamilySection(){

    return `

        <section class="pdf-card">

            <div class="pdf-card-title">

                👨‍👩‍👧‍👦 FAMILY DETAILS

            </div>

            <table class="pdf-table">

                <tbody>

                    <tr>

                        <td>Father's Name</td>

                        <td>:</td>

                        <td>${biodata.family.fatherName || "-"}</td>

                    </tr>

                    <tr>

                        <td>Father's Occupation</td>

                        <td>:</td>

                        <td>${biodata.family.fatherOccupation || "-"}</td>

                    </tr>

                    <tr>

                        <td>Mother's Name</td>

                        <td>:</td>

                        <td>${biodata.family.motherName || "-"}</td>

                    </tr>

                    <tr>

                        <td>Mother's Occupation</td>

                        <td>:</td>

                        <td>${biodata.family.motherOccupation || "-"}</td>

                    </tr>

                    <tr>

                        <td>Brothers</td>

                        <td>:</td>

                        <td>${biodata.family.brothers || "-"}</td>

                    </tr>

                    <tr>

                        <td>Sisters</td>

                        <td>:</td>

                        <td>${biodata.family.sisters || "-"}</td>

                    </tr>

                    <tr>

                        <td>Family Type</td>

                        <td>:</td>

                        <td>${biodata.family.familyType || "-"}</td>

                    </tr>

                    <tr>

                        <td>Native Place</td>

                        <td>:</td>

                        <td>${biodata.family.nativePlace || "-"}</td>

                    </tr>

                </tbody>

            </table>

        </section>

    `;

}




/*==========================================================
                PARTNER PREFERENCE
==========================================================*/

function renderPartnerSection(){

    return `

        <section class="pdf-card">

            <div class="pdf-card-title">

                ❤️ PARTNER PREFERENCE

            </div>

            <table class="pdf-table">

                <tbody>

                    <tr>

                        <td>Preferred Age</td>

                        <td>:</td>

                        <td>${biodata.partner.preferredAge || "-"}</td>

                    </tr>

                    <tr>

                        <td>Preferred Height</td>

                        <td>:</td>

                        <td>${biodata.partner.preferredHeight || "-"}</td>

                    </tr>

                    <tr>

                        <td>Preferred Education</td>

                        <td>:</td>

                        <td>${biodata.partner.preferredEducation || "-"}</td>

                    </tr>

                    <tr>

                        <td>Preferred Profession</td>

                        <td>:</td>

                        <td>${biodata.partner.preferredProfession || "-"}</td>

                    </tr>

                    <tr>

                        <td>Preferred Location</td>

                        <td>:</td>

                        <td>${biodata.partner.preferredLocation || "-"}</td>

                    </tr>

                    <tr>

                        <td>Preferred Marital Status</td>

                        <td>:</td>

                        <td>${biodata.partner.preferredMaritalStatus || "-"}</td>

                    </tr>

                    <tr>

                        <td>Preferred Religion</td>

                        <td>:</td>

                        <td>${biodata.partner.preferredReligion || "-"}</td>

                    </tr>

                    <tr>

                        <td>Preferred Caste</td>

                        <td>:</td>

                        <td>${biodata.partner.preferredCaste || "-"}</td>

                    </tr>

                    <tr>

                        <td>Preferred Income</td>

                        <td>:</td>

                        <td>${biodata.partner.preferredIncome || "-"}</td>

                    </tr>

                    <tr>

                        <td>Other Expectations</td>

                        <td>:</td>

                        <td>${biodata.partner.otherExpectations || "-"}</td>

                    </tr>

                </tbody>

            </table>

        </section>

    `;

}




/*==========================================================
                CONTACT DETAILS
==========================================================*/

function renderContactSection(){

    return `

        <section class="pdf-card">

            <div class="pdf-card-title">

                📞 CONTACT DETAILS

            </div>

            <table class="pdf-table">

                <tbody>

                    <tr>

                        <td>Mobile Number</td>

                        <td>:</td>

                        <td>${biodata.contact.mobileNumber || "-"}</td>

                    </tr>

                    <tr>

                        <td>Alternate Mobile</td>

                        <td>:</td>

                        <td>${biodata.contact.alternateMobile || "-"}</td>

                    </tr>

                    <tr>

                        <td>Email</td>

                        <td>:</td>

                        <td>${biodata.contact.email || "-"}</td>

                    </tr>

                    <tr>

                        <td>Address</td>

                        <td>:</td>

                        <td>${biodata.contact.address || "-"}</td>

                    </tr>

                    <tr>

                        <td>City</td>

                        <td>:</td>

                        <td>${biodata.contact.city || "-"}</td>

                    </tr>

                    <tr>

                        <td>District</td>

                        <td>:</td>

                        <td>${biodata.contact.district || "-"}</td>

                    </tr>

                    <tr>

                        <td>State</td>

                        <td>:</td>

                        <td>${biodata.contact.state || "-"}</td>

                    </tr>

                    <tr>

                        <td>PIN Code</td>

                        <td>:</td>

                        <td>${biodata.contact.pinCode || "-"}</td>

                    </tr>

                </tbody>

            </table>

        </section>

    `;

}




/*==========================================================
                PHOTO GALLERY
==========================================================*/

function renderPhotoGallery(){

    const photos = [];

    if (biodata.photos.photo2?.preview)
        photos.push(biodata.photos.photo2.preview);

    if (biodata.photos.photo3?.preview)
        photos.push(biodata.photos.photo3.preview);

    if (biodata.photos.photo4?.preview)
        photos.push(biodata.photos.photo4.preview);

    if (biodata.photos.photo5?.preview)
        photos.push(biodata.photos.photo5.preview);

    if (biodata.photos.photo6?.preview)
        photos.push(biodata.photos.photo6.preview);

    if (photos.length === 0) {
        return "";
    }

    return `

        <section class="pdf-card">

            <div class="pdf-card-title">

                📸 PHOTO GALLERY

            </div>

            <div class="pdf-gallery">

                ${photos.map(photo => `

                    <img
                        src="${photo}"
                        class="pdf-gallery-image"
                        alt="Gallery Photo"
                    >

                `).join("")}

            </div>

        </section>

    `;

}


/*==========================================================
                QR CODE
==========================================================*/

function renderQRCode(){

    if(!biodata.contact.qrCode){

        return "";

    }

    return `

        <section class="pdf-card">

            <div class="pdf-card-title">

                📱 QR CODE

            </div>

            <div class="pdf-qr-container">

                <img

                    src="${biodata.contact.qrCode}"

                    class="pdf-qr-image"

                    alt="QR Code"

                >

            </div>

        </section>

    `;

}


/*==========================================================
                DECLARATION
==========================================================*/

function renderDeclaration(){

    return `

        <section class="pdf-card">

            <div class="pdf-card-title">

                📜 DECLARATION

            </div>

            <p class="pdf-declaration">

                I hereby declare that the information provided
                in this matrimonial biodata is true and correct
                to the best of my knowledge and belief.

            </p>

        </section>

    `;

}





/*==========================================================
                FOOTER
==========================================================*/

function renderFooter(){

    const currentYear = new Date().getFullYear();

    return `

        <footer class="pdf-footer">

            <div class="pdf-footer-divider"></div>

            <div class="pdf-footer-content">

                <div class="pdf-footer-left">

                    <strong>Kalwar Vaivahiki</strong>

                </div>

                <div class="pdf-footer-center">

                    Professional Matrimonial Biodata

                </div>

                <div class="pdf-footer-right">

                    © ${currentYear}

                </div>

            </div>

        </footer>

    `;

}


/*==========================================================
                FORMAT LABEL
==========================================================*/

function formatLabel(text){

    if(!text){

        return "";

    }

    return text

        .replace(/([A-Z])/g," $1")

        .replace(/^./,str=>str.toUpperCase())

        .trim();

}


/*==========================================================
                FORMAT VALUE
==========================================================*/

function formatValue(value){

    if(

        value === undefined ||

        value === null ||

        value === ""

    ){

        return "-";

    }

    return value;

}


/*==========================================================
                CREATE TABLE ROW
==========================================================*/

function createTableRow(

    label,

    value

){

    return `

        <tr>

            <td>${formatLabel(label)}</td>

            <td>:</td>

            <td>${formatValue(value)}</td>

        </tr>

    `;

}


/*==========================================================
                SAFE IMAGE
==========================================================*/

function getSafeImage(image){

    if(

        !image ||

        image === ""

    ){

        return PDF_CONSTANTS.DEFAULT_PROFILE;

    }

    return image;

}


/*==========================================================
                SECTION WRAPPER
==========================================================*/

function wrapSection(

    title,

    body

){

    return `

        <section class="pdf-card">

            <div class="pdf-card-title">

                ${title}

            </div>

            ${body}

        </section>

    `;

}


/*==========================================================
                DEBUG DATA
==========================================================*/

function debugBiodata(){

    if(!PDF_TEMPLATE.debug){

        return;

    }

    console.group(

        "BIODATA"

    );

    console.log(

        biodata

    );

    console.groupEnd();

}


/*==========================================================
                PDF READY CHECK
==========================================================*/

function isPDFReady(){

    return (

        biodata &&

        biodata.personal &&

        biodata.education &&

        biodata.family &&

        biodata.partner &&

        biodata.contact &&

        biodata.photos

    );

}


/*==========================================================
                BUILD COMPLETE TEMPLATE
==========================================================*/

function buildPDFTemplate(){

    if(

        !isPDFReady()

    ){

        console.error(

            "Biodata not ready."

        );

        return null;

    }

    renderPDFTemplate();

    return getPDFContainer();

}



/*==========================================================
                VALIDATE TEMPLATE
==========================================================*/

function validateTemplate(){

    if(!isPDFReady()){

        pdfTemplateLog(

            "Template Validation Failed"

        );

        return false;

    }

    const container = buildPDFTemplate();

    if(!container){

        pdfTemplateLog(

            "Template Build Failed"

        );

        return false;

    }

    const page = container.querySelector(

        ".pdf-page"

    );

    if(!page){

        pdfTemplateLog(

            "PDF Page Missing"

        );

        return false;

    }

    pdfTemplateLog(

        "Template Validation Successful"

    );

    return true;

}


/*==========================================================
                RENDER COMPLETE TEMPLATE
==========================================================*/

function renderCompleteTemplate(){

    if(

        !validateTemplate()

    ){

        return null;

    }

    const container = getPDFContainer();

    container.style.display = "block";

    pdfTemplateLog(

        "Complete Template Rendered"

    );

    return container;

}


/*==========================================================
                DESTROY TEMPLATE
==========================================================*/

function destroyTemplate(){

    clearPDFContainer();

    removePDFTemplate();

    pdfTemplateLog(

        "Template Destroyed"

    );

}


/*==========================================================
                EXPORT TEMPLATE
==========================================================*/

function exportTemplate(){

    const template =

        renderCompleteTemplate();

    if(!template){

        return null;

    }

    return template;

}


/*==========================================================
                INITIALIZE TEMPLATE
==========================================================*/

function initializeTemplate(){

    pdfTemplateSummary();

    debugBiodata();

    pdfTemplateLog(

        "Template Ready"

    );

}



















/*==========================================================
                PROFILE PHOTO
==========================================================*/

function renderProfilePhoto(){

    let image = PDF_CONSTANTS.DEFAULT_PROFILE;

    if(

        biodata.photos.profilePhoto &&

        biodata.photos.profilePhoto.preview

    ){

        image = biodata.photos.profilePhoto.preview;

    }

    return `

        <section class="pdf-photo-card">

            <img

                src="${image}"

                class="pdf-profile-photo"

                alt="Profile Photo"

            >

        </section>

    `;

}






/*
============================================================
            REMOVE PDF TEMPLATE
============================================================
*/

function removePDFTemplate(){

    const container = document.getElementById(

        PDF_TEMPLATE.containerId

    );

    if(container){

        container.remove();

    }

}


/*
============================================================
                REFRESH TEMPLATE
============================================================
*/

function refreshPDFTemplate(){

    clearPDFContainer();

    renderPDFTemplate();

}


/*
============================================================
                TEMPLATE SUMMARY
============================================================
*/

function pdfTemplateSummary(){

    pdfTemplateLog(

        "Template Information",

        {

            version :

                PDF_TEMPLATE.version,

            orientation :

                PDF_TEMPLATE.orientation,

            page :

                PDF_TEMPLATE.pageWidth +

                " x " +

                PDF_TEMPLATE.pageHeight,

            container :

                PDF_TEMPLATE.containerId

        }

    );

}


/*
============================================================
                DEBUG
============================================================
*/

function showPDFTemplateSummary(){

    pdfTemplateSummary();

}








