const hamburgerIcon = document.getElementById("hamburgerMenuBtn");
const sideTab = document.getElementById("sideTab");

if (hamburgerIcon && sideTab) {
  hamburgerIcon.addEventListener("click", toggleSideTab);
}

// Function to toggle dark mode
document
  .getElementById("themeToggleBtn")
  .addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  const body = document.body;
  const title = document.querySelector(".header h1");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    title.style.color = "#FFDA00"; 
    updateChartColors("#FFFFFF"); 
  } else {
    title.style.color = "#003366"; 
    updateChartColors("#000000"); 
  }
}

function updateChartColors(labelColor) {
  Chart.helpers.each(Chart.instances, (chart) => {
    chart.options.plugins.legend.labels.color = labelColor;
    chart.options.scales.x.ticks.color = labelColor;
    chart.options.scales.y.ticks.color = labelColor;
    chart.data.datasets.forEach((dataset) => {
      dataset.borderColor = labelColor;
    });
    chart.update();
  });
}

// Function to fetch and update data on the dashboard
async function fetchData() {
  const data = {
    ledEnergyUse: 0.33,
    ledDemand: 2.5,
    ledLightsHours: 6.0,
    batteryCapacity: 100,
    batteryCharge: 45,
    batterySupply: 60,
    solarArrayCapacity: 15,
    solarArrayGeneration: 9.25,
    solarArrayPotential: 12,
    solarIrradiance: 200,
    pumpStationEnergyUse: 0.08,
    pumpStationDemand: 40,
    netMeterDirectional: 65,
  };

  for (const key in data) {
    if (document.getElementById(key)) {
      document.getElementById(key).innerText =
        data[key] +
        (key.includes("kWh")
          ? " kWh"
          : key.includes("kW")
          ? " kW"
          : key.includes("Amp")
          ? " Amp-Hrs"
          : " hrs/day");
    }
  }
  createCharts(data);
}

function createCharts(data) {
  const ctxEnergy = document.getElementById("ledEnergyChart").getContext("2d");
  new Chart(ctxEnergy, {
    type: "line",
    data: {
      labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
      datasets: [
        {
          label: "LED Energy Use (kWh)",
          data: [0.3, 0.5, 0.7, 0.8, 1.0, 1.1, 0.6, 0.4],
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "#007bff",
          fill: true,
        },
      ],
    },
  });
  const ctxDemand = document.getElementById("ledDemandChart").getContext("2d");
  new Chart(ctxDemand, {
    type: "line",
    data: {
      labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
      datasets: [
        {
          label: "LED Demand (kW)",
          data: [2.1, 2.3, 2.5, 2.8, 3.0, 2.6, 2.4, 2.2],
          backgroundColor: "rgba(255, 193, 7, 0.2)",
          borderColor: "#ffc107",
          fill: true,
        },
      ],
    },
  });

  // LED Lights Hours of Operation Doughnut Chart
  const ctxLightsHours = document
    .getElementById("ledLightsHoursChart")
    .getContext("2d");
  new Chart(ctxLightsHours, {
    type: "doughnut",
    data: {
      labels: ["Operational Hours", "Remaining Hours"],
      datasets: [
        {
          data: [data.ledLightsHours, 24 - data.ledLightsHours], 
          backgroundColor: ["#28a745", "#e0e0e0"], 
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              return `${tooltipItem.label}: ${tooltipItem.raw} hours`;
            },
          },
        },
      },
      cutout: "60%", 
    },
  });

  // Battery Capacity Bar Chart
  const ctxBatteryCapacity = document
    .getElementById("batteryCapacity")
    .getContext("2d");
  new Chart(ctxBatteryCapacity, {
    type: "bar",
    data: {
      labels: ["Battery Capacity"],
      datasets: [
        {
          label: "Capacity (Amp-Hrs)",
          data: [data.batteryCapacity],
          backgroundColor: "#007bff",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 1200, 
        },
      },
    },
  });

  // Battery Charge Bar Chart
  const ctxBatteryCharge = document
    .getElementById("batteryCharge")
    .getContext("2d");
  new Chart(ctxBatteryCharge, {
    type: "bar",
    data: {
      labels: ["Battery Charge"],
      datasets: [
        {
          label: "Charge (kWh)",
          data: [data.batteryCharge],
          backgroundColor: "#28a745",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100, 
        },
      },
    },
  });

  // Battery Supply Bar Chart
  const ctxBatterySupply = document
    .getElementById("batterySupply")
    .getContext("2d");
  new Chart(ctxBatterySupply, {
    type: "bar",
    data: {
      labels: ["Battery Supply"],
      datasets: [
        {
          label: "Supply (kWh)",
          data: [data.batterySupply],
          backgroundColor: "#ffc107",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100, 
        },
      },
    },
  });
}

const ctxSolarArrayCapacity = document
  .getElementById("solarArrayCapacityChart")
  .getContext("2d");
new Chart(ctxSolarArrayCapacity, {
  type: "line",
  data: {
    labels: ["6am", "9am", "12pm", "3pm", "6pm"],
    datasets: [
      {
        label: "Solar Array Capacity (kW)",
        data: [2, 8, 12, 10, 5],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: true,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Capacity (kW)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time of Day",
        },
      },
    },
  },
});
const ctxSolarArrayGeneration = document
  .getElementById("solarArrayGenerationChart")
  .getContext("2d");
new Chart(ctxSolarArrayGeneration, {
  type: "line",
  data: {
    labels: ["6am", "9am", "12pm", "3pm", "6pm"],
    datasets: [
      {
        label: "Solar Array Generation (kWh)",
        data: [0, 2.5, 6.5, 8.0, 4.0],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: true,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Generation (kWh)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time of Day",
        },
      },
    },
  },
});

const ctx = document.getElementById("pumpStationEnergyChart").getContext("2d");

const pumpStationData = {
  labels: ["Energy Distribution (%)"], 
  datasets: [
    {
      label: "Useful Work",
      data: [60], 
      backgroundColor: "#4caf50", 
      barThickness: 80,
    },
    {
      label: "Friction Losses",
      data: [20],
      backgroundColor: "#ff9800", 
      barThickness: 80,
    },
    {
      label: "Motor Losses",
      data: [15],
      backgroundColor: "#f44336", 
      barThickness: 80,
    },
    {
      label: "VFD Losses",
      data: [5],
      backgroundColor: "#2196f3", 
      barThickness: 80,
    },
  ],
};

// Chart configuration
const config = {
  type: "bar",
  data: pumpStationData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", 
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, 
        },
        categoryPercentage: 0.25, 
        barPercentage: 0.25, 
      },
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
          callback: (value) => `${value}%`, 
        },
        max: 100, 
      },
    },
  },
};

new Chart(ctx, config);
// Pump Station and Net Meter Progress Bar
function setProgressBar(barId, value, maxValue) {
  const fillPercentage = (value / maxValue) * 100;
  document.getElementById(barId).style.width = fillPercentage + "%";
}
setProgressBar("pumpStationDemandFill", 40, 100);
setProgressBar("netMeterDirectionalFill", 65, 100);

// Solar Irradiance Chart
function updateSolarIrradiance(value, maxValue) {
  const arcFill = document.getElementById("arcFill");
  const solarIrradianceText = document.getElementById("solarIrradiance");
  const percentage = (value / maxValue) * 100;
  const rotationDegrees = (percentage / 100) * 180; 

  arcFill.style.transform = `rotate(${rotationDegrees}deg)`;
  solarIrradianceText.textContent = `${value} W/m²`;

  if (percentage < 33) {
    solarIrradianceText.style.color = "#4caf50"; 
  } else if (percentage < 66) {
    solarIrradianceText.style.color = "#ffeb3b"; 
  } else {
    solarIrradianceText.style.color = "#f44336"; 
  }
}

window.onload = fetchData;
