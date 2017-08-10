# VideYo
Video Platform just for fun, relax! Take it eaaaaaaaasyyyyyyyiiiiieee :)

## Technologies
	- HTML 5
	- SASS -> CSS
	- JS / jQuery
	- NodeJS
	- MongoDB
	- Gulp

## What should I install? :O
- Install NODE js : [https://nodejs.org/](https://nodejs.org/) 
- Install Gulp : [http://gulpjs.com/](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
- Install Mongo : [https://www.mongodb.com/](https://www.mongodb.com/)
- Download the project in zip or : ``` git clone https://github.com/trenyture/Videyo.git ```
- Install package.json : In your terminal ``` npm install ```
- Now : **GOOD LUCK**

## How the fuck that's work?
**Et bien c'est très simple, en fait il suff...(yu-gi-oh) ... _Oui cette blague est datée_...**<br/>
Bon plus sérieusement, c'est très simple, il faut distinguer 3 branches différentes : **Le front, le back et le serveur** ... Bon ici, vous vous rendrez compte que tous sont intrinsèquement liés! _NODEJS_ relie tout! 
Oui dis comme cela ca a pas l'air simple... laissez moi vous expliquer:

## SERVEUR
Pour lancer le serveur, il suffit dans un terminal de faire :  ``` node index.js ``` Cela a pour effet de lancer l'exécution du fichier index.js par node, fichier qui lie tous les autres fichiers... <br/>
**Attention** il faut également lancer MongoDB pour avoir accès a la base de donnée, pour cela faites dans un autre terminal : ``` mongod ``` (ne coupez pas le processus et laissez le terminal ouvert)<br/>
*Mais dis moi Jamy, il n'y a rien dans index.js...*<br/>
En fait tout est fait par des includes! L'index va inclure un fichier de router ``` server/index.js ``` qui lui même va inclure les différentes routes en fonction de l'URL visitées. Exemple, si je vais sur l'URL **_/login_** le serveur va me charger la route correspondant : ``` server/routes/login.js ``` en MVC classique on pourrait assimiler ce fichier au modèle car c'est lui qui va appeller le controller mais il a aussi l'avantage de gérer les différentes méthodes. (j'y reviendrais)<br/>
Dernière chose, le fichier ``` index.js ``` va inclure également le fichier ``` server/configs.js ``` qui comme son nom l'indique est un fichier de configuration du serveur... Pour consulter le site, il vous suffit de vous connecter à ``` http://localhost:6565/ ``` qui est l'URL configurée par ce fameux fichier configs.

## BACK-END
Bon le controlleur sert clairement de Back-End, il va mettre en relation le front et la base de donnée puis envoyer la vue à l'utilisateur. Si nous reprenons notre exemple du login, le controller est : ``` server/controllers/login.js ```. Vous remarquerez que le controller à plusieurs fonctions (index, create, destroy, nawak...) en fait c'est très simple, lorsque vous accédez à une page il y a des méthodes, les plus connues sont **GET** et **POST**, dans une API REST il y en a d'avantage et chacune d'elles _devrait_ permettre une action différente :

Method | Action | Descritpion
--- | --- | ---
GET | Lire | La methode Get sert à lire une page web, c-a-d que si vous lui passez une URL elle va lire les données dans la base de donnée et vous renvoyer une vue en fonction... Bref c'est ce qui renvoie ``` L'index ```
POST | Créer | Cette méthode est utilisée pour passer des données de la vue au serveur (à la différence de Get qui passe les données du serveur à la vue). Elle est utilisée pour sauvegarder des données dans la base de donnée
PUT | Actualiser / Remplacer | Cette méthode **devrait** être utilisée pour actualiser tous les paramètres d'une table... Exemple : Vous souhaiter modifier votre table ``` User ``` en ajoutant un paramètre "date de naissance" et vous souhaitez que toutes les données soient sauvegardées... 
PATCH | Actualiser / Modifier | Cette méthode est utilisée afin de modifier un paramètre d'un champs d'une table... Exemple, vous voulez changer de pseudonnyme... Utiliser **PATCH**... Bon le plus souvent c'est la méthode PUT qui est utilisée pour cela (lisez l'encart après le tableau, vous comprendrez pourquoi)
DELETE | Supprimer | J'ai vraiment besoin d'expliquer? Bah euh en gros vous **deletez** quoi...

### Des questions? Oui je vous écoute
- Est-ce qu'on doit vraiment suivre à la règle ces _Règles_?<br/>Et bien ... non, ces règles là sont les règles d'usages, mais rien ne vous empêche d'utiliser le DELETE pour afficher vos éléments c'est pour cela que la méthode PATCH est souvent mise à l'écart pour laisser place à la méthode PUT...
- Mais comment fait-on pour dire quelle méthode utiliser?<br/>Alors là nous touchons un point sensible... Les navigateurs d'aujourd'hui (et surement de demain) ne comprennent que 2 méthodes, **GET** et **POST** et donc en navigant d'URL en URL il est impossible d'utiliser le pannel de méthodes proposées... Ceci dit, grâce à **Ajax**, nous pouvons dire quelle méthode en utilisant le paramètre ``` method ``` et ainsi nous pouvons communiquer avec notre serveur
- Ok ... mais tu t'éloignes pas un peu du sujet là?<br/>Ouf, j'avais peur que personne ne me fasse revenir à mes moutons donc c'est parti:

### Mais du coup?
Du coup comme je vous disais, chaque controller à différentes fonctions (index, create, ou ce que vous voulez...), et quand vous appellez une URL selon une méthode, vous appellez une fonction différente du controller.<br/>
Exemple: Si vous appellez la page login en GET vous utiliserez la fonction login.INDEX, mais si vous l'appeller en POST alors vous emploierez la fonction login.CREATE... Un dernier truc, vous remarquerez qu'il y a un dossier ``` server/services ```, ce sont les fonctions générales qui peuvent êtres appellées par différents controllers. Exemple : la connection à la base de donnée, plutôt que de faire la création dans chaque controller en mettant les paramètres, appellez la fonctoin qui permet de le faire! Plus simple et plus rapide!<br/>
Et voila comment la front communique avec le back, et le back lui communiquera avec la BDD mais je vous rééxplique un peu plus tard...

## FRONT END
Ouf on arrive enfin à la partie qui nous intéresse le plus (non?) le **FRONT**<br/>
_Mais où est le HTML?_ Hey jeune padawan, tu attends un peu?<br/>
Le front se situe donc dans le fichier ``` public/ ```, que ce soient les scripts, les styles, les images et même... **LE HTML** ceci étant dit, le Html est fait sous forme de templates (une sorte de préprocesseurs), j'utilise pour cela **_PUG_** (qui est presque comme _JADE_)...<br/>
Pourquoi utiliser un préprocesseur? Tout comme le Sass pour le CSS, le préprocesseur permet d'écrire moins et surtout d'implémenter directement des fonctions. Exemple, si je veux mettre un ``` if ``` dans mon HTML je peux, si je veux mettre une variable, je peux et surtout si je veux faire des imports/includes **JE PEUX!!** Cela me permet donc de créer un fichier ``` header.pug ``` que l'on appellera dans toutes nos pages (et on aura pas besoin de le réécrire à chaque fois!) C'est ce que l'on faisait avec PHP, sauf que l'on ne peut pas utiliser PHP sur du node... (bon peut être que si, faudrait que je me renseigne)<br/>
Du coup l'architecture est la suivante :

route | quézako?
--- | ---
``` public/assets ``` | Ici seront stockés les images, scripts et styles minimizés! (vous pouvez y mettre des fonts, et un peu tout ce que vous voulez qui sera utilisé par les vues)
``` public/dev ``` | Ce fichier sert pour le développement des scripts, styles et à stocker les images raw... qui serviront pour la minimisation des assets!
``` public/pages ``` | Ici nous allons stocker des fichiers *PUG* qui servent pour le contenu de nos pages... Ces mêmes pages qui incluent des partials! C'est la racine de notre application!!! (voir plus bas)
``` public/partials ``` | Enfin dans ce dossier nous stockerons les fichiers *PUG* qui servent à inclure les éléments généraux (header, footer...)

Avant de continuer il faut que je vous parle de la racine... Lorsque nous avons travailler avec Apache (XAMPP par exemple), la racine à souvent était ``` www ``` ou ``` htdocs ```. C'est à dire que lorsque votre navigateur vous transmet une page, les images, l'HTML, le script... tout est contenu à l'intérieur de ce dossier RACINE sinon il est inaccessible! Avec ``` NODE ``` vous pouvez choisir le dossier Racine, et pour ce projet celui-ci est : ``` public/pages ``` ce qui veut dire que tout ce qui se trouve à l'extérieur n'est clairement pas accessible depuis le navigateur! (petite exception pour les assets qui eux sont accessibles grâce a un paramètre de node) Du coup, vous avez compris que le serveur n'est pas accessible depuis un navigateur et c'est pour cela qu'ajax est notre seul moyen de communication avec le serveur depuis la vue!<br/>
Très bien mais comment fait-on pour minimizer nos fichiers ``` dev ```? C'est là qu'intervient **_GULP_**! J'ai créer un fichier gulpfile qui permet de minimiser les fichiers devs et de créér les fichiers assets... Pour cela c'est très simple dans un autre terminal vous n'aurez qu'à utiliser la commande ``` gulp watch ``` et modifiez vos fichiers à souhait!

## Oui mais moi MongoDB je connais pas... Une petite explication?
Très bien, nous avons appris les bases de données avec Mysql qui est un système de gestion de bases de données en SQL, mongoDB est un système de gestion de bases de données en NoSQL. <br/>
Bon comme le cours doit être rapide, je vais passer les détails, mais en gros retenez cette approximation : MongoDB stocke en JSON à la différence de MySQL qui stocke dans des fichiers .sql<br/>
Du coup plutôt que de demander de faire des jointures a MySQL puis de traduire le résultat en JSON, il suffit juste de demander directement a Mongo qui nous transmet le résultat en JSON sans forcément faire de jointure... Car oui, la communication entre le serveur et le front se fait en _JSON_!<br/>
**_Des jointures?_** En SQL, normalement on relie les tables entres elles par d'autres tables... Exemple, si vous avez une table USER ainsi qu'une table VIDEOS, vous devriez les _lier_ grâce a une table USER_VIDEO qui répertorie seulement l'ID de l'user ainsi que l'ID de la vidéo... Avec le monde NoSQL c'est différent, vous n'avez plus besoin de ces tables jointures, vous pouvez directement stocker les vidéos de l'USER directement dans la collection de l'USER... Ah et oui, en NoSQL, on appelle plus cela des tables mais des collections!<br/>
Exemple, vous pouvez avoir le fichier JSON suivant : 
	
	{
		user : 'Utilisateur',
		videos : [
			{
				id: 1,
				url: /myVideo1
			},
			{
				id: 2,
				url: /myVideo2
			}
		]
	}

Ainsi donc pas besoin de faire de multiples requêtes pour joindre toutes vos données, vous pourrez tout avoir en faisant une simple requête!<br/>
**_SELECT * FROM USERS ?_** bon bon bon, bien évidemment MongoDB utilise une autre langue que MySQL, donc il faut apprendre un nouveau langage... Mais c'est assez simple, il faut retenir une structure : ``` db.nomCollection.request({where}) ```<br/>

> **Mais oui c'est clair!**

Comment cela vous n'avez rien compris? En gros, si je veux avoir l'utilisateur dont l'ID est 1 de ma table USERS, je vais faire : ``` db.USERS.find({id:1}) ``` Et voila!<br/>
Il existe plein de requêtes différentes comme **find()**, **insert()**, **update()**, **remove()** ... de plus les connecteurs logiques sont présent pour améliorer vos WHERE comme : **$or**, **$and**...<br/>
Si jamais le sujet vous intéresse, vous pouvez suivre [ce petit cours d'Open Classrooms](https://openclassrooms.com/courses/guide-de-demarrage-pour-utiliser-mongodb)<br/>
Un dernier truc, j'essaie de garder des dumbs de mes différentes collections dans le dossier ``` database ``` il vous suffira juste d'utiliser la commande ``` mongorestore ``` pour les importer...<br/>

## Pfiou c'est beaucoup d'infos là... Récap?
Bon allez on va récapituler: <br/>
Le serveur permet de faire communiquer la base de donnée avec le back, puis permet d'envoyer ces infos au front grâce aux différentes routes et méthodes employées!<br/>
Il va vous falloir 3 terminaux différents qui devront tous êtres ouverts depuis le chemin du projet : C:\Path\to\Videyo 

- Un pour le serveur : ``` node index.js ```
- Un pour la base de donnée : ``` mongod ```
- Un pour gulp (si vous modifiez les assets) : ``` gulp watch ```

## L'architecture (importante) est donc : 

	| - index.js
	| - gulpfile.js
	| - package.json (sert a charger toutes les dépendances a NODE et Gulp)
	| - server
		| - index.js
		| - configs.js
		| - routes
			| - index.js
			| - (route).js
		| - controllers
			| - (controller).js
		| - services
			| - (service).js
	| - public
		| - assets
			| - css
				| - style.css
			| - img
				| - (img).(jpg/png/gif)
			| - js
				| - scripts.js
		| - dev 
			| - img
				| - (img).(jpg/png/gif)
			| - js
				| - class
					| - (class).js
				| - vendor
					| - (vendor).js
				| - scripts.js
			| - sass
				| - style.scss
				| - (folders included)
		| - pages
			| - index.pug
			| - (page).pug
		| - partials
			| - head.pug
			| - header.pug
			| - footer.pug
		| - database
			| (collection).json

## C'est parti pour l'aventure!!!

## Copyright
**© Simon Trichereau - 2016**<br/>
_This project is totally free for commercial or personnal use!_
