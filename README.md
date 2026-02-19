# 🏥 Medical Report Extraction - Frontend

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

Application web moderne pour l'extraction automatique d'informations médicales à partir de rapports PDF non structurés.

[Fonctionnalités](#-fonctionnalités) •
[Installation](#-installation) •
[Utilisation](#-utilisation) •
[Architecture](#-architecture) •
[Technologies](#-technologies)

</div>

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [Architecture](#-architecture)
- [Technologies utilisées](#-technologies-utilisées)
- [Scripts disponibles](#-scripts-disponibles)
- [Variables d'environnement](#-variables-denvironnement)
- [Contribution](#-contribution)
- [Licence](#-licence)

---

## 🎯 À propos

Cette application web permet d'extraire automatiquement des informations médicales structurées à partir de rapports médicaux au format PDF. Elle transforme des documents non structurés en données JSON exploitables, facilitant ainsi :

- ✅ Le traitement automatisé des données médicales
- ✅ L'archivage organisé des informations cliniques
- ✅ L'interopérabilité avec d'autres systèmes de santé
- ✅ L'analyse et l'exploitation des données médicales

### Informations extraites

Le système extrait les informations suivantes :
- **Informations patient** : nom, prénom, âge, date de naissance, etc.
- **Dates médicales** : consultations, examens, interventions
- **Diagnostic** : pathologies identifiées
- **Prescriptions** : médicaments, posologie, durée
- **Observations cliniques** : symptômes, examens, résultats

---

## ✨ Fonctionnalités

### 🔐 Authentification
- Inscription et connexion sécurisée
- Gestion des sessions avec JWT
- Protection des routes
- Avatar utilisateur personnalisé

### 📄 Traitement de documents
- Upload de fichiers PDF par glisser-déposer
- Extraction automatique du texte
- Visualisation du PDF intégré
- Affichage du texte brut extrait

### 🎨 Interface utilisateur
- Design moderne et responsive
- Animations fluides avec Framer Motion
- Composants UI accessibles (Shadcn UI)
- Mode sombre/clair
- Recherche globale avec raccourcis clavier

### 📊 Visualisation des données
- Affichage du JSON structuré
- Coloration syntaxique
- Historique des rapports traités
- Navigation intuitive

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **Git**

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/pfa-frontend.git
cd pfa-frontend
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# API Backend URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 4. Lancer le serveur de développement

```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

---

## 💡 Utilisation

### 1. Créer un compte

1. Accédez à la page d'inscription : `/register`
2. Remplissez le formulaire avec vos informations
3. Validez votre inscription

### 2. Se connecter

1. Accédez à la page de connexion : `/login`
2. Entrez vos identifiants
3. Vous serez redirigé vers le tableau de bord

### 3. Analyser un rapport médical

1. Cliquez sur **"Nouveau rapport"** ou accédez à `/parser/new`
2. Glissez-déposez votre fichier PDF ou cliquez pour sélectionner
3. Attendez l'extraction et l'analyse
4. Consultez les résultats structurés en JSON

### 4. Consulter l'historique

1. Accédez à la page **"Rapports"** : `/parser`
2. Parcourez vos rapports analysés
3. Cliquez sur un rapport pour voir les détails

---

## 📁 Structure du projet

```
pfa/
├── public/                      # Fichiers statiques
│   └── *.svg                   # Logos et icônes
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── (auth)/            # Groupe d'authentification
│   │   │   ├── login/         # Page de connexion
│   │   │   └── register/      # Page d'inscription
│   │   ├── (landing)/         # Page d'accueil
│   │   ├── (platform)/        # Application principale
│   │   │   └── parser/        # Gestion des rapports
│   │   └── layout.tsx         # Layout racine
│   ├── components/            # Composants React
│   │   ├── auth/             # Composants d'authentification
│   │   ├── home/             # Composants page d'accueil
│   │   ├── parser/           # Composants analyse PDF
│   │   ├── platform/         # Composants plateforme
│   │   ├── shared/           # Composants partagés
│   │   ├── ui/               # Composants UI (Shadcn)
│   │   └── kibo-ui/          # Composants UI custom
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilitaires et helpers
│   │   ├── axios.ts          # Configuration Axios
│   │   ├── utils.ts          # Fonctions utilitaires
│   │   └── fonts.ts          # Configuration des polices
│   ├── providers/            # Context providers
│   │   ├── auth-provider.tsx
│   │   ├── query-client.tsx
│   │   └── theme-provider.tsx
│   ├── schema/               # Schémas de validation (Zod)
│   ├── store/                # State management (Zustand)
│   └── types/                # Types TypeScript
├── .gitignore
├── Dockerfile                # Configuration Docker
├── docker-compose.yml        # Orchestration Docker
├── next.config.ts            # Configuration Next.js
├── package.json              # Dépendances npm
├── tailwind.config.ts        # Configuration Tailwind
└── tsconfig.json             # Configuration TypeScript
```

---

## 🏗️ Architecture

### Architecture client-serveur

```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────┐
│   Backend       │
│   (FastAPI)     │
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌────────┐ ┌──────┐
│MongoDB │ │ LLM  │
└────────┘ └──────┘
```

### Flux de données

1. **Upload** : L'utilisateur télécharge un PDF via le frontend
2. **Transmission** : Le fichier est envoyé au backend via FormData
3. **Extraction** : Le backend extrait le texte avec PyPDF2
4. **Analyse** : Le LLM analyse le texte et structure les données
5. **Stockage** : Les données sont sauvegardées dans MongoDB
6. **Affichage** : Le frontend reçoit et affiche le JSON structuré

---

## 🛠️ Technologies utilisées

### Framework et bibliothèques principales

| Technologie | Version | Description |
|------------|---------|-------------|
| **Next.js** | 16.x | Framework React avec SSR et App Router |
| **React** | 19.x | Bibliothèque UI |
| **TypeScript** | 5.x | Typage statique |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |

### UI et animations

| Technologie | Description |
|------------|-------------|
| **Shadcn UI** | Composants UI accessibles et personnalisables |
| **Framer Motion** | Animations fluides et interactions |
| **Lucide React** | Icônes modernes |

### Gestion des données

| Technologie | Description |
|------------|-------------|
| **React Query** | Cache et synchronisation des données API |
| **Zustand** | State management léger |
| **Axios** | Client HTTP |
| **Zod** | Validation de schémas |

### Développement

| Outil | Description |
|-------|-------------|
| **ESLint** | Linter JavaScript/TypeScript |
| **Prettier** | Formatage du code |
| **Docker** | Containerisation |

---

## 📜 Scripts disponibles

```bash
# Développement
npm run dev          # Lancer le serveur de développement

# Production
npm run build        # Construire l'application
npm run start        # Lancer en mode production

# Qualité du code
npm run lint         # Vérifier le code avec ESLint
npm run format       # Formater le code avec Prettier

# Docker
docker-compose up    # Lancer avec Docker
```

---

## 🔧 Variables d'environnement

Créez un fichier `.env.local` :

```env
# ===== API Configuration =====
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# ===== Application Configuration =====
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Medical Report Extraction"

# ===== Optional: Analytics =====
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🎨 Personnalisation

### Thème

Modifiez les couleurs dans `globals.css` :

```css
:root {
  --background: #e8ebed;
  --foreground: #333333;
  --card: #ffffff;
  --card-foreground: #333333;
  --popover: #ffffff;
  --popover-foreground: #333333;
  --primary: #e05d38;
  --primary-foreground: #ffffff;
  --secondary: #f3f4f6;
  --secondary-foreground: #4b5563;
  --muted: #f9fafb;
  --muted-foreground: #6b7280;
  --accent: #aacdeb;
  --accent-foreground: #1e3a8a;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #3d4354;
  --input: #f4f5f7;
  --ring: #e05d38;
  --chart-1: #86a7c8;
  --chart-2: #eea591;
  --chart-3: #5a7ca6;
  --chart-4: #466494;
  --chart-5: #334c82;
  --sidebar: #dddfe2;
  --sidebar-foreground: #333333;
  --sidebar-primary: #e05d38;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #d6e4f0;
  --sidebar-accent-foreground: #1e3a8a;
  --sidebar-border: #e5e7eb;
  --sidebar-ring: #e05d38;
  --font-sans: Inter, sans-serif;
  --font-serif: Source Serif 4, serif;
  --font-mono: JetBrains Mono, monospace;
  --radius: 0.75rem;
  --shadow-x: 0px;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: hsl(0 0% 0%);
  --shadow-2xs: 0px 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0px 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0px 1px 3px 0px hsl(0 0% 0% / 0.1),
    0px 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow: 0px 1px 3px 0px hsl(0 0% 0% / 0.1),
    0px 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow-md: 0px 1px 3px 0px hsl(0 0% 0% / 0.1),
    0px 2px 4px -1px hsl(0 0% 0% / 0.1);
  --shadow-lg: 0px 1px 3px 0px hsl(0 0% 0% / 0.1),
    0px 4px 6px -1px hsl(0 0% 0% / 0.1);
  --shadow-xl: 0px 1px 3px 0px hsl(0 0% 0% / 0.1),
    0px 8px 10px -1px hsl(0 0% 0% / 0.1);
  --shadow-2xl: 0px 1px 3px 0px hsl(0 0% 0% / 0.25);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: #1c2433;
  --foreground: #e5e5e5;
  --card: #2a3040;
  --card-foreground: #e5e5e5;
  --popover: #262b38;
  --popover-foreground: #e5e5e5;
  --primary: #e05d38;
  --primary-foreground: #ffffff;
  --secondary: #2a303e;
  --secondary-foreground: #e5e5e5;
  --muted: #2a303e;
  --muted-foreground: #a3a3a3;
  --accent: #2a3656;
  --accent-foreground: #bfdbfe;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #3d4354;
  --input: #3d4354;
  --ring: #e05d38;
  --chart-1: #86a7c8;
  --chart-2: #e6a08f;
  --chart-3: #5a7ca6;
  --chart-4: #466494;
  --chart-5: #334c82;
  --sidebar: #2a303f;
  --sidebar-foreground: #e5e5e5;
  --sidebar-primary: #e05d38;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #2a3656;
  --sidebar-accent-foreground: #bfdbfe;
  --sidebar-border: #3d4354;
  --sidebar-ring: #e05d38;
  --font-sans: Inter, sans-serif;
  --font-serif: Source Serif 4, serif;
  --font-mono: JetBrains Mono, monospace;
  --radius: 0.75rem;
  --shadow-x: 0px;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: hsl(0 0% 0%);
  --shadow-2xs: 0px 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0px 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0px 1px 3px 0px hsl(0 0% 0% / 0.1),
    0px 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow: 0px 1px 3px 0px hsl(0 0% 0% / 0.1),
    0px 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow-md: 0px 1px 3px 0px hsl(0 0% 0% / 0.1),
    0px 2px 4px -1px hsl(0 0% 0% / 0.1);
  --shadow-lg: 0px 1px 3px 0px hsl(0 0% 0% / 0.1),
    0px 4px 6px -1px hsl(0 0% 0% / 0.1);
  --shadow-xl: 0px 1px 3px 0px hsl(0 0% 0% / 0.1),
    0px 8px 10px -1px hsl(0 0% 0% / 0.1);
  --shadow-2xl: 0px 1px 3px 0px hsl(0 0% 0% / 0.25);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}

```

### Polices

Ajoutez vos polices dans `src/lib/fonts.ts` :

```typescript
import { Inter, Roboto } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })
```

---

## 🐳 Docker

### Construire l'image

```bash
docker build -t pfa-frontend .
```

### Lancer avec Docker Compose

```bash
docker-compose up -d
```

L'application sera accessible sur le port configuré (par défaut 3000).

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment procéder :

1. **Fork** le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add: Amazing Feature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une **Pull Request**

### Convention de commits

Utilisez les préfixes suivants :

- `Add:` Nouvelle fonctionnalité
- `Fix:` Correction de bug
- `Update:` Mise à jour de code
- `Refactor:` Refactorisation
- `Docs:` Documentation
- `Style:` Formatage

---

## 👥 Auteurs

**Réalisé par :**
- Ziane Badreddine
- Ezzahhany Yassine

**Année Universitaire :** 2025-2026

**Institution :** Faculté des Sciences et Techniques - Settat

---

## 📄 Licence

Ce projet est développé dans le cadre d'un projet de fin d'année universitaire.

---

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [Shadcn UI](https://ui.shadcn.com/) - Composants UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Query](https://tanstack.com/query) - Gestion des données

---

## 📞 Support

Pour toute question ou problème :

- 📧 Email : zianebadredddine2004@gmail.com
- 🐛 Issues : [GitHub Issues](https://github.com/Ziane-Badreddine/Medical-Report-Extraction---Frontend)

---

<div align="center">

**Fait avec ❤️ par l'équipe PFA**

[⬆ Retour en haut](#-medical-report-extraction---frontend)

</div>
