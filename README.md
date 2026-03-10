# JINEN - Gestion de Garderie

Application web de gestion de garderies développée avec **Angular 19** et un backend **Spring Boot 3.2** (Java 17, MongoDB).

## 🏗️ Architecture

- **Frontend**: Angular 19 (TypeScript, SCSS)
- **Backend**: Spring Boot 3.2 / Java 17 (API REST)
- **Base de données**: MongoDB
- **Conteneurisation**: Docker Compose

## 🚀 Démarrage rapide

### Prérequis
- Java 17+ (ou Docker)
- Node.js 18+ (pour le frontend Angular)
- Docker & Docker Compose (recommandé)

### 1. Base de données et backend avec Docker

```bash
# Démarrer MongoDB et le backend Spring Boot
docker-compose up -d
```

### 2. Backend en local (sans Docker)

```bash
cd backend-spring
chmod +x mvnw
./mvnw spring-boot:run
# Le backend est accessible sur http://localhost:3000
```

> Par défaut, le backend se connecte à MongoDB sur `mongodb://localhost:27017/nursery_db`.
> Configurez la variable d'environnement `MONGODB_URI` pour utiliser MongoDB Atlas ou un autre serveur.

### 3. Frontend Angular

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start
# L'application est accessible sur http://localhost:4200
```

### 4. Build de production

```bash
npm run build
# Les fichiers sont générés dans dist/jinen-app/
```

## 📱 Fonctionnalités

### Espace Parent
- **Tableau de bord** — Vue d'ensemble des garderies inscrites, programme du jour, avis récents
- **Recherche de garderies** — Recherche avec filtres (ville, prix, note, places)
- **Détails de garderie** — Informations complètes, avis, équipements, activités
- **Inscription** — Formulaire multi-étapes pour inscrire un enfant
- **Gestion des enfants** — Profils des enfants
- **Inscriptions** — Suivi de l'état des inscriptions
- **Paiements** — Paiement en ligne et historique
- **Avis** — Évaluation et commentaires sur les garderies
- **Messages** — Communication en temps réel avec les garderies
- **Notifications** — Alertes sur les inscriptions, messages, etc.

### Espace Propriétaire de Garderie
- **Tableau de bord** — Statistiques, inscriptions en attente, programme du jour
- **Création de garderie** — Formulaire de création avec toutes les informations
- **Gestion des inscriptions** — Accepter/refuser les demandes d'inscription
- **Liste des enfants** — Enfants inscrits dans la garderie
- **Programme quotidien** — Gestion du programme d'activités
- **Performance** — Avis et note moyenne avec distribution
- **Statistiques** — Vue d'ensemble détaillée (inscrits, revenus, distribution par âge)
- **Suivi financier** — Revenus, paiements, tableau de bord financier
- **Paramètres** — Gestion du profil et de la garderie
- **Messages** — Communication avec les parents
- **Notifications** — Alertes sur les événements

## 🛠️ Structure du projet

```
├── src/                          # Code source Angular (Frontend)
│   ├── app/
│   │   ├── components/           # Composants de l'application
│   │   │   ├── auth/             # Connexion / Inscription
│   │   │   ├── welcome/          # Page d'accueil
│   │   │   ├── parent-dashboard/ # Tableau de bord parent
│   │   │   ├── nursery-dashboard/# Tableau de bord garderie
│   │   │   ├── nursery-search/   # Recherche de garderies
│   │   │   ├── nursery-details/  # Détails d'une garderie
│   │   │   ├── enrollment/       # Inscription d'un enfant
│   │   │   ├── chat-list/        # Liste des conversations
│   │   │   ├── chat/             # Conversation
│   │   │   ├── notifications/    # Notifications
│   │   │   └── ...               # Autres composants
│   │   ├── models/               # Modèles TypeScript
│   │   ├── services/             # Services Angular (API)
│   │   ├── shared/               # Composants partagés (sidebar)
│   │   └── guards/               # Guards de navigation
│   ├── styles.scss               # Styles globaux
│   └── index.html                # Page HTML principale
├── backend-spring/               # Backend Spring Boot (Java 17)
│   ├── src/main/java/com/nursery/
│   │   ├── controller/           # Contrôleurs REST
│   │   ├── service/              # Logique métier
│   │   ├── repository/           # Accès aux données (MongoDB)
│   │   ├── model/                # Entités MongoDB
│   │   └── config/               # Configuration (CORS, etc.)
│   ├── src/main/resources/
│   │   └── application.properties # Configuration de l'application
│   └── pom.xml                   # Dépendances Maven
├── docker-compose.yml            # Orchestration Docker (MongoDB + Backend)
├── angular.json                  # Configuration Angular
├── package.json                  # Dépendances NPM (Frontend)
└── tsconfig.json                 # Configuration TypeScript
```

## 🎨 Thème

L'application utilise un thème vert/turquoise avec les couleurs principales:
- Vert émeraude: `#059669`
- Bleu cyan: `#0891b2`
- Vert foncé: `#064e3b`

## 📡 API Backend

Le backend expose les endpoints suivants:
- `POST /api/auth/register` — Inscription
- `POST /api/auth/login` — Connexion
- `GET/POST /api/nurseries` — Gestion des garderies
- `GET/POST /api/enrollments` — Gestion des inscriptions
- `GET/POST /api/conversations` — Messagerie
- `GET /api/notifications` — Notifications
- `GET/POST /api/payments` — Paiements
- `GET/POST /api/reviews` — Avis
- `GET /api/parents` — Données parent
- `GET/PUT /api/users` — Gestion des utilisateurs
