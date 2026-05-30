-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 30, 2026 at 03:20 AM
-- Server version: 8.0.44
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cynasecure` (DEMO seed — sensitive data removed)
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `line1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `region` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'FR',
  `phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `address`
--


-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `home_position` int DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `slug`, `description`, `home_position`, `image_path`) VALUES
(1, 'SOC', 'soc', NULL, 2, 'uploads/home/img_6a18c56eac15e5.96546248.jpg'),
(2, 'EDR', 'edr', NULL, 0, 'uploads/home/img_6a18c555c32334.93631667.jpg'),
(3, 'XDR', 'xdr', NULL, 1, 'uploads/home/img_6a18c564d9fa79.30608660.jpg'),
(4, 'Protection des données', 'protection-donnees', NULL, NULL, NULL),
(5, 'Sécurité réseau', 'securite-reseau', NULL, NULL, NULL),
(6, 'Sécurité cloud', 'securite-cloud', NULL, NULL, NULL),
(7, 'Gestion des identités (IAM)', 'iam', NULL, NULL, 'uploads/home/img_6a18c579594966.62780375.jpg'),
(8, 'Maintenance & Support', 'maintenance-support', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `chatbot_conversation`
--

CREATE TABLE `chatbot_conversation` (
  `id` int NOT NULL,
  `session_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chatbot_conversation`
--


-- --------------------------------------------------------

--
-- Table structure for table `chatbot_message`
--

CREATE TABLE `chatbot_message` (
  `id` int NOT NULL,
  `sender` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `conversation_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chatbot_message`
--


-- --------------------------------------------------------

--
-- Table structure for table `contact_message`
--

CREATE TABLE `contact_message` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `admin_reply` longtext COLLATE utf8mb4_unicode_ci,
  `replied_at` datetime DEFAULT NULL,
  `reply_read_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_message`
--


-- --------------------------------------------------------

--
-- Table structure for table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20260430215103', '2026-04-30 21:51:38', 11),
('DoctrineMigrations\\Version20260430215640', '2026-04-30 21:56:43', 9),
('DoctrineMigrations\\Version20260430220226', '2026-04-30 22:02:28', 31),
('DoctrineMigrations\\Version20260430220806', '2026-04-30 22:08:34', 35),
('DoctrineMigrations\\Version20260430221151', '2026-04-30 22:12:06', 38),
('DoctrineMigrations\\Version20260430221417', '2026-04-30 22:14:19', 37),
('DoctrineMigrations\\Version20260430235656', '2026-05-01 00:01:40', 57),
('DoctrineMigrations\\Version20260430235804', '2026-05-01 00:02:48', 1),
('DoctrineMigrations\\Version20260501003751', '2026-05-01 00:37:52', 26),
('DoctrineMigrations\\Version20260501004143', '2026-05-01 00:41:51', 16),
('DoctrineMigrations\\Version20260501004348', '2026-05-01 00:43:59', 26),
('DoctrineMigrations\\Version20260501010344', '2026-05-01 01:03:45', 13),
('DoctrineMigrations\\Version20260513203834', '2026-05-13 20:38:40', 13),
('DoctrineMigrations\\Version20260513205623', '2026-05-13 20:56:24', 47),
('DoctrineMigrations\\Version20260513225539', '2026-05-13 22:55:40', 37),
('DoctrineMigrations\\Version20260513235509', '2026-05-13 23:57:39', 26),
('DoctrineMigrations\\Version20260513235758', '2026-05-13 23:57:59', 16),
('DoctrineMigrations\\Version20260514004725', '2026-05-14 00:47:26', 24),
('DoctrineMigrations\\Version20260514004758', '2026-05-14 00:47:58', 16),
('DoctrineMigrations\\Version20260514004903', '2026-05-14 00:49:03', 14),
('DoctrineMigrations\\Version20260514004923', '2026-05-14 00:49:24', 17),
('DoctrineMigrations\\Version20260514005133', '2026-05-14 00:51:33', 15),
('DoctrineMigrations\\Version20260514005233', '2026-05-14 00:52:33', 21),
('DoctrineMigrations\\Version20260520033543', '2026-05-20 03:35:47', 83),
('DoctrineMigrations\\Version20260523000219', '2026-05-23 00:02:22', 35),
('DoctrineMigrations\\Version20260523003531', '2026-05-23 00:35:31', 13),
('DoctrineMigrations\\Version20260523022207', '2026-05-23 02:22:24', 75),
('DoctrineMigrations\\Version20260523032021', '2026-05-23 03:20:21', 19),
('DoctrineMigrations\\Version20260526000001', '2026-05-26 02:21:57', 57),
('DoctrineMigrations\\Version20260526100000', '2026-05-26 03:39:49', 86),
('DoctrineMigrations\\Version20260526200000', '2026-05-26 11:08:05', 53),
('DoctrineMigrations\\Version20260526300000', '2026-05-26 11:26:47', 44),
('DoctrineMigrations\\Version20260526400000', '2026-05-26 11:37:33', 55),
('DoctrineMigrations\\Version20260526500000', '2026-05-26 11:56:03', 23),
('DoctrineMigrations\\Version20260526600000', '2026-05-26 17:15:37', 93),
('DoctrineMigrations\\Version20260526700000', '2026-05-26 17:15:37', 18),
('DoctrineMigrations\\Version20260526800000', '2026-05-26 17:15:37', 12);

-- --------------------------------------------------------

--
-- Table structure for table `fraud_check`
--

CREATE TABLE `fraud_check` (
  `id` int NOT NULL,
  `order_ref_id` int NOT NULL,
  `score` int NOT NULL DEFAULT '0',
  `level` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ok',
  `rules` json NOT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checked_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fraud_check`
--


-- --------------------------------------------------------

--
-- Table structure for table `home_carousel_slide`
--

CREATE TABLE `home_carousel_slide` (
  `id` int NOT NULL,
  `title` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_label` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_carousel_slide`
--

INSERT INTO `home_carousel_slide` (`id`, `title`, `subtitle`, `image_path`, `cta_label`, `cta_url`, `position`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Protection XDR unifiée', 'Détectez et répondez aux menaces avancées en temps réel.', 'uploads/home/img_6a197d6eb53030.00491135.png', 'Découvrir', '/services/3', 0, 1, NULL, '2026-05-29 12:21:28'),
(2, 'Zero Trust intégré', 'Vérification continue de chaque accès, chaque identité.', 'uploads/home/img_6a197dfdd2a2d0.91543128.png', 'Se connecter', '/profil', 1, 1, NULL, '2026-05-29 11:54:54'),
(3, 'Déployé en 48 heures', 'Opérationnel rapidement, sans refonte de votre infrastructure.', 'uploads/home/img_6a197f64f2cc76.34056964.png', 'Démarrer un POC gratuit', '/catalogue', 2, 1, NULL, '2026-05-29 12:01:35');

-- --------------------------------------------------------

--
-- Table structure for table `home_content`
--

CREATE TABLE `home_content` (
  `id` int NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_content`
--

INSERT INTO `home_content` (`id`, `slug`, `title`, `content`, `updated_at`) VALUES
(1, 'hero_intro', 'La cybersécurité de nouvelle génération', 'Cynasecure protège vos actifs critiques avec une plateforme XDR unifiée, conçue pour les entreprises qui ne peuvent pas se permettre d\'échouer.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int NOT NULL,
  `total` double NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  `billing_address` json DEFAULT NULL,
  `stripe_payment_intent_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paypal_order_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gateway` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guest_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `promo_code_id` int DEFAULT NULL,
  `discount` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--


-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` double NOT NULL,
  `order_ref_id` int NOT NULL,
  `service_id` int NOT NULL,
  `billing` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_item`
--


-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int NOT NULL,
  `amount` double NOT NULL,
  `cycle` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_payment_intent_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid_at` datetime NOT NULL,
  `subscription_id` int DEFAULT NULL,
  `gateway` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paypal_order_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last4` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_ref_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment`
--


-- --------------------------------------------------------

--
-- Table structure for table `promo_code`
--

CREATE TABLE `promo_code` (
  `id` int NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` double NOT NULL,
  `max_uses` int DEFAULT NULL,
  `used_count` int NOT NULL DEFAULT '0',
  `min_amount` double DEFAULT NULL,
  `valid_from` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `valid_until` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `applies_to` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'all',
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promo_code`
--

INSERT INTO `promo_code` (`id`, `code`, `type`, `value`, `max_uses`, `used_count`, `min_amount`, `valid_from`, `valid_until`, `is_active`, `applies_to`, `created_at`, `updated_at`) VALUES
(1, '5CF51CF7', 'percent', 10, 10, 2, 50, '2026-05-25 00:00:00', '2026-06-26 00:00:00', 1, 'all', '2026-05-26 21:11:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `promo_code_usage`
--

CREATE TABLE `promo_code_usage` (
  `id` int NOT NULL,
  `promo_code_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `order_ref_id` int DEFAULT NULL,
  `discount` double NOT NULL,
  `used_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promo_code_usage`
--


-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `price_monthly` double NOT NULL,
  `price_yearly` double DEFAULT NULL,
  `stripe_price_monthly` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_price_yearly` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `long_description` longtext COLLATE utf8mb4_unicode_ci,
  `features` json DEFAULT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `home_position` int DEFAULT NULL,
  `images` json DEFAULT NULL,
  `technical_specs` json DEFAULT NULL,
  `availability` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `trial_available` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `description`, `price_monthly`, `price_yearly`, `stripe_price_monthly`, `stripe_price_yearly`, `image`, `category_id`, `long_description`, `features`, `type`, `is_available`, `created_at`, `home_position`, `images`, `technical_specs`, `availability`, `trial_available`) VALUES
(1, 'Cyna SOC', 'SOC managé 24/7 — surveillance, détection', 299, 2990, NULL, NULL, 'soc.jpg', 1, 'Le Cyna SOC est un Centre d\'Opérations de Sécurité managé, opérationnel 24h/24, 7j/7, 365 jours par an. Notre équipe d\'analystes cybersécurité certifiés (CEH, GCIH, OSCP) surveille en continu votre infrastructure pour détecter, qualifier et neutraliser les menaces avant qu\'elles n\'impactent votre activité.', '[{\"label\": \"Surveillance 24/7/365 par analystes certifiés\", \"included\": true}, {\"label\": \"Détection et qualification des incidents en temps réel\", \"included\": true}, {\"label\": \"Threat Intelligence — 140+ flux mondiaux\", \"included\": true}, {\"label\": \"Red Team / Purple Team trimestriel\", \"included\": false}, {\"label\": \"Threat Hunting proactif mensuel\", \"included\": false}]', 'saas', 1, NULL, NULL, NULL, '[{\"label\": \"Endpoints\", \"value\": \"Illimité\"}, {\"label\": \"MTTD\", \"value\": \"< 14 secondes\"}]', 'unavailable', 1),
(2, 'Cyna EDR', 'Protection avancée des endpoints.', 149.99, 1499.99, NULL, NULL, 'edr.jpg', 2, 'Solution de protection des endpoints qui surveille en permanence les postes de travail et serveurs. Elle détecte les comportements suspects, bloque les attaques connues et inconnues, et permet une réponse rapide aux incidents directement sur les appareils compromis.', '[{\"label\": \"Protection antivirus nouvelle génération\", \"included\": true}, {\"label\": \"Détection comportementale des malwares\", \"included\": true}, {\"label\": \"Isolation automatique des postes infectés\", \"included\": true}, {\"label\": \"Rollback des fichiers chiffrés (anti‑ransomware)\", \"included\": true}, {\"label\": \"Tableau de bord centralisé\", \"included\": true}, {\"label\": \"Réponse managée par nos analystes\", \"included\": false}, {\"label\": \"Analyse forensique avancée\", \"included\": false}]', 'saas', 1, NULL, 1, NULL, NULL, 'available', 0),
(3, 'Cyna XDR', 'Détection et réponse étendue multi-sources.', 249.99, 2499.99, NULL, NULL, 'xdr.jpg', 3, 'Plateforme de détection et de réponse étendue qui corrèle les données provenant de multiples sources (réseau, endpoints, cloud, emails). Elle offre une visibilité globale des menaces et automatise la réponse pour une meilleure efficacité face aux attaques complexes.', '[{\"label\": \"Corrélation multi‑sources (SIEM + EDR + Cloud)\", \"included\": true}, {\"label\": \"Détection des attaques complexes (MITRE ATT&CK)\", \"included\": true}, {\"label\": \"Réponse automatisée aux incidents\", \"included\": true}, {\"label\": \"Protection réseau, endpoints et identités\", \"included\": true}, {\"label\": \"Threat Intelligence intégrée\", \"included\": true}, {\"label\": \"Chasse proactive aux menaces\", \"included\": true}, {\"label\": \"Forensique avancée\", \"included\": false}]', 'saas', 1, NULL, 2, NULL, NULL, 'available', 0),
(4, 'Sécurité réseau avancée', 'Protection complète du réseau.', 49.99, NULL, NULL, NULL, 'network.jpg', 5, 'Solution de protection complète du réseau d’entreprise, incluant filtrage du trafic, détection des intrusions et prévention des attaques. Elle sécurise les échanges internes et externes tout en garantissant la continuité et la performance du réseau.', '[{\"label\": \"Pare-feu nouvelle génération (NGFW)\", \"included\": true}, {\"label\": \"Détection d\'intrusion (IDS/IPS)\", \"included\": true}, {\"label\": \"Segmentation réseau avancée\", \"included\": true}, {\"label\": \"Protection contre les attaques DDoS\", \"included\": true}, {\"label\": \"Analyse du trafic en temps réel\", \"included\": true}, {\"label\": \"VPN sécurisé pour télétravail\", \"included\": false}, {\"label\": \"Inspection TLS/SSL\", \"included\": false}]', 'one_shot', 1, NULL, NULL, NULL, NULL, 'available', 0),
(5, 'Sécurité cloud Cyna', 'Sécurisation des environnements cloud.', 59.99, NULL, NULL, NULL, 'cloud.jpg', 6, 'Service dédié à la sécurisation des environnements cloud publics et privés. Il assure la conformité, détecte les mauvaises configurations, protège les workloads et renforce la posture de sécurité globale des infrastructures cloud.', '[{\"label\": \"Analyse de configuration Cloud (CSPM)\", \"included\": true}, {\"label\": \"Détection des menaces Cloud\", \"included\": true}, {\"label\": \"Protection des workloads (CWPP)\", \"included\": true}, {\"label\": \"Surveillance des accès privilégiés\", \"included\": true}, {\"label\": \"Conformité RGPD / ISO 27001\", \"included\": true}, {\"label\": \"Protection Kubernetes\", \"included\": false}, {\"label\": \"Audit complet multi‑cloud\", \"included\": false}]', 'one_shot', 1, NULL, NULL, NULL, NULL, 'available', 0),
(6, 'Protection des données Pro', 'Sécurisation et sauvegarde des données.', 39.99, NULL, NULL, NULL, 'data.jpg', 4, 'Solution de sécurisation et de sauvegarde des données critiques. Elle protège contre la perte de données, les ransomwares et les erreurs humaines grâce à des mécanismes de backup automatisés et de restauration rapide.', '[{\"label\": \"Sauvegarde automatique quotidienne\", \"included\": true}, {\"label\": \"Chiffrement des données au repos\", \"included\": true}, {\"label\": \"Restauration rapide en 1 clic\", \"included\": true}, {\"label\": \"Protection anti‑ransomware\", \"included\": true}, {\"label\": \"Rétention longue durée\", \"included\": true}, {\"label\": \"Sauvegarde hors‑site\", \"included\": false}, {\"label\": \"Plan de reprise après sinistre (DRP)\", \"included\": false}]', 'one_shot', 1, NULL, NULL, NULL, NULL, 'available', 0),
(7, 'IAM – Gestion des identités', 'Gestion centralisée des identités.', 29.99, NULL, NULL, NULL, 'iam.jpg', 7, 'Système de gestion centralisée des identités et des accès. Il contrôle les authentifications, applique des politiques de sécurité strictes et garantit que chaque utilisateur dispose uniquement des droits nécessaires à ses fonctions.', '[{\"label\": \"Gestion centralisée des identités\", \"included\": true}, {\"label\": \"Authentification multi‑facteurs (MFA)\", \"included\": true}, {\"label\": \"Single Sign‑On (SSO)\", \"included\": true}, {\"label\": \"Gestion des rôles et permissions\", \"included\": true}, {\"label\": \"Audit des accès sensibles\", \"included\": true}, {\"label\": \"Zero‑Trust Access\", \"included\": false}, {\"label\": \"Provisioning automatique\", \"included\": false}]', 'one_shot', 1, NULL, NULL, NULL, NULL, 'available', 0),
(30, 'Support & Maintenance ', 'Support technique 24/7.', 19.99, NULL, NULL, NULL, 'support.jpg', 8, 'Service d’assistance technique disponible 24/7 offrant un accompagnement prioritaire. Il inclut la résolution rapide des incidents, la maintenance proactive des systèmes et un suivi personnalisé pour assurer une disponibilité maximale des services.', '[{\"label\": \"Sauvegarde automatique quotidienne\", \"included\": true}, {\"label\": \"Chiffrement AES-256\", \"included\": true}, {\"label\": \"Restauration en un clic\", \"included\": true}, {\"label\": \"Stockage illimité\", \"included\": false}, {\"label\": \"Support prioritaire 24/7\", \"included\": true}]', 'one_shot', 1, NULL, 0, NULL, NULL, 'available', 0);

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` int NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `cycle` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `next_billing_at` datetime DEFAULT NULL,
  `stripe_subscription_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_payment_id` int DEFAULT NULL,
  `auto_renew` tinyint(1) NOT NULL DEFAULT '1',
  `last_renewal_attempt` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `renewal_failure_count` int NOT NULL DEFAULT '0',
  `payment_method_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription`
--


-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reset_token` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_token_expires_at` datetime DEFAULT NULL,
  `stripe_customer_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pending_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pending_email_token` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pending_email_expires_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `email_verified_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `email_verification_token` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verification_expires_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `totp_secret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totp_enabled` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--


--

-- --------------------------------------------------------
--
-- Demo accounts for evaluation (passwords below)
--   admin@demo.local  / Admin1234!  (ROLE_ADMIN)
--   user@demo.local   / Demo1234!   (ROLE_USER)
--
INSERT INTO `user` (`id`, `email`, `password`, `display_name`, `company`, `phone`, `created_at`, `updated_at`, `role`, `reset_token`, `reset_token_expires_at`, `stripe_customer_id`, `pending_email`, `pending_email_token`, `pending_email_expires_at`, `email_verified_at`, `email_verification_token`, `email_verification_expires_at`, `totp_secret`, `totp_enabled`) VALUES
(1, 'admin@demo.local', '$argon2id$v=19$m=65536,t=4,p=1$Lk1yMVFlRFhvaEc5U0JaNA$rwVluKySwhDTQWPi8QFRbvbNOlcLvaV6mHmb6I/ZtGk', 'Admin Demo', 'CynaSecure', NULL, '2026-01-01 00:00:00', '2026-01-01 00:00:00', 'ROLE_ADMIN', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-01 00:00:00', NULL, NULL, NULL, 0),
(2, 'user@demo.local',  '$argon2id$v=19$m=65536,t=4,p=1$bmU4bnlFSTJESzBYMVBKVQ$9kJSl8Fo8YrzeLwZYT7sN25Mg8XewbS22d5giK63djQ', 'Demo Client', NULL, NULL, '2026-01-01 00:00:00', '2026-01-01 00:00:00', 'ROLE_USER',  NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-01 00:00:00', NULL, NULL, NULL, 0);


-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D4E6F81A76ED395` (`user_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chatbot_conversation`
--
ALTER TABLE `chatbot_conversation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_764526E8613FECDF` (`session_id`);

--
-- Indexes for table `chatbot_message`
--
ALTER TABLE `chatbot_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_EDF1E8849AC0396` (`conversation_id`);

--
-- Indexes for table `contact_message`
--
ALTER TABLE `contact_message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `fraud_check`
--
ALTER TABLE `fraud_check`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_FRAUD_ORDER` (`order_ref_id`);

--
-- Indexes for table `home_carousel_slide`
--
ALTER TABLE `home_carousel_slide`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_content`
--
ALTER TABLE `home_content`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_HOME_CONTENT_SLUG` (`slug`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_F5299398A76ED395` (`user_id`),
  ADD KEY `FK_ORDER_PROMO` (`promo_code_id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_52EA1F09E238517C` (`order_ref_id`),
  ADD KEY `IDX_52EA1F09ED5CA9E6` (`service_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_6D28840D9A1887DC` (`subscription_id`),
  ADD KEY `IDX_6D28840DE238517C` (`order_ref_id`);

--
-- Indexes for table `promo_code`
--
ALTER TABLE `promo_code`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_CODE` (`code`);

--
-- Indexes for table `promo_code_usage`
--
ALTER TABLE `promo_code_usage`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_USAGE_ORDER` (`order_ref_id`),
  ADD KEY `IDX_USAGE_PROMO` (`promo_code_id`),
  ADD KEY `IDX_USAGE_USER` (`user_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_E19D9AD212469DE2` (`category_id`),
  ADD KEY `idx_service_name` (`name`),
  ADD KEY `idx_service_price` (`price_monthly`),
  ADD KEY `idx_service_available` (`is_available`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_A3C664D3A76ED395` (`user_id`),
  ADD KEY `IDX_A3C664D3ED5CA9E6` (`service_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `chatbot_conversation`
--
ALTER TABLE `chatbot_conversation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `chatbot_message`
--
ALTER TABLE `chatbot_message`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `contact_message`
--
ALTER TABLE `contact_message`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `fraud_check`
--
ALTER TABLE `fraud_check`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `home_carousel_slide`
--
ALTER TABLE `home_carousel_slide`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `home_content`
--
ALTER TABLE `home_content`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `promo_code`
--
ALTER TABLE `promo_code`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `promo_code_usage`
--
ALTER TABLE `promo_code_usage`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FK_D4E6F81A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `chatbot_message`
--
ALTER TABLE `chatbot_message`
  ADD CONSTRAINT `FK_EDF1E8849AC0396` FOREIGN KEY (`conversation_id`) REFERENCES `chatbot_conversation` (`id`);

--
-- Constraints for table `fraud_check`
--
ALTER TABLE `fraud_check`
  ADD CONSTRAINT `FK_FRAUD_ORDER` FOREIGN KEY (`order_ref_id`) REFERENCES `order` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_F5299398A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_ORDER_PROMO` FOREIGN KEY (`promo_code_id`) REFERENCES `promo_code` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `FK_52EA1F09E238517C` FOREIGN KEY (`order_ref_id`) REFERENCES `order` (`id`),
  ADD CONSTRAINT `FK_52EA1F09ED5CA9E6` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `FK_6D28840D9A1887DC` FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`id`),
  ADD CONSTRAINT `FK_6D28840DE238517C` FOREIGN KEY (`order_ref_id`) REFERENCES `order` (`id`);

--
-- Constraints for table `promo_code_usage`
--
ALTER TABLE `promo_code_usage`
  ADD CONSTRAINT `FK_USAGE_ORDER` FOREIGN KEY (`order_ref_id`) REFERENCES `order` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_USAGE_PROMO` FOREIGN KEY (`promo_code_id`) REFERENCES `promo_code` (`id`),
  ADD CONSTRAINT `FK_USAGE_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `FK_E19D9AD212469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `subscription`
--
ALTER TABLE `subscription`
  ADD CONSTRAINT `FK_A3C664D3A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_A3C664D3ED5CA9E6` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
