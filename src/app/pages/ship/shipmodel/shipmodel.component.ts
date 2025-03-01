import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-shipmodel',
  imports: [],
  templateUrl: './shipmodel.component.html',
  standalone: true,
  styleUrl: './shipmodel.component.scss'
})
export class ShipmodelComponent implements OnInit, AfterViewInit {

  @ViewChild('rendererContainer', { static: false }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private spaceship!: THREE.Object3D;
  private clock = new THREE.Clock();

  ngOnInit() {
    this.initScene();
  }

  ngAfterViewInit() {
    this.initRenderer();
    this.loadSpaceship();
    this.animate();
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 2, 5);
  }

  private initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private loadSpaceship() {
    const loader = new GLTFLoader();
    loader.load('app/assets/spaceship.glb', (gltf) => {
      this.spaceship = gltf.scene;

      let scale = 0.1
      this.spaceship.scale.set(scale, scale, scale)

      this.spaceship.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          // Create a solid material
          const solidMaterial = new THREE.MeshStandardMaterial({
            color: 0x2222ff, // Blue base color
            metalness: 0.5,
            roughness: 0.7,
          });

          // Create a wireframe overlay material
          const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff, // White wireframe
            wireframe: true,
          });

          // Create a new group to hold both versions of the mesh
          const meshGroup = new THREE.Group();

          // Clone the mesh for the wireframe and apply the materials
          const solidMesh = mesh.clone();
          solidMesh.material = solidMaterial;

          const wireMesh = mesh.clone();
          wireMesh.material = wireframeMaterial;

          // Add both to the group
          meshGroup.add(solidMesh);
          meshGroup.add(wireMesh);

          // Replace the original mesh with the group
          this.spaceship.add(meshGroup);
        }
      });

      this.scene.add(this.spaceship);
    }, undefined, (error) => {
      console.error('Error loading spaceship:', error);
    });

    // Lighting setup
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    this.scene.add(light);
  }


  private animate() {
    requestAnimationFrame(() => this.animate());

    if (this.spaceship) {
      this.spaceship.rotation.y += 0.01; // Rotate spaceship
    }

    this.renderer.render(this.scene, this.camera);
  }
}
