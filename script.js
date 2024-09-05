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
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: fetchEvents(), // Function to fetch events
        selectable: true,
        select: function (info) {
            showBookingModal(info.startStr, info.endStr); // Show booking modal on date selection
        }
    });

    calendar.render();
});

function fetchEvents() {
    // Replace with your function to fetch events from Google Calendar
    return [
        // Example events
        { title: 'Event 1', start: '2024-09-10T10:00:00' },
        { title: 'Event 2', start: '2024-09-11T14:00:00' }
    ];
}

function showBookingModal(start, end) {
    // Show a modal or form where users can select booking duration and confirm
    // Example code to display a simple prompt
    let duration = prompt("Select booking duration (1, 2, 3, or 4 hours):");
    if (['1', '2', '3', '4'].includes(duration)) {
        confirmBooking(start, duration);
    } else {
        alert("Invalid duration selected.");
    }
}

function confirmBooking(start, duration) {
    // Code to handle booking confirmation, e.g., submit booking to your server
    console.log(`Booking confirmed for ${start} with duration ${duration} hours.`);
    // You may also want to update your calendar view or send a request to your server here
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

