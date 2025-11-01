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

module.exports = { 
  systems, 
  getSystemById, 
  convertToPercent, 
  getColor, 
  getGradeDescription, 
  getAllSystems 
};