# Documentation du projet "Cartes des Talents"

## Présentation

Ce projet est une application web permettant de cartographier, rechercher et valoriser les talents, compétences, passions et projets des utilisateurs d'une organisation. Il se compose d’un backend Node.js/Express avec une base de données PostgreSQL, et d’un frontend React (Vite) servi via Nginx.

---

## Architecture

- **Frontend** : React (Vite), situé dans `client/my-react-app`
- **Backend** : Node.js/Express, situé dans `server`
- **Base de données** : PostgreSQL, conteneurisé via Docker
- **Orchestration** : Docker Compose

---

## Fonctionnalités principales

### Utilisateurs
- Inscription, connexion, récupération du profil
- Stockage des compétences, langues, passions, projets

### Talents
- Ajout, validation et visualisation des talents
- Génération d’un nuage de compétences

### Projets
- Ajout et visualisation de projets

### Recherche & Collaborateurs
- Recherche multi-critères (compétence, langue, passion, projet, nom)
- Recherche de collaborateurs selon des filtres

---

## Structure des dossiers

```
cartes-des-talents/
│
├── client/
│   ├── my-react-app/      # Application React
│   ├── Dockerfile         # Build et déploiement du frontend
│   └── nginx.conf         # Configuration Nginx pour React Router
│
├── server/
│   ├── Models/            # Modèles Sequelize (User, Talent, Projet)
│   ├── controllers/       # Logique métier (user, talent, projet, search, collaborator)
│   ├── routes/            # Définition des routes Express
│   ├── db.js              # Connexion à la base PostgreSQL
│   ├── index.js           # Point d’entrée du serveur Express
│   └── Dockerfile         # Build et déploiement du backend
│
├── docker-compose.yml     # Orchestration des services
└── README.md              # (À compléter)
```

---

## Lancement du projet

1. **Prérequis** : Docker et Docker Compose installés.
2. **Démarrage** :
	```sh
	docker-compose up --build
	```
	- Frontend accessible sur [http://localhost:3000](http://localhost:3000)
	- Backend API sur [http://localhost:5000/api](http://localhost:5000/api)
	- Base de données PostgreSQL sur le port 5432

---

## Variables d’environnement (backend)

À définir dans un fichier `.env` dans `server/` :
```
DB_NAME=carte_talents
DB_USER=postgres
DB_PASSWORD=12344321
DB_HOST=db
DB_PORT=5432
JWT_SECRET=une_chaine_secrete
```

---

## API principales

- `POST /api/users/register` : Inscription
- `POST /api/users/login` : Connexion
- `GET /api/users/me` : Profil utilisateur (token requis)
- `GET /api/talents` : Liste des talents
- `POST /api/talents` : Ajouter un talent
- `PATCH /api/talents/:id/verify` : Valider un talent
- `GET /api/talents/map` : Nuage de compétences
- `GET /api/projets` : Liste des projets
- `POST /api/projets` : Ajouter un projet
- `GET /api/search` : Recherche multi-critères
- `GET /api/collaborators` : Recherche de collaborateurs

---

## Frontend

- Application React avec gestion d’état, formulaires d’inscription/connexion, affichage des talents, projets, nuage de compétences, recherche, etc.
- Communication avec l’API via Axios (`src/api.js`).

---

## Déploiement

- Le frontend est buildé puis servi par Nginx.
- Le backend Node.js écoute sur le port 5000.
- La base PostgreSQL est persistée via un volume Docker.

---

## Pour aller plus loin

- Ajouter des tests unitaires et d’intégration
- Sécuriser les routes sensibles (authentification JWT)
- Ajouter la gestion des rôles (admin, utilisateur)
- Améliorer l’UI/UX


