const axios = require('axios'); // Le module axios permet d'envoyer des requêtes HTTP (Exemple: la méthode GET) qui vas vérifier si le token est valide.
const { Client } = require('discord.js-selfbot-v13'); // La lib qui permettra au script de ce connecter a votre compte.
const readline = require('readline'); // Le module requis pour poser les questions et recevoir les réponses de l'utilisateur.
const colors = require('colors'); // Le module pour les couleurs Exemple: console.log(colors.cyan("Cyan: Couleur Cyan").
const figlet = require('figlet'); // Le module pour l'ASCII (Ligne: 14).

// Crée l'interface readline pour demande des valeurs a l'utilisateur.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  figlet('1667', (err, data) => {
    if (err) {
      console.log('Erreur lors de la génération de l\'ASCII :', err); // Logs d'erreur pour l'ASCII
      return;
    }
    // Afficher un message ASCII avec comme valeur '1667'.
    if (data) {
      console.log(colors.red.bold(data));
    } else {
      console.log('Erreur dans la génération de l\'ASCII.');
    }

    // Les crédits du code dans la console si vous voulez que les autres utilisateur sache a qui il appartient.
    console.log(colors.cyan("\nCredits: seven "));
    console.log(colors.magenta("Discord: https://discord.gg/gUKd463Nsk"));

   // Votre Code pose une question pour connaitre votre token/message et ensuite il éxecuter la suite du code.
    rl.question(colors.green("\nEntrez votre token : "), (token) => { 
      rl.question(colors.green("Entrez votre message : "), (messageDM) => {
        const client = new Client({});

        client.on('ready', async () => {
          let successCount = 0;
          let failedCount = 0;

          try {
            const allamis = (await axios({
              url: `https://discord.com/api/v10/users/@me/relationships`,
              method: "GET",
              headers: { authorization: token }
            })).data;

            const r = allamis.filter((user) => user.type == 1); // Les user de types 1 ce sont les utilisateurs que vous avez en ami.
            let compteur = 1; // Mettre le compteur a 1, il se mettra a jour a chaque message envoyer.
            console.log(colors.cyan("1667 DmAll ce lance..")); // Ce message informe que le dmall ce lance

            for (let i = 0; i < r.length; i++) {
              const friendToDM = await client.users.fetch(r[i].user.id);
              await friendToDM.send(messageDM.replace(`{user}`, `<@${friendToDM.id}>`))
                .then(() => {
                  console.log(`[${new Date().toLocaleTimeString()}] ${colors.green('[✓]')} ${r[i].user.username} : Dm réussi | ${colors.yellow(compteur)}`);
                  compteur += 1;
                  successCount++;
                })
                .catch(() => {
                  console.log(`[${new Date().toLocaleTimeString()}] [-] ${r[i].user.username} : Dm échoué`);
                  failedCount++;
                });
              await new Promise(resolve => setTimeout(resolve, 10));
            }

            console.log(colors.cyan("Tout vos amis on été dm..")); // Informer l'utilisateur que le script est fini.
            console.log(`[${new Date().toLocaleTimeString()}]  Résumé de votre DmAll: ${colors.green(`[Réussi: ${successCount} | Échoué: ${failedCount}]`)}`);
          } catch (error) {
            console.error(colors.red("Erreur lors du lancement du script."), error); // Indiquer a l'utilisateur qu'une erreur empêche le script de s'éxécuter et afficher l'erreur.
          }
        });

        client.login(token);
        
        // multipleResolves : Avertit si une promesse est résolue plus d'une fois.
        // rejectionHandled : Indique qu'une promesse rejetée a été gérée.
        //uncaughtException : Affiche les erreurs dans la console pour éviter que la console arrête le dmall.
        //unhandledRejection : Affiche les promesses rejetées qui ne sont pas traitées dans la console.
        //uncaughtExceptionMonitor : Surveille les exceptions sans intervenir et affiche leur origine.

        process.on('multipleResolves', (type, promise, value) => { return; });
        process.on('rejectionHandled', (promise) => { return; });
        process.on('uncaughtException', (error, origin) => { console.log(error); console.log(origin); });
        process.on('unhandledRejection', (reason, promise) => { console.log(reason); console.log(promise); });
        process.on('uncaughtExceptionMonitor', (error, origin) => { return; });

        console.log(colors.cyan("Connexion au serveur de 1667..")); // Message Optionel.

        rl.close(); // Ferme l'interface readline.
      });
    });
  });
}

main(); // Appel de la fonction main pour pouvoir démarer le script.
