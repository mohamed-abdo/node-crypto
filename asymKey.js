const { generateKeyPairSync } = require("crypto");
const passphrase = "my-secret";
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: passphrase,
  },
});

module.exports = { publicKey, privateKey, passphrase };
