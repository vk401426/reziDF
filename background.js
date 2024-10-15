chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractCode") {
        let htmlContent = message.code;

        // Send a message to the content script to handle the printing
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "print",
                html: htmlContent
            });
        });
    }
});
