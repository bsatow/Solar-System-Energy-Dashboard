const express = require('express');
const sql = require('mssql/msnodesqlv8'); //msnodesqlv8 for Windows Authentication
const cors = require('cors'); 
const Joi = require('joi');    // Import Joi for input validation
require('dotenv').config();    // Load environment variables from .env file

const app = express();
app.use(cors());  // Enable CORS

const port = process.env.PORT || 3000; // Set the server port

// MS SQL Server configuration for Windows Authentication
const dbConfig = {
  database: process.env.DB_DATABASE,  // Database name from .env
  server: process.env.DB_SERVER,      // Server name from .env
  driver: 'msnodesqlv8',            
  options: {
    trustedConnection: true,          // Use Windows Authentication
    enableArithAbort: true,           
    encrypt: false,                   
  }
};

//schema for validating the timeRange query using Joi
const filterSchema = Joi.object({
  timeRange: Joi.string().valid('hourly', '12hour', '1day', '1week', '2weeks').required()
});

// API endpoint to filter energy metrics based on time range
app.get('/api/energy-metrics/filter', async (req, res) => {
  // Validate the timeRange query
  const { error } = filterSchema.validate(req.query);
  if (error) {
    return res.status(400).send('Invalid time range provided.');
  }

  const { timeRange } = req.query;

  // Determine the time condition for the SQL query
  let timeCondition = '';
  switch (timeRange) {
    case 'hourly':
      timeCondition = "WHERE TimeStamp >= DATEADD(hour, -1, GETDATE())";
      break;
    case '12hour':
      timeCondition = "WHERE TimeStamp >= DATEADD(hour, -12, GETDATE())";
      break;
    case '1day':
      timeCondition = "WHERE TimeStamp >= DATEADD(day, -1, GETDATE())";
      break;
    case '1week':
      timeCondition = "WHERE TimeStamp >= DATEADD(week, -1, GETDATE())";
      break;
    case '2weeks':
      timeCondition = "WHERE TimeStamp >= DATEADD(week, -2, GETDATE())";
      break;
    default:
      return res.status(400).send('Invalid time range'); // This shouldn't be hit due to validation
  }

  try {
    // Log the final SQL query that will be executed
    console.log(`Executing SQL: SELECT * FROM SolarMetrics ${timeCondition} ORDER BY TimeStamp ASC`);

    // Connect to the database
    await sql.connect(dbConfig);

    // Execute the query with the appropriate time condition
    const result = await sql.query(`
      SELECT * FROM SolarMetrics 
      ${timeCondition} 
      ORDER BY TimeStamp ASC
    `);

    // If no data is found, send a 404 response
    if (result.recordset.length === 0) {
      return res.status(404).send('No data found for the specified time range.');
    }

    // Return the data as JSON
    res.json(result.recordset);
  } catch (err) {
    // Log the error and send an internal server error response
    console.error('Database connection error:', err.message);
    res.status(500).send('Error fetching data from the database.');
  }
});

// API endpoint to get the maximum values for each metric
app.get('/api/energy-metrics/max-values', async (req, res) => {
  try {
    await sql.connect(dbConfig);

    // Query to get the maximum values for each metric
    const result = await sql.query(`
      SELECT 
        MAX(LED_Energy_Use_kWh) AS Max_LED_Energy_Use_kWh,
        MAX(Battery_Capacity_AmpHrs) AS Max_Battery_Capacity_AmpHrs,
        MAX(Battery_Supply_kWh) AS Max_Battery_Supply_kWh,
        MAX(Solar_Array_Capacity_kW) AS Max_Solar_Array_Capacity_kW,
        MAX(Temperature_F) AS Max_Temperature_F
      FROM SolarMetrics
    `);

    if (result.recordset.length === 0) {
      return res.status(404).send('No data found.');
    }

    res.json(result.recordset[0]);  // Return max values as JSON
  } catch (err) {
    console.error('Error fetching max values from the database:', err.message);
    res.status(500).send('Error fetching max values from the database.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
