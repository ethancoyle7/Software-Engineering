# OUR PROJECT


## -----------------------------------------------------------------------------------------------------------------------#
##  Authors   : Ethan Coyle, Jereen LeBlanc, Paige Champagne, Fowzy Alsaud                                                #
##  Class     : Software Engineering CMPS 4991                                                                            #
##  Instructor: Dr. StringFellow                                                                                          #
##  Assignment: Semester Project                                                                                          #
##  Title     : Marleys Adventures                                                                                        #
##  Company   : Crispy Fried Chickens                                                                                     #
##  Date      : January 2022-April 2022                                                                                   #
###                                                                                                                       #
###  The purpose of this assignment was to develop a mobile application game representing a smart pet mobile application  #
###      in which the user signs into the game or creates an account and then they choose a pet. After choosing a pet,    #
###      the user is able to interact with their pet by feeding, bathing, clothing and playing with their pet. After      #
###      reaching a certain level, the user is then able to use their pet to fight another pet and to see if they can win #
###      the fight intensity is based upon the players level so the higher the level, the more intense the fight will be  #
###      in the main scene of the fight, if the pet is not taken care of, then the pet will run away after 3 hours of not #
###      being taken care of. If the pets health drains and the timer runs out, then the pet will die so make sure to take#
###      care of you pet. The player is able to interact with the pet on the main scene by clicking any of the icons      #
###      locate on the bottom portion of the main scene by either clicking or dragging to the screen. The result of these #
###      actions will effect the status bars of the players health. On the title scene before choosing the egg to choose  #
###      their pet, they can click the info button at the top left to view in game information to help them as well.      #
###      the game is pretty straight forward even in the fight scene, the player will be faced with an opponent and in the#
###      bottom right, there will be an atack bar of all the available attacks, these buttons are interactive so when     #
###      user clicks on any of the buttons, they will directly affect the enemy you are facing. In the game over scenes,  #
###      the user is able to view a few options: retry fight, back to main or exit(which will lead to the title scene     #
###      in which the player can choose another pet) doing this however reset all the stats of the player including the   #
###      level.                                                                                                           #
### ----------------------------------------------------------------------------------------------------------------------#



|   #    | File Link       | Description                          |
|------- |-------------------|-------------------------------------------------|
| [01](.BootScene.js]| [BootScene](./BootScene.js) | [ This Link Leads to the scene where all the contents are booted](./BootScene.js)|
| [02](.TitleScene.js) |  [MainScene](./TitleScene.js) | [ This Link leads to the Title Scene(where the user will choose their egg)](./TitleScene.js)|
| [02](.MainScene.js) |  [MainScene](./MainScene.js) | [ This Link leads to the Main Scene in which is the first scene that is loaded](./MainScene.js)|
| [03](.BootScene.js) |  [Fight Scene](./BootScene.js) | [ This File contains all the scope for the Battling Pet Scene](./BootScene.js)|
| [03](.WinScene.js) |  [Win Scene](./WinScene.js) | [ If the player wins a fight from the FightScene](./WinScene.js)|
| [03](.GameOver.js) |  [GameOver](./GameOver.js) | [ If The player loses a fight from the FightScene](./GameOver.js)|




## Main Functioning Game Scenes
## ----------------------------


# BootScene
### Inside of the boot scene, all of the assests and sprite sheets and sounds are loaded into the game
### This is the second scene of the game after the user successfully logins into the game or creates and account and logins in
### Once all the assests are loaded up into the game, the game will then transition to the Title Scene

# Title Scene

### Inside of the TitleScene the main cover for our project will be displayed
### On the bottom half of the screen, three eggs will be displayed (REd,White and Blue Eggs)
### If the user has just created an account, then this scene will keep displaying until the user selects and egg
### After the user selects an egg, the firebase will store our game with that players information including the nickname they game the pet
### and the color in which was selected.
### After this happens, anytime the user logs into their account again through the game, the title screen will be displayed and the user will 
### be led straight to the  mainscene because they already selected a character.

# MainScene

### The main scene is called whenever the user chooses a pet from the title scene or as redirected to the main scene from the login screen which the authenticates the firebase uh with the users information and the pet color that they chosen inside of the bane scene up at the top left you will see three icons a health icon a satisfaction icon and a happiness icon all three of these bars will decrement over the course of the main scene and will end initiate a a runaway scene or a fight scene or a or a game over scene inside the main scene the purpose of this scene is to interact with your pet and to do this down on the bottom of the screen there will be four different interaction items and which the player can either click on or drag to the screen and whenever these are interacted with this will directly affect the pets health happiness and hunger and if the player and interacts with a pet depending on the level depends on the amount of sperian's that they get and they experience will affect the level once the player reaches the level 10 then they are able to fight a pet which that button will pop up on the screen and that player can click on it and load up the fight scene and they can battle another pet and also loaded up on the screen there is an exit button so if the player wants to exit the game and go back to the login screen then they can click on that then it will log them out of the game


# Fight Scene

### Once a user loads up the fight scene then they will see two different sprites on the screen the Sprite up at the top right corner will be the enemy that they are fighting and the Sprite that is in the bottom left corner will be the player Sprite and the character that they chosen underneath that they will both have a health bar and underneath the health bar will be the players name then over on the bottom right there will be a box that has all the attack methods that the player is able to use to fight the pet and those are labeled light attack heavy attack and double punch depending on the level of the character is the amount of damage that each one of these buttons hits whenever the player pushes down on the battle fight icons up at the top left corner there will also be a return button that if the player clicks on that return button they will return back to the main scene however if the player chooses this option they are fleeing from the fight and their level that they accumulated over the game will decrease by two as punishment for abandoning the fight whenever the player kills the enemy pet that they are fighting against they will be taken to the winning scene and which there are couple options for the use of the choose and their level is increased by two since they have won the fight and gain some experience points however if the player loses the fight and the fight scene they will be taken to the game overseen and which the player will lose 2 points and their pet has died so they must re choose another pet and start all over again so the object of the fight scene is too fight an enemy pit and win the battle

# Win Scene

### The player will enter the win scene if they win a battle inside of the fight scene and they will see a icon up at the top letting them know that they won underneath that they will see there character that they chose dancing a dance of victory and then underneath this there will be three options for the user to choose they will be able to retry a fight to try to gain more experience which will take them back to the fight scene and they will be facing that different opponent the second option that the user has is to return to the main scene in which they will be redirected to the main scene and their level will be increased by two because they wanna fight or that third option on the screen is for the user to exit the game which will take them back to the title scene to choose another pet if they want to

# Game Over 

### The player will reach the game over scene if they lose a fight inside of the fight scene in this case their character that they chosen is no longer able to be used and they will lose all the experience points and all of the level that they had and they have two options to choose from they can either retry a fight to try to salvage what they lost or they can be redirected back to the main to the title scene in which they can choose a different pet to use and which case their level will be reset and all of their experiences last so the main point of the fight scene is for the player that is fighting the opponent to win the fight that way they don't lose all the experience that they gain over playing the game


## Alternative Scenes From the Main Scene
## --------------------------------------

# RunAwayScene

### As per requirements from the beginning of the semester and our project the character that the player chooses must be taken care of and if it is not taken care of after three hours and even after getting notifications on the main scene to try to take care of their pets if the player fails to do so then their pet will run away and this scene is initiated and the only options that the player has from here is to go back to the title scene and choose another pet so the main object of this scene is to have the player enter act with the pet and not have the pet run away due to negligence on the user's part

# Main DeadScene

### This scene is initiated if the player fails to take care of their pet and their health bar of their pet remains below a certain value for a certain amount of time if the player does not take care of their pet over the allotted time then this scene will be called and will inform the user that they fail to feed their pet and their pet died from hunger so to avoid getting to this scene inside of the main scene that player must keep interacting with their pet and if they are not interacting with their pet over the course of three hours then their pet will die and they can't salvage that pet they need to go back and we choose another pet and start all over again



# HTML DOCUMENTS

|   #    | File Link       | Description                          |
|------- |-------------------|-------------------------------------------------|
| [01](.forget_password.html) |  [forgot password](./forget_password.html) | [ forgot password](./forget_password.html)|
| [02](.index.html) |  [Index](./index.html) | [ Index html file](./index.html)   |
| [03](.login.html) |  [login](./login.html) | [ login html](./login.html)   |

# Firebase Documents

# INSTRUCTIONS TO PLAY THE GAME

#### Load up the game inside of the browser
####  1. Player Will login, signup or play as guest 
####  2. Once Authenticated, Title Scene will display
####  3. Once a egg is chosen, the main scene will load
####  4. On the Main Scene interact with the pet to gain experience
####  5. For every 10 points of experience gain a level.
####  6. At level 10, player is able to fight another pet
####  7. After Fight sequence is over can go back to main or chose another pet
####  8. Make sure you feed your pet before 3 hours runs out or your pet will run away!!
####  9. HAVE FUN

## Produced and managed by the Crispy Fried Chickens

