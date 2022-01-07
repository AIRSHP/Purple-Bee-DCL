import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import ImagePanel from "../imagePanel/src/item"
import { sceneMessageBus } from './messageBus'
import VideoScreenScript from "../videoStream/src/item"


const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const options = { inventory }


const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)



/* Main Structure */
        

        const mainStructure = new Entity('mainStructure ')
        engine.addEntity(mainStructure )
        mainStructure .setParent(_scene)
        const transform_mainStructure  = new Transform({
          position: new Vector3(8, 0, 16),
          rotation: new Quaternion(0, .5, 0, 0),
          scale: new Vector3(1,1,1)
        })
        mainStructure .addComponentOrReplace(transform_mainStructure )
        const gltfShape_mainStructure  = new GLTFShape("GLB/Decentraland Arena7.glb")
        gltfShape_mainStructure .withCollisions = true
        gltfShape_mainStructure .isPointerBlocker = true
        gltfShape_mainStructure .visible = true
        mainStructure .addComponentOrReplace(gltfShape_mainStructure)


/* Flying Blimp */
    
const blimp = new Entity('blimp')
engine.addEntity(blimp)
blimp.setParent(_scene)
const transform_blimp = new Transform({
  position: new Vector3(8, 16, 16),
  //rotation: new Quaternion(0, .5, 0, 0),
  scale: new Vector3(1,1,1)
})
blimp.addComponentOrReplace(transform_blimp)
const gltfShape_blimp = new GLTFShape("GLB/Blimp.glb")
gltfShape_blimp.withCollisions = true
gltfShape_blimp.isPointerBlocker = true
gltfShape_blimp.visible = true
blimp.addComponentOrReplace(gltfShape_blimp)

/* Cube Rotate PBcube */

const PBcube = new Entity('PBcube')
engine.addEntity(PBcube)
PBcube.setParent(_scene)
const transform_PBcube = new Transform({
  position: new Vector3(8, 14, 30),
  rotation: new Quaternion(0, 0, 0, 0),
  scale: new Vector3(1,1,1)
})
PBcube.addComponentOrReplace(transform_PBcube)
const gltfShape_PBcube = new GLTFShape("GLB/Bee Cube Spin.glb")
gltfShape_PBcube.withCollisions = true
gltfShape_PBcube.isPointerBlocker = true
gltfShape_PBcube.visible = true
PBcube.addComponentOrReplace(gltfShape_PBcube)





/* video screen */
/****************/

        const videoStream = new Entity('videoStream')
        engine.addEntity(videoStream)
        videoStream.setParent(_scene)
        const transform_videoStream = new Transform({
          position: new Vector3(8, 2.92, 0.4),
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


/* Blackhole Dancefloor  */

          //blackhole 1 (parent)
          const blackhole1 = new Entity('blackhole1')
          engine.addEntity(blackhole1)
          blackhole1.setParent(_scene)
          const transform_blackhole1 = new Transform({
            position: new Vector3(8, .93, 7.6),
            rotation: new Quaternion(0, .5, 0, 0),
            scale: new Vector3(.85,.85,.85)
          })
          blackhole1.addComponentOrReplace(transform_blackhole1)
          const gltfShape_blackhole1 = new GLTFShape("GLB/BlackholeLayers/BH03.glb")
          gltfShape_blackhole1.withCollisions = false
          gltfShape_blackhole1.isPointerBlocker = true
          gltfShape_blackhole1.visible = true
          blackhole1.addComponentOrReplace(gltfShape_blackhole1)

          //Blackhole Dancefloor 2
          const blackhole2 = new Entity('blackhole2')
          engine.addEntity(blackhole2)
          blackhole2.setParent(blackhole1)
          const transform_blackhole2 = new Transform({
            position: new Vector3(0,-0.1,0),
          })
          blackhole2.addComponentOrReplace(transform_blackhole2)
          const gltfShape_blackhole2 = new GLTFShape("GLB/BlackholeLayers/BH04.glb")
          gltfShape_blackhole2.visible = true
          blackhole2.addComponentOrReplace(gltfShape_blackhole2)

          //Blackhole Dancefloor 3
          const blackhole3 = new Entity('blackhole3')
          engine.addEntity(blackhole3)
          blackhole3.setParent(blackhole1)
          const transform_blackhole3 = new Transform({
            position: new Vector3(0,-0.2,0),
          })
          blackhole3.addComponentOrReplace(transform_blackhole3)
          const gltfShape_blackhole3 = new GLTFShape("GLB/BlackholeLayers/BH02.glb")
          gltfShape_blackhole3.visible = true
          blackhole3.addComponentOrReplace(gltfShape_blackhole3)


          //Blackhole Dancefloor 4
          const blackhole4 = new Entity('blackhole4')
          engine.addEntity(blackhole4)
          blackhole4.setParent(blackhole1)
          const transform_blackhole4 = new Transform({
            position: new Vector3(0,-0.3,0),
          })
          blackhole4.addComponentOrReplace(transform_blackhole4)
          const gltfShape_blackhole4 = new GLTFShape("GLB/BlackholeLayers/BH01.glb")
          gltfShape_blackhole4.visible = true
          blackhole4.addComponentOrReplace(gltfShape_blackhole4)

          //Blackhole Dancefloor 5 
          const blackhole5 = new Entity('blackhole5')
          engine.addEntity(blackhole5)
          blackhole5.setParent(blackhole1)
          const transform_blackhole5 = new Transform({
            position: new Vector3(0,-0.4,0),
          })
          blackhole5.addComponentOrReplace(transform_blackhole5)
          const gltfShape_blackhole5 = new GLTFShape("GLB/BlackholeLayers/BH05.glb")
          gltfShape_blackhole5.visible = true
          blackhole5.addComponentOrReplace(gltfShape_blackhole5)

/* Red Light */
          const redlight = new Entity('redlight')
          engine.addEntity(redlight)
          redlight.setParent(_scene)
          const transform_redlight = new Transform({
            position: new Vector3(8, 0, 16),
            rotation: new Quaternion(0, .5, 0, 0),
            scale: new Vector3(1,1,1)
          })
          redlight.addComponentOrReplace(transform_redlight)
          const gltfShape_redlight = new GLTFShape("GLB/RedLight.glb")
          gltfShape_redlight.withCollisions = true
          //gltfShape_redlight.isPointerBlocker = true
          gltfShape_redlight.visible = true
          redlight.addComponentOrReplace(gltfShape_redlight)

          const redlight2 = new Entity('redlight2')
          engine.addEntity(redlight2)
          redlight2.setParent(redlight)
          const transform_redlight2 = new Transform({
            position: new Vector3(14, 0, 0),
          })
          redlight2.addComponentOrReplace(transform_redlight2)
          const gltfShape_redlight2 = new GLTFShape("GLB/RedLight.glb")
          gltfShape_redlight2.visible = true
          redlight2.addComponentOrReplace(gltfShape_redlight2)



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

          // Box (Donk)
          const boxMaterial = new Material()
          boxMaterial.albedoColor = Color3.Red()

          const box = new Entity()
          box.addComponent(boxMaterial)
          box.addComponent(new GLTFShape("GLB/DonkModel4.glb"))
          box.addComponent(new Transform({
            position: new Vector3(8, 2.5, 3)
          }))
          
          box.addComponentOrReplace(
            new OnPointerDown(
              (e) => {},
              { hoverText: 'TOSS THE DONK!\nClick & Hold Mouse, Hold [E] to Reel in' }
            )
          )
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

          // Create donk (box) body
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
          groundBody.position.y = 1 // Thickness of ground base model
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
            /*
            sceneMessageBus.emit("donk_moved",{
              x: x,
              y: y, 
              z: z
            });
            */
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

                /*
                sceneMessageBus.emit("donk_moving",{
                  x: position.x,
                  y: position.y, 
                  z: position.z
                })
                */
              }

              // Pull in the object
              if (isEKeyPressed && markerDistance != 0 && markerDistance > 1) {
                markerDistance -= 8 * dt
              }
            }
          }
          engine.addSystem(new UpdateMarkerSystem())


/***** END DONK TOSS 
****/




/**** IMAGE PANELS */
          const imageCacheBust = Math.floor(Math.random() * 10000)
          const imagePanel1 = new Entity('imageFromURL')
          engine.addEntity(imagePanel1)
          imagePanel1.setParent(_scene)
          const imagePanel1_transform = new Transform({
            position: new Vector3(2.65, 3.01, 31.5),
            rotation: new Quaternion(0, .5, 0, 0),
            scale: new Vector3(2.7,2.7,2.7)
          })
          imagePanel1.addComponentOrReplace(imagePanel1_transform)
          const imagePanelScript1 = new ImagePanel()
          imagePanelScript1.init()
          imagePanelScript1.spawn(imagePanel1, {
              "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-1.jpg?"+imageCacheBust,
              "url":"https://purplebee.org/?dclpanel=1"
          }, createChannel(channelId, imagePanel1, channelBus))

          const imagePanel2 = new Entity('imageFromURL')
          engine.addEntity(imagePanel2)
          imagePanel2.setParent(imagePanel1)
          const imagePanel2_transform = new Transform({
            position: new Vector3(-1, 0, 0),
          })
          imagePanel2.addComponentOrReplace(imagePanel2_transform)
          const imagePanelScript2 = new ImagePanel()
          imagePanelScript2.init()
          imagePanelScript2.spawn(imagePanel2, {
              "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-2.jpg?"+imageCacheBust,
              "url":"https://purplebee.org/?dclpanel=2",
              "basic":true
          }, createChannel(channelId, imagePanel2, channelBus))

          const imagePanel3 = new Entity('imageFromURL')
          engine.addEntity(imagePanel3)
          imagePanel3.setParent(imagePanel1)
          const imagePanel3_transform = new Transform({
            position: new Vector3(-2, 0, 0),
          })
          imagePanel3.addComponentOrReplace(imagePanel3_transform)
          const imagePanelScript3 = new ImagePanel()
          imagePanelScript3.init()
          imagePanelScript3.spawn(imagePanel3, {
              "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-3.jpg?"+imageCacheBust,
              "url":"https://purplebee.org/?dclpanel=3",
              "basic":true
          }, createChannel(channelId, imagePanel3, channelBus))

          const imagePanel4 = new Entity('imageFromURL')
          engine.addEntity(imagePanel4)
          imagePanel4.setParent(imagePanel1)
          const imagePanel4_transform = new Transform({
            position: new Vector3(-3, 0, 0),
          })
          imagePanel4.addComponentOrReplace(imagePanel4_transform)
          const imagePanelScript4 = new ImagePanel()
          imagePanelScript4.init()
          imagePanelScript4.spawn(imagePanel4, {
              "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-2.jpg?"+imageCacheBust,
              "url":"https://purplebee.org/?dclpanel=4",
              "basic":true
          }, createChannel(channelId, imagePanel4, channelBus))

          const imagePanel5 = new Entity('imageFromURL')
          engine.addEntity(imagePanel5)
          imagePanel5.setParent(imagePanel1)
          const imagePanel5_transform = new Transform({
            position: new Vector3(-4, 0, 0),
          })
          imagePanel5.addComponentOrReplace(imagePanel5_transform)
          const imagePanelScript5 = new ImagePanel()
          imagePanelScript5.init()
          imagePanelScript5.spawn(imagePanel5, {
              "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-1.jpg?"+imageCacheBust,
              "url":"https://purplebee.org/?dclpanel=5",
              "basic":true
          }, createChannel(channelId, imagePanel5, channelBus))

/***** END IMAGE PANELS */


//message bus stuff
sceneMessageBus.on("donk_moved",(data)=>{
  log("donk moved",data.x,data.y,data.z)
});


//end
