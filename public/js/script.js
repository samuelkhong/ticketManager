const checkoutBtn = document.getElementById('checkout');
checkoutBtn.addEventListener('click', async () => {
    const url = '/checkout';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        console.log(contentType);
        if (contentType && contentType.indexOf('application/json') !== -1) {
            // If it's a JSON response, parse and handle the data
            const data = await response.json();
            console.log('POST request successful (JSON):', data);
            // Select the image element by its id
            const qrImage = document.getElementById('qr');

            // Update the src attribute of the image element
            // Extract the value of qrCode from the JSON response
            console.log(data.qrCode)
            qrImage.src = data.qrCode;

            // Update the page or perform other actions based on the JSON data
        } else {
            // // If it's not a JSON response, assume HTML and update the page
            // const htmlContent = await response.text();
            // console.log(htmlContent)
            // console.log('POST request successful (HTML):', htmlContent);

            // // Update the page or perform other actions based on the HTML content
            // document.body.innerHTML = htmlContent;
            
        }
    } catch (error) {
        console.error('Error making POST request:', error.message);
    }
});
