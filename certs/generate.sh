#!/usr/bin/env bash

set -e

CERTS_DIR="$(pwd)/certs"
mkdir -p "$CERTS_DIR"

echo "🔐 Génération des certificats mTLS gRPC dans $CERTS_DIR..."

# 1. Génération de l'Autorité de Certification (CA)
openssl genrsa -out "$CERTS_DIR/ca.key" 4096
openssl req -x509 -new -nodes -key "$CERTS_DIR/ca.key" -sha256 -days 3650 -out "$CERTS_DIR/ca.crt" -subj "/CN=SIH-Internal-CA"

# 2. Certificat SERVEUR (Patient-Identity-Service)
openssl genrsa -out "$CERTS_DIR/server.key" 4096
openssl req -new -key "$CERTS_DIR/server.key" -out "$CERTS_DIR/server.csr" -subj "/CN=patient-identity-service"
openssl x509 -req -in "$CERTS_DIR/server.csr" -CA "$CERTS_DIR/ca.crt" -CAkey "$CERTS_DIR/ca.key" -CAcreateserial -out "$CERTS_DIR/server.crt" -days 825 -sha256

# 3. Certificat CLIENT (Admission-service)
openssl genrsa -out "$CERTS_DIR/client.key" 4096
openssl req -new -key "$CERTS_DIR/client.key" -out "$CERTS_DIR/client.csr" -subj "/CN=admission-service"
openssl x509 -req -in "$CERTS_DIR/client.csr" -CA "$CERTS_DIR/ca.crt" -CAkey "$CERTS_DIR/ca.key" -CAcreateserial -out "$CERTS_DIR/client.crt" -days 825 -sha256

# Nettoyage des fichiers temporaires CSR
rm -f "$CERTS_DIR/server.csr" "$CERTS_DIR/client.csr"

echo "✅ Tous les certificats mTLS ont été générés avec succès !"
