// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const toggleButton = document.getElementById('themeToggleBtn');

    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = '🌙'; 
    } else {
        toggleButton.textContent = '☀️'; 
    }
}

// Attach the toggleDarkMode function to the button
document.getElementById('themeToggleBtn').addEventListener('click', toggleDarkMode);

// Function to fetch and update data on the dashboard
async function fetchData() {
    // Replace with actual API calls 
    
    const data = {
        ledEnergyUse: 0.33,
        ledDemand: 2.5,
        ledLightsHours: 0.08,
        batteryCapacity: 1000,
        batteryCharge: 29.42,
        batterySupply: 29.42,
        solarArrayCapacity: 15,
        solarArrayGeneration: 9.25,
        solarArrayPotential: 12,
        solarIrradiance: 200,
        pumpStationEnergyUse: 0.08,
        pumpStationDemand: 40,
        netMeterDirectional: 65,
    };
    
    // Update the dashboard with the fetched data
    for (const key in data) {
        document.getElementById(key).innerText = data[key] + (key.includes('kWh') ? ' kWh' : key.includes('kW') ? ' kW' : key.includes('Amp') ? ' Amp-Hrs' : ' hrs/day');
    }
    createCharts(data);
    createSolarArrayGauge(data.solarArrayPotential, 100);
    const maxIrradiance = 1000;
    const ctx = document.getElementById('solarIrradianceGauge').getContext('2d');
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
const ctxSolarArrayCapacity = document.getElementById('solarArrayCapacityChart').getContext('2d');
new Chart(ctxSolarArrayCapacity, {
    type: 'line',
    data: {
        labels: ['6am', '9am', '12pm', '3pm', '6pm'], 
        datasets: [{
            label: 'Solar Array Capacity (kW)',
            data: [2, 8, 12, 10, 5], 
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: true,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Capacity (kW)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time of Day'
                }
            }
        }
    }
});
const ctxSolarArrayGeneration = document.getElementById('solarArrayGenerationChart').getContext('2d');
    new Chart(ctxSolarArrayGeneration, {
        type: 'line',
        data: {
            labels: ['6am', '9am', '12pm', '3pm', '6pm'], 
            datasets: [{
                label: 'Solar Array Generation (kWh)',
                data: [0, 2.5, 6.5, 8.0, 4.0], 
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Generation (kWh)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time of Day'
                    }
                }
            }
        }
    });

// Solar Array Potential Gauge
function createSolarArrayGauge(potentialValue, maxPotential = 100) {
    const ctx = document.getElementById('solarArrayPotentialGauge').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [potentialValue, maxPotential - potentialValue],
                backgroundColor: ['#007bff', '#e0e0e0'], 
                borderWidth: 0,
            }]
        },
        options: {
            cutout: '80%', 
            rotation: -90, 
            circumference: 180, 
            plugins: {
                tooltip: { enabled: false }, 
                legend: { display: false }
            }
        }
    });
}

// Pump Station and Net Meter Progress Bar
function setProgressBar(barId, value, maxValue) {
    const fillPercentage = (value / maxValue) * 100; 
    document.getElementById(barId).style.width = fillPercentage + '%';
}
setProgressBar('pumpStationEnergyUseFill', 0.08, 24); 
setProgressBar('pumpStationDemandFill', 40, 100);     
setProgressBar('netMeterDirectionalFill', 65, 100);

// Solar Irradiance Chart
function updateSolarIrradiance(value, maxValue) {
    const circleFill = document.getElementById('circleFill');
    const solarIrradianceText = document.getElementById('solarIrradiance');

    
    const rotationDegrees = (value / maxValue) * 180;

    
    circleFill.style.transform = `rotate(${rotationDegrees}deg)`;

    
    solarIrradianceText.textContent = `${value} W/m²`;
}


updateSolarIrradiance(120, 1000);

window.onload = fetchData;
