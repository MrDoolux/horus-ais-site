# Hero refonte — page d'accueil (octobre 2026)

## État actuel
- Hero en ligne : `face_web.jpg` (bouclier holographique + faucon) + titre « Souveraineté. Contrôle. Confiance. » + tagline + boutons Découvrir / Me contacter / LinkedIn.
- Fichiers concernés : `index.html`, `assets/site.css`, `assets/particles.js`.

## Image hero (Grok Imagine)
- [x] Version finale générée : bouclier holographique lumineux, faucon, titre doré « HORUS AIS » en dessous, fond sombre texturé. Sous-titre et bouton retirés de l'image.
- [ ] **À faire** : pousser la nouvelle image sur GitHub en remplaçant `assets/face_web.jpg` (même nom, même chemin → déploiement auto). Penser au cache navigateur : Ctrl+F5 ou fenêtre privée pour vérifier.

## Vidéo hero (Grok Imagine)
- [x] Vidéo générée : 10 secondes, 1080p, boucle seamless (last frame = first frame), bouclier flottant, ondulation d'eau, particules de sable, titre immobile.
- [ ] **À faire** : pousser `assets/hero.mp4` et intégrer en fond du hero (balise vidéo autoplay, muted, loop, playsinline).

## Animation attaques (idée validée, à coder)
- Fond : vidéo hero en boucle.
- Paquets d'attaque animés en HTML/CSS par-dessus le bouclier : petits éléments lumineux étiquetés (texte propre, toujours lisible) qui glissent vers le bouclier et explosent en particules dorées au contact.
- Panel d'attaques à inclure : SQL injection, phishing, ransomware, DDoS, brute force, zero-day, MITM.

## Structure hero cible
- Vidéo plein écran en fond.
- Titre « HORUS AIS » dans l'image (déjà intégré).
- Sous-titre + bouton « Découvrir maintenant » en HTML par-dessus, cliquables (lien → `apropos.html`).
- LinkedIn : retiré du hero, lien discret dans le footer uniquement.
- Effet reveal on scroll envisagé : titre qui monte en fondu, boutons qui glissent depuis le bas.
- Particules dorées existantes (`particles.js`) à conserver / synchroniser.

## Ordre de travail suggéré
1. Pousser la vidéo `assets/hero.mp4`.
2. Adapter `index.html` : remplacer le fond image par la balise vidéo, retirer le titre/tagline redondants, ajouter le bouton HTML cliquable.
3. Coder l'animation des paquets d'attaque.
4. Ajuster le CSS (responsive, mobile).
5. Tester cache + mobile.

## Notes
- Ne pas toucher au code tant que la vidéo n'est pas poussée.
- Cette fiche vit dans `assets/suivi/` (fiches de suivi du projet), pas dans `articles/` (contenu publié du site) ni dans `assets/notes/` (captures d'écran uniquement).
