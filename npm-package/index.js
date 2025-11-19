// System functions
const {
  systems,
  getAllSystems,
  getSystemById,
  getSystemByName,
  getSystemInfo
} = require('./lib/system');

// Conversion functions
const {
  convertToPercent,
  percentToGrade,
  convertGradeToGrade
} = require('./lib/conversion');

// Color and description functions
const {
  getColor,
  getGradeDescription
} = require('./lib/color');

module.exports = {
  // Systems
  systems,
  getAllSystems,
  getSystemById,
  getSystemByName,
  getSystemInfo,
  
  // Conversions
  convertToPercent,
  percentToGrade,
  convertGradeToGrade,
  
  // Color & Description
  getColor,
  getGradeDescription
};