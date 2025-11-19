const data = require('../data/systems.json');
const systems = data.systems;

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
 * Retrieve a Grade-system by its name.
 * @param { string } name 
 * @returns { Object|null } The Grade-system object or null if not found.
 */
function getSystemByName(name) {
  return systems.find(s => s.name === name);
}

/**
 * Get information about a specific Grade-system in Markdown format.
 * @param { Object } system - The Grade-system object
 * @returns { string|null } Markdown formatted information about the Grade-system or null if not found.
 */
function getSystemInfo(system) {
  if (!system) return null;
  return system.info || null;
}

module.exports = {
  systems,
  getAllSystems,
  getSystemById,
  getSystemByName,
  getSystemInfo
};
