const checkoutBtn = document.getElementById('checkout');
checkoutBtn.addEventListener('click', async () => {
    const url = '/checkout'; 

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type based on your server requirements
            },
            
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('POST request successful:', data);
    } catch (error) {
        console.error('Error making POST request:', error.message);
    }
});
