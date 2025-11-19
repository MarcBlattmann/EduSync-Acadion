const data = require('./data/systems.json');
const systems = data.systems;

/**
 * Get information about a specific Grade-system in Markdown format.
 * @param { Object } system - The Grade-system object
 * @returns { string|null } Markdown formatted information about the Grade-system or null if not found.
 */
function getSystemInfo(system) {
  if (!system) return null;
  return system.info || null;
}

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
 * Helper: convert a numeric grade to percent using numeric mapping entries (linear between neighbours)
 * @param {Array<Object>} mappings 
 * @param {number} gradeNum 
 * @returns {number} The corresponding percentage or throws an error if not found.
 */
function numericGradeToPercent(mappings, gradeNum) {
  const numericMappings = mappings
    .filter(m => typeof m.grade === 'number' && !Number.isNaN(m.grade))
    .slice()
    .sort((a, b) => a.grade - b.grade);

  if (numericMappings.length >= 2) {
    const minGrade = numericMappings[0];
    const maxGrade = numericMappings[numericMappings.length - 1];

    if (gradeNum <= minGrade.grade) return minGrade.percent;

    if (gradeNum >= maxGrade.grade) return maxGrade.percent;

    for (let i = 0; i < numericMappings.length - 1; i++) {
      const lowerBound = numericMappings[i];
      const upperBound = numericMappings[i + 1];

      if (gradeNum >= lowerBound.grade && gradeNum <= upperBound.grade) {
        const interpolationFactor = (gradeNum - lowerBound.grade) / (upperBound.grade - lowerBound.grade);
        
        return lowerBound.percent + interpolationFactor * (upperBound.percent - lowerBound.percent);
      }
    }
  }

  if (gradeNum >= 0 && gradeNum <= 100) return gradeNum;

  throw new Error('Cannot convert numeric grade to percent: insufficient numeric grade mapping');
}

/**
 * Convert a grade to a percentage based on the Grade-system's mapping.
 * @param { Object } system - The Grade-system object
 * @param { number|string } grade - numeric grade or string (e.g. "A" or "satisfying")
 * @returns { number } The grade converted to a grade percentage.
 * @throws { Error } If the grade is invalid.
 * @example
 * convertToPercent(system, 5); // returns 80
 */
function convertToPercent(system, grade) {
  if (!system) throw new Error('System not found');

  if (typeof grade === 'number' && !Number.isNaN(grade)) {
    return numericGradeToPercent(system.mappings, grade);
  }

  if (typeof grade === 'string') {
    const lower = grade.trim().toLowerCase();

    const byGradeField = system.mappings.find(m => String(m.grade).toLowerCase() === lower);
    if (byGradeField) return byGradeField.percent;

    const byDesc = system.mappings.find(m => m.description && m.description.toLowerCase() === lower);
    if (byDesc) return byDesc.percent;

    const num = parseFloat(grade);
    if (!Number.isNaN(num)) return numericGradeToPercent(system.mappings, num);

    throw new Error('Grade not found in system mappings');
  }

  throw new Error('Unsupported grade type');
}

/**
 * Get the color representation of a grade within a specific Grade-system.
 * @param { Object } system - The Grade-system object
 * @param { number|string } grade - numeric or string grade
 * @returns { string } The color representing the grade status.
 */
function getColor(system, grade) {
  const percent = convertToPercent(system, grade);

  if (percent < system.passing_percent) return 'red';
  if (percent < system.satisfactory_percent) return 'orange';
  return 'green';
}

/**
 * Find the closest mapping entry to a given percentage.
 * @private
 */
function findClosestByPercent(mappings, percent) {
  let closest = mappings[0];
  for (const mapping of mappings) {
    if (Math.abs(mapping.percent - percent) < Math.abs(closest.percent - percent)) {
      closest = mapping;
    }
  }
  return closest;
}

/**
 * Find the closest mapping entry to a given numeric grade.
 * @private
 */
function findClosestByGrade(mappings, grade) {
  let closest = mappings[0];
  for (const mapping of mappings) {
    if (typeof mapping.grade === 'number' && Math.abs(mapping.grade - grade) < Math.abs((closest.grade || 0) - grade)) {
      closest = mapping;
    }
  }
  return closest;
}

/**
 * Get the description of a grade within a specific Grade-system.
 * @param { Object } system - The Grade-system object
 * @param { number|string } grade - numeric or string grade
 * @returns { string|null } The description of the grade or null if not found.
 * @example
 * getGradeDescription(system, 5); // returns "Good"
 */
function getGradeDescription(system, grade) {
  if (!system) {
    return null;
  }

  if (typeof grade === 'string') {
    const lower = grade.trim().toLowerCase();
    
    const byGradeField = system.mappings.find(m => String(m.grade).toLowerCase() === lower);
    if (byGradeField) {
      return byGradeField.description || null;
    }
    const byDesc = system.mappings.find(m => m.description && m.description.toLowerCase() === lower);
    if (byDesc) {
      return byDesc.description || null;
    }
    
    const num = parseFloat(grade);
    if (Number.isNaN(num)) {
      return null;
    }

    grade = num;
  }

  if (typeof grade === 'number' && !Number.isNaN(grade)) {
    try {
      const percent = convertToPercent(system, grade);
      const closest = findClosestByPercent(system.mappings, percent);
      return closest.description || null;
    } catch (e) {
      const closest = findClosestByGrade(system.mappings, grade);
      return closest.description || null;
    }
  }

  return null;
}

/**
 * Convert a percentage (0-100) into a grade for a specific system using linear
 * interpolation across the system's grade range.
 *
 * @param {Object} system - The Grade-system object
 * @param {number} percent - value between 0 and 100
 * @returns {number|string} interpolated grade in the target system (may be numeric or a mapping-grade string)
 */
function percentToGrade(system, percent) {
  if (!system) throw new Error('System not found');

  const clampedPercent = Math.max(0, Math.min(100, percent));

  const numericMappings = system.mappings
    .filter(m => typeof m.grade === 'number' && !Number.isNaN(m.grade))
    .slice()
    .sort((a, b) => a.percent - b.percent);

  if (numericMappings.length >= 2) {
    if (clampedPercent <= numericMappings[0].percent) {
      return numericMappings[0].grade;
    }
    if (clampedPercent >= numericMappings[numericMappings.length - 1].percent) {
      return numericMappings[numericMappings.length - 1].grade;
    }

    for (let i = 0; i < numericMappings.length - 1; i++) {
      const lowerBound = numericMappings[i];
      const upperBound = numericMappings[i + 1];

      if (clampedPercent >= lowerBound.percent && clampedPercent <= upperBound.percent) {
        const interpolationFactor = (clampedPercent - lowerBound.percent) / 
                                    (upperBound.percent - lowerBound.percent);
        
        return lowerBound.grade + interpolationFactor * (upperBound.grade - lowerBound.grade);
      }
    }
  }

  let closestMapping = system.mappings[0];
  for (const mapping of system.mappings) {
    if (Math.abs(mapping.percent - clampedPercent) < Math.abs(closestMapping.percent - clampedPercent)) {
      closestMapping = mapping;
    }
  }
  return closestMapping.grade;
}

/**
 * Convert a grade from one Grade-system to another.
 * @param {Object} fromSystem - The source Grade-system object
 * @param {Object} toSystem - The target Grade-system object
 * @param {number|string} grade - Grade in the source system to convert (numeric or string)
 * @returns {{ grade: number|string }} The converted grade in the target system
 */
function convertGradeToGrade(fromSystem, toSystem, grade) {
  if (!fromSystem) throw new Error('Source system not found');
  if (!toSystem) throw new Error('Target system not found');

  const percent = convertToPercent(fromSystem, grade);
  const converted = percentToGrade(toSystem, percent);

  return { grade: converted };
}

module.exports = { 
  systems, 
  getSystemById, 
  getSystemByName,
  convertToPercent, 
  percentToGrade,
  convertGradeToGrade,
  getColor, 
  getGradeDescription,
  getSystemInfo,
  getAllSystems 
};