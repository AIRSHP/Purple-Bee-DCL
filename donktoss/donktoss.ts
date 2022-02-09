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
          const donkPosition = new Vector3(8, 2.5, 15)
          const box = new Entity()
          box.addComponent(boxMaterial)
          box.addComponent(new GLTFShape("GLB/DonkModel5.glb"))
          box.addComponent(new Transform({
            position: donkPosition
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
          boxBody.position.set(8, 2.5, 15)
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


/***** END DONK TOSS **/


//message bus stuff
sceneMessageBus.on("donk_moved",(data)=>{
    log("donk moved",data.x,data.y,data.z)
  });
  