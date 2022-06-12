const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },

  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

function encrypt(data) {
  var _publicKey =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnNtqTVo4RtzpDuHe1BPetxnc2IpilDe/Xyt8bJ/0cCh09cXrEPiiBwA9QuRC2hX94+FuSjRv4TBwWknTROy2+dc4k/HvJTYQpIdHO2X4KmB6HIPmDP6Py64AT9vMKFlz9omNCit8tSWHk32Tg8/eHVGrppskOafhWVd1qX0KflyrC1KLU3g5bz2AYJyJBtPv18DiyvcZwuKbHrkxybZm/GqrtPmtCEx7pL9VJi37AO5FkCz7jE2BNgmC43m7YDhvevllzhFow2O7pnAbnbNTYdW9nTgMBO79ujP6Ms9B29JSJO7o1s2V8NIaVmf3PilA53tR0q/9Q45XBpF62GEr/wIDAQAB";
  var publicKeyPem =
    "-----BEGIN PUBLIC KEY-----\n" +
    _publicKey +
    "\n" +
    "-----END PUBLIC KEY-----";
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKeyPem,
      padding: crypto.constants.RSA_PKCS1_PADDING,
      oaepHash: "sha256",
    },
    // We convert the data string to a buffer using `Buffer.from`
    Buffer.from(data, "utf-8")
  );
  return encryptedData.toString("base64");
}
function decrypt(data) {
    var _privateKey =
        "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCc22pNWjhG3OkO4d7UE963GdzYimKUN79fK3xsn/RwKHT1xesQ+KIHAD1C5ELaFf3j4W5KNG/hMHBaSdNE7Lb51ziT8e8lNhCkh0c7ZfgqYHocg+YM/o/LrgBP28woWXP2iY0KK3y1JYeTfZODz94dUaummyQ5p+FZV3WpfQp+XKsLUotTeDlvPYBgnIkG0+/XwOLK9xnC4pseuTHJtmb8aqu0+a0ITHukv1UmLfsA7kWQLPuMTYE2CYLjebtgOG96+WXOEWjDY7umcBuds1Nh1b2dOAwE7v26M/oyz0Hb0lIk7ujWzZXw0hpWZ/c+KUDne1HSr/1DjlcGkXrYYSv/AgMBAAECggEAajjYUwu+wpZFKXPiL2JJV1unR+jm+xKJgUx0lSb5JJ7xHaLrHfIR34XU9qCXeRKdfZ2iz5OVFD12SF5oOOvIuYZ65Q1Ycq2bNZ/6qAnUtfXhm7/ioXgeLsNlqK7jIYv6UMEzhuiOKioBFutaY0/4TYiKImg7buP2YkctAhsQaSMNK34sVRK80Oe0cbsD2TcA2R2pGxqUiNsYvls+Cg+0YE94BGinDAyCOBdHQLk6TBqackTrPQq0mSavU5cTrQGJkmxobUX6PcYF3lka3K1YU1w/kw1ef4dmmNolxsiEpJcPxBh0nR9sEBUoSjwAxCHFoP+xaXcUcRgmkfBlGSjcIQKBgQDe59tJJvUarIFDmQmxCIYqvN9XnjbyRK7ToWkShFMShkFhcWLEuPTuYZV4dIemi0Mz0JOXE7SpjBwrVzEvfVqOXLWyOqwECKr8FaRO6OppqmswWuOUJlYaLToSmiHxeuehOeUA6fHvkyDykq8kswBgm4GOnuW5Mu52Nl8F7X9aLwKBgQC0JTM6nDyZLpY0l4nzl9IHiANZmSM1XmviJ0ej/B2YYG1vIqG26ZlDEWABqxamG2nK9h5RiMESej7JZN9a+hOtJYtJPvhIy5YinB0PsabGyqB8M2EHPVRbEqOhn1IAGH4VsDIW0sqI0XQUQQ1uTubO5TT4l5hTNhjqO3agH8hnMQKBgHAt00gPWQ7hffRdEmmL1qmvf98CeriWJD3RX6W3/m62LjUx8Pj79Bf7+FM0oggI0ftDnuNLQYKKRqrxKImz1l0K/04BBQzKp/JRme00frRK1cLyGtI2MOLfm/g8pZR3vBaBomRBWEavjsdFVutrQmdcG2mBQi9gGG5ZkpzTF2J1AoGASoY5Mz3/M7+6E/e88jEUilkSSba4ghOVvfFSCdz6wVbi7t7815a7+KrvdME6lW0xzu0SjdhtRx+baeV5IUHjcfXeMWcDf9n5OkgrHZr4y7R3v+nhcgVFKIgFeY9XdQKs5nwFvLtnXkKIKvjefYvWoDDiQRU1xvbSR9RhtsxvM4ECgYBXrtN0StFKx6/ABWxcXJKbyarVRcEFKuItM3I2M+s8OXBYU1XpGAtYvmIgQ3cGNqjNwQdl8m9H3kTAnQKIeCeBGjegieos+SoWFfTp6u7tysjmlPqNf98P52Eu6cskGGxnC1NMcQWxY7p2MsW6/RsXkYfISaOR7JcLYd51A0OeoA==";
    var privateKeyPem =
    "-----BEGIN PRIVATE KEY-----\n" +
    _privateKey +
    "\n" +
    "-----END PRIVATE KEY-----";
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKeyPem,
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(data, "base64")
  );
  return decryptedData.toString("utf-8");
}

function getSignature(verifiableData) {
  const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  });
  return signature.toString("base64");
}

function signatureVerifyer(verifiableData, signature) {
  return crypto.verify(
    "sha256",
    Buffer.from(verifiableData),
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(signature)
  );
}

module.exports = { encrypt, decrypt, getSignature, signatureVerifyer };
