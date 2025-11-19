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

module.exports = {
  findClosestByPercent,
  findClosestByGrade,
  numericGradeToPercent
};
