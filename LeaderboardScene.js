import Phaser from 'phaser'
import SceneKeys from '../consts/SceneKeys'

// declare firebase to resolve TypeScript error
declare const firebase: any

var firebaseConfig = {
    apiKey: "AIzaSyCRKIp_ALm8rO_hNMtZ0CXWXcXis_6198w",
    authDomain: "smartpet-28571.firebaseapp.com",
	databaseURL: 'smartpet-28571-default-rtdb.firebaseio.com',
    projectId: "smartpet-28571",
    storageBucket: "smartpet-28571.appspot.com",
    messagingSenderId: "1008461771159",
    appId: "1:1008461771159:web:618a4b000cdf363327d4d2",
    measurementId: "G-Z54X7CR8GS"
}


// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default class Leaderboard extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Leaderboard)
	}
}