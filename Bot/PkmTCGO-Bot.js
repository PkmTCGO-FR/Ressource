const Discord = require('discord.js');
const fs = require("fs");
//const glob = require ("glob")
const PathFoldersObject = "./Objet";
const Prefix='!';
const PathDeckListe= "../Deck-Liste";
const bot = new Discord.Client();

bot.login(process.env.PremierPointTcgNon);

bot.on('ready',function(){
    bot.user.setGame("Aide : "+Prefix+"gh");
})



//--------------- Help ---------------------------
bot.on('message', message => {
    var splitMessage = message.content.split(" ");
    if( (splitMessage[0] === Prefix+"gh") ){
        if(splitMessage.length === 1){
            message.author.sendMessage(
                '\n'+
                "----------------------------------------------------------------------"+'\n'+'\n'
                +"!gbot -i          		=> info bot"+'\n'+'\n'
                +"idtcg @user / Idtcg @user	=> indique le pseudo in game d'un membre"+'\n'
                +"!liste Format NomDeck/NomPoke	=> Permet de trouver une deck liste dans le Github"+'\n'
                +"Exemple : !liste 2019 Ciza  ou  !liste Etendu ZoroarkMiasmax"+'\n'
                
                +"!tournoi -s       		=> lancer un Tournoi"+'\n'
                +"!tournoi -r       		=> s'inscrire à un tournoi (lancé par la commande !tournoi -s)"+'\n'
                +"!tournoi -e       		=> Met fin au tournoi"+'\n'+'\n'
                +"----------------------------------------------------------------------"
            )
        }
    }
    if(splitMessage[0] === Prefix+"gbot"){
        if(splitMessage[1] === "-i"){
            if(splitMessage.length === 2){
				message.channel.sendMessage(
					'\n'
					+"Nom du bot : Tcgo Bot"+'\n'
					+"Version : 1.0"+'\n'
					+"Première Update : le 05/08/2018"+'\n'
					+"Discord origine : "+message.guild.name
				)
			}
        }
    }
    if(splitMessage[0] === Prefix+"tournoi"){
        if(splitMessage.length === 2){
            message.channel.sendMessage("Indisponible pour le moment, attendre la version 2.0 de Tcgo Bot") 
        }
    }
})

//---------------- Supprime les PUB, mauvais postes, etc.. ----------------
bot.on('message', message => {
    
    var key_word = new RegExp('discord.gg/');
    var PubDiscord = key_word.test(message.content);
    if(  PubDiscord  ){  message.delete()   }
    
    key_word = new RegExp('www.twitch.tv');
    var PubTwitch = key_word.test(message.content);
    
})



//-------------- obtient le pseudo tcgo ----------------
bot.on('message', message => {
	
    var splitMessage = message.content.split(" ");
    
    if( (splitMessage[0] === "Idtcg") || (splitMessage[0] === "idtcg") ){
        
        if(splitMessage.length === 2){
            var idUser,
                IdDiscord=splitMessage[1].replace('<@','').replace('>','').replace('!',''),
				FilesUsers = require(PathFoldersObject+"/ClassMembreDiscord.js");
            
            for(var i=1;i <= process.env.Longueur ;i++){
                 if(FilesUsers['user'+i].id === IdDiscord){ idUser = FilesUsers['user'+i].idTcgo; break}
            }
            if(idUser){
                message.channel.sendMessage(idUser)
            }else{
                message.channel.sendMessage("Membre introuvable")
            }
        }
    }
})



// Recherche une deck liste

bot.on('message', message => {
    
    var splitMessage = message.content.split(" ");
    
    if(splitMessage[0] === Prefix+"liste"){
        
        if(splitMessage.length === 3){
            
            //var Annees=fs.readdirSync(PathDeckListe+"/Standard/", (err, files) => {files.length});
                //Format=fs.readdirSync(PathDeckListe+'/', (err, files) => {files.length}),
                //chemin;
            message.channel.sendMessage(fs.readFileSync("Bot/test.txt", "UTF-8"))
            //console.log(fs.constants)
            
            splitMessage[2]='*'+splitMessage[2]+'*';
            /*
            if(Annees.includes(splitMessage[1])){
                chemin=glob.sync(PathDeckListe+"/Standard/"+splitMessage[1]+"/" + splitMessage[2] + ".md")
                
                chemin.forEach(function(elem) {
                    message.channel.sendMessage("https://github.com/PkmTCGO-FR/Ressource/blob/master/"+elem.replace('../',''))
                });
                
            }else if(Format.includes(splitMessage[1])){
                chemin=glob.sync(PathDeckListe+'/'+splitMessage[1]+"/" + splitMessage[2] + ".md")
                
                chemin.forEach(function(elem) {
                    message.channel.sendMessage("https://github.com/PkmTCGO-FR/Ressource/blob/master/"+elem.replace('../',''))
                });
            }else{
                message.channel.sendMessage(
                    "Format ou deck liste introuvable !"+'\n'+'\n'
                    +"Les années existants pour le standard:"+'\n'
                    +Annees+'\n'+'\n'
                    +"Les formats existants dand le Github"+'\n'
                    +Format
                );
            }*/
        }
    } 
})