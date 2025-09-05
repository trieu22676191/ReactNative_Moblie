"use strict";
function downloadFile() {
    return new Promise((resolve) => {
        console.log("Download started...");
        setTimeout(() => {
            console.log("Download finished.");
            resolve("file.bin");
        }, 3000);
    });
}
downloadFile().then(filename => console.log("Saved as", filename));
