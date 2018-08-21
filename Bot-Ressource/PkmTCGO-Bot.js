const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
const PathFoldersObject = "./t";
var Prefix='!';

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
    
    
    /*var RoleConseiller      =message.guild.roles.get("") //?_Conseiller
    
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
				FilesUsers = require(PathFoldersObject+"/ClassMembreDiscord.js");
                //FileUsers=fs.readdirSync(PathObjetsUsers, (err, files) => {files.length});
            /*for(var i=0;;i++){
                if (i >= FileUsers.length) break;
                var contenu = fs.readFileSync(PathObjetsUsers+'/'+FileUsers[i], "utf8")
				monobjet = JSON.parse(contenu);
				if(monobjet.id === IdDiscord){ idUser = monobjet.idTcgo}
                //console.log(i)
            }*/
			
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


/*
//--------------- Gestion role ------------------------
bot.on('message', message => {
    var RoleConseiller      =message.guild.roles.get("") //?_Conseiller
    var RoleNotBuild        =message.guild.roles.get("") //💫 NotExp 💫
    // Avec guild.memebr on réceptionne le message, puis on lui envoie l'autheur du messaega afin de capturer l'objet utilisateur ! 
    var UserMessage         =message.guild.member(message.author)
    
    var comparchannel=message.guild.channels.find("name", "plan-de-construction🔨");
    if(message.channel.id === comparchannel.id ){
       if(!message.member.roles.has(RoleConseiller.id)){UserMessage.addRole(RoleNotBuild).catch(console.error)} 
    }
    
    // la fonction split() (comme dans powershell), va ségmenter les caractères dans un tableaux
    var splitMessage = message.content.split(" ");
    
    //set-rôle -rm
    if(splitMessage[0] === Prefix+'srole'){
        
        // Paramètre de suppression de rôle
        if(splitMessage[1] === '-r'){
	
            if(splitMessage.length === 3){
                
                if(message.member.roles.has(RoleConseiller.id)){
                    var TargetUser = message.guild.member(message.mentions.users.first())
                    if(TargetUser){ TargetUser.removeRole(RoleNotBuild) ; message.reply("Le rôle"+RoleNotBuild.name+" a été supprimé")}
                }else {
                    message.author.sendMessage(
                        "Tu n'as pas la permission d'utiliser cette commande !"+'\n'+'\n'
                        +"Dans le discord "+message.guild.name+", seul les membres ayant le rôle "
                        +RoleConseiller.name+" peuvent l'utiliser (:p) "
                    )
                }
            }
        }
    }
})
*/
