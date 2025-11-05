const data = require('./data/systems.json');
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
 * Helper: convert a numeric grade to percent using numeric mapping entries (linear between neighbours)
 * @param {Array<Object>} mappings 
 * @param {number} gradeNum 
 * @returns {number} The corresponding percentage or throws an error if not found.
 */
function _numericGradeToPercent(mappings, gradeNum) {
  const numeric = mappings
    .filter(m => typeof m.grade === 'number' && !Number.isNaN(m.grade))
    .slice()
    .sort((a, b) => a.grade - b.grade);

  if (numeric.length >= 2) {
    if (gradeNum <= numeric[0].grade) return numeric[0].percent;
    if (gradeNum >= numeric[numeric.length - 1].grade) return numeric[numeric.length - 1].percent;

    for (let i = 0; i < numeric.length - 1; i++) {
      const a = numeric[i];
      const b = numeric[i + 1];
      if (gradeNum >= a.grade && gradeNum <= b.grade) {
        const t = (gradeNum - a.grade) / (b.grade - a.grade);
        return a.percent + t * (b.percent - a.percent);
      }
    }
  }

  if (gradeNum >= 0 && gradeNum <= 100) return gradeNum;

  throw new Error('Cannot convert numeric grade to percent: insufficient numeric grade mapping');
}

/**
 * Convert a grade to a percentage based on the Grade-system's mapping.
 * @param { number } systemId 
 * @param { number|string } grade - numeric grade or string (e.g. "A" or "satisfying")
 * @returns { number } The grade converted to a grade percentage.
 * @throws { Error } If the Grade-system is not found.
 * @example
 * convertToPercent(1, 5); // returns 80
 */
function convertToPercent(systemId, grade) {
  const system = getSystemById(systemId);
  if (!system) throw new Error('System not found');

  if (typeof grade === 'number' && !Number.isNaN(grade)) {
    return _numericGradeToPercent(system.mappings, grade);
  }

  if (typeof grade === 'string') {
    const lower = grade.trim().toLowerCase();

    const byGradeField = system.mappings.find(m => String(m.grade).toLowerCase() === lower);
    if (byGradeField) return byGradeField.percent;

    const byDesc = system.mappings.find(m => m.description && m.description.toLowerCase() === lower);
    if (byDesc) return byDesc.percent;

    const num = parseFloat(grade);
    if (!Number.isNaN(num)) return _numericGradeToPercent(system.mappings, num);

    throw new Error('Grade not found in system mappings');
  }

  throw new Error('Unsupported grade type');
}

/**
 * Get the color representation of a grade within a specific Grade-system.
 * @param { number } systemId 
 * @param { number|string } grade - numeric or string grade
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
 * @param { number|string } grade - numeric or string grade
 * @returns { string|null } The description of the grade or null if not found.
 * @example
 * getGradeDescription(1, 5); // returns "Good"
 */
function getGradeDescription(systemId, grade) {
  const system = getSystemById(systemId);
  if (!system) return null;

  if (typeof grade === 'string') {
    const lower = grade.trim().toLowerCase();
    const byGradeField = system.mappings.find(m => String(m.grade).toLowerCase() === lower);
    if (byGradeField) return byGradeField.description || null;
    const byDesc = system.mappings.find(m => m.description && m.description.toLowerCase() === lower);
    if (byDesc) return byDesc.description || null;
    const num = parseFloat(grade);
    if (!Number.isNaN(num)) grade = num;
    else return null;
  }

  if (typeof grade === 'number' && !Number.isNaN(grade)) {
    try {
      const percent = convertToPercent(systemId, grade);
      let closest = system.mappings[0];
      for (const m of system.mappings) {
        if (Math.abs(m.percent - percent) < Math.abs(closest.percent - percent)) {
          closest = m;
        }
      }
      return closest.description || null;
    } catch (e) {
      let closest = system.mappings[0];
      for (const m of system.mappings) {
        if (typeof m.grade === 'number' && Math.abs(m.grade - grade) < Math.abs((closest.grade || 0) - grade)) {
          closest = m;
        }
      }
      return closest.description || null;
    }
  }

  return null;
}

/**
 * Convert a percentage (0-100) into a grade for a specific system using linear
 * interpolation across the system's grade range.
 *
 * @param {number} systemId
 * @param {number} percent - value between 0 and 100
 * @throws {Error} If the Grade-system is not found
 * @returns {number|string} interpolated grade in the target system (may be numeric or a mapping-grade string)
 */
function percentToGrade(systemId, percent) {
  const system = getSystemById(systemId);
  if (!system) throw new Error('System not found');

  const p = Math.max(0, Math.min(100, percent));

  const numeric = system.mappings.filter(m => typeof m.grade === 'number' && !Number.isNaN(m.grade)).slice().sort((a, b) => a.percent - b.percent);
  if (numeric.length >= 2) {
    if (p <= numeric[0].percent) return numeric[0].grade;
    if (p >= numeric[numeric.length - 1].percent) return numeric[numeric.length - 1].grade;

    for (let i = 0; i < numeric.length - 1; i++) {
      const a = numeric[i];
      const b = numeric[i + 1];
      if (p >= a.percent && p <= b.percent) {
        const t = (p - a.percent) / (b.percent - a.percent);
        return a.grade + t * (b.grade - a.grade);
      }
    }
  }

  let closest = system.mappings[0];
  for (const m of system.mappings) {
    if (Math.abs(m.percent - p) < Math.abs(closest.percent - p)) {
      closest = m;
    }
  }
  return closest.grade;
}

/**
 * Convert a grade from one Grade-system to another.
 * @param {number} fromSystemId - ID of the source grade system
 * @param {number} toSystemId - ID of the target grade system
 * @param {number|string} grade - Grade in the source system to convert (numeric or string)
 * @throws {Error} If either Grade-system is not found
 * @returns {{ grade: number|string }} The converted grade in the target system
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