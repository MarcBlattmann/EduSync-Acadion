const { convertToPercent } = require('./conversion');
const { findClosestByPercent, findClosestByGrade } = require('./helpers');

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

module.exports = {
  getColor,
  getGradeDescription
};
