import * as THREE from 'three';
// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
// import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

let geometry;

console.log('THREE',THREE);
// console.log('TextGeometry',TextGeometry);
// console.log('FontLoader',FontLoader);
console.log('THREE.FontLoader',THREE.FontLoader);
console.log('THREE.FontLoader',THREE.TextGeometry);
console.log('OrbitControls',OrbitControls);

//create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

//CAMERA
const camera = new THREE.PerspectiveCamera(45,
    window.innerWidth/window.innerHeight,0.1,1000);
//INIT CAMER
camera.position.z = 45;
camera.position.x = 3;
camera.position.y = 20;

//RENDERER
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// CONTROLS
const controls = new OrbitControls(camera,renderer.domElement);
controls.target = new THREE.Vector3(0,0,-40);
controls.update();

const plane = new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshPhongMaterial({color:0x0a7d15}));
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

//INIT MEMISPHERE LIGHT
scene.add(new THREE.AmbientLight(0xffffff,0.5));

// POINT LIGHT
const light1 = new THREE.PointLight(0xff6666,1,100);
light1.castShadow = true;
light1.shadow.mapSize.width = 4096;
light1.shadow.mapSize.height = 4096;
scene.add(light1);

const light2 = new THREE.PointLight(0x33ff33,1,100);
light2.castShadow = true;
light2.shadow.mapSize.width = 4096;
light2.shadow.mapSize.height = 4096;
scene.add(light2); 

function render(){
// //TEXT LOADING
const loader = new THREE.FontLoader();

loader.load("./fonts/HARDCOVERScript_Regular.json",function(font){
    const taiwanDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei', hour12: false });
    geometry = new THREE.TextGeometry(`${taiwanDate.slice(11)}`,{
        font:font,
        size:10,
        height:10,
    });
    console.log('geometry',geometry);

    const textMesh = new THREE.Mesh(geometry,[
        new THREE.MeshPhongMaterial({color:0xad4000}),
        new THREE.MeshPhongMaterial({color:0x5c2301})
    ])

    textMesh.castShadow = true;
    textMesh.position.y +=15;
    textMesh.position.z -=40;
    textMesh.position.x =-8;
    textMesh.position.y =-0.50;
    scene.add(textMesh);
    renderer.render(scene,camera);
    geometry.dispose();
    scene.remove( textMesh );
});
}


//ANIMATE
function animate(){
    const now = Date.now() / 1000;
    light1.position.y = 15;
    light1.position.x = Math.cos(now) * 20;
    light1.position.z = Math.sin(now) * 20;

    light2.position.y = 15;
    light2.position.x = Math.cos(now) * 20;
    light2.position.z = Math.sin(now) * 20;

    render();
    requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();

let text = "world";

// 宣告一個函數，用於更新文字
function updateText(newText) {
  text = newText;
  const loader = new THREE.FontLoader();
  loader.load("./fonts/HARDCOVERScript_Regular.json",function(font){
    const newGeometry = new THREE.TextGeometry(text, {
        font: font,
        size: 6,
        height: 5
      });
      const textMesh = new THREE.Mesh(newGeometry, [
        new THREE.MeshPhongMaterial({ color: 0xad4000 }),
        new THREE.MeshPhongMaterial({ color: 0x5c2301 })
      ]);
      textMesh.castShadow = true;
      textMesh.position.set(-8, -0.5, -40);
    //   scene.remove(scene.getObjectByName("text"));
    //   textMesh.name = "text";
      scene.add(textMesh);
  });
  
}