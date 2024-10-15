function extractCode(){
    let codeBlock = document.querySelector('.bg-template-bg');
    let codeHead = document.querySelector('head');

    let printStyles = `
        <style>
        @media print {
            @page {
                margin: 0; /* Remove default margins */
            }
            body {
                margin: 0; /* Remove margin from the body */
            }
            header, footer, .header-class, .footer-class {
                display: none; /* Hide these elements */
            }
            .print-content {
                page-break-before: always; /* Start new page for print content */
            }
        }
        </style>`;

    let template =`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                ${codeHead.innerHTML}
                ${printStyles}
            </head>
            <body>
                ${codeBlock.innerHTML}
                <script>
                    let br=document.querySelector('.design-studio-break-page')
                    br.setAttribute('hidden','');
                </script>
                <script> window.print();</script>
            </body>
        </html>` ;

    return template;
}

chrome.runtime.sendMessage({ action: "extractCode", code: extractCode() });

// Listen for print request from the background script
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "print") {
        let blob = new Blob([message.html], { type: 'text/html' });
        let url = URL.createObjectURL(blob);

        window.open(url);
        
        // Clean up the object URL after a brief delay
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 10); 
    }
});