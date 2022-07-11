export type Props = {
  image: string,
  url?: string,
  basic?:boolean
}

type ChangeTextType = { newText: string }

export default class SignPost implements IScript<Props> {
  init() {}

  spawn(host: Entity, props: Props, channel: IChannel) {
    const sign = new Entity()
    sign.setParent(host)

    //sign.addComponent(new GLTFShape('models/QR_SimpleFrame.glb'))
    sign.addComponent(new Transform({}))

    let url = props.image

    let QRTexture = new Texture(url)
    let QRMaterialB = new BasicMaterial()
    //QRMaterialB.albedoColor = Color4(1, 0, 0, 0.5)
    //QRMaterialB.metallic = 0.9
    //QRMaterialB.roughness = 0.1
    //QRMaterialB.visible = true

    QRMaterialB.texture = QRTexture


    let QRPlane = new Entity()
    QRPlane.setParent(host)
    QRPlane.addComponent(new PlaneShape())
    QRPlane.addComponent(QRMaterialB)
  
    QRPlane.addComponent(
      new Transform({
        position: new Vector3(0, 0.5, 0),
        rotation: Quaternion.Euler(180, 0, 0),
        scale: new Vector3(1, 1, 1),
      })
    )
    QRPlane.addComponentOrReplace(
      new OnPointerDown(
        (e) => {openExternalURL(props.url ? props.url : 'https://purplebee.org/')},
        { hoverText: 'Learn More' }
      )
    )
  }
  
}
