
import { OrbitControls } from './threejs-dev/examples/jsm/controls/OrbitControls.js';
import Stats from './threejs-dev/examples/jsm/libs/stats.module.js';

//import img from "./assets/flag.jpg";


//Variables
let camera, scene,renderer, controls, geometry, mesh, wireframe, line, stats, clock, material;






init();
addMesh();


showHelpers();
prerformMonitor();




function init(){
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    controls = new OrbitControls( camera, renderer.domElement );
    camera.position.z = 5;
    controls.update();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame( animate );
     
    render();
	
    stats.update();
    
    
    controls.update();
	
}
animate();


function addMesh(){
    geometry = new THREE.PlaneGeometry(2,1, 200,100);
    material = new THREE.ShaderMaterial({
        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        uniforms: {
          uTime: { value: 0.0 },
          uTexture: { value: new THREE.TextureLoader().load('./assets/flag.jpg') }
        },
        wireframe: true,
        side: THREE.DoubleSide
      });
    
    }
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

//Helpers
function showHelpers(){
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    const helper = new THREE.CameraHelper( camera );
    scene.add( helper );

   
}


function render(){
    
    material.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render( scene, camera );
    
  
    
    
    
}

function prerformMonitor(){
    stats = new Stats();
	document.body.appendChild( stats.dom );
}









