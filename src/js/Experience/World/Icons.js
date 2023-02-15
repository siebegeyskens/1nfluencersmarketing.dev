import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Icons
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.models = []

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('icons')
        }

        
        this.getModels()
        this.setModels()

        //this.setAnimation()
    }
    
        // Resources
        // iterate through Resources items
        // Check if its a gltfmodel
        // add it to the scene
    getModels() {
        Object.keys(this.resources.items).forEach(key => {
            const resource = this.resources.items[key];
            if (resource.scene) {
                this.models.push(resource.scene);
            }
          });
    }

    setModels()
    {   
        console.log('models: ',this.models)
        let xpos = 0
        this.models.forEach(model => {
            model.position.x = xpos;
            this.scene.add(model)
            xpos += 2
            // TODO: make this work?
            this.camera.instance.lookAt(model.position)
        })


        // this.model.traverse((child) =>
        // {
        //     if(child instanceof THREE.Mesh)
        //     {
        //         child.castShadow = true
        //     }
        // })
    }

    setAnimation()
    {   
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        // Debug
        if(this.debug.active)
        {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') }
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}