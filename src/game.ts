import * as utils from '@dcl/ecs-scene-utils'
import * as ui from '@dcl/ui-scene-utils'
import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import { sceneMessageBus } from './messageBus'
import { triggerEmote, PredefinedEmote, movePlayerTo } from "@decentraland/RestrictedActions"
import ImagePanel from "../imagePanel/src/item"
import VideoScreenScript from "../videoStream/src/item"

declare var setInterval: any
declare var clearInterval: any
declare var setTimeout: any

const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const options = { inventory }
const imageCacheBust = Math.floor(Math.random() * 10000)


const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

/* connect to PB wordpress site api to get custom options data */

const pbOptionsUrl = 'https://purplebee.org/wp-json/pb/dcl-options'
executeTask(async () => {
  try {
    let response = await fetch(pbOptionsUrl,{
      headers: { "Content-Type": "application/json" },
      method: "POST"
    })
    let json = await response.json()
    log('pb wordpress options')
    log( await json)
  } catch {
    log("pb wordpress error - failed to reach URL")
  }
})


/* UI Stuff */

//let pbIcon = new ui.MediumIcon('images/icons8-live-streaming-64.png',100,100)
//ui.displayAnnouncement('Welcome to Purple Bee', 10, true, Color4.White(), 50, true)


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
        const gltfShape_mainStructure  = new GLTFShape("GLB/Decentraland Arena8dboz.glb")
        gltfShape_mainStructure .withCollisions = true
        gltfShape_mainStructure .isPointerBlocker = true
        gltfShape_mainStructure .visible = true
        mainStructure .addComponentOrReplace(gltfShape_mainStructure)

/* Circular Moving Platform on Dancefloor */
        /*
        const cplat = new Entity('cplat')
        
        cplat.setParent(_scene)
        const transform_cplat = new Transform({
          position: new Vector3(8, 1.16, 7.4)
        })
        cplat.addComponentOrReplace(transform_cplat)
        const gltfShape_cplat = new GLTFShape("GLB/circular-platform5.glb")
        gltfShape_cplat.withCollisions = false
        gltfShape_cplat.isPointerBlocker = true
        gltfShape_cplat.visible = true
        cplat.addComponentOrReplace(gltfShape_cplat)

        //trigger for circle platform
        const cplatChild = new Entity('cplatChild')
       
        cplatChild.setParent(cplat)
        const transform_cplatChild = new Transform({
          position: new Vector3(-2.73, 0, -3.69),
        })
        cplatChild.addComponentOrReplace(transform_cplatChild)
        const circpTrigger = new utils.TriggerComponent(
          new utils.TriggerBoxShape(new Vector3(1.2, 5, 1.2), Vector3.Zero()),
          {
            onCameraEnter: () => {
              setTimeout(()=>{
                cplat.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 20, 0)) )
              },100)
            },
            onCameraExit: () => {
              cplat.getComponent(utils.KeepRotatingComponent).stop()
             }
            //,enableDebug: true
          }
        )
        cplatChild.addComponentOrReplace(circpTrigger)    
        engine.addEntity(cplat)
        engine.addEntity(cplatChild)
*/


/*
        const cplat = new Entity('cplat')
        engine.addEntity(cplat)
        cplat.setParent(_scene)
        const transform_cplat = new Transform({
          position: new Vector3(8, 1, 7.4),
          //rotation: new Quaternion(0, .5, 0, 0),
          scale: new Vector3(1,1,1)
        })
        cplat.addComponentOrReplace(transform_cplat)
        const gltfShape_cplat = new GLTFShape("GLB/circular-platform3.glb")
        gltfShape_cplat.withCollisions = true
        gltfShape_cplat.isPointerBlocker = true
        gltfShape_cplat.visible = true
        cplat.addComponentOrReplace(gltfShape_cplat)


        //trigger for circle platform
        const cplatChild = new Entity('cplatChild')
        engine.addEntity(cplatChild)
        cplatChild.setParent(cplat)
        const transform_cplatChild = new Transform({
          position: new Vector3(0, 0, 0),
          //rotation: new Quaternion(0, .5, 0, 0),
          //scale: new Vector3(1,1,1)
        })
        cplatChild.addComponentOrReplace(transform_cplatChild)
        const circpTrigger = new utils.TriggerComponent(
          new utils.TriggerBoxShape(new Vector3(1, 2, 1), Vector3.Zero()),
          {
            onCameraEnter: () => {
              log("on the circpTrigger")
            },
            onCameraExit: () => {

            },
            enableDebug: true
          }
        )
        cplatChild.addComponentOrReplace(circpTrigger)
      */







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
        /*
        const PBcube = new Entity('PBcube')
        engine.addEntity(PBcube)
        PBcube.setParent(_scene)
        const transform_PBcube = new Transform({
          position: new Vector3(1, 19, 1),
          rotation: new Quaternion(0, 0, 0, 0),
          scale: new Vector3(.6,.6,.6)
        })
        PBcube.addComponentOrReplace(transform_PBcube)
        const gltfShape_PBcube = new GLTFShape("GLB/Bee Cube Spin.glb")
        gltfShape_PBcube.withCollisions = true
        gltfShape_PBcube.isPointerBlocker = true
        gltfShape_PBcube.visible = true
        PBcube.addComponentOrReplace(gltfShape_PBcube)
        */

/* video screen */
/****************/

        const videoStream = new Entity('videoStream')
        engine.addEntity(videoStream)
        videoStream.setParent(_scene)
        const transform_videoStream = new Transform({
          position: new Vector3(8 ,4.15,0.5),
          rotation: new Quaternion(0, 0, 0, 1),
          scale: new Vector3(4.5, 4.5, 4.5)
        })
        videoStream.addComponentOrReplace(transform_videoStream)

        const videoScreenScript = new VideoScreenScript()
        videoScreenScript.init()
        videoScreenScript.spawn(videoStream, {
            "startOn":true,
            "volume":1,
            "controlDist":20,
            //"onClick":[{"entityName":"videoStream","actionId":"toggle","values":{}}],
            "onClickText":"Play/Pause",
            "image":"https://purplebee.org/wp-content/uploads/DCL-Screen-Main.jpg",
            //"station":"https://8343f7014c0ea438.mediapackage.us-west-2.amazonaws.com/out/v1/97ed27876e70411685f551766ae1cec4/index.m3u8"
            "station":"https://dimhp4sranvy3.cloudfront.net/out/v1/97ed27876e70411685f551766ae1cec4/index.m3u8?"+imageCacheBust
          }, 
          createChannel(channelId, videoStream, channelBus)
        )
        //log(videoScreenScript);


        ////black wall under screen
        const blackwall = new Entity('blackwall')
        engine.addEntity(blackwall)
        blackwall.setParent(_scene)
        const transform_blackwall = new Transform({
          position: new Vector3(8, 2.2, .5),
          rotation: new Quaternion(0, .5, 0, .5),
          scale: new Vector3(1.3,2,1.8)
        })
        blackwall.addComponentOrReplace(transform_blackwall)
        const gltfShape_blackwall = new GLTFShape("GLB/screenwall.glb")
        gltfShape_blackwall.withCollisions = false
        gltfShape_blackwall.isPointerBlocker = true
        gltfShape_blackwall.visible = true
        blackwall.addComponentOrReplace(gltfShape_blackwall)


        //marquee image banner above the screen
        const imagePanelMarquee = new Entity()
        engine.addEntity(imagePanelMarquee)
        imagePanelMarquee.setParent(_scene)
        const imagePanelMarquee_transform = new Transform({
          position: new Vector3(8, 12.3, 1.95),
          rotation: new Quaternion(0, 0, 0, 0),
          scale: new Vector3(12.05, 1.56, 1 )
        })
        imagePanelMarquee.addComponentOrReplace(imagePanelMarquee_transform)
        const imagePanelMarqueeScript = new ImagePanel()
        imagePanelMarqueeScript.init()
        imagePanelMarqueeScript.spawn(imagePanelMarquee, {
            "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-marquee.png?"+imageCacheBust,
            "url":"https://purplebee.org/?dclpanel=marquee",
            "basic":true
        }, createChannel(channelId, imagePanelMarquee, channelBus))



         //image banners under the screen
         
         
         const screenbannersize = 3.25
         const imagePanel5 = new Entity()
         engine.addEntity(imagePanel5)
         imagePanel5.setParent(_scene)
         const imagePanel5_transform = new Transform({
           position: new Vector3(12.85, 1, .75),
           rotation: new Quaternion(0, 0, 0, 0),
           scale: new Vector3(screenbannersize, screenbannersize, 1 )
         })
         imagePanel5.addComponentOrReplace(imagePanel5_transform)
         const imagePanelScript5 = new ImagePanel()
         imagePanelScript5.init()
         imagePanelScript5.spawn(imagePanel5, {
             "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-5.png?"+imageCacheBust,
             "url":"https://purplebee.org/?dclpanel=5",
             "basic":true
         }, createChannel(channelId, imagePanel5, channelBus))

        const imagePanel6 = new Entity()
        engine.addEntity(imagePanel6)
        imagePanel6.setParent(imagePanel5)
        imagePanel6.addComponent(new Transform())
        imagePanel6.getComponent(Transform).position.set(-1, 0, 0)
        const imagePanelScript6 = new ImagePanel()
        imagePanelScript6.init()
        imagePanelScript6.spawn(imagePanel6, {
            "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-6.png?"+imageCacheBust,
            "url":"https://purplebee.org/?dclpanel=6",
            "basic":true
        }, createChannel(channelId, imagePanel5, channelBus))

        const imagePanel7 = new Entity()
        engine.addEntity(imagePanel7)
        imagePanel7.setParent(imagePanel5)
        imagePanel7.addComponent(new Transform())
        imagePanel7.getComponent(Transform).position.set(-2, 0, 0)
        const imagePanelScript7 = new ImagePanel()
        imagePanelScript7.init()
        imagePanelScript7.spawn(imagePanel7, {
            "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-7.png?"+imageCacheBust,
            "url":"https://purplebee.org/?dclpanel=7",
            "basic":true
        }, createChannel(channelId, imagePanel7, channelBus))
        
        const imagePanel8 = new Entity()
        engine.addEntity(imagePanel8)
        imagePanel8.setParent(imagePanel5)
        const imagePanel8_transform = new Transform({
          position: new Vector3(-3, 0, 0),
        })
        imagePanel8.addComponentOrReplace(imagePanel8_transform)
        const imagePanelScript8 = new ImagePanel()
        imagePanelScript8.init()
        imagePanelScript8.spawn(imagePanel8, {
            "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-8.png?"+imageCacheBust,
            "url":"https://purplebee.org/?dclpanel=8",
            "basic":true
        }, createChannel(channelId, imagePanel8, channelBus))






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
         /*
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
          
          
          
          */


//trigger for dancefloor actions
          let danceTimer = false
          function dance(){
            let dances = [PredefinedEmote.ROBOT,PredefinedEmote.TIK,PredefinedEmote.HAMMER,PredefinedEmote.TEKTONIK,PredefinedEmote.DISCO]
            let randomDance = Math.floor(Math.random() * dances.length);
            triggerEmote({ predefined: dances[randomDance] })
            //log("dancing with "+dances[randomDance])
          }
          const blackholeTrigger = new utils.TriggerComponent(
            new utils.TriggerBoxShape(new Vector3(7.4, 5, 7.4), Vector3.Zero()),
            {
              onCameraEnter: () => {
                //log("on the blackhole")
                let danceFirst = setTimeout(()=>{dance()},1000)
                danceTimer = setInterval(()=>{dance()},10000)
              },
              onCameraExit: () => {
                //log("off the blackhole")
                clearInterval(danceTimer)
              }
            }
          )
          blackhole1.addComponentOrReplace(blackholeTrigger)



          const balcony1Trigger = new utils.TriggerComponent(
            new utils.TriggerBoxShape(new Vector3(14, 8, 6), new Vector3(0, 9, -1.5)),
            {
              onCameraEnter: () => {
                //log("on the balcony1Trigger")
                let danceFirst = setTimeout(()=>{dance()},1000)
                danceTimer = setInterval(()=>{dance()},10000)
              },
              onCameraExit: () => {
                //log("off the balcony1Trigger")
                clearInterval(danceTimer)
              }
              //,enableDebug: true
            }
          )
          mainStructure.addComponentOrReplace(balcony1Trigger)




/**** IMAGE PANELS */
          const bannerSize = 3.4
          const imagePanel1 = new Entity('imageFromURL')
          engine.addEntity(imagePanel1)
          imagePanel1.setParent(_scene)
          const imagePanel1_transform = new Transform({
            position: new Vector3(3, 3.01, 31.5),
            rotation: new Quaternion(0, .5, 0, 0),
            scale: new Vector3(bannerSize ,bannerSize ,bannerSize )
          })
          imagePanel1.addComponentOrReplace(imagePanel1_transform)
          const imagePanelScript1 = new ImagePanel()
          imagePanelScript1.init()
          imagePanelScript1.spawn(imagePanel1, {
              "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-1.png?"+imageCacheBust,
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
              "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-2.png?"+imageCacheBust,
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
              "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-3.png?"+imageCacheBust,
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
              "image":"https://purplebee.org/wp-content/uploads/DCL-Panel-4.png?"+imageCacheBust,
              "url":"https://purplebee.org/?dclpanel=4",
              "basic":true
          }, createChannel(channelId, imagePanel4, channelBus))

         

/***** END IMAGE PANELS */


////back wall in tunnel - collider
const tunnelbackwall = new Entity('tunnelbackwall')
engine.addEntity(tunnelbackwall)
tunnelbackwall.setParent(_scene)
const transform_tunnelbackwall = new Transform({
  position: new Vector3(8, .95, 31),
  rotation: new Quaternion(0, .5, 0, .5),
  scale: new Vector3(1.3,2,1.8)
})
tunnelbackwall.addComponent(transform_tunnelbackwall)
const gltfShape_tunnelbackwall = gltfShape_blackwall
gltfShape_tunnelbackwall.withCollisions = false
gltfShape_tunnelbackwall.isPointerBlocker = true
gltfShape_tunnelbackwall.visible = true
tunnelbackwall.addComponentOrReplace(gltfShape_tunnelbackwall)


//end
