document.getElementById('submit').addEventListener('click', function() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const paymentProof = document.getElementById('paymentProof').files[0];

    if (date && time && paymentProof) {
        alert(`Booking confirmed for ${date} at ${time}. Payment proof uploaded.`);
    } else {
        alert('Please select a date, time, and upload payment proof.');
    }
});
flatpickr("#date", {
    enableTime: false,
    dateFormat: "Y-m-d",
    minDate: "today", // Prevent booking past dates
});

// Load the API client and auth2 library
gapi.load('client:auth2', initClient);

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyCc_ZLLpvuQuPPRFT3vusZjIFuAzQp23yY',
        clientId: '882703469598-s4a5ndcgg87uceq6v3035jot9ojoraui.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar.readonly"
    }).then(function () {
        listUpcomingEvents();
    }, function(error) {
        console.log(JSON.stringify(error, null, 2));
    });
}

function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary', // Use your Google Calendar ID
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime || event.start.date;
                console.log(event.summary + ' (' + when + ')');
            }
        } else {
            console.log('No upcoming events found.');
        }
    });
}

