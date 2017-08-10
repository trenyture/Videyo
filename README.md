# VideYo
Video Platform just for fun, relax! Take it eaaaaaaaasyyyyyyyiiiiieee :)

# Technologies
	- HTML 5
	- SASS -> CSS
	- JS / jQuery
	- NodeJS
	- MongoDB
	- Gulp

# What should I install? :O
- Install NODE js : (https://nodejs.org/)[https://nodejs.org/] 
- Install Gulp : (http://gulpjs.com/)[https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md]
- Install Mongo : (https://www.mongodb.com/)[https://www.mongodb.com/]
- Download the project in zip or : ```git clone https://github.com/trenyture/Videyo.git```
- Install package.json : In your terminal ```npm install```
- Now : **GOOD LUCK**

# How the fuck that's work?
**Et bien c'est tr�s simple, en fait il suff...(yu-gi-oh) ... _Oui cette blague est dat�e_...**<br/>
Bon plus s�rieusement, c'est tr�s simple, il faut distinguer 3 branches diff�rentes : **Le front, le back et le serveur** ... Bon ici, vous vous rendrez compte que tous sont intrins�quement li�s! _NODEJS_ relie tout! 
Oui dis comme cela ca a pas l'air simple... laissez moi vous expliquer:

# SERVEUR
Pour lancer le serveur, il suffit dans un terminal de faire :  ```node index.js``` Cela a pour effet de lancer l'ex�cution du fichier index.js par node, fichier qui lie tous les autres fichiers... <br/>
**Attention** il faut �galement lancer MongoDB pour avoir acc�s a la base de donn�e, pour cela faites dans un autre terminal : ```mongod``` (ne coupez pas le processus et laissez le terminal ouvert)<br/>
*Mais dis moi Jamy, il n'y a rien dans index.js...*<br/>
Mais oui c'est clair!<br/>
En fait tout est fait par des includes! L'index va inclure un fichier de router ````server/index.js``` qui lui m�me va inclure les diff�rentes routes en fonction de l'URL visit�es. Exemple, si je vais sur l'URL **_/login_** le serveur va me charger la route correspondant : ```server/routes/login.js``` en MVC classique on pourrait assimiler ce fichier au mod�le car c'est lui qui va appeller le controller mais il a aussi l'avantage de g�rer les diff�rentes m�thodes. (j'y reviendrais)<br/>
Derni�re chose, le fichier ```index.js``` va inclure �galement le fichier ```server/configs.js``` qui comme son nom l'indique est un fichier de configuration du serveur... Pour consulter le site, il vous suffit de vous connecter � ```http://localhost:6565/``` qui est l'URL configur�e par ce fameux fichier configs.

# BACK-END
Bon le controlleur sert clairement de Back-End, il va mettre en relation le front et la base de donn�e puis envoyer la vue � l'utilisateur. Si nous reprenons notre exemple du login, le controller est : ```server/controllers/login.js```. Vous remarquerez que le controller � plusieurs fonctions (index, create, destroy, nawak...) en fait c'est tr�s simple, lorsque vous acc�dez � une page il y a des m�thodes, les plus connues sont **GET** et **POST**, dans une API REST il y en a d'avantage et chacune d'elles _devrait_ permettre une action diff�rente :

Method | Action | Descritpion
--- | --- | ---
GET | Lire | La methode Get sert � lire une page web, c-a-d que si vous lui passez une URL elle va lire les donn�es dans la base de donn�e et vous renvoyer une vue en fonction... Bref c'est ce qui renvoie ````L'index```
POST | Cr�er | Cette m�thode est utilis�e pour passer des donn�es de la vue au serveur (� la diff�rence de Get qui passe les donn�es du serveur � la vue). Elle est utilis�e pour sauvegarder des donn�es dans la base de donn�e
PUT | Actualiser / Remplacer | Cette m�thode **devrait** �tre utilis�e pour actualiser tous les param�tres d'une table... Exemple : Vous souhaiter modifier votre table ```User``` en ajoutant un param�tre "date de naissance" et vous souhaitez que toutes les donn�es soient sauvegard�es... 
PATCH | Actualiser / Modifier | Cette m�thode est utilis�e afin de modifier un param�tre d'un champs d'une table... Exemple, vous voulez changer de pseudonnyme... Utiliser **PATCH**... Bon le plus souvent c'est la m�thode PUT qui est utilis�e pour cela (lisez l'encart apr�s le tableau, vous comprendrez pourquoi)
DELETE | Supprimer | J'ai vraiment besoin d'expliquer? Bah euh en gros vous **deletez** quoi...

## Des questions? Oui je vous �coute
- Est-ce qu'on doit vraiment suivre � la r�gle ces _R�gles_?<br/>Et bien ... non, ces r�gles l� sont les r�gles d'usages, mais rien ne vous emp�che d'utiliser le DELETE pour afficher vos �l�ments c'est pour cela que la m�thode PATCH est souvent mise � l'�cart pour laisser place � la m�thode PUT...
- Mais comment fait-on pour dire quelle m�thode utiliser?<br/>Alors l� nous touchons un point sensible... Les navigateurs d'aujourd'hui (et surement de demain) ne comprennent que 2 m�thodes, **GET** et **POST** et donc en navigant d'URL en URL il est impossible d'utiliser le pannel de m�thodes propos�es... Ceci dit, gr�ce � **Ajax**, nous pouvons dire quelle m�thode en utilisant le param�tre ```method``` et ainsi nous pouvons communiquer avec notre serveur
- Ok ... mais tu t'�loignes pas un peu du sujet l�?<br/>Ouf, j'avais peur que personne ne me fasse revenir � mes moutons donc c'est parti:

## Mais du coup?
Du coup comme je vous disais, chaque controller � diff�rentes fonctions (index, create, ou ce que vous voulez...), et quand vous appellez une URL selon une m�thode, vous appellez une fonction diff�rente du controller.<br/>
Exemple: Si vous appellez la page login en GET vous utiliserez la fonction login.INDEX, mais si vous l'appeller en POST alors vous emploierez la fonction login.CREATE... Un dernier truc, vous remarquerez qu'il y a un dossier ```server/services```, ce sont les fonctions g�n�rales qui peuvent �tres appell�es par diff�rents controllers. Exemple : la connection � la base de donn�e, plut�t que de faire la cr�ation dans chaque controller en mettant les param�tres, appellez la fonctoin qui permet de le faire! Plus simple et plus rapide!<br/>
Et voila comment la front communique avec le back, et le back lui communiquera avec la BDD mais je vous r��xplique un peu plus tard...

#FRONT
Ouf on arrive enfin � la partie qui nous int�resse le plus (non?) le **FRONT**<br/>
_Mais o� est le HTML?_ Hey jeune padawan, tu attends un peu?<br/>
Le front se situe donc dans le fichier ```public/```, que ce soient les scripts, les styles, les images et m�me... **LE HTML** ceci �tant dit, le Html est fait sous forme de templates (une sorte de pr�processeurs), j'utilise pour cela **_PUG_** (qui est presque comme _JADE_)...<br/>
Pourquoi utiliser un pr�processeur? Tout comme le Sass pour le CSS, le pr�processeur permet d'�crire moins et surtout d'impl�menter directement des fonctions. Exemple, si je veux mettre un ```if``` dans mon HTML je peux, si je veux mettre une variable, je peux et surtout si je veux faire des imports/includes **JE PEUX!!** Cela me permet donc de cr�er un fichier ```header.pug``` que l'on appellera dans toutes nos pages (et on aura pas besoin de le r��crire � chaque fois!) C'est ce que l'on faisait avec PHP, sauf que l'on ne peut pas utiliser PHP sur du node... (bon peut �tre que si, faudrait que je me renseigne)<br/>
Du coup l'architecture est la suivante :

route | qu�zako?
--- | ---
```public/assets``` | Ici seront stock�s les images, scripts et styles minimiz�s! (vous pouvez y mettre des fonts, et un peu tout ce que vous voulez qui sera utilis� par les vues)
```public/dev``` | Ce fichier sert pour le d�veloppement des scripts, styles et � stocker les images raw... qui serviront pour la minimisation des assets!
```public/pages``` | Ici nous allons stocker des fichiers *PUG* qui servent pour le contenu de nos pages... Ces m�mes pages qui incluent des partials! C'est la racine de notre application!!! (voir plus bas)
```public/partials``` | Enfin dans ce dossier nous stockerons les fichiers *PUG* qui servent � inclure les �l�ments g�n�raux (header, footer...)

Avant de continuer il faut que je vous parle de la racine... Lorsque nous avons travailler avec Apache (XAMPP par exemple), la racine � souvent �tait ```www``` ou ```htdocs```. C'est � dire que lorsque votre navigateur vous transmet une page, les images, l'HTML, le script... tout est contenu � l'int�rieur de ce dossier RACINE sinon il est inaccessible! Avec ```NODE``` vous pouvez choisir le dossier Racine, et pour ce projet celui-ci est : ```public/pages``` ce qui veut dire que tout ce qui se trouve � l'ext�rieur n'est clairement pas accessible depuis le navigateur! (petite exception pour les assets qui eux sont accessibles gr�ce a un param�tre de node) Du coup, vous avez compris que le serveur n'est pas accessible depuis un navigateur et c'est pour cela qu'ajax est notre seul moyen de communication avec le serveur depuis la vue!<br/>
Tr�s bien mais comment fait-on pour minimizer nos fichiers ```dev```? C'est l� qu'intervient **_GULP_**! J'ai cr�er un fichier gulpfile qui permet de minimiser les fichiers devs et de cr��r les fichiers assets... Pour cela c'est tr�s simple dans un autre terminal vous n'aurez qu'� utiliser la commande ```gulp watch``` et modifiez vos fichiers � souhait!

# Oui mais moi MongoDB je connais pas... Une petite explication?
Tr�s bien, nous avons appris les bases de donn�es avec Mysql qui est un syst�me de gestion de bases de donn�es en SQL, mongoDB est un syst�me de gestion de bases de donn�es en NoSQL. <br/>
Bon comme le cours doit �tre rapide, je vais passer les d�tails, mais en gros retenez cette approximation : MongoDB stocke en JSON � la diff�rence de MySQL qui stocke dans des fichiers .sql<br/>
Du coup plut�t que de demander de faire des jointures a MySQL puis de traduire le r�sultat en JSON, il suffit juste de demander directement a Mongo qui nous transmet le r�sultat en JSON sans forc�ment faire de jointure... Car oui, la communication entre le serveur et le front se fait en _JSON_!<br/>
**_Des jointures?_** En SQL, normalement on relie les tables entres elles par d'autres tables... Exemple, si vous avez une table USER ainsi qu'une table VIDEOS, vous devriez les _lier_ gr�ce a une table USER_VIDEO qui r�pertorie seulement l'ID de l'user ainsi que l'ID de la vid�o... Avec le monde NoSQL c'est diff�rent, vous n'avez plus besoin de ces tables jointures, vous pouvez directement stocker les vid�os de l'USER directement dans la collection de l'USER... Ah et oui, en NoSQL, on appelle plus cela des tables mais des collections!<br/>
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

Ainsi donc pas besoin de faire de multiples requ�tes pour joindre toutes vos donn�es, vous pourrez tout avoir en faisant une simple requ�te!<br/>
**_SELECT * FROM USERS ?_** bon bon bon, bien �videmment MongoDB utilise une autre langue que MySQL, donc il faut apprendre un nouveau langage... Mais c'est assez simple, il faut retenir une structure : ```db.nomCollection.request({where})```<br/>
Comment cela vous n'avez rien compris? En gros, si je veux avoir l'utilisateur dont l'ID est 1 de ma table USERS, je vais faire : ```db.USERS.find({id:1})``` Et voila!<br/>
Il existe plein de requ�tes diff�rentes comme **find()**, **insert()**, **update()**, **remove()** ... de plus les connecteurs logiques sont pr�sent pour am�liorer vos WHERE comme : **$or**, **$and**...<br/>
Si jamais le sujet vous int�resse, vous pouvez suivre (ce petit cours d'Open Classrooms)[https://openclassrooms.com/courses/guide-de-demarrage-pour-utiliser-mongodb]<br/>
Un dernier truc, j'essaie de garder des dumbs de mes diff�rentes collections dans le dossier ```database``` il vous suffira juste d'utiliser la commande ```mongorestore``` pour les importer...<br/>

# Pfiou c'est beaucoup d'infos l�... R�cap?
Bon allez on va r�capituler: <br/>
Le serveur permet de faire communiquer la base de donn�e avec le back, puis permet d'envoyer ces infos au front gr�ce aux diff�rentes routes et m�thodes employ�es!<br/>
Il va vous falloir 3 terminaux diff�rents qui devront tous �tres ouverts depuis le chemin du projet : C:\Path\to\Videyo 

- Un pour le serveur : ```node index.js```
- Un pour la base de donn�e : ```mongod```
- Un pour gulp (si vous modifiez les assets) : ```gulp watch```

# L'architecture (importante) est donc : 

	| - index.js
	| - gulpfile.js
	| - package.json (sert a charger toutes les d�pendances a NODE et Gulp)
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

#C'est parti pour l'aventure!!!

# Copyright
**� Simon Trichereau - 2016**<br/>
_This project is totally free for commercial or personnal use!_