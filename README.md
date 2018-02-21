Pandatrip
=======

Conception de l'interface Pandatrip.

Les services de cette application utilise une API, celle-ci est déterminée dans le fichier /src/app/app.service.ts.

Par défaut, l'application utilise le point d'entrée : "http://api.pandatrip.fr/api".

### Executer les tests :

Run :
```
ng test
```

Mise à jour du report avant l'importation dans SonarQube :
```
ng test --code-coverage
```

Déplacer le fichier /coverage/lcov.info à la racine du projet.

Lancer un scanner :
```
sonar-scanner
```

ou 

```
sonar-runner
```

### Lancer le serveur :

Installer les librairies :
```
npm install
```

Run :
```
ng serve -o
```
