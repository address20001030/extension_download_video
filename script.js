let button;
let modal;
let quality = "720";
let buttonTiktok;
let buttonFacebook;


function downloadTiktok() {
    var element = document.querySelector('div[class*="DivFlexCenterRow"]');
    if (element) {

        buttonTiktok = document.createElement('button');
        buttonTiktok.innerHTML = "Download";
        buttonTiktok.style.fontWeight = "bold"

        buttonTiktok.addEventListener("click", function () {
            let arrLink = document.querySelector('video').querySelectorAll('source');
            arrLink.forEach((item, index) => {
                console.log(item.src);
            });
        });

        element.appendChild(buttonTiktok);

    }
}

function findSpanByText(text) {
    const spans = document.querySelectorAll('span');
    for (let span of spans) {
        if (span.textContent.trim() === text) {
            return span; // Trả về phần tử <span> nếu văn bản trùng khớp
        }
    }
    return null; // Nếu không tìm thấy phần tử nào
}

function downloadFacebook() {

    var element = findSpanByText('Tổng quan').parentNode.parentNode.parentNode.parentNode;
    if (element) {
        if (buttonFacebook) {

            element.removeChild(buttonFacebook);
        }
        buttonFacebook = document.createElement('button');
        buttonFacebook.innerHTML = "Download";
        buttonFacebook.style.fontWeight = "bold"
        buttonFacebook.id = "down-video";

        buttonFacebook.addEventListener("click", function () {
            var urlFb = window.location.href;
            console.log(urlFb);
        });
        element.appendChild(buttonFacebook);

    } else {
        if (buttonFacebook) {

            buttonFacebook = null;
        }
    }
}


function coverButton() {
    var element = document.querySelector('.style-scope.ytd-download-button-renderer');
    if (element) {
        var rect = element.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0 && rect.top === 0 && rect.left === 0) {
            if (button) {
                document.body.removeChild(button);
                button = null;
            }
            return;
        }
        if (button) {
            document.body.removeChild(button);
        }

        button = document.createElement('button');
        button.innerHTML = "Download";
        button.style.position = "absolute";
        button.style.top = `${rect.top + window.scrollY}px`;
        button.style.left = `${rect.left + window.scrollX}px`;
        button.style.width = `${rect.width}px`;
        button.style.height = `${rect.height}px`;
        button.style.backgroundColor = "#ee0979";
        button.style.background = "linear-gradient(to right, #ff6a00, #ee0979)";
        button.style.color = "#FFFFFF";
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.zIndex = "2";
        button.style.borderRadius = "20px";
        button.style.fontWeight = "bold";

        // Add event listener to open the modal on button click
        button.addEventListener("click", function () {
            openModal();

        });

        document.body.appendChild(button);
        // console.log("Button added at the element's position.");
    } else {
        if (button) {
            document.body.removeChild(button);
            button = null;
        }
        // console.log("Element not found!");
    }
}

// Function to create and open the modal
async function openModal() {
    modal = document.createElement('div');
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Semi-transparent background
    modal.style.zIndex = "9999"; // Ensure it is on top

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.position = "absolute";
    modalContent.style.top = "50%";
    modalContent.style.left = "50%";
    modalContent.style.transform = "translate(-50%, -50%)";
    modalContent.style.backgroundColor = "#FFFFFF";
    modalContent.style.padding = "20px";
    modalContent.style.borderRadius = "10px";
    modalContent.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    modalContent.style.height = "50%";
    modalContent.style.width = "50%";
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    const loader = document.createElement('div');
    loader.innerHTML = "Loading...";
    loader.style.fontSize = "20px";
    loader.style.color = "#000";
    loader.style.textAlign = "center";
    loader.style.marginTop = "20%";

    modalContent.appendChild(loader);


    var url = window.location.href;
    const iframe = document.createElement('iframe');
    iframe.src = `https://download.y2api.com/api/widgetplus?url=${url}`
    iframe.width = '100%';                    // Chiều rộng của iframe
    iframe.height = '100%';                   // Chiều cao của iframe              // Tắt viền của iframe
    iframe.allowfullscreen = true;

    // Wait for the data (show loader)
    // let qualityList;
    // try {
    //     qualityList = await getInfo();
    // } catch (error) {
    //     if (modal) {
    //         document.body.removeChild(modal);
    //         modal = null;
    //     };
    //     alert("Please Download or start the windows helper!");
    // }

    // Remove loader after data is loaded
    modalContent.removeChild(loader);

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.style.width = "30px"
    closeButton.innerHTML = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    // closeButton.style.backgroundColor = "red";
    closeButton.style.color = "#272727";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";
    closeButton.style.borderRadius = "25px";

    closeButton.addEventListener("click", function () {
        document.body.removeChild(modal);
        modal = null; // Clear modal reference
    });



    modalContent.appendChild(closeButton);
    modalContent.appendChild(iframe);

}

function runExtension(){
    var url = window.location.href;
    if(url.includes('facebook.com')){
        downloadFacebook();
    }else if(url.includes('youtube.com')){
        coverButton();
    }else if(url.includes('tiktok.com')){
        downloadTiktok();
    }
}

window.addEventListener('load', function () {
    // setInterval(coverButton, 1000);
    setInterval(runExtension, 1000);
});
