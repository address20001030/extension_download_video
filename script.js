let button;
let modal;
let quality = "720";

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
            //console.log("vao dayyy");
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


window.addEventListener('load', function () {
    setInterval(coverButton, 1000);
});
