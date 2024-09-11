document.getElementById('submitBooking').addEventListener('click', function () {
    const paymentProof = document.getElementById('paymentProof').files[0];

    if (!paymentProof) {
        alert('Please upload your payment proof before confirming the booking.');
        return;
    }

    // Simulate payment proof upload and booking confirmation
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.textContent = 'Booking confirmed! Your payment proof has been received.';
    
    // In a real application, you'd send the file to a server using something like:
    // let formData = new FormData();
    // formData.append('paymentProof', paymentProof);
    // fetch('your-server-endpoint', { method: 'POST', body: formData });

    // Reset the form after confirmation
    document.getElementById('payment-form').reset();
});
