const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const certsDir = path.join(__dirname);
if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir, { recursive: true });
}

console.log('🔐 Génération des certificats SSL mTLS...');

try {
    execSync(`openssl genrsa -out "${path.join(certsDir, 'ca.key')}" 2048`, { stdio: 'inherit' });
    execSync(`openssl req -x509 -new -nodes -key "${path.join(certsDir, 'ca.key')}" -sha256 -days 3650 -out "${path.join(certsDir, 'ca.crt')}" -subj "/CN=SIH-Internal-CA"`, { stdio: 'inherit' });

    execSync(`openssl genrsa -out "${path.join(certsDir, 'server.key')}" 2048`, { stdio: 'inherit' });
    execSync(`openssl req -new -key "${path.join(certsDir, 'server.key')}" -out "${path.join(certsDir, 'server.csr')}" -subj "/CN=patient-identity-service"`, { stdio: 'inherit' });
    execSync(`openssl x509 -req -in "${path.join(certsDir, 'server.csr')}" -CA "${path.join(certsDir, 'ca.crt')}" -CAkey "${path.join(certsDir, 'ca.key')}" -CAcreateserial -out "${path.join(certsDir, 'server.crt')}" -days 825 -sha256`, { stdio: 'inherit' });

    execSync(`openssl genrsa -out "${path.join(certsDir, 'client.key')}" 2048`, { stdio: 'inherit' });
    execSync(`openssl req -new -key "${path.join(certsDir, 'client.key')}" -out "${path.join(certsDir, 'client.csr')}" -subj "/CN=admission-service"`, { stdio: 'inherit' });
    execSync(`openssl x509 -req -in "${path.join(certsDir, 'client.csr')}" -CA "${path.join(certsDir, 'ca.crt')}" -CAkey "${path.join(certsDir, 'ca.key')}" -CAcreateserial -out "${path.join(certsDir, 'client.crt')}" -days 825 -sha256`, { stdio: 'inherit' });

    fs.unlinkSync(path.join(certsDir, 'server.csr'));
    fs.unlinkSync(path.join(certsDir, 'client.csr'));

    console.log('✅ Certificats générés avec succès !');
} catch (error) {
    console.error('Erreur de génération des certificats:', error);
}
