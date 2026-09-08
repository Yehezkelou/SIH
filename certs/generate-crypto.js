const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const certsDir = __dirname;

function generateCertPair(cn) {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });

    return { privateKey, publicKey };
}

// Generate CA
const ca = generateCertPair('SIH-Internal-CA');
fs.writeFileSync(path.join(certsDir, 'ca.key'), ca.privateKey);
fs.writeFileSync(path.join(certsDir, 'ca.crt'), ca.publicKey);

// Generate Server Cert
const server = generateCertPair('patient-identity-service');
fs.writeFileSync(path.join(certsDir, 'server.key'), server.privateKey);
fs.writeFileSync(path.join(certsDir, 'server.crt'), server.publicKey);

// Generate Client Cert
const client = generateCertPair('admission-service');
fs.writeFileSync(path.join(certsDir, 'client.key'), client.privateKey);
fs.writeFileSync(path.join(certsDir, 'client.crt'), client.publicKey);

console.log('✅ Certificats PEM générés avec succès par Node Crypto !');
