# projet-6
# Note de cadrage
SOMMAIRE
Contexte du projet 2
Réalisation de l’API 2
Points de vigilance 2
Exigences concernant la sécurité 2
Erreurs API 3
Routes API 3
Modèle de données 3
Sauce 3
Utilisateur 3
Technologies à utiliser 4
Dépôt GitHub 4
Lien du dépôt 4
Procédure 4
1Contexte du projet
So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création
de sauces piquantes dont la composition est tenue secrète. Forte de son succès, l’entreprise
souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront
ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.
Réalisation de l’API
Points de vigilance
L’entreprise ayant subi quelques attaques sur son site web ces dernières semaines, le
fondateur souhaite que les données des utilisateurs soient parfaitement protégées.
Pour cela, l’API utilisée devra impérativement respecter des pratiques de code sécurisé.
Exigences concernant la sécurité :
● l’API doit respecter le RGPD et les standards OWASP ;
● le mot de passe des utilisateurs doit être chiffré ;
● 2 types de droits administrateur à la base de données doivent être définis : un accès
pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base
de données ;
● la sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB
Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis
sa machine ;
● l’authentification est renforcée sur les routes requises ;
● les mots de passe sont stockés de manière sécurisée ;
● les adresses mails de la base de données sont uniques et un plugin Mongoose
approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.
2Erreurs API
Toute erreur doit être renvoyée telle quelle, sans aucune modification ni ajout. Si nécessaire,
utiliser une nouvelle Erreur().
Routes API
Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un
jeton valide dans son en-tête d'autorisation : "Bearer <token>").
Modèle de données
Sauce
Le modèle de données pour une sauce est le suivant :
● id: ObjectID — identifiant unique créé par MongoDB ;
● userId: string — identifiant unique MongoDB pour l'utilisateur qui a créé la
sauce ;
● name: string — nom de la sauce ;
● manufacturer: string — fabricant de la sauce ;
● description: string — description de la sauce ;
● mainPepper: string — principal ingrédient dans la sauce ;
● imageUrl: string — string de l'image de la sauce téléchargée par l'utilisateur ;
● heat: number — nombre entre 1 et 10 décrivant la sauce ;
● likes: number — nombre d'utilisateurs qui aiment la sauce ;
● dislikes: number — nombre d'utilisateurs qui n'aiment pas la sauce ;
● usersLiked: [string] — tableau d'identifiants d'utilisateurs ayant aimé la sauce
;
● usersDisliked: [string] — tableau d'identifiants d'utilisateurs n'ayant pas aimé
la sauce.
3Utilisateur
Le modèle de données pour un utilisateur est le suivant :
● userId: string — identifiant unique MongoDB pour l'utilisateur qui a créé la
sauce ;
● email: string — adresse électronique de l'utilisateur [unique] ;
● password: string — hachage du mot de passe de l'utilisateur.
Technologies à utiliser
● framework : Express ;
● serveur : NodeJS ;
● base de données : MongoDB ;
● toutes les opérations de la base de données doivent utiliser le pack Mongoose avec
des schémas de données stricts.
Dépôt GitHub
Lien du dépôt
Le lien du dépôt GitHub pour la partie frontend est le suivant : Piquante.
Procédure
1. Cloner le projet.
2. Exécuter npm install.
3. Exécuter npm start..
4. Exécution de l’API sur http://localhost:3000.
Informations complémentaires
Le nombre de likes/dislikes et les tableaux like/dislike doivent être mis à jour pour mettre en
œuvre la fonctionnalité.

#FONCTIONNALITEES

Cette API vous permet d'enregistrer les utilisateurs sur une base de données (mongoDB) en toute sécurité car crypter avec bcrypt,
et d'y ajouter des sauces pour les partager sur la communauté.
Vous pourrez par la suite mofifié ou suprrimer les sauces que vous avez poster


#UTILISATION


1. Lancer le backEnd avec la commande nodemon server
2. Lancer le frontEnd avec la commande ng serve
3. La base de données est configurer 
4. Le MDP provisoire pour mongoDB est : 69vLhhBBj8hajibs

#PRINCIPES DE SECURITE

1 Injection --> clear xss / helmet / regex
2 Piratage de session --> hash / jwt / regex
3 Exposition de données sensibles --> hash / helmet
4 Entités externes XML (XXE)--> allow controll origin --> local host 4200
5 Contournement du contrôle d’accès --> hash / jwt /.env
6 Security Misconfiguration --> helmet
7 Cross-Site Scripting  (XSS) --> clear xss / helmet
8 Désérialisation non sécurisée (Insecure Deserialisation) --> JSON.parse
9 Utilisation de composants présentant des vulnérabilités connues --> Maintien a jour des modules
10 Manque de surveillance et de monitoring --> Maintien a jour des modules


 