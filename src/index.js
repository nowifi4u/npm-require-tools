/**
 * @param {string} name - Require name
 * @returns {boolean}
 */
function isloaded(name) {
	try {
		const structureName = require.resolve(name);
		return Boolean(require.cache[structureName]);
	} catch(err) {
		return false;
	}
}

/**
 * @param {string} name - Require name
 */
function unload(name) {
	try {
		const structureName = require.resolve(name);
		delete require.cache[structureName];
		return true;
	} catch(err) {
		return false;
	}
}

/**
 * Patches require export
 * @param {string} name - Require name
 * @param {Function} patcher - Function, returning a new export
 */
function patch(name, patcher) {
	const structure = require(name);
	const structureName = require.resolve(name);
	const patched = patcher(structure);
	require.cache[structureName].exports = patched;
	return patched;
}

module.exports = {
	isloaded,
	unload,
	patch
};
