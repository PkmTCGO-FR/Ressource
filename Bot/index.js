const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
const PathFoldersObject = "./Objets/Membres";
var Prefix='!';

bot.login(process.env.TOKEN);
//bot.login('');

bot.on('ready',function(){
    bot.user.setGame("Aide : !gh");
})





//--------------- Help ---------------------------
bot.on('message', message => {
    var splitMessage = message.content.split(" ");
    if( (splitMessage[0] === Prefix+"gh") ){
        if(splitMessage.length === 1){
            message.author.sendMessage(
                '\n'+
                "----------------------------------------------------------------------"+'\n'+'\n'
                +"idtcg @user / Idtcg @user	=> indique le pseudo in game d'un membre"+'\n'
                +"!srole -r @user   		=> supprime le rôle NotExp"+'\n'
                +"!gbot -i          		=> info bot"+'\n'+'\n'
                
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
    //if(  PubTwitch  ){  message.delete()   }
    
    
    /*var RoleConseiller      =message.guild.roles.get("428729085234118687") //?_Conseiller
    
    var key_word1 = new RegExp('Liste de deck du JCC Pokémon');var key_word2 = new RegExp('Liste générée par le JCC Pokémon Online');
    var test1 = key_word1.test(message.content);var test2 = key_word2.test(message.content);
    var comparchannel=message.guild.channels.find("name", "plan-de-construction-🔨");
    
    if(   (message.channel.id !== comparchannel.id) && (test1 && test2) && !message.member.roles.has(RoleConseiller.id)   ){
        message.delete()
    }*/
    
})



//-------------- obtient le pseudo tcgo ----------------
bot.on('message', message => {

    var splitMessage = message.content.split(" ");
    if( (splitMessage[0] === "Idtcg") || (splitMessage[0] === "idtcg") ){
        
        if(splitMessage.length === 2){
            var idUser,
                IdDiscord=splitMessage[1].replace('<@','').replace('>','').replace('!',''),
				FilesUsers = require("Sayen-Raigin/Bot-Tcgo/.gitignore/Objets/Membres/ClassMembreDiscord.js");
			
			for(var i=1;i <= FilesUsers.length ;i++){
				if(FilesUsers['user'+i].id === IdDiscord){ idUser = FilesUsers['user'+i].idTcgo; break}
			}
            if(idUser){
                message.channel.sendMessage("Pseudo Ingame =>  "+idUser)
            }else{
                message.channel.sendMessage("Membre introuvable")
            }
        }
    }
})
