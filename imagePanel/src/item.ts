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
    let QRMaterial = new Material()
    let QRMaterialB = new BasicMaterial()
    QRMaterialB.texture = QRTexture
    QRMaterial.metallic = 0
    QRMaterial.roughness = 1
    QRMaterial.specularIntensity = 0
    QRMaterial.transparencyMode = 1
    QRMaterial.albedoTexture = QRTexture
 
    
    let QRPlane = new Entity()
    QRPlane.setParent(host)
    QRPlane.addComponent(new PlaneShape())
    if(props.basic){
      QRPlane.addComponent(QRMaterialB)
    }else{
      QRPlane.addComponent(QRMaterial)
    }
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
