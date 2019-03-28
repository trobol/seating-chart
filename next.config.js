
/* Fixes font awesome icons loading before
 * their stylesheet would load causing them
 * to load large then fix their sizing.
 */
const withCSS = require('@zeit/next-css');

module.exports = withCSS();
