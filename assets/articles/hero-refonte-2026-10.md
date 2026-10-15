# Hero refonte — page d'accueil (octobre 2026)

## État actuel
- Hero en ligne : `face_web.jpg` (bouclier holographique + faucon) + titre « Souveraineté. Contrôle. Confiance. » + tagline + boutons Découvrir / Me contacter / LinkedIn.
- Fichiers concernés : `index.html`, `assets/site.css`, `assets/particles.js`.

## Image hero (Grok Imagine)
- [x] Version finale générée : bouclier holographique lumineux, faucon, titre doré « HORUS AIS » en dessous, fond sombre texturé. Sous-titre et bouton retirés de l'image.
- [ ] **À faire** : pousser la nouvelle image sur GitHub en remplaçant `assets/face_web.jpg` (même nom, même chemin → déploiement auto). Penser au cache navigateur : Ctrl+F5 ou fenêtre privée pour vérifier.

## Animation attaques (idée validée, à coder)
- Fond : image hero statique.
- Paquets d'attaque animés en HTML/CSS par-dessus le bouclier : petits éléments lumineux étiquetés (texte propre, toujours lisible) qui glissent vers le bouclier et explosent en particules dorées au contact.
- Panel d'attaques à inclure : SQL injection, phishing, ransomware, DDoS, brute force, zero-day, MITM.
- Alternative envisagée : vidéo Grok Imagine (5-10 s en boucle) — mais risque de texte illisible, donc version code préférée.

## Structure hero cible
- Image plein écran en fond.
- Titre « HORUS AIS » dans l'image (déjà intégré).
- Sous-titre + bouton « Découvrir maintenant » en HTML par-dessus, cliquables (lien → `apropos.html`).
- LinkedIn : retiré du hero, lien discret dans le footer uniquement.
- Effet reveal on scroll envisagé : titre qui monte en fondu, boutons qui glissent depuis le bas.
- Particules dorées existantes (`particles.js`) à conserver / synchroniser.

## Ordre de travail suggéré
1. Pousser la nouvelle image (remplacement `face_web.jpg`).
2. Adapter `index.html` : retirer le titre/tagline redondants, ajouter le bouton HTML cliquable.
3. Coder l'animation des paquets d'attaque.
4. Ajuster le CSS (responsive, mobile).
5. Tester cache + mobile.

## Notes
- Ne pas toucher au code tant que l'image n'est pas poussée.
- Le dossier `assets/notes/` contient uniquement les captures d'écran — les fiches de suivi vont dans `assets/articles/`.
