import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(2,2,4);

const renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

const light1 = new THREE.DirectionalLight(0xffffff,3);
light1.position.set(5,5,5);

scene.add(light1);

scene.add(new THREE.AmbientLight(0xffffff,1));

const loader = new GLTFLoader();

loader.load("../models/modelo.glb",(gltf)=>{

    scene.add(gltf.scene);

});

function animate(){

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});