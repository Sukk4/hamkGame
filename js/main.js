var mouseX = 100, mouseY = 100;
var getMouseCoords = function(event){
    var x = event.pageX;
    var y = event.pageY;
    mouseX = x;
    mouseY = y;
}
var mouseDown1 = function(){  
    mouseDown = true;
}
var mouseUp1 = function(){  
    mouseDown = false;
}
function rand_range(a, b) {
	return Math.floor(Math.random()*(b-a+1))+a;
}

//----------------AUDIO-----------------------------

//var hamkMusic = ( new Audio("audio/hamk-stories.ogg"));
//var hamkMusic = (new Audio("audio/hamk-stories.mp3"));
var hamkMusic = document.getElementById("hamkMusic");
hamkMusic.volume = 0.3;
hamkMusic.loop = true;
hamkMusic.play();

var selectAud1 = new Audio("audio/select1.wav");
var selectAud2 = new Audio("audio/select2.wav");
var selectAud3 = new Audio("audio/select3.wav");
var selectAud4 = new Audio("audio/select4.wav");

// ----------------- THREE JS ----------------------

var scene 	= new THREE.Scene();
var camera 	= new THREE.PerspectiveCamera( 60, 1980/1080, 0.1, 1000 );

var threeCanvas = document.getElementById("threeCanvas");

var projector = new THREE.Projector();

var renderer = new THREE.WebGLRenderer({canvas: threeCanvas, antialias:true});
renderer.shadowMapEnabled = true;

threeCanvas.style.top = 0 + "px";
threeCanvas.style.left = 0 + "px";

document.body.appendChild( renderer.domElement );


renderer.setClearColor(0xffffff, 1);

var material = new THREE.MeshNormalMaterial();

camera.position.z = 10;
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize( event ) {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//--------------MODEL LOADER------------------------

loader = new THREE.JSONLoader();

// -------------------------------------------------

var hamkVid, hamkVideoTexture2;
vidPlaying = false;

/*

hamkVid = document.getElementById('hamkVideo');
hamkVid.loop = false;
hamkVid.onended = function(){
	resetStartPic();
	nextPic();
	hamkMusic.currentTime = 0;
	hamkMusic.play();	
}
hamkVid.volume = 0.5;

hamkVideoTexture2 = new THREE.Texture( hamkVid );
hamkVideoTexture2.minFilter = THREE.LinearFilter;
hamkVideoTexture2.magFilter = THREE.LinearFilter;
hamkVideoTexture2.format = THREE.RGBFormat;
hamkVideoTexture2.generateMipmaps = false;
var hamkVid2Mat = new THREE.MeshLambertMaterial({ map: hamkVideoTexture2 });
*/
var mat = new THREE.MeshLambertMaterial({ color:0xffffff });
var imgPlane = new THREE.Mesh(new THREE.PlaneGeometry(16/1.5, 9/1.5), mat/*hamkVid2Mat*/);

imgPlane.overdraw = true;
imgPlane.rotation.x = Math.PI * 0.1;
//scene.add(imgPlane);
imgPlane.position.set( -3, -1, -2 );
imgPlane.rotation.y = 0.4;
imgPlane.rotation.x = -0.1;


var sphereMat = new THREE.MeshPhongMaterial({color: 0xffffff,shininess: 1,specular: 0x000000,/*shading: THREE.SmoothShading,*/ shading: THREE.FlatShading});
var sphereMat2 = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/aalto.png"),overdraw:true});
sphereMat.side = THREE.BackSide;
sphereMat2.side = THREE.BackSide;

var sphere = new THREE.Mesh(new THREE.SphereGeometry(265,128,128,0,Math.PI*2,0,Math.PI),sphereMat2);
sphere.position.set(0,0,-250);

scene.add(sphere);



var startTween;
function startPlaneAnimation(anim){
	var targetPos;
	var pos = startPlane.position;	
	if (anim == 1){
		targetPos = {x:7.5,y:0,z:0};
	} else {
		targetPos = {x:15,y:0,z:0};
	}
	var startTween = new TWEEN.Tween(pos).to(targetPos,1000);	
	
	startTween.onUpdate(function(){			
		startPlane.position.x = pos.x;
		startPlane.position.y = pos.y;
		startPlane.position.z = pos.z;		
	});
	startTween.easing(TWEEN.Easing.Quintic.InOut);
	startTween.start();
}

var startPlane = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 9), new THREE.MeshLambertMaterial({
	//color: 0x0000ff,
	map: THREE.ImageUtils.loadTexture("img/startplane.png"),
	overdraw: true
}));

startPlane.position.set(7.5,0,0);
scene.add(startPlane);







var aPlane1 = new THREE.Mesh(new THREE.PlaneGeometry(5.5, 3.5), new THREE.MeshLambertMaterial({color: 0x003959}));
var aPlaneGeo = new THREE.PlaneGeometry(5, 3.33);

var aPlaneArr = [];

function aPlaneArrDefaultRot(){
	var rotX = 0;
	var rotY = 0;
	var rotZ = 0;
	var arr = [
		{x : rotX , y : rotY, z : rotZ},
		{x : rotX , y : rotY, z : rotZ},
		{x : rotX , y : rotY, z : rotZ},
		{x : rotX , y : rotY, z : rotZ},
		{x : rotX , y : rotY, z : rotZ},
		{x : rotX , y : rotY, z : rotZ}
	];

	return arr; 
}

// functio palauttaa vastaus planejen default sijainnit animaatiota varten
function aPlaneArrDefaultPos(){
	var syvyys = 0;
	var ylakorkeus = 2;
	var alakorkeus = -2;
	var arr = [
		{x : -7 , y : ylakorkeus, z : syvyys},
		{x : 0 , y : ylakorkeus	, z : syvyys},
		{x : 7 , y : ylakorkeus	, z : syvyys},
		{x : -7 , y : alakorkeus, z : syvyys},
		{x : 0 , y : alakorkeus	, z : syvyys},
		{x : 7 , y : alakorkeus	, z : syvyys}
	];
	return arr; 
}

// functio palauttaa vastaus planejen sivu sijainnit animaatiota varten
function newATweenPos(){
	var syvyys = -10;
	var ylakorkeus = 4;
	var alakorkeus = -4;
	var sivulle = 25;
	var arr = [
		{x : -sivulle , y : ylakorkeus*1.5, z : syvyys},
		{x : 0 , y : ylakorkeus*(-4), z : syvyys},
		{x : sivulle , y : ylakorkeus*1.5, z : syvyys},
		{x : -sivulle , y : alakorkeus*1.5, z : syvyys},
		{x : 0 , y : ylakorkeus*(-4), z : syvyys},
		{x : sivulle , y : alakorkeus*1.5, z : syvyys}
	];
	return arr; 
}

// functio palauttaa vastaus planejen rotaatiot animaatiota varten
function newATweenRot(){
	var rotX = 0;
	var rotY = Math.PI*0.5;
	var rotZ = 0;
	var arr = [
		{x : rotX , y : rotY, z : rotZ},
		{x : rotX , y : 0, z : rotZ},
		{x : rotX , y : -rotY, z : rotZ},
		{x : rotX , y : rotY, z : rotZ},
		{x : rotX , y : 0, z : rotZ},
		{x : rotX , y : -rotY, z : rotZ}
	];
	return arr; 
}

var aTweenArr = {
	pos:[],
	rot:[]
};
function aAnimation(anim){
	if (anim >= 1 && anim <= 10){
		var targetPos = newATweenPos();
		var targetRot = newATweenRot();
		if (result!==1){
			setTimeout(aAnimation,1050);
			setTimeout(pushNewQAPics,1050);
		}
		

	} else {
		var targetPos = aPlaneArrDefaultPos();
		var targetRot = aPlaneArrDefaultRot();
	}

	
	for(i = 0; i < aPlaneArr.length; i++ ){
		aPos = aPlaneArr[i].position;
		aRot = aPlaneArr[i].rotation;
		
		aTweenArr.pos[i] = new TWEEN.Tween(aPos).to(targetPos[i],1000);
		aTweenArr.rot[i] = new TWEEN.Tween(aRot).to(targetRot[i],1000);
		
		
	}
	for(i = 0; i < aTweenArr.pos.length; i++ ){
		var a = i;
		aTweenArr.pos[a].onUpdate(function(){			
			aPlaneArr[a].position.x = aPos.x;
			aPlaneArr[a].position.y = aPos.y;
			aPlaneArr[a].position.z = aPos.z;
		});
		aTweenArr.rot[i].onUpdate(function(){			
			aPlaneArr[a].rotation.x = aRot.x;
			aPlaneArr[a].rotation.y = aRot.y;
			aPlaneArr[a].rotation.z = aRot.z;
		});

		aTweenArr.rot[i].start();
		aTweenArr.pos[i].start();

		if (anim==undefined){
			//anim = rand_range(1,10);
			anim = 1;
		}
		if (anim == 1){
			aTweenArr.pos[i].easing(TWEEN.Easing.Quintic.InOut);
			aTweenArr.rot[i].easing(TWEEN.Easing.Quintic.InOut);
		}
		else if (anim == 2){
			aTweenArr.pos[i].easing(TWEEN.Easing.Quartic.In);
		}
		else if (anim == 3){
			aTweenArr.pos[i].easing(TWEEN.Easing.Quadratic.Out);
		}
		else if (anim == 4){
			aTweenArr.pos[i].easing(TWEEN.Easing.Quadratic.InOut);
		}
		else if (anim == 5){
			aTweenArr.pos[i].easing(TWEEN.Easing.Cubic.In);
		}
		else if (anim == 6){
			aTweenArr.pos[i].easing(TWEEN.Easing.Cubic.Out);
		}
		else if (anim == 7){
			aTweenArr.pos[i].easing(TWEEN.Easing.Cubic.InOut);
		}
		else if (anim == 8){
			aTweenArr.pos[i].easing(TWEEN.Easing.Quartic.InOut);
		}
		else if (anim == 9){
			aTweenArr.pos[i].easing(TWEEN.Easing.Circular.InOut);
		}
		else if (anim == 10){
			aTweenArr.pos[i].easing(TWEEN.Easing.Back.InOut);
		}
	}	
}


// functiolla palautetaa uudet sijainnit kysymysplanelle animaatiota varten
var qTween;
function qAnimation(anim){
	var targetPos;
	if (anim == 1){
		targetPos = {x:0,y:15,z:-10}; // kysymyksen vaihtuessa uusi sijainti
		if (result!==1){
			setTimeout(qAnimation,1050);
		}	

	} else if (anim!=1){ 
		targetPos = {x:0,y:4.75,z:0}; // default sijainti
		

	}	

	var qPos = qPlane.position;
	var qTween = new TWEEN.Tween(qPos).to(targetPos,1000);

	qTween.onUpdate(function(){
		qPlane.position.x = qPos.x;
		qPlane.position.y = qPos.y;
		qPlane.position.z = qPos.z;
	});
	qTween.easing(TWEEN.Easing.Quintic.InOut);
	qTween.start();
}

// array kuvista aloitus ruutua varten (kuvat jotka liikkuu ruudun halki)
var startScreenPictures = [
	new THREE.ImageUtils.loadTexture("img/start1.png"),
	new THREE.ImageUtils.loadTexture("img/start2.png"),
	new THREE.ImageUtils.loadTexture("img/start3.png"),
	new THREE.ImageUtils.loadTexture("img/start4.png"),
	new THREE.ImageUtils.loadTexture("img/start5.png"),
	new THREE.ImageUtils.loadTexture("img/start6.png"),
	new THREE.ImageUtils.loadTexture("img/start7.png"),
	new THREE.ImageUtils.loadTexture("img/start8.png"),
	new THREE.ImageUtils.loadTexture("img/start9.png"),
	new THREE.ImageUtils.loadTexture("img/start10.png"),
	new THREE.ImageUtils.loadTexture("img/start11.png"),
	new THREE.ImageUtils.loadTexture("img/start12.png"),
	new THREE.ImageUtils.loadTexture("img/start13.png"),
	new THREE.ImageUtils.loadTexture("img/start14.png"),
	new THREE.ImageUtils.loadTexture("img/start15.png"),
	new THREE.ImageUtils.loadTexture("img/start16.png"),
	new THREE.ImageUtils.loadTexture("img/start17.png"),
	new THREE.ImageUtils.loadTexture("img/start18.png")
];

picPlaneArr = [];
for (i=0; i<startScreenPictures.length; i++){	
	
	picPlaneArr.push(new THREE.Mesh(aPlaneGeo, new THREE.MeshLambertMaterial({map: startScreenPictures[i]})));
	picPlaneArr[i].scale.set(1.6,1.6,1.6);
	picPlaneArr[i].position.set(150,50,-100);
	
}

var hamkpictures = [

	// Answers for first question
	new THREE.ImageUtils.loadTexture("img/q1a1.png"),
	new THREE.ImageUtils.loadTexture("img/q1a2.png"),
	new THREE.ImageUtils.loadTexture("img/q1b1.png"),
	new THREE.ImageUtils.loadTexture("img/q1b2.png"),
	new THREE.ImageUtils.loadTexture("img/q1c1.png"),
	new THREE.ImageUtils.loadTexture("img/q1c2.png"),

	// Answers for second question
	new THREE.ImageUtils.loadTexture("img/q2a1.png"),
	new THREE.ImageUtils.loadTexture("img/q2a2.png"),
	new THREE.ImageUtils.loadTexture("img/q2b1.png"),
	new THREE.ImageUtils.loadTexture("img/q2b2.png"),
	new THREE.ImageUtils.loadTexture("img/q2c1.png"),
	new THREE.ImageUtils.loadTexture("img/q2c2.png"),

	// Answers for third question
	new THREE.ImageUtils.loadTexture("img/q3a1.png"),
	new THREE.ImageUtils.loadTexture("img/q3a2.png"),
	new THREE.ImageUtils.loadTexture("img/q3b1.png"),
	new THREE.ImageUtils.loadTexture("img/q3b2.png"),
	new THREE.ImageUtils.loadTexture("img/q3c1.png"),
	new THREE.ImageUtils.loadTexture("img/q3c2.png"),	

	// Answers for fourth question
	new THREE.ImageUtils.loadTexture("img/q4a1.png"),
	new THREE.ImageUtils.loadTexture("img/q4a2.png"),
	new THREE.ImageUtils.loadTexture("img/q4b1.png"),
	new THREE.ImageUtils.loadTexture("img/q4b2.png"),
	new THREE.ImageUtils.loadTexture("img/q4c1.png"),
	new THREE.ImageUtils.loadTexture("img/q4c2.png"),

	// Answers for fifth question
	new THREE.ImageUtils.loadTexture("img/q5a1.png"),
	new THREE.ImageUtils.loadTexture("img/q5a2.png"),
	new THREE.ImageUtils.loadTexture("img/q5b1.png"),
	new THREE.ImageUtils.loadTexture("img/q5b2.png"),
	new THREE.ImageUtils.loadTexture("img/q5c1.png"),
	new THREE.ImageUtils.loadTexture("img/q5c2.png"),

	// Answers for sixth question
	new THREE.ImageUtils.loadTexture("img/q6a1.png"),
	new THREE.ImageUtils.loadTexture("img/q6a2.png"),
	new THREE.ImageUtils.loadTexture("img/q6b1.png"),
	new THREE.ImageUtils.loadTexture("img/q6b2.png"),
	new THREE.ImageUtils.loadTexture("img/q6c1.png"),
	new THREE.ImageUtils.loadTexture("img/q6c2.png"),

];


var aTextures = [
	new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/q1a1.png")}),
	new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/q1a2.png")}),
	new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/q1b1.png")}),
	new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/q1b2.png")}),
	new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/q1c1.png")}),
	new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/q1c2.png")})
];
for (i=0; i<6; i++){	
	//aTextures[i].map = hamkpictures[i];		
	aPlaneArr.push(new THREE.Mesh(aPlaneGeo, aTextures[i]));
}

aPlaneArr[0].position.x = -25;
aPlaneArr[0].position.y = 6;
aPlaneArr[0].position.z = -10;

aPlaneArr[1].position.x = 0;
aPlaneArr[1].position.y = -24;
aPlaneArr[1].position.z = -10;

aPlaneArr[2].position.x = 25;
aPlaneArr[2].position.y = 6;
aPlaneArr[2].position.z = -10;

aPlaneArr[3].position.x = -25;
aPlaneArr[3].position.y = 6;
aPlaneArr[3].position.z = -10;

aPlaneArr[4].position.x = 0;
aPlaneArr[4].position.y = -24;
aPlaneArr[4].position.z = -10;

aPlaneArr[5].position.x = 25;
aPlaneArr[5].position.y = 6;
aPlaneArr[5].position.z = -10;
function pushNewQAPics(){
	if (question>=1 && question <= 6){
		qMat.map = qPics[question-1];
	}
	for (i=0;i<6;i++){
		if (question == 1){
			aTextures[i].map = hamkpictures[i];
			
		}
		else if (question == 2){
			aTextures[i].map = hamkpictures[i+6];
			
		}
		else if (question == 3){
			aTextures[i].map = hamkpictures[i+12];
			
		}
		else if (question == 4){
			aTextures[i].map = hamkpictures[i+18];
			
		}
		else if (question == 5){
			aTextures[i].map = hamkpictures[i+24];
			
		}
		else if (question == 6){
			aTextures[i].map = hamkpictures[i+30];
			
		}

		aPlaneArr[i].material.map.needsUpdate = true;
		scene.add(aPlaneArr[i]);

	}

	
}


/// RESULT PLANE-------------------------

var mat247 = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture("img/247.png")
})
var mat18100 = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture("img/18-100.png")
})
var mat810 = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture("img/8-16.png")
})
var r247Plane = new THREE.Mesh(new THREE.PlaneGeometry(10,10),mat247);
r247Plane.position.set(-4,0,-2);

var r18100Plane2 = new THREE.Mesh(new THREE.PlaneGeometry(10,10),mat18100);
r18100Plane2.position.set(7,3,-2);

var r816Plane3 = new THREE.Mesh(new THREE.PlaneGeometry(10,10),mat810);
r816Plane3.position.set(7,-3,-2);

function resultAnim(object, targetPos){
	var pos = object.position;	
	
	var resultTween = new TWEEN.Tween(pos).to(targetPos,2000);
	var b = currentStartPic-1;
	
	resultTween.onUpdate(function(){			
		object.position.x = pos.x;
		object.position.y = pos.y;
		object.position.z = pos.z;		
	});
	resultTween.easing(TWEEN.Easing.Quintic.InOut);
	resultTween.start();
}



//---------------Lighting---------------------------
var greenLight = new THREE.PointLight( 0xffffff, 2, 400 );
var whiteLight = new THREE.PointLight( 0xffffff, 0.5, 25 );

var spotLight = new THREE.SpotLight( 0xffffff , 1.1, 2000);
var spotLight2 = new THREE.SpotLight( 0xffffff , 1, 2000);
spotLight.position.set( 100, 0, 500 );
scene.add( spotLight );

var lightCube = new THREE.BoxGeometry( 1, 1, 1 );
var greenLightCube = new THREE.Mesh(lightCube,material);
whiteLight.position.set( 0, 0, 5 );
greenLight.position.set( 0, 0, -500 );
scene.add( greenLight );
scene.add( whiteLight );


//--------------------------------------------------


//---------------HAMK LOGO---------------------------


var hamkLogoTween;
function hamkLogoAnimation(anim){
	var targetPos;
	var pos = hamkLogo.position;	
	if (anim == 1){
		targetPos = {x:-6,y:4.5,z:-2};
	} else {
		targetPos = {x:-20,y:3,z:-2};
	}
	var hamkLogoTween = new TWEEN.Tween(pos).to(targetPos,1000);	
	
	hamkLogoTween.onUpdate(function(){			
		hamkLogo.position.x = pos.x;
		hamkLogo.position.y = pos.y;
		hamkLogo.position.z = pos.z;		
	});
	hamkLogoTween.easing(TWEEN.Easing.Quintic.InOut);
	hamkLogoTween.start();
}

hamkLogoMatArr = [];

hamkLogoMatArr.push(new THREE.MeshLambertMaterial( { color : 0x00688f }));
hamkLogoMatArr.push(new THREE.MeshLambertMaterial( { color : 0x00688f }));
hamkLogoMatArr.push(new THREE.MeshLambertMaterial( { color : 0x00688f }));
hamkLogoMatArr.push(new THREE.MeshLambertMaterial( { color : 0x00688f }));
hamkLogoMatArr.push(new THREE.MeshLambertMaterial( { map : new THREE.ImageUtils.loadTexture( "img/hamkLogo.png" )}));
hamkLogoMatArr.push(new THREE.MeshLambertMaterial( { color : 0x00688f }));

var hamkLogoGeo = new THREE.BoxGeometry( 3.17, 1.65, 0.2 );
var hamkLogoMat = new THREE.MeshFaceMaterial( hamkLogoMatArr );
var hamkLogo = new THREE.Mesh( hamkLogoGeo, hamkLogoMat );
hamkLogo.position.set( -6, 4.5, -2 );
hamkLogo.scale.set(1.75,1.75,1.75);
scene.add( hamkLogo );


/*
var hamkLogo;
loader.load('models/hamk.js', function(geometry){
	var hamkLogoMat = new THREE.MeshLambertMaterial({ color: 0x00688f, shading: THREE.FlatShading});
	hamkLogo = new THREE.Mesh(geometry,hamkLogoMat);
	hamkLogo.position.set(-6, 3, -2);
	hamkLogo.scale.set(2, 2, 2);
	scene.add(hamkLogo);	
	
});*/


//hamkLogoGeom.position.y = -2;
//--------------------------------------------------


//---------------NextBox---------------------------

var nextBoxGeo = new THREE.BoxGeometry(3,1.5,0.5);
var nextBoxMat = new THREE.MeshLambertMaterial({color: 0xfaaaff});
var nextBox = new THREE.Mesh(nextBoxGeo,nextBoxMat);
nextBox.position.set(7,-4.5,-10);
//scene.add(nextBox);

//---------------Qboxes------------------------------
var qmat = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("img/q1.png")})
var qBoxMat = new THREE.MeshLambertMaterial({color: 0xffffff});
var qBoxGeo = new THREE.BoxGeometry( 25, 3, 1);
var qBox = new THREE.Mesh(qBoxGeo,qmat);
qBox.position.set(0, 10, -10);

//scene.add(qBox);
//aSelectedPlane.position.set(0,2,1)
var qBoxRotTween;
var qBoxTween;
function qBoxRotateTween(){
	var rot = qBox.rotation;
	var targetrot = { x : rot.x+(Math.PI*0.5), y : rot.y, z : rot.z };	
	qBoxRotTween = new TWEEN.Tween(rot).to(targetrot,1000);
	qBoxRotTween.easing(TWEEN.Easing.Bounce.Out);
	qBoxRotTween.onUpdate(function(){
		qBox.rotation.x = rot.x;
		qBox.rotation.y = rot.y;
	});
	qBoxRotTween.start();
}

var qPics = [
	// questions
	new THREE.ImageUtils.loadTexture("img/q1.png"),
	new THREE.ImageUtils.loadTexture("img/q2.png"),
	new THREE.ImageUtils.loadTexture("img/q3.png"),
	new THREE.ImageUtils.loadTexture("img/q4.png"),
	new THREE.ImageUtils.loadTexture("img/q5.png"),
	new THREE.ImageUtils.loadTexture("img/q6.png")
]
var qMat = new THREE.MeshLambertMaterial({map: new THREE.ImageUtils.loadTexture("img/q1.png")});
var qPlane = new THREE.Mesh(new THREE.PlaneGeometry(15, 1), qMat);
qPlane.position.set(0,15,-10);
//scene.add(qPlane);

//-----------------models-----------------------------

loader.load('models/seuraava5.js', function(geometry){
	var seuraavaMat = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture('models/seuraavamap.png'),
		shading: THREE.FlatShading,

	});
	seuraava = new THREE.Mesh(geometry,seuraavaMat);
	seuraava.rotation.x = Math.PI*(0.5);
	seuraava.scale.set(0.3,0.3,0.3);
	seuraava.position.set(7,-4.8,0);

});
var sTween, sTween2;
var sAnim = 1;
function seuraavaAnim(){
	var targetRot;
	
	if (sAnim == 1){
		targetRot = {x:Math.PI*(2.5),y:0,z:0};
		sAnim = 0;

	} else if (sAnim!=1){
		targetRot = {x:Math.PI*(0.5),y:0,z:0};
		sAnim = 1;
	}

	var sRot = seuraava.rotation;	
	var sTween2 = new TWEEN.Tween(sRot).to(targetRot,2000);

	sTween2.onUpdate(function(){
		seuraava.rotation.x = sRot.x;
		
	});
	sTween2.easing(TWEEN.Easing.Quintic.Out);
	
	sTween2.start();
	

}




var blueOrbsSpriteArr = [];
var blueOrbsSpriteGroup = new THREE.Object3D();
var yellowOrbTexture = THREE.ImageUtils.loadTexture('img/yelloworb.png');
var blueOrbTexture = THREE.ImageUtils.loadTexture('img/blueorb.png');
var blueOrbMat = new THREE.SpriteMaterial( {map:blueOrbTexture, useScreenCoordinates: false});
var yellowOrbMat = new THREE.SpriteMaterial( {map:yellowOrbTexture, useScreenCoordinates: false});
for (i=0;i<1000;i++){
	if(i>=500){
		blueOrbsSpriteArr.push(new THREE.Sprite(blueOrbMat));
	} else {
		blueOrbsSpriteArr.push(new THREE.Sprite(yellowOrbMat));
	}
	var x = rand_range(-50,50);
	var y = rand_range(50,-50);
	var z = rand_range(-50,50);
	blueOrbsSpriteArr[i].position.set(x,y,z);
	blueOrbsSpriteArr[i].scale.set(0.5,0.5,1.0);
	blueOrbsSpriteGroup.add(blueOrbsSpriteArr[i]);
	//scene.add(blueOrbsSpriteArr[i]);	
}
blueOrbsSpriteGroup.position.set(0,0,-50);
scene.add(blueOrbsSpriteGroup);




//----------------------------------------------------
var nextQ = false;
function onDocumentMouseDown( event ) {

	var vector = new THREE.Vector3((mouseX/window.innerWidth)*2-1,-(mouseY/window.innerHeight)*2+1, 0.5);
	projector.unprojectVector(vector, camera);

	var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

	var intersects = raycaster.intersectObjects( aPlaneArr );
	var seuraavaArr = [seuraava];
	var intersects2 = raycaster.intersectObjects( seuraavaArr );
	var startArr = [startPlane];
	var intersects3 = raycaster.intersectObjects( startArr );
	var resultArr = [r247Plane,r18100Plane2,r816Plane3];
	var intersects4 = raycaster.intersectObjects( resultArr );
	
	if (intersects3.length >= 1 && startScreen == true){
		result = 0;
		
		startScreen = false;
		aAnimation();
		question = 1;
		qAnimation();
		
		scene.add(qPlane);
		scene.remove(imgPlane);		
		hamkLogoAnimation();
		startPlaneAnimation();
		setTimeout(function(){
			scene.remove(hamkLogo);
			scene.remove(startPlane);
		},1000)
		scene.add(seuraava);
		
		if (vidPlaying == true){
			hamkMusic.currentTime = hamkVid.currentTime;
			hamkMusic.play();
			hamkMusic.loop = true;
			hamkVid.pause();
			vidPlaying = false;
		}
		

		pushNewQAPics();

		for (i=0;i<picPlaneArr.length;i++){
			scene.remove(picPlaneArr[i]);
		}
	}

	if (intersects4.length >= 1 && result == 1){
		

		if (intersects4[0].object == r247Plane){

			resultAnim(r247Plane,{x:-3.75,y:0,z:4});
			resultAnim(r18100Plane2, {x:0,y:0,z:-2});
			resultAnim(r816Plane3, {x:8,y:0,z:-2});		
		}
		if (intersects4[0].object == r18100Plane2){
			resultAnim(r247Plane, {x:-8,y:0,z:-2});
			resultAnim(r18100Plane2, {x:0,y:0,z:4});
			resultAnim(r816Plane3, {x:8,y:0,z:-2});
		}
		if (intersects4[0].object == r816Plane3){
			resultAnim(r247Plane, {x:-8,y:0,z:-2});
			resultAnim(r18100Plane2, {x:0,y:0,z:-2});
			resultAnim(r816Plane3, {x:3.75,y:0,z:4});
		}
	}
	if (intersects2.length >= 1){
		nextQ = true;
		
		aPlane1.position.set(0,100,0);
		seuraavaAnim();
		if (aSelected == 0 && question>=1 && question<=6){
			selectAud2.play();		
		}


		if (result>=1){
			selectAud1.play();
			startScreen = true;
			scene.add(hamkLogo);
			scene.add(imgPlane);
			scene.remove(r247Plane);
			scene.remove(r18100Plane2);
			scene.remove(r816Plane3);
			scene.add(startPlane);
			scene.remove(seuraava);
			hamkLogoAnimation(1);
			startPlaneAnimation(1);
			result = 0;

			
			for (i=0;i<picPlaneArr.length;i++){
				scene.remove(picPlaneArr[i]);
				picPlaneArr[i].position.set(150,50,-100);
			}

			nextPic();
		}


	} else if ( intersects.length > 0 ) {
		//alert(indexOf(intersects[0].object));
		//intersects[0].object.material.color.setHex( Math.random() * 0xffffff );
		nextQ = false;
		

		px=intersects[0].object.position.x;
		pz=intersects[0].object.position.z-0.01;
		py=intersects[0].object.position.y;
		aPlane1.position.set(px,py,pz);		
		selectAud3.play();
	} else {
		nextQ = true;
		aSelected = 0;
		aPlane1.position.set(0,0,10);

	}

}


points247 = 0;
points18100 = 0;
points816 = 0;

var startScreen = true;
var	question = 0;
var	result = 0;
var aSelected = 0;


var clickCD = 0;

function click1(){
	if (clickCD === 0){
		onDocumentMouseDown();
	}
	if (clickCD > 0){
		selectAud2.play();
	}
	var elem = document.getElementById("threeCanvas");
	/*if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.msRequestFullscreen) {
		elem.msRequestFullscreen();
	} else if (elem.mozRequestFullScreen) {
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
		elem.webkitRequestFullscreen();
	}*/
	/*if (mouseX>=0 && mouseX<=1440){
		if (hamkVid.paused==false && startScreen == true){
			//hamkVid.pause();
			//result = 1;
		}
		else if (hamkVid.paused==true && startScreen == true){
			
			//hamkVid.play();
			//result = 0;
		}
	}*/


	if (result >= 1){

	}
	else if (question >= 1){

		//pushNewQAPics();
		scene.add(aPlane1);
		//aPlane1.position.set(0,10,0);
		if (aPlane1.position.x == aPlaneArr[0].position.x && aPlane1.position.y == aPlaneArr[0].position.y){
			aSelected = 1;
		}
		else if (aPlane1.position.x == aPlaneArr[1].position.x && aPlane1.position.y == aPlaneArr[1].position.y){
			aSelected = 2;
		}
		else if (aPlane1.position.x == aPlaneArr[2].position.x && aPlane1.position.y == aPlaneArr[2].position.y){
			aSelected = 3;
		}
		else if (aPlane1.position.x == aPlaneArr[3].position.x && aPlane1.position.y == aPlaneArr[3].position.y){
			aSelected = 4;
		}
		else if (aPlane1.position.x == aPlaneArr[4].position.x && aPlane1.position.y == aPlaneArr[4].position.y){
			aSelected = 5;
		}
		else if (aPlane1.position.x == aPlaneArr[5].position.x && aPlane1.position.y == aPlaneArr[5].position.y){
			aSelected = 6;
		}
		/*else {
			aSelected = 0;
		}*/
		
		if(aSelected >= 1 && nextQ == true){
			selectAud1.play();
			clickCD = 2000;
			nextQ = false;

			
			if (aSelected == 1 || aSelected == 2){
				points816+=1;
			}
			if (aSelected == 4 || aSelected == 3){
				points18100+=1;
			}
			if (aSelected == 5 || aSelected == 6){
				points247+=1;
			}

			if (question == 1){
				question = 2;
				qBoxRotateTween();
				aAnimation(1);
				qAnimation(1);
			}
			else if (question == 2){
				question = 3;
				qBoxRotateTween();
				aAnimation(1);
				qAnimation(1);
			}
			else if (question == 3){
				question = 4;
				qBoxRotateTween();
				aAnimation(1);
				qAnimation(1);
			}
			else if (question == 4){
				question = 5;
				qBoxRotateTween();
				aAnimation(1);
				qAnimation(1);
			}
			else if (question == 5){
				question = 6;
				qBoxRotateTween();
				aAnimation(1);
				qAnimation(1);
				
			}
			else if (question == 6){
				question = 0;
				result = 1;
				scene.remove(qBox);
				aAnimation(1);
				qAnimation(1);
				setTimeout(function(){
					for (i=0; i<aPlaneArr.length; i++){
						scene.remove(aPlaneArr[i])
					}
					scene.remove(qPlane);
				},1050);
				r18100Plane2.scale.set(0.45,0.45,0.45);
				r816Plane3.scale.set(0.45,0.45,0.45);
				r247Plane.scale.set(0.45,0.45,0.45);
				r247Plane.position.set(-25,0,-2);
				r18100Plane2.position.set(-25,0,-2);
				r816Plane3.position.set(-25,0,-2);
				resultAnim(r247Plane, {x:-8,y:0,z:-2});
				resultAnim(r18100Plane2, {x:0,y:0,z:-2});
				resultAnim(r816Plane3, {x:8,y:0,z:-2});

				if (points247>points18100 && points247>points816){
					setTimeout(function(){
						resultAnim(r247Plane,{x:-3.75,y:0,z:4})
					},2000);					
				}
				else if ((points18100>points247 && points18100>points816) || (points18100==points247) && points18100>points816){
					setTimeout(function(){
						resultAnim(r18100Plane2,{x:0,y:0,z:4})
					},2000);					
				}
				else if (points816>points18100 && points816>points247){
					setTimeout(function(){
						resultAnim(r816Plane3,{x:3.75,y:0,z:4})
					},2000);					
				} 
				else {
					setTimeout(function(){
						resultAnim(r816Plane3,{x:3.75,y:0,z:4})
					},2000);
				}
				
				scene.add(r247Plane);
				scene.add(r18100Plane2);
				scene.add(r816Plane3);
				points247=0;
				points18100=0;
				points816=0;
			}
			
			aSelected = 0;
		} else if (nextQ == true){
			//selectAud2.play();
		}
	}	
}

var jee;
var jee2=0;
var vari1;
/*setInterval(function(){
	vari1 = rand_range(0,16000000);
	greenLight.color.setHex( vari1 );
},250);*/



function resetStartPic(){
	for (i=0;i<picPlaneArr.length;i++){
		picPlaneArr[i].position.set(150,50,-100);
	}
}
function nextPic(){
	
	if (startScreen==true){
		scene.remove(imgPlane);
		if (currentStartPic>0){

			var pos2 = picPlaneArr[currentStartPic-1].position;
			
			var targetPos1 = {x:-150, y:-50,z:-100};
			var picTween2 = new TWEEN.Tween(pos2).to(targetPos1,2000);
			var b = currentStartPic-1;
			
			picTween2.onUpdate(function(){			
				picPlaneArr[b].position.x = pos2.x;
				picPlaneArr[b].position.y = pos2.y;
				picPlaneArr[b].position.z = pos2.z;				
			});
				
			picTween2.start();
			picTween2.easing(TWEEN.Easing.Quintic.InOut);
			
			var currentpic = currentStartPic;
			setTimeout(function(){
					scene.remove(picPlaneArr[currentpic-1]);
				},2000)
		}


		if (currentStartPic<=picPlaneArr.length){
			scene.add(picPlaneArr[currentStartPic]);
			var pos = picPlaneArr[currentStartPic].position;
			var targetPos = {x:-3, y:-1,z:-2};
			var picTween1 = new TWEEN.Tween(pos).to(targetPos,2000);
			var a = currentStartPic;
			
			picTween1.onUpdate(function(){			
				picPlaneArr[a].position.x = pos.x;
				picPlaneArr[a].position.y = pos.y;
				picPlaneArr[a].position.z = pos.z;		
			});

			

		}
		
		
		picTween1.start();
		picTween1.easing(TWEEN.Easing.Quintic.InOut);
		currentStartPic++;
		if (currentStartPic == picPlaneArr.length){
			setTimeout(function(){
				var pos2 = picPlaneArr[currentStartPic-1].position;
				
				var targetPos1 = {x:-150, y:-50,z:-100};
				var picTween2 = new TWEEN.Tween(pos2).to(targetPos1,2000);
				var b = currentStartPic-1;
				picTween2.onUpdate(function(){			
					picPlaneArr[b].position.x = pos2.x;
					picPlaneArr[b].position.y = pos2.y;
					picPlaneArr[b].position.z = pos2.z;
					
				});
				picTween2.start();
				picTween2.easing(TWEEN.Easing.Quintic.InOut);
				
				setTimeout(function(){
					currentStartPic = 0;
					if (startScreen == true){
						/*scene.add(imgPlane);
						hamkVid.currentTime = 0;
						hamkVid.play();	
						hamkMusic.pause();
						vidPlaying = true;*/
						resetStartPic();
						nextPic();	
					}	
					scene.remove(picPlaneArr[picPlaneArr.length]);
				},2000)
			},5000)

				
			
		}
		else {
			setTimeout(nextPic,5100);
		}
	}
	
}
var currentStartPic = 0;

nextPic();


function render(modifier) {
//3d
	/*
	if (hamkVid.readyState === hamkVid.HAVE_ENOUGH_DATA){
		if(hamkVideoTexture2) hamkVideoTexture2.needsUpdate = true;
	}*/

	renderer.render(scene, camera);

}

function game(modifier) {
	
	var max = 1000;
	if ( isNaN(jee) || jee>max ){
		jee=0;
	}
	jee++;

	imgPlane.rotation.y += Math.sin(Math.PI/(max/4)*jee)/max;
	imgPlane.rotation.x -= Math.cos(Math.PI/(max/2)*jee)/max;
	
	if (imgPlane.rotation.y > 0.559){
		imgPlane.rotation.y = 0.559;
	} else if (imgPlane.rotation.y < 0.4){
		imgPlane.rotation.y = 0.4;
	}

	if (imgPlane.rotation.x < -0.2566){
		imgPlane.rotation.x= -0.2566;
	} else if (imgPlane.rotation.x>0.062){
		imgPlane.rotation.x = 0.062;
	}

	for (i=0; i<picPlaneArr.length; i++){
		picPlaneArr[i].rotation.y = imgPlane.rotation.y;
		picPlaneArr[i].rotation.x = imgPlane.rotation.x;
	}

	blueOrbsSpriteGroup.rotation.y+=0.02*modifier;
	blueOrbsSpriteGroup.rotation.z+=0.01*modifier;
	blueOrbsSpriteGroup.rotation.x+=0.03*modifier;
	sphere.rotation.y+=0.013*modifier;
	
	
	TWEEN.update();
}

var deltaTime = 0;
var then = Date.now();
function main() {
	requestAnimationFrame(main);
	var now 	= 	Date.now();
	deltaTime 	= 	now - then;
	game(deltaTime/1000);
	render(deltaTime/1000);
	if (clickCD>0){
		clickCD-=deltaTime;
		if (clickCD<0){
			clickCD=0;
		}
	}
	then = now;
}
main();