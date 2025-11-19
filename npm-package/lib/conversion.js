const { numericGradeToPercent } = require('./helpers');

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
  convertToPercent,
  percentToGrade,
  convertGradeToGrade
};
