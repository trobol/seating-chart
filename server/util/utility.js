const fs = require('fs');
const path = require('path');
const util = require('util');

const ProjectBase = path.resolve('.');

const stat = util.promisify(fs.stat);
/**
     * Returns if the path exists
     * @param {string} possiblePath
     */
const isValidPath = async (possiblePath) => {
  try {
    const { err } = await stat(possiblePath);
    return !err;
  } catch (error) {
    return false;
  }
};

module.exports = {
  ProjectBase,
  stat,
  isValidPath,
};
