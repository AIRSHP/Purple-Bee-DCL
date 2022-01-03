import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import VideoScreenScript from "../videoStream/src/item"
import GalleryInfoScript from "../galleryInfoSign/src/item"

const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

  

/* Catwalk Structure + Hill */
        

        const catwalkHill = new Entity('catwalkHill')
        engine.addEntity(catwalkHill)
        catwalkHill.setParent(_scene)
        const transform_catwalkHill = new Transform({
          position: new Vector3(8, 0, 16),
          rotation: new Quaternion(0, .5, 0, 0),
          scale: new Vector3(1, 1, 1)
        })
        catwalkHill.addComponentOrReplace(transform_catwalkHill)
        const gltfShape_catwalkHill = new GLTFShape("GLB/Catwalk-Hill-Scene4.glb")
        gltfShape_catwalkHill.withCollisions = true
        gltfShape_catwalkHill.isPointerBlocker = true
        gltfShape_catwalkHill.visible = true
        catwalkHill.addComponentOrReplace(gltfShape_catwalkHill)



/* video screen */
/****************/

        const videoStream = new Entity('videoStream')
        engine.addEntity(videoStream)
        videoStream.setParent(_scene)
        const transform_videoStream = new Transform({
          position: new Vector3(8, 0.92, 0.4),
          rotation: new Quaternion(0, 0, 0, 1),
          scale: new Vector3(4.5, 4.5, 4.5)
        })
        videoStream.addComponentOrReplace(transform_videoStream)

        const videoScreenScript = new VideoScreenScript()
        videoScreenScript.init()
        videoScreenScript.spawn(videoStream, {
            "startOn":false,
            "onClickText":"Play/Pause",
            "volume":1,
            "controlDist":20,
            "onClick":[{"entityName":"videoStream","actionId":"toggle","values":{}}],
            "image":"https://purplebee.org/wp-content/uploads/purple-bee-live-slate.jpg",
            "station":"https://8343f7014c0ea438.mediapackage.us-west-2.amazonaws.com/out/v1/97ed27876e70411685f551766ae1cec4/index.m3u8"
          }, 
          createChannel(channelId, videoStream, channelBus)
        )


/** SCREEN DRESSING (neon tubes) */
       /*
       const purpleNeonTube = new Entity('purpleNeonTube')
        engine.addEntity(purpleNeonTube)
        purpleNeonTube.setParent(_scene)
        const transform14 = new Transform({
          position: new Vector3(1.3, 4.7, 0.54),
          rotation: new Quaternion(-0.20526227355003357, -0.20526227355003357, 0.6766590476036072, 0.6766589879989624),
          scale: new Vector3(5, 1.5, 0.75)
        })
        purpleNeonTube.addComponentOrReplace(transform14)
        const gltfShape6 = new GLTFShape("GLB/NeonLightTube_03/NeonLightTube_03.glb")
        gltfShape6.withCollisions = true
        gltfShape6.isPointerBlocker = true
        gltfShape6.visible = true
        purpleNeonTube.addComponentOrReplace(gltfShape6)

        const purpleNeonTube2 = new Entity('purpleNeonTube2')
        engine.addEntity(purpleNeonTube2)
        purpleNeonTube2.setParent(_scene)
        purpleNeonTube2.addComponentOrReplace(gltfShape6)
        const transform15 = new Transform({
          position: new Vector3(14.9, 4.7, 0.54),
          rotation: new Quaternion(-0.20526227355003357, -0.20526227355003357, 0.6766590476036072, 0.6766589879989624),
          scale: new Vector3(5, 1.5, 0.75)
        })
        purpleNeonTube2.addComponentOrReplace(transform15)
        */

        /*
        const wallcornerPurple = new Entity('wallcornerPurple')
        engine.addEntity(wallcornerPurple)
        wallcornerPurple.setParent(_scene)
        const transform18 = new Transform({
          position: new Vector3(15.506645202636719, 8.75, 0.5),
          rotation: new Quaternion(-0.28199416399002075, 0.2810767590999603, 0.6479364037513733, 0.6493486166000366),
          scale: new Vector3(0.08, 3.80124831199646, 0.1)
        })
        wallcornerPurple.addComponentOrReplace(transform18)
        const gltfShape8 = new GLTFShape("GLB/PurpleCorner.glb")
        gltfShape8.withCollisions = true
        gltfShape8.isPointerBlocker = true
        gltfShape8.visible = true
        wallcornerPurple.addComponentOrReplace(gltfShape8)
        */
       
        /*
        const purpleNeonTube3 = new Entity('purpleNeonTube3')
        engine.addEntity(purpleNeonTube3)
        purpleNeonTube3.setParent(_scene)
        purpleNeonTube3.addComponentOrReplace(gltfShape6)
        const transform19 = new Transform({
          position: new Vector3(8.000000953674316, 8.585, 0.54),
          rotation: new Quaternion(-0.2902846932411194, 1.4901161193847656e-8, 2.9802322387695312e-8, 0.9569404125213623),
          scale: new Vector3(8.646116256713867, 0.9900016784667969, 0.9900001287460327)
        })
        purpleNeonTube3.addComponentOrReplace(transform19)
        */

/** END SCREEN DRESSING (neon tubes) */


/** INFO SIGN */
        const galleryInfoPurple = new Entity('galleryInfoPurple')
        engine.addEntity(galleryInfoPurple)
        galleryInfoPurple.setParent(_scene)
        const transform_galleryInfoPurple = new Transform({
          position: new Vector3(7.60, 3.02, 31),
          rotation: new Quaternion(0, -1, 0, 0),
          scale: new Vector3(0.5, 0.5, 0.5)
        })
        galleryInfoPurple.addComponentOrReplace(transform_galleryInfoPurple)
        
        const galleryInfoScript = new GalleryInfoScript()
        galleryInfoScript.init()
        galleryInfoScript.spawn(
          galleryInfoPurple, 
          {
            "text":"Welcome to\nPurple Bee TV\nLive-streaming\nconcerts\n\nget info & donate:\npurplebee.org\n\n@purplebeetv\non socials",
            "fontSize":7,
            "font":"SF_Heavy",
            "color":"#000000",
            "url":"https://purplebee.org"
          }, 
          createChannel(channelId, galleryInfoPurple, channelBus)
        )

        /*
        const lampPurple = new Entity('lampPurple')
        engine.addEntity(lampPurple)
        lampPurple.setParent(_scene)
        const transform25 = new Transform({
          position: new Vector3(6.9, 1.5, 15.252889633178711),
          rotation: new Quaternion(0, 0, 0, 1),
          scale: new Vector3(1, 1, 1)
        })
        lampPurple.addComponentOrReplace(transform25)
        const gltfShape11 = new GLTFShape("GLB/Lamp_Purple.glb")
        gltfShape11.withCollisions = true
        gltfShape11.isPointerBlocker = true
        gltfShape11.visible = true
        lampPurple.addComponentOrReplace(gltfShape11)

        const lampPurple2 = new Entity('lampPurple2')
        engine.addEntity(lampPurple2)
        lampPurple2.setParent(_scene)
        lampPurple2.addComponentOrReplace(gltfShape11)
        const transform26 = new Transform({
          position: new Vector3(9, 1.5, 15.252889633178711),
          rotation: new Quaternion(0, 0, 0, 1),
          scale: new Vector3(1, 1, 1)
        })
        lampPurple2.addComponentOrReplace(transform26)
        */

        


/** END INFO SIGN */


//const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
//const options = { inventory }



/***** DONK TOSS  
****/

          /*
            IMPORTANT: The tsconfig.json has been configured to include "node_modules/cannon/build/cannon.js"
            Code is adapted from: https://github.com/schteppe/cannon.js/blob/master/examples/threejs_mousepick.html
          */

          // Base scene
          
          /*
          const base = new Entity()
          base.addComponent(new GLTFShape("models/baseLight.glb"))
          base.addComponent(new Transform({ scale: new Vector3(2, 2, 2) }))
          engine.addEntity(base)
          */

          // Box
          const boxMaterial = new Material()
          boxMaterial.albedoColor = Color3.Red()

          const box = new Entity()
          box.addComponent(boxMaterial)
          box.addComponent(new GLTFShape("GLB/DonkModel4.glb"))
          box.addComponent(new Transform({
            position: new Vector3(8, 2.5, 3)
          }))
          engine.addEntity(box)


          // Marker
          const markerMaterial = new Material()
          markerMaterial.albedoColor = new Color3(9, 3, 1)
          const markerPullMaterial = new Material()
          markerPullMaterial.albedoColor = new Color3(5, 1, 3.5)

          const marker = new Entity()
          marker.addComponent(new SphereShape())
          marker.addComponent(new Transform({ scale: Vector3.Zero() }))
          marker.addComponent(markerMaterial)
          marker.getComponent(SphereShape).withCollisions = false
          engine.addEntity(marker)

          // Setup our CANNON world
          const world = new CANNON.World()
          world.quatNormalizeSkip = 0
          world.quatNormalizeFast = false

          world.gravity.set(0, -9.82, 0) // m/s²
          world.broadphase = new CANNON.NaiveBroadphase()

          // Create box body
          const boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
          const boxBody = new CANNON.Body({ mass: 5 })
          boxBody.addShape(boxShape)
          boxBody.position.set(8, 2.5, 3)
          boxBody.linearDamping = 0.4 // Round will keep translating even with friction so you need linearDamping
          boxBody.angularDamping = 0.4 // Round bodies will keep rotating even with friction so you need angularDamping
          world.addBody(boxBody) // Add body to the world

          // Create a ground plane
          const planeShape = new CANNON.Plane()
          const groundBody = new CANNON.Body({
            mass: 0, // mass == 0 makes the body static
          })
          groundBody.addShape(planeShape)
          groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis
          groundBody.position.y = 0.8 // Thickness of ground base model
          world.addBody(groundBody)

          // Invisible walls
          //#region
          const wallShape = new CANNON.Box(new CANNON.Vec3(16, 50, 1))
          const wallNorth = new CANNON.Body({
            mass: 0,
            shape: wallShape,
            position: new CANNON.Vec3(8, 25, 8),
          })
          world.addBody(wallNorth)

          const wallSouth = new CANNON.Body({
            mass: 0,
            shape: wallShape,
            position: new CANNON.Vec3(8, 25, 0),
          })
          world.addBody(wallSouth)

          const wallEast = new CANNON.Body({
            mass: 0,
            shape: wallShape,
            position: new CANNON.Vec3(0, 25, 8),
          })
          wallEast.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
          world.addBody(wallEast)

          const wallWest = new CANNON.Body({
            mass: 0,
            shape: wallShape,
            position: new CANNON.Vec3(16, 25, 8),
          })
          wallWest.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
          world.addBody(wallWest)
          //#endregion

          // Joint body
          var shape = new CANNON.Sphere(0.1)
          const jointBody = new CANNON.Body({ mass: 0 })
          jointBody.addShape(shape)
          jointBody.collisionFilterGroup = 0
          jointBody.collisionFilterMask = 0
          world.addBody(jointBody)

          let mouseConstraint: CANNON.PointToPointConstraint
          let constrainedBody: CANNON.Body

          function addMouseConstraint(x: number, y: number, z: number, body: CANNON.Body) {
            // The cannon body constrained by the mouse joint
            constrainedBody = body

            // Vector to the clicked point, relative to the body
            var v1 = new CANNON.Vec3(x, y, z).vsub(constrainedBody.position)

            // Apply anti-quaternion to vector to tranform it into the local body coordinate system
            var antiRot = constrainedBody.quaternion.inverse()
            let pivot = antiRot.vmult(v1) // pivot is not in local body coordinates

            // Move the cannon click marker particle to the click position
            jointBody.position.set(x, y, z)

            // Create a new constraint
            // The pivot for the jointBody is zero
            mouseConstraint = new CANNON.PointToPointConstraint(constrainedBody, pivot, jointBody, new CANNON.Vec3(0, 0, 0))

            // Add the constriant to world
            world.addConstraint(mouseConstraint)
          }

          // This functions moves the transparent joint body to a new postion in space
          function moveJointToPoint(x: number, y: number, z: number) {
            // Move the joint body to a new position
            jointBody.position.set(x, y, z)
            mouseConstraint.update()
          }

          function removeJointConstraint() {
            // Remove constraint from world
            world.removeConstraint(mouseConstraint)
          }

          // Position and rotate the box in the scene to match their cannon world counterparts
          class updatePhysicsSystem implements ISystem {
            update(dt: number) {
              world.step(dt)
              box.getComponent(Transform).position.copyFrom(boxBody.position)
              box.getComponent(Transform).rotation.copyFrom(boxBody.quaternion)
            }
          }
          engine.addSystem(new updatePhysicsSystem())

          // Controls
          const input = Input.instance
          let isPointerPressed = false
          let isEKeyPressed = false
          let markerDistance = 0

          // Left Mouse Click to grab the object
          input.subscribe("BUTTON_DOWN", ActionButton.POINTER, true, (e) => {
            isPointerPressed = true

            // Only show marker when raycast hits an entity
            if (e.hit.length != 0) {
              marker.getComponent(Transform).scale.setAll(0.1)
              markerDistance = e.hit.length
              addMouseConstraint(e.hit.hitPoint.x, e.hit.hitPoint.y, e.hit.hitPoint.z, boxBody)
            }
          })

          input.subscribe("BUTTON_UP", ActionButton.POINTER, false, () => {
            isPointerPressed = false

            // Remove marker
            marker.getComponent(Transform).scale.setAll(0)
            marker.getComponent(Transform).position.setAll(0)
            markerDistance = 0
            removeJointConstraint()
          })

          // Press E Key to pull in the object
          input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, () => {
            isEKeyPressed = true
            marker.addComponentOrReplace(markerPullMaterial)
          })

          input.subscribe("BUTTON_UP", ActionButton.PRIMARY, false, () => {
            isEKeyPressed = false
            marker.addComponentOrReplace(markerMaterial)
          })


          class UpdateMarkerSystem implements ISystem {
            private forwardVector: Vector3
            private forwardVectorTransformed: Vector3

            update(dt: number) {
              // Grab the object
              if (isPointerPressed && markerDistance != 0) {
                this.forwardVector = Vector3.Forward().scale(markerDistance).rotate(Camera.instance.rotation)
                this.forwardVectorTransformed = Camera.instance.position.clone().add(this.forwardVector)
                marker.getComponent(Transform).position.copyFrom(this.forwardVectorTransformed)

                let position = marker.getComponent(Transform).position
                moveJointToPoint(position.x, position.y, position.z)
              }

              // Pull in the object
              if (isEKeyPressed && markerDistance != 0 && markerDistance > 1) {
                markerDistance -= 5 * dt
              }
            }
          }
          engine.addSystem(new UpdateMarkerSystem())


/***** END DONK TOSS 
****/

//end
