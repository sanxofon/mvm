# Acordeón de GIT

## Creación de instantáneas (snapshots)

### Inicializar un repositorio

`git init`

### Archivos de ensayo
`git add file1.js` # **Etapas de un solo archivo**

`git add file1.js file2.js` # **Etapas múltiples archivos**

`git add *.js` # **Etapas con un patrón**

`git add .` # **Prepara el directorio actual y todo su contenido**

### Ver el estado

`git status` # **Estado completo (status)**

`git status -s` # **Estado corto**

### commiting los archivos preparados

`git commit -m "Message"` # **commits con un mensaje de una línea**

`git commit` # **Abre el editor predeterminado para escribir un mensaje largo**

### Saltarse el área de preparación

`git commit -am "Message"`

### Eliminando archivos

`git rm file1.js` # **Elimina del directorio de trabajo y del área de ensayo**

`git rm --cached file1.js` # **Elimina solo del área de preparación**

### Cambiar el nombre o mover archivos

`git mv file1.js file1.txt`

### Ver los cambios preparados/no preparados

`git diff` # **Muestra cambios no preparados**

`git diff --staged` # **Muestra los cambios por etapas**

`git diff --cached` # **Igual que el anterior**

### Ver el historial

`git log` # **Historia completa**

`git log --oneline` # **Resumen**

`git log --reverse` # **Enumera las commits desde la más antigua hasta la más reciente**

### Ver una commit

`git show 921a2ff` # **Muestra el commit dado**

`git show HEAD` # **Muestra el último commit**

`git show HEAD~2` # **Dos pasos antes de la última commit**

`git show HEAD:file.js` # **Muestra la versión de file.js almacenada en la última commit**

### Unstaging de archivos (deshacer git add)

`git restore --staged file.js` # **Copia la última versión de file.js desde el repositorio hacia el índice**

### Descartar cambios locales

`git restore file.js` # **Copia file.js desde el índice hacia el directorio de trabajo**

`git restore file1.js file2.js` # **Restaura varios archivos en el directorio de trabajo**

`git restore .` # **Descarta todos los cambios locales (excepto los archivos sin seguimiento)**

`git clean -fd` # **Elimina todos los archivos sin seguimiento**

### Restaurar una versión anterior de un archivo

`git restore --source=HEAD~2 file.js`

## Historial de navegación

### Ver el historial

`git log --stat` # **Muestra la lista de archivos modificados**

`git log --patch` # **Muestra los cambios reales (parches)**

### Filtrando la historia

`git log -3` # **Muestra las últimas 3 entradas**

`git log --author="Sanx"`

`git log --before="2022-05-18"`

`git log --after="one week ago"`

`git log --grep="GUI"` # **commits con "GUI" en su mensaje**

`git log -S"GUI"` # **commits con "GUI" en sus parches**

`git log hash1..hash2` # **Rango de commits**

`git log file.txt` # **commits que tocaron file.txt**

### Formateo de la salida del registro

`git log --pretty=format:"%an committed %H"`

### Crear un alias

`git config --global alias.lg "log --oneline"`

### Ver una commit

`git show HEAD~2`

`git show HEAD~2:file1.txt` # **Muestra la versión del archivo almacenado en este commit**

### Comparando commits

`git diff HEAD~2 HEAD` # **Muestra los cambios entre dos commits**

`git diff HEAD~2 HEAD file.txt` # **Cambios en file.txt solamente**

### Comprobación de un commit

`git checkout dad47ed` # **Comprueba el commit dado**

`git checkout master` # **Desprotege la branch maestra**

### Encontrar una mala commit

`git bisect start`

`git bisect bad` # **Marca la commit actual como un commit incorrecto**

`git bisect good ca49180` # **Marca el commit dado como un buen commit**

`git bisect reset` # **Termina la sesión de bisect**

### Encontrar colaboradores

`git shortlog`

### Ver el historial de un archivo

`git log file.txt` # **Muestra las commits que tocaron file.txt**

`git log --stat file.txt` # **Muestra estadísticas (el número de cambios) para file.txt**

`git log --patch file.txt` # **Muestra los parches (cambios) aplicados a file.txt**

### Encontrar el autor de las líneas

`git blame file.txt` # **Muestra el autor de cada línea en file.txt**

### Etiquetado

`git tag v1.0` # **Etiqueta la última commit como v1.0**

`git tag v1.0 5e7a828` # **Etiqueta una commit anterior**

`git tag` # **Lista todas las etiquetas (tags)**

`git tag -d v1.0` # **Elimina la tag dada**

## Ramificación (branching) y fusión (merge)

### Manejando branches

`git branch bugfix` # **Crea una nueva branch llamada bugfix**

`git checkout bugfix` # **Cambia a la branch de corrección de errores**

`git switch bugfix` # **Igual que el anterior**

`git switch -C bugfix` # **Crea y cambia**

`git branch -d bugfix` # **Elimina la branch de corrección de errores**

### Comparando branches

`git log master..bugfix` # **Enumera las commits en la bugfix branch que no están en el master**

`git diff master..bugfix` # **Muestra el resumen de cambios.**

### esconder

`git stash push -m "New tax rules"` # **Crea un nuevo stash**

`git stash list` # **Enumera todos los stashes**

`git stash show stash@{1}` # **Muestra el stash dado**

`git stash show 1` # **atajo para stash@{1}**

`git stash apply 1` # **Aplica el stash dado al directorio de trabajo**

`git stash drop 1` # **Elimina el stash dado**

`git stash clear` # **Borra todos los stashes**

### fusión (merge)

`git merge bugfix` # **Fusiona la bugfix branch en la branch actual**

`git merge --no-ff bugfix` # **Crea una merge commit incluso si FF es posible**

`git merge --squash bugfix` # **Realiza una squash merge**

`git merge --abort` # **Aborta la fusión (merge)**

### Visualización de las branches fusionadas

`git branch --merged` # **Muestra las branches fusionadas**

`git branch --no-merged` # **Muestra las branches no fusionadas**

### rebase

`git rebase master` # **Cambia la base de la branch actual**

### Cosecha de la cereza

`git cherry-pick dad47ed` # **Aplica el commit dado en la branch actual**

## Colaboración

### Clonar un repositorio

`git clone url`

### Sincronización con controles remotos

`git fetch origin master` # **Obtiene el master desde el origen**

`git fetch origin` # **Obtiene todos los objetos del origen**

`git fetch` # **Atajo para "git fetch origin"**

`git pull` # **Obtener + fusionar**

`git push origin master` # **Empuja master hacia el origen**

`git push` # **Atajo para "git push origin master"**

### Compartir etiquetas

`git push origin v1.0` # **Empuja la etiqueta v1.0 al origen**

`git push origin —delete v1.0`

### Compartiendo sucursales

`git branch -r` # **Muestra sucursales de seguimiento remoto**

`git branch -vv` # **Muestra sucursales de seguimiento locales y remotas**

`git push -u origin bugfix` # **Empuja bugfix hacia el origen**

`git push -d origin bugfix` # **Elimina la corrección de errores del origen**

### Administrar remotes

`git remote` # **Muestra repositorios remotos**

`git remote add upstream url` # **Agrega un nuevo control remoto llamado upstream**

`git remote rm upstream` # **Controles remotos aguas arriba**

## Reescribiendo la historia

### Deshacer commits

`git reset --soft HEAD^` # **Elimina la última commit, mantiene los cambios en escena**

`git reset --mixed HEAD^` # **Unstages los cambios también**

`git reset --hard HEAD^` # **Descarta los cambios locales**

### Revertir commits

`git revert 72856ea` # **Revierte el commit dado**

`git revert HEAD~3..` # **Revierte las últimas tres commits**

`git revert --no-commit HEAD~3..`

### Recuperar commits perdidas

`git reflog` # **Muestra la historia de HEAD**

`git reflog show bugfix` # **Muestra el historial del puntero de corrección de errores.**

### Modificando el último commit

`git commit --amend`

### Rebase interactivo

`git rebase -i HEAD~5`
