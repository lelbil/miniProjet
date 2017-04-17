Guide d'installation:

Avant de lancer le programme assurez vous d'avoir NodeJs et mongoDB ainsi que npm et nodemon (facultatif) installés sur votre machine

1- Utilisez la commande git clone https://github.com/lelbil/miniProjet.git pour clonez le répertoire du programme sur votre machine
2- Allez sur le répértoire de l'application (monProjet) et ouvrez le fichier app.js, vous devez décommentez le code entre les lignes 32 et 49, ce code permettra de peupler la base de données
3- Exécutez npm install dans le répértoire principal de l'application et attendez la fin de l'installation de tous les modules
4- Lancez le serveur à l'aide de la commande 'nodemon', puis coupez le (ctrl + c). Cette étape sert à peupler la Base de donnée
5- Supprimez le code de la ligne 32 à la ligne 49 (ou simplement recommentez le)
6- Relancez l'application en tappant nodemon
7- Entrez l'adresse localhost:3000 dans la barre d'adresse de votre navigateur
8- Vous pouvez commencez à jouer

Temps total passé au développement: 11 heures

Fonctionnement technique de l'application:

	L'application utilise la modèle par défault d'un projet express pour lancer le serveur.
	Une fois le serveur lancé, l'application renvoie une page html qui consiste en deux parties: 
		1- Du texte qui était copié et collé à partir de l'email
		2- D'un bouton qui sert à démarrez le jeu
	dès qu'on appuyie sur le bouton, la deuxième partie dévoile un verbe en Français (écris en grans et gras), un champs de saisie, un bouton pour valider l'entrée, un texte qui donne des indices sur la réponse, le score actuel, et le niveau du difficulté du verbe présent

	Dès qu'un utilisateur est connecté, un websocket connecte le serveur et le client, il attend ainsi l'évenement verbRequested. Une fois reçu, le serveur appelle la fonction fetch; cette fonction prends en argument le socket et la difficulté souhaité (récupperer avec l'évenement émis).
	la fonction fetch exécute ensuite une série de fonctions mongoose imbriqués afin de retourner un verbe qui aléatoire qui correspond au niveau de difficulté passé en argument. Une fois le verbe retourner, le callback exécute la fonction translate du module yandex-translate-api pour le traduire, il émit ensuite un evenement 'gotVerb' avec un message contenant le verbe en Français, sa traduction en Anglais ainsi que sa difficulté.

	Quand le client de sont côté reçoit l'évenenement gotVerb (qu'il a demandé en vrai à l'aide de verbRequested), il affiche les informations obtenues sur la page grâce au code JavaScript. il attend ensuite la saisie et la validation du joueur. 

	quand le joueur valide l'entrée de sa traduction, une fonction anonyme s'éxécute, qui exécute la fonction upPoints, qui va mettre à jour les points, ou bien termine la partie en affichant un message 'vainqueur' ou 'perdant' le cas échéant. Si la partie n'est pas terminé, on émet à nouveau un évenement 'verbRequested'


Comment je peux améliorer mon application:
	Ce jeu étant un mini-projet, il contient beaucoup de défauts; on peux par exemple parler de:
		1- Côté jeu:
			*vérifier l'exactitude des verbes, utiliser un service plus sûr que Yandex
			*utiliser des verbes plus variés (de a à z)
			*pouvoir valider en tappant 'entrer'
			*Rajouter d'autres langues cibles
			*Améliorer l'interface graphique trop basique
		2- Côté technique:
			*hébérger mes CDN pour que ça prennent moins de temps à charger 
			*Peupler la base de données une seule fois (peut être en vérifiant que la base ou la collection n'existe pas avant d'éxéctuer le code pour la peupler, ou bien servir les fichiers de la DB avec le projet?)
			*Stocker la traduction dans le document de chaque verbe