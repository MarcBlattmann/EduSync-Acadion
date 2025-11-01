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

function convertToPercent(systemId, grade) {
  const system = getSystemById(systemId);
  if (!system) throw new Error('System not found');
  
  const firstGrade = system.mappings[0].grade;
  const lastGrade = system.mappings[system.mappings.length - 1].grade;
  
  return ((grade - firstGrade) / (lastGrade - firstGrade)) * 100;
}

function getColor(systemId, grade) {
  const system = getSystemById(systemId);
  const percent = convertToPercent(systemId, grade);

  if (percent < system.passing_percent) return 'red';
  if (percent < system.satisfactory_percent) return 'orange';
  return 'green';
}

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