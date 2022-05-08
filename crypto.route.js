const cryptoRoute = require("express").Router();
const {
  hash,
  salt,
  encrypt,
  hashWithKey,
  randomBytes,
  symEnc,
  symDec,
  encryptAsym,
  decryptAsym,
  sign,
  isValidSignature,
} = require("./cryptp.service");
const hashSecret = "my-secret";
const key = randomBytes(32);
const iv = randomBytes(16);

cryptoRoute.get("/:message", (req, res) => {
  let input = req.params.message;
  res.send({ hash: hash(input, hashSecret) });
});

cryptoRoute.get("/:message/hash", (req, res) => {
  let input = req.params.message;
  res.send({ hash: hashWithKey(input, hashSecret) });
});

cryptoRoute.get("/:message/enc", (req, res) => {
  let input = req.params.message;
  res.send({ encrypt: encrypt(input) });
});

cryptoRoute.get("/:message/sym-enc", (req, res) => {
  let input = req.params.message;
  let encrypted = symEnc(input, key, iv);
  res.send({ encrypt: encrypted });
});

cryptoRoute.get("/:message/sym-dec", (req, res) => {
  let input = req.params.message;
  let encrypted = symEnc(input, key, iv);
  let decrypted = symDec(encrypted, key, iv);
  res.send({ decrypted: decrypted });
});

cryptoRoute.get("/:message/asym-enc", (req, res) => {
  let input = req.params.message;
  let encrypted = encryptAsym(input);
  res.send({ encrypt: encrypted });
});

cryptoRoute.get("/:message/asym-dec", (req, res) => {
  let input = req.params.message;
  let encrypted = encryptAsym(input);
  let decrypted = decryptAsym(encrypted);
  res.send({ decrypted: decrypted });
});

cryptoRoute.get("/:message/sign", (req, res) => {
  let input = req.params.message;
  let signature = sign(input);
  res.send({ signature: signature });
});

cryptoRoute.get("/:message/verify", (req, res) => {
  let input = req.params.message;
  let signature = sign(input);
  let isVerifed = isValidSignature(input, signature);
  res.send({ isVerifed: isVerifed });
});

cryptoRoute.get("/salt", (_, res) => {
  let saltValue = salt();
  res.send({ salt: saltValue });
});

module.exports = { cryptoRoute };
