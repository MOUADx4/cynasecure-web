-- Mise à jour des caractéristiques techniques de tous les services
-- À exécuter sur la BDD live une seule fois

UPDATE service SET technical_specs = '[{"label": "Endpoints", "value": "5 000 max"}, {"label": "OS", "value": "Windows, macOS, Linux"}, {"label": "Détection", "value": "< 2 secondes"}, {"label": "Rétention logs", "value": "90 jours"}]' WHERE id = 2;

UPDATE service SET technical_specs = '[{"label": "Sources corrélées", "value": "15+ intégrations"}, {"label": "MTTD", "value": "< 5 minutes"}, {"label": "Rétention", "value": "12 mois"}, {"label": "Playbooks", "value": "200+"}]' WHERE id = 3;

UPDATE service SET technical_specs = '[{"label": "Débit", "value": "10 Gbps"}, {"label": "Latence ajoutée", "value": "< 1 ms"}, {"label": "Règles", "value": "Illimitées"}, {"label": "Protocoles", "value": "L3 / L4 / L7"}]' WHERE id = 4;

UPDATE service SET technical_specs = '[{"label": "Providers", "value": "AWS, Azure, GCP"}, {"label": "Contrôles CIS", "value": "1 000+"}, {"label": "Fréquence scan", "value": "5 minutes"}, {"label": "APIs surveillées", "value": "Illimitées"}]' WHERE id = 5;

UPDATE service SET technical_specs = '[{"label": "Chiffrement", "value": "AES-256"}, {"label": "RPO", "value": "< 24h"}, {"label": "RTO", "value": "< 4h"}, {"label": "Rétention", "value": "365 jours"}]' WHERE id = 6;

UPDATE service SET technical_specs = '[{"label": "Utilisateurs", "value": "Illimité"}, {"label": "Protocoles SSO", "value": "SAML 2.0, OIDC"}, {"label": "MFA", "value": "TOTP, FIDO2, SMS"}, {"label": "Intégrations", "value": "500+"}]' WHERE id = 7;

UPDATE service SET technical_specs = '[{"label": "Disponibilité", "value": "24/7/365"}, {"label": "SLA P1", "value": "< 15 minutes"}, {"label": "Canaux", "value": "Téléphone, Chat, Email"}, {"label": "Résolution P1", "value": "< 4h"}]' WHERE id = 30;
