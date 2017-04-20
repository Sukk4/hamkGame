// 3D peli - Jukka Kari

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

// ----------------- THREE JS ----------------------
var scene 	= new THREE.Scene();
var camera 	= new THREE.PerspectiveCamera( 60, 1920 / 1080, 0.1, 1000 );

var threeCanvas = document.getElementById("threeCanvas");
var renderer = new THREE.WebGLRenderer({canvas: threeCanvas, antialias:true});
renderer.setSize( 1920, 1080 );
document.body.appendChild( renderer.domElement );



var material = new THREE.MeshNormalMaterial();

camera.position.z = 10;


// -------------------------------------------------
leavesTexture = THREE.ImageUtils.loadTexture('img/leaves.png');
var leavesMat = new THREE.SpriteMaterial( {map:leavesTexture, useScreenCoordinates: false});
var leavesSprite = new THREE.Sprite(leavesMat);
leavesSprite.position.set(0,2,0);
leavesSprite.scale.set(5,5,1.0);
scene.add(leavesSprite);




var maaMat = new THREE.MeshPhongMaterial({color: 0xeeeeee,shininess: 1,specular: 0x009900,shading: THREE.FlatShading});
var maa = new THREE.Mesh(new THREE.PlaneGeometry(1000, 100), maaMat);
scene.add(maa);
maa.position.set( 0, -5, 0 );
maa.rotation.x = -0.5*Math.PI;



var box = new THREE.Mesh(new THREE.BoxGeometry(1,5,1),maaMat);
scene.add(box);


renderer.setClearColor(0xccffff, 1);



//---------------Lighting---------------------------
var ambientLight = new THREE.AmbientLight( 0x404040 );
var whiteLight = new THREE.PointLight( 0xffffff, 1, 50 );
var greenLight = new THREE.PointLight( 0xffffff, 1, 0 );
var lightCube = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
var greenLightCube = new THREE.Mesh(lightCube,material);
whiteLight.position.set( 0, 10, 10 );
greenLight.position.set( 0, 5, 10 );
greenLightCube.position.set( 0, 15, 10 );
//scene.add( whiteLight );
scene.add( greenLight );
scene.add( greenLightCube );
//scene.add( ambientLight );
//HemisphereLight(0xffffff, 0xffffff, 100)




//--------------------------------------------------



function render(modifier) {
//3d
	renderer.render(scene, camera);

	

}

 


function game(modifier) {
	camera.position.x=-mouseX/100+9;
	camera.position.y=-mouseY/100+3;
	camera.lookAt(new THREE.Vector3(0,0,0));

	
}


var deltaTime = 0;
var then = Date.now();
var main = function () {
	requestAnimationFrame(main);
	var now 	= 	Date.now();
	deltaTime 	= 	now - then;

	game(deltaTime/1000);
	render(deltaTime/1000);

	then = now;
}

main();

