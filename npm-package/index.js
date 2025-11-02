const systems = require('./data/systems.json');

/**
 * Retrieve all registered Grade-systems.
 * @returns {Array<Object>} An array of all Grade-system objects.
 */
function getAllSystems() {
  return systems;
}

/**
 * Retrieve a Grade-system by its unique identifier.
 * @param { number } id 
 * @returns { Object|null } The Grade-system object or null if not found.
 */
function getSystemById(id) {
  return systems.find(s => s.id === id);
}

/**
 * Convert a grade to a percentage based on the Grade-system's mapping.
 * @param { number } systemId 
 * @param { number } grade 
 * @returns { number } The grade converted to a grade percentage.
 * @throws { Error } If the Grade-system is not found.
 * @example
 * convertToPercent(1, 5); // returns 80
 */
function convertToPercent(systemId, grade) {
  const system = getSystemById(systemId);
  if (!system) throw new Error('System not found');
  
  const firstGrade = system.mappings[0].grade;
  const lastGrade = system.mappings[system.mappings.length - 1].grade;
  
  return ((grade - firstGrade) / (lastGrade - firstGrade)) * 100;
}

/**
 * Get the color representation of a grade within a specific Grade-system.
 * @param { number } systemId 
 * @param { number } grade 
 * @returns { string } The color representing the grade status.
 */
function getColor(systemId, grade) {
  const system = getSystemById(systemId);
  const percent = convertToPercent(systemId, grade);

  if (percent < system.passing_percent) return 'red';
  if (percent < system.satisfactory_percent) return 'orange';
  return 'green';
}

/**
 * Get the description of a grade within a specific Grade-system.
 * @param { number } systemId 
 * @param { number } grade 
 * @returns { string|null } The description of the grade or null if not found.
 * @example
 * getGradeDescription(1, 5); // returns "Good"
 */
function getGradeDescription(systemId, grade) {
  const system = getSystemById(systemId);
  let closest = system.mappings[0];
  for (const m of system.mappings) {
    if (Math.abs(m.grade - grade) < Math.abs(closest.grade - grade)) {
      closest = m;
    }
  }
  return closest.description;
}

/**
 * Convert a percentage (0-100) into a grade for a specific system using linear
 * interpolation across the system's grade range.
 *
 * @param {number} systemId
 * @param {number} percent - value between 0 and 100
 * @throws {Error} If the Grade-system is not found
 * @returns {number} interpolated grade in the target system
 */
function percentToGrade(systemId, percent) {
  const system = getSystemById(systemId);
  if (!system) throw new Error('System not found');

  const firstGrade = system.mappings[0].grade;
  const lastGrade = system.mappings[system.mappings.length - 1].grade;

  return firstGrade + (percent / 100) * (lastGrade - firstGrade);
}

/**
 * Convert a grade from one Grade-system to another.
 * @param {number} fromSystemId - ID of the source grade system
 * @param {number} toSystemId - ID of the target grade system
 * @param {number} grade - Grade in the source system to convert
 * @throws {Error} If either Grade-system is not found
 * @returns {{ grade: number }} The converted grade in the target system
 */
function convertGradeToGrade(fromSystemId, toSystemId, grade) {
  const fromSystem = getSystemById(fromSystemId);
  const toSystem = getSystemById(toSystemId);

  if (!fromSystem) throw new Error('Source system not found');
  if (!toSystem) throw new Error('Target system not found');

  const percent = convertToPercent(fromSystemId, grade);
  const converted = percentToGrade(toSystemId, percent);

  return { grade: converted };
}

module.exports = { 
  systems, 
  getSystemById, 
  convertToPercent, 
  percentToGrade,
  convertGradeToGrade,
  getColor, 
  getGradeDescription, 
  getAllSystems 
};