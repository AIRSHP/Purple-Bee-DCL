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
        const gltfShape_catwalkHill = new GLTFShape("GLB/Catwalk-Hill-Scene.glb")
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
          position: new Vector3(8, 0.5, 0.4),
          rotation: new Quaternion(0, 0, 0, 1),
          scale: new Vector3(5, 5, 5)
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
        const purpleNeonTube = new Entity('purpleNeonTube')
        engine.addEntity(purpleNeonTube)
        purpleNeonTube.setParent(_scene)
        const transform14 = new Transform({
          position: new Vector3(0.5000000596046448, 4.74, 0.54),
          rotation: new Quaternion(-0.20526227355003357, -0.20526227355003357, 0.6766590476036072, 0.6766589879989624),
          scale: new Vector3(4.929162502288818, 0.9900015592575073, 0.9900001287460327)
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
          position: new Vector3(15.51, 4.74, 0.54),
          rotation: new Quaternion(-0.20526227355003357, -0.20526227355003357, 0.6766590476036072, 0.6766589879989624),
          scale: new Vector3(4.929162502288818, 0.9900015592575073, 0.9900001287460327)
        })
        purpleNeonTube2.addComponentOrReplace(transform15)

        const wallcornerPurple = new Entity('wallcornerPurple')
        engine.addEntity(wallcornerPurple)
        wallcornerPurple.setParent(_scene)
        const transform18 = new Transform({
          position: new Vector3(15.506645202636719, 9.135, 0.5),
          rotation: new Quaternion(-0.28199416399002075, 0.2810767590999603, 0.6479364037513733, 0.6493486166000366),
          scale: new Vector3(0.13071277737617493, 3.80124831199646, 0.13071413338184357)
        })
        wallcornerPurple.addComponentOrReplace(transform18)
        const gltfShape8 = new GLTFShape("GLB/PurpleCorner.glb")
        gltfShape8.withCollisions = true
        gltfShape8.isPointerBlocker = true
        gltfShape8.visible = true
        wallcornerPurple.addComponentOrReplace(gltfShape8)

        const purpleNeonTube3 = new Entity('purpleNeonTube3')
        engine.addEntity(purpleNeonTube3)
        purpleNeonTube3.setParent(_scene)
        purpleNeonTube3.addComponentOrReplace(gltfShape6)
        const transform19 = new Transform({
          position: new Vector3(8.000000953674316, 8.97, 0.54),
          rotation: new Quaternion(-0.2902846932411194, 1.4901161193847656e-8, 2.9802322387695312e-8, 0.9569404125213623),
          scale: new Vector3(8.646116256713867, 0.9900016784667969, 0.9900001287460327)
        })
        purpleNeonTube3.addComponentOrReplace(transform19)


/** END SCREEN DRESSING (neon tubes) */


/** INFO SIGN */
        const galleryInfoPurple = new Entity('galleryInfoPurple')
        engine.addEntity(galleryInfoPurple)
        galleryInfoPurple.setParent(_scene)
        const transform_galleryInfoPurple = new Transform({
          position: new Vector3(8.45, 1.5, 15.5),
          rotation: new Quaternion(0, 0, 0, 1),
          scale: new Vector3(0.5, 0.5, 0.75)
        })
        galleryInfoPurple.addComponentOrReplace(transform_galleryInfoPurple)
        


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


/** END INFO SIGN */


//const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
//const options = { inventory }

//end
