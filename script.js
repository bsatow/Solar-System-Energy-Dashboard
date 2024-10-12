// script.js
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
}

// Call fetchData on page load
window.onload = fetchData;
