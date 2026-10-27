# BabiBoost Digital — site vitrine

Site statique en français, responsive, prêt à être prévisualisé et à publier après vérification des coordonnées et des informations de l'entreprise.

## Fichiers
- `index.html` : sections Accueil, Services, Tarifs, À propos, Méthode, Démonstrations, FAQ et Contact.
- `styles.css` : identité visuelle responsive, effets et calques de fond.
- `script.js` : navigation mobile, contrôle vidéo, boutons WhatsApp, préremplissage du formulaire et liens e-mail.
- `assets/logo-babiboost.png` : logo extrait de l'image fournie.
- `assets/babiboost-background.mp4` : version optimisée de la vidéo fournie, muette, d'environ 10 secondes.
- `assets/background-poster.jpg` : image fixe de secours extraite de la vidéo.
- `assets/favicon.svg` : icône de l'onglet.

## Prévisualiser
Ouvrir `index.html` dans un navigateur moderne. Pour un test local plus fidèle, ouvrir un terminal dans ce dossier et lancer `python -m http.server 8000`, puis visiter `http://localhost:8000`.

## Fond vidéo global
La vidéo est placée une seule fois dans `.ambient`, un calque `position: fixed` qui couvre la fenêtre et se trouve derrière le contenu. Le voile `.ambient-shade` assure le contraste. La vidéo est muette, en boucle et sans interception des clics. Le bouton en bas à gauche permet de mettre en pause ou de relancer l'animation. `prefers-reduced-motion` et le mode économie de données affichent l'image fixe tant que l'utilisateur ne demande pas explicitement de relancer la vidéo.

### Remplacer la vidéo
1. Préparer un fichier MP4 H.264, sans piste audio, court (idéalement 6 à 15 secondes), en boucle fluide, optimisé pour le web.
2. Remplacer `assets/babiboost-background.mp4` en conservant exactement ce nom, ou modifier le chemin du `<source>` dans `index.html`.
3. Remplacer `assets/background-poster.jpg` par une image de secours correspondante et légère.
4. Tester le cadrage sur mobile et ordinateur, ainsi que le contraste du texte.

Pour optimiser une vidéo avec FFmpeg :
```bash
ffmpeg -i video-source.mp4 -an -vf "scale='min(1280,iw)':-2,fps=24" -c:v libx264 -preset medium -crf 28 -pix_fmt yuv420p -movflags +faststart -t 12 assets/babiboost-background.mp4
```

## Contacts et formulaire
Les deux numéros WhatsApp et l'e-mail fournis sont intégrés. Le formulaire n'envoie pas silencieusement les données à un serveur : il construit un message que l'utilisateur peut ouvrir dans WhatsApp ou son application e-mail et vérifier avant envoi. Aucun service backend ni formulaire externe n'est configuré.

## Publier avec Netlify
1. Connectez-vous à Netlify.
2. Glissez-déposez le dossier `BabiBoost-Digital` (ou son contenu complet) dans le déploiement manuel.
3. Ouvrez l'URL publiée et testez chaque lien depuis ordinateur et téléphone.
4. À chaque modification, redéployez le dossier.

## À vérifier avant publication
- Confirmer que le nom et le logo peuvent être utilisés durablement par l'agence.
- Ajouter, si vous souhaitez les publier, les informations légales/administratives requises pour votre entreprise.
- Tester le formulaire, les deux appels, les deux WhatsApp et le mailto sur les appareils utilisés.
- Vérifier les prix et le périmètre de chaque prestation avant de promouvoir le site.

## Conditions commerciales
Le site n'invente pas de délai fixe, d'acompte, de nombre de retouches, de garantie, de maintenance incluse ou de nombre de produits inclus. Ces éléments sont à convenir et à préciser sur chaque devis.
