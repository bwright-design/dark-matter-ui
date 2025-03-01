import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private spaceship!: THREE.Object3D;

  ngOnInit() {
    //this.initScene();
  }

  ngAfterViewInit() {
    this.initRenderer();
    this.loadSpaceship();
    this.animate();
  }

 /* private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.5, 20);
    this.camera.position.set(0, 0, 8);
  }*/

  private initRenderer() {
    // Get the parent container's dimensions
    const container = this.rendererContainer.nativeElement as HTMLElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    console.log(container, width, height);
    // Create the Three.js scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000); // Black background

    // Create the WebGL renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    container.appendChild(this.renderer.domElement);

    // Create a perspective camera
    this.camera = new THREE.PerspectiveCamera(45, 1, 10, 100);
    this.camera.position.set(0, 0, 50); // Initial position
    this.scene.add(this.camera);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    this.scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);
  }

  private loadSpaceship() {
    const loader = new GLTFLoader();
    loader.load('app/assets/spaceship.glb', (gltf) => {
      const model = gltf.scene;

      // Compute bounding box and find center
      const bbox = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      bbox.getCenter(center);

      // Create a pivot point
      const pivot = new THREE.Group();
      pivot.position.set(center.x, center.y, center.z);
      model.position.sub(center); // Offset model to center it inside pivot

      // Fit model to view
      //this.fitModelToView(model);

      // Apply solid and wireframe materials
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          // Create solid material
          const solidMaterial = new THREE.MeshStandardMaterial({
            color: 0x2222ff, // Blue base color
            metalness: 0.5,
            roughness: 0.7,
          });

          // Create wireframe overlay material
          const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff, // White wireframe
            wireframe: true,
          });

          // Create a new group to hold both versions of the mesh
          const meshGroup = new THREE.Group();

          // Clone meshes
          const solidMesh = mesh.clone();
          solidMesh.material = solidMaterial;

          const wireMesh = mesh.clone();
          wireMesh.material = wireframeMaterial;

          // Add both to the group
          meshGroup.add(solidMesh);
          meshGroup.add(wireMesh);

          model.add(meshGroup);
        }
      });

      // Add model to the pivot
      pivot.add(model);
      this.scene.add(pivot);

      // Store pivot for animation
      this.spaceship = pivot;
    }, undefined, (error) => {
      console.error('Error loading spaceship:', error);
    });
  }

  private fitModelToView(model: THREE.Object3D) {
    const bbox = new THREE.Box3().setFromObject(model);
    const size = bbox.getSize(new THREE.Vector3()).length();
    const center = bbox.getCenter(new THREE.Vector3());

    // Move model to center
    model.position.sub(center);

    // Scale model to fit within the viewport
    const fitScale = 2.5 / size; // Adjust scale factor as needed
    model.scale.set(fitScale, fitScale, fitScale);

    // Adjust camera distance dynamically
    this.camera.position.z = size * 1.5;
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate spaceship smoothly
    if (this.spaceship) {
      this.spaceship.rotation.y += 0.005;
    }

    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    console.log('resize');
    const container = this.rendererContainer.nativeElement as HTMLElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    console.log(width, height);

    // Update camera aspect ratio
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // Resize renderer
    this.renderer.setSize(width, height);
  }
}
