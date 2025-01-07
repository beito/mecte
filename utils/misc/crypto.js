const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function generateRecoveryCode(size) {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	for (let i = 0; i < size; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

function encrypt(text) {
	let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
	let crypted = cipher.update(text, 'utf8', 'hex')
	crypted += cipher.final('hex');
	return crypted;
}

function decrypt(text) {
	let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
	let dec = decipher.update(text, 'hex', 'utf8')
	dec += decipher.final('utf8');
	return dec;
}

module.exports = {
	generateRecoveryCode,
	encrypt,
	decrypt
};