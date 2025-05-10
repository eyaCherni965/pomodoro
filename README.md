# Pomodoro Intelligent — App React

Une application web simple et efficace de **gestion du temps** basée sur la méthode Pomodoro. Développée avec React, elle permet de personnaliser les sessions, visualiser ses progrès, et rester motivé pendant l’étude ou le travail.

---

## Démo en ligne

👉 [Utiliser l'application] : https://pomodoro-tau-beige.vercel.app/

---

## 🧩 Fonctionnalités

- **Timer Pomodoro personnalisé** (durée modifiable)
- **Pause personnalisable**
- **Notifications à la fin des pauses**
- **Statistiques hebdomadaires** avec graphique interactif
- **Interface responsive et moderne**
- **Sauvegarde locale** (sessions conservées même si on quitte la page)

---

## 🖼️ Aperçu de l'app

<img width="958" alt="Image" src="https://github.com/user-attachments/assets/1d7be3d5-01bc-4843-a79b-6cfed6fdb78f" />

---

## 🛠️ Technologies

- React
- React Router
- Tailwind CSS
- Recharts (pour les stats)
- localStorage (persistance des données)
- Vercel (déploiement)

  
## 📁 Structure du code 
le code principal de l'application se trouve dans le dossier composants. Voici les fichiers clés :

Timer.js : le composant principal qui gère le compte à rebours Pomodoro.

Pause.js : gère la minuterie de pause avec une phrase motivante.

Statistiques.js : affiche les statistiques hebdomadaires sous forme de graphique.

Parametre.js : permet de modifier la durée du Pomodoro, de la pause, et d’activer les notifications.

Le fichier App.js utilise react-router-dom pour afficher la bonne page selon l'URL (/, /pause, /stats, /parametre).

## 📁 Structure des pages

| Page        | Description |
|-------------|-------------|
| `/`         | Page principale avec le timer |
| `/pause`    | Timer de pause et phrase de motivation |
| `/stats`    | Statistiques de productivité hebdomadaire |
| `/parametre`| Réglages : durée des sessions et notifications |

---

## 📦 Installation locale (facultatif)

```bash
git clone https://github.com/eyaCherni965/pomodoro.git
cd pomodoro
npm install
npm start

