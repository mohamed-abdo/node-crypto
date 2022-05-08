const {
  createHash,
  randomBytes,
  scryptSync,
  createHmac,
  createCipheriv,
  createDecipheriv,
  publicEncrypt,
  privateDecrypt,
  createSign,
  createVerify,
} = require("crypto");
const { privateKey, publicKey, passphrase } = require("./asymKey");

function hash(input) {
  return createHash("sha256").update(input).digest("base64");
}

function hashWithKey(input, key) {
  return createHmac("sha256", key).update(input).digest("base64");
}

function salt() {
  return randomBytes(16).toString("hex");
}
function encrypt(message) {
  let saltInput = salt();
  return scryptSync(message, saltInput, 16).toString("hex");
}

function symEnc(message, key, iv) {
  const cipher = createCipheriv("aes256", key, iv);
  return cipher.update(message, "utf-8", "hex") + cipher.final("hex");
}

function symDec(message, key, iv) {
  const decipher = createDecipheriv("aes256", key, iv);
  return decipher.update(message, "hex", "utf-8") + decipher.final("utf-8");
}

function encryptAsym(message) {
  return publicEncrypt(publicKey, Buffer.from(message)).toString("hex");
}

function decryptAsym(message) {
  return privateDecrypt(
    { key: privateKey.toString(), passphrase: passphrase },
    Buffer.from(message, "hex")
  ).toString("utf-8");
}

function sign(message) {
  const signer = createSign("rsa-sha256");
  signer.update(message);
  return signer.sign(
    { key: privateKey.toString(), passphrase: passphrase },
    "hex"
  );
}

function isValidSignature(message, signature) {
  const verifyer = createVerify("rsa-sha256");
  verifyer.update(message);
  return verifyer.verify(publicKey, signature, "hex");
}

module.exports = {
  hash,
  salt,
  encrypt,
  hashWithKey,
  symEnc,
  symDec,
  randomBytes,
  encryptAsym,
  decryptAsym,
  sign,
  isValidSignature,
};
