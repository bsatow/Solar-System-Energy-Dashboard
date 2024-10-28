// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const toggleButton = document.getElementById('themeToggleBtn');

    body.classList.toggle('dark-mode');
    
    // Update the button icon and text based on the current mode
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = '🌙'; // Moon Icon for Dark Mode
    } else {
        toggleButton.textContent = '☀️'; // Sun Icon for Light Mode
    }
}

// Attach the toggleDarkMode function to the button
document.getElementById('themeToggleBtn').addEventListener('click', toggleDarkMode);

// Function to fetch and update data on the dashboard
async function fetchData() {
    // This function simulates fetching data from the backend.
    // Replace with actual API calls as needed.
    
    const data = {
        ledEnergyUse: 0.33,
        ledDemand: 2.5,
        ledLightsHours: 0.08,
        batteryCapacity: 1000,
        batteryCharge: 29.42,
        batterySupply: 29.42,
        solarArrayCapacity: 15,
        solarArrayGeneration: 0,
        solarArrayPotential: 12,
        solarIrradiance: 0,
        pumpStationEnergyUse: 0.08,
        pumpStationDemand: 0,
        netMeterDirectional: 65,
    };
    
    // Update the dashboard with the fetched data
    for (const key in data) {
        document.getElementById(key).innerText = data[key] + (key.includes('kWh') ? ' kWh' : key.includes('kW') ? ' kW' : key.includes('Amp') ? ' Amp-Hrs' : ' hrs/day');
    }
    createCharts(data);
}
function createCharts(data) {
    // LED Energy Use Line Chart
    const ctxEnergy = document.getElementById('ledEnergyChart').getContext('2d');
    new Chart(ctxEnergy, {
        type: 'line',
        data: {
            labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
            datasets: [{
                label: 'LED Energy Use (kWh)',
                data: [0.3, 0.5, 0.7, 0.8, 1.0, 1.1, 0.6, 0.4],
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: '#007bff',
                fill: true,
            }]
        }
    });
// LED Demand Line Chart
    const ctxDemand = document.getElementById('ledDemandChart').getContext('2d');
    new Chart(ctxDemand, {
        type: 'line',
        data: {
            labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
            datasets: [{
                label: 'LED Demand (kW)',
                data: [2.1, 2.3, 2.5, 2.8, 3.0, 2.6, 2.4, 2.2],
                backgroundColor: 'rgba(255, 193, 7, 0.2)',
                borderColor: '#ffc107',
                fill: true,
            }]
        }
    });
// LED Lights Hours of Operation Doughnut Chart
const ctxLightsHours = document.getElementById('ledLightsHoursChart').getContext('2d');
new Chart(ctxLightsHours, {
    type: 'doughnut',
    data: {
        labels: ['Operational Hours', 'Remaining Hours'],
        datasets: [{
            data: [data.ledLightsHours * 24, (1 - data.ledLightsHours) * 24], // Converting fraction to hours
            backgroundColor: ['#28a745', '#f4f4f4'],
        }]
    },
    options: {
        cutoutPercentage: 60, // Makes it a doughnut
    }
});
 // Battery Capacity Bar Chart
 const ctxBatteryCapacity = document.getElementById('batteryCapacityChart').getContext('2d');
 new Chart(ctxBatteryCapacity, {
     type: 'bar',
     data: {
         labels: ['Battery Capacity'],
         datasets: [{
             label: 'Capacity (Amp-Hrs)',
             data: [data.batteryCapacity],
             backgroundColor: '#007bff',
         }]
     },
     options: {
         scales: {
             y: {
                 beginAtZero: true,
                 max: 1200,
             }
         }
     }
 });

 // Battery Charge Bar Chart
 const ctxBatteryCharge = document.getElementById('batteryChargeChart').getContext('2d');
 new Chart(ctxBatteryCharge, {
     type: 'bar',
     data: {
         labels: ['Battery Charge'],
         datasets: [{
             label: 'Charge (kWh)',
             data: [data.batteryCharge],
             backgroundColor: '#28a745',
         }]
     },
     options: {
         scales: {
             y: {
                 beginAtZero: true,
                 max: 100,
             }
         }
     }
 });

 // Battery Supply Bar Chart
 const ctxBatterySupply = document.getElementById('batterySupplyChart').getContext('2d');
 new Chart(ctxBatterySupply, {
     type: 'bar',
     data: {
         labels: ['Battery Supply'],
         datasets: [{
             label: 'Supply (kWh)',
             data: [data.batterySupply],
             backgroundColor: '#ffc107',
         }]
     },
     options: {
         scales: {
             y: {
                 beginAtZero: true,
                 max: 100,
             }
         }
     }
 });
}
    // LED Hours of Operation Progress Circle (can be created similarly)

// Call fetchData on page load
window.onload = fetchData;
