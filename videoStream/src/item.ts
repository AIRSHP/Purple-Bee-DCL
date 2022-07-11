import { triggerEmote, PredefinedEmote } from "@decentraland/RestrictedActions"

export type Props = {
  onClick?: Actions
  onActivate?: Actions
  onDeactivate?: Actions
  station?: string
  customStation?: string
  onClickText: string
  startOn: boolean
  volume: number
  image?: string
  controlDist?:number
}

//let defaultStation = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8' //just some random shit
let defaultStation = 'https://d3kt99p6ty4t3h.cloudfront.net/20210623_jagtronica_xAy1c/tVyNQJ.m3u8' //jag 2021-06-23 hosted by dadabase

export default class Button implements IScript<Props> {
  channel = ''
  video: Record<string, VideoTexture> = {}
  materials: Record<string, Material> = {}
  active: Record<string, boolean> = {}
  volume: Record<string, number> = {}
  sign: Record<string, Entity> = {}
  activeScreen: Entity
  init() {}

  toggle(entity: Entity, value: boolean) {
    log('all screens: ', this.video, ' setting: ', entity.name, ' to ', value)

    if (value) {
      if (this.activeScreen && this.activeScreen == entity) {
        return
      } else if (this.activeScreen) {
        this.toggle(this.activeScreen, false)
      }

      this.activeScreen = entity
      this.active[entity.name] = true
      this.video[entity.name].volume = this.volume[entity.name]
      this.video[entity.name].playing = true
      engine.removeEntity(this.sign[entity.name])
      //this.sign[entity.name].getComponent(PlaneShape).visible = false
    } else {
      if (!this.activeScreen || this.activeScreen != entity) {
        return
      }

      this.activeScreen = null
      this.active[entity.name] = false
      this.video[entity.name].playing = false
      //this.sign[entity.name].getComponent(PlaneShape).visible = true
    }
    return
  }

  spawn(host: Entity, props: Props, channel: IChannel) {
    const screen = new Entity(host.name + '-screen')
    screen.setParent(host)

    let scaleMult = 1.55

    screen.addComponent(new PlaneShape())
    screen.addComponent(
      new Transform({
        scale: new Vector3(1.92 * scaleMult, 1.08 * scaleMult, 10 * scaleMult),
        position: new Vector3(0, 0.548 * scaleMult, 0),
      })
    )

    if (props.customStation) {
      this.channel = props.customStation
    } else if (props.station) {
      this.channel = props.station
    } else {
      this.channel = defaultStation
    }

    // test
    /*
    let test = new Entity()
    test.setParent(host)
    test.addComponentOrReplace(new GLTFShape('a747f104-5434-42a8-a543-8739c24cf253/models/stream_preview.glb'))
    */


    
    // video material
    this.video[screen.name] = new VideoTexture(new VideoClip(this.channel))
    this.materials[screen.name] = new Material()
    this.materials[screen.name].albedoTexture = this.video[screen.name]
    this.materials[screen.name].specularIntensity = 0
    this.materials[screen.name].roughness = 1
    this.materials[screen.name].metallic = 0
    this.materials[screen.name].emissiveTexture = this.video[screen.name]
    this.materials[screen.name].emissiveIntensity = 0.8
    this.materials[screen.name].emissiveColor = new Color3(1, 1, 1)

    screen.addComponent(this.materials[screen.name])

    // icon for streaming
    this.sign[screen.name] = new Entity(host.name + '-sign')
    this.sign[screen.name].setParent(screen)

    this.sign[screen.name].addComponent(new PlaneShape())
    this.sign[screen.name].addComponent(
      new Transform({
        position: new Vector3(0, 0, 0.002),
        rotation: Quaternion.Euler(180, 0, 0),
      })
    )

    this.volume[screen.name] = props.volume


    let placeholderMaterial = new BasicMaterial()
    placeholderMaterial.texture = new Texture(
      props.image ? props.image : 'videoStream/images/stream.png'
    )
    //console.log(props.image)
    //placeholderMaterial.specularIntensity = 0
    //placeholderMaterial.roughness = 1
    this.sign[screen.name].addComponent(placeholderMaterial)

    //orig image code here


    if (props.onClick) {
      this.sign[screen.name].addComponent(
        new OnPointerDown(
          () => {
            channel.sendActions(props.onClick)
          },
          {
            button: ActionButton.POINTER,
            hoverText: props.onClickText,
            distance: props.controlDist ? props.controlDist : 10,
          }
        )
      )


      screen.addComponent(
        new OnPointerDown(
          () => {
            log('clicked')
            channel.sendActions(props.onClick)
          },
          {
            button: ActionButton.POINTER,
            hoverText: props.onClickText,
            distance: props.controlDist ? props.controlDist : 10,
          }
        )
      )

    }

    if (props.startOn) {
      this.toggle(screen, true)
    } else {
      this.toggle(screen, false)
    }

    // handle actions
    channel.handleAction('activate', ({ sender }) => {
      this.toggle(screen, true)
      
      if (sender === channel.id) {
        channel.sendActions(props.onActivate)
      }
    })
    channel.handleAction('deactivate', ({ sender }) => {
      this.toggle(screen, false)
      if (sender === channel.id) {
        channel.sendActions(props.onDeactivate)
      }
    })
    channel.handleAction('toggle', ({ sender }) => {
      let value = !this.active[screen.name]

      this.toggle(screen, value)
      if (sender === channel.id) {
        if (value) {
          channel.sendActions(props.onActivate)
          triggerEmote({ predefined: PredefinedEmote.HANDS_AIR})
        } else {
          channel.sendActions(props.onDeactivate)
        }
      }
    })

    // sync initial values
    channel.request<boolean>('isActive', (isActive) =>
      this.toggle(screen, isActive)
    )
    channel.reply<boolean>('isActive', () => this.active[screen.name])
  }
}
