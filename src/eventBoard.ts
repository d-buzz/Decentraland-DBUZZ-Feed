import { splitTextIntoLines, shortenText } from './helperFunctions'
import { getEvents } from './checkApi'

export async function createEventsBoard(position: TranformConstructorArgs) {
  let events = await getEvents()

  if (events.length <= 0) {
    return
  }

  board.addComponent(new Transform({}))
  board.setParent(boardBase)

  boardBase.addComponent(new Transform(position))
  engine.addEntity(boardBase)

  image.addComponent(new PlaneShape())
  image.addComponent(
    new Transform({
      position: new Vector3(0, 0.4, -0.0),
      scale: new Vector3(14.25, 12.125, 0),
      rotation: Quaternion.Euler(0, 0, 180),
    })
  )
  image.addComponent(imageMaterial)
  image.setParent(boardBase)

  imageBackSide.addComponent(new PlaneShape())
  imageBackSide.addComponent(
    new Transform({
      position: new Vector3(0, 0.4, 0.0),
      scale: new Vector3(14.25, 12.125, 0),
      rotation: Quaternion.Euler(0, 180, 180),
    })
  )
  imageBackSide.addComponent(imageMaterial)
  imageBackSide.setParent(boardBase)

  title.addComponent(new TextShape(''))
  title.getComponent(TextShape).fontSize = 2
  title.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
  title.getComponent(TextShape).color = Color3.Black()
  title.getComponent(TextShape).hTextAlign = 'left'
  title.getComponent(TextShape).lineCount = 5
  title.getComponent(TextShape).height = 1
  title.getComponent(TextShape).width = 10
  title.getComponent(TextShape).textWrapping = true
  title.addComponent(
    new Transform({
      position: new Vector3(-0.94, -1.05, -0.14),
    })
  )
  title.setParent(boardBase)

  titleBackSide.addComponent(new TextShape(''))
  titleBackSide.getComponent(TextShape).fontSize = 2
  titleBackSide.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
  titleBackSide.getComponent(TextShape).color = Color3.Black()
  titleBackSide.getComponent(TextShape).hTextAlign = 'left'
  titleBackSide.getComponent(TextShape).lineCount = 5
  titleBackSide.getComponent(TextShape).height = 1
  titleBackSide.getComponent(TextShape).width = 10
  titleBackSide.getComponent(TextShape).textWrapping = true
  titleBackSide.addComponent(
    new Transform({
      position: new Vector3(0.94, -1.05, 0.14),
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  titleBackSide.setParent(boardBase)

  coords.addComponent(new TextShape(''))
  coords.addComponent(
    new Transform({
      position: new Vector3(-1.75, -1.555, -0.04),
    })
  )
  coords.getComponent(TextShape).fontSize = 2
  coords.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
  coords.getComponent(TextShape).color = Color3.Black()
  coords.getComponent(TextShape).hTextAlign = 'left'
  //coords.setParent(boardBase)

  coordsBackSide.addComponent(new TextShape(''))
  coordsBackSide.addComponent(
    new Transform({
      position: new Vector3(2.75, -1.555, 0.04),
      rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  coordsBackSide.getComponent(TextShape).fontSize = 2
  coordsBackSide.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
  coordsBackSide.getComponent(TextShape).color = Color3.Black()
  coordsBackSide.getComponent(TextShape).hTextAlign = 'left'
  //coordsBackSide.setParent(boardBase)

  clickPanel.addComponent(invisibleMaterial)
  clickPanel.addComponent(new PlaneShape())
  clickPanel.addComponent(
    new Transform({
      scale: new Vector3(15, 14.5, 10),
      position: new Vector3(0, 0, -0.2),
    })
  )
  clickPanel.setParent(boardBase)

  clickPanelBackSide.addComponent(invisibleMaterial)
  clickPanelBackSide.addComponent(new PlaneShape())
  clickPanelBackSide.addComponent(
    new Transform({
      scale: new Vector3(15, 14.5, 10),
      position: new Vector3(0, 0, 0.2),
    })
  )
  clickPanelBackSide.setParent(boardBase)

  displayEvent(events, 0)

  if (events.length > 1) {
    engine.addSystem(new SwitchEventSystem(events, 4))
  }
}

let bannerSwitcher = new Entity()

let imageMaterial = new Material()
imageMaterial.roughness = 1
imageMaterial.metallic = 0
imageMaterial.specularIntensity = 0

let invisibleMaterial = new Material()
invisibleMaterial.albedoColor = new Color4(0, 0, 0, 0)

let inactiveEventMaterial = new Material()
inactiveEventMaterial.roughness = 1
inactiveEventMaterial.specularIntensity = 0
inactiveEventMaterial.albedoTexture = new Texture('images/gray.png')
inactiveEventMaterial.alphaTexture = new Texture('images/gray.png')

let activeEventMaterial = new Material()
activeEventMaterial.roughness = 1
activeEventMaterial.specularIntensity = 0
activeEventMaterial.albedoTexture = new Texture('images/red.png')
activeEventMaterial.alphaTexture = new Texture('images/red.png')

let boardBase = new Entity()

let board = new Entity()

let image = new Entity()

let imageBackSide = new Entity()

let title = new Entity()

let titleBackSide = new Entity()

let coords = new Entity()

let coordsBackSide = new Entity()

let clickPanel = new Entity()

let clickPanelBackSide = new Entity()

let dots = []
let dotsBackSide = []

class SwitchEventSystem implements ISystem {
  timer: number
  interval: number
  currentEvent: number
  events: any[]
  constructor(events: any[], interval: number) {
    this.events = events
    this.timer = interval
    this.interval = interval
    this.currentEvent = 0
  }
  update(dt: number) {
    this.timer -= dt
    if (this.timer < 0) {
      this.timer += this.interval
      displayEvent(this.events, this.currentEvent)
      this.currentEvent += 1
      if (this.currentEvent >= this.events.length) {
        this.currentEvent = 0
      }
    }
  }
}

export function createDots(dotAmount: number) {
  for (let i = 0; i < dotAmount; i++) {
    let offset = (i - dotAmount / 2) * 0.1
    let dot = new Entity()
    dot.addComponent(new PlaneShape())
    dot.addComponent(inactiveEventMaterial)
    dot.addComponent(
      new Transform({
        position: new Vector3(offset, -1.9, -0.05),
        scale: new Vector3(0.05, 0.05, 0.05),
      })
    )
    dot.setParent(boardBase)
    dots.push(dot)

    let dotBackSide = new Entity()
    dotBackSide.addComponent(new PlaneShape())
    dotBackSide.addComponent(inactiveEventMaterial)
    dotBackSide.addComponent(
      new Transform({
        position: new Vector3(-offset, -1.9, 0.05),
        scale: new Vector3(0.05, 0.05, 0.05),
      })
    )
    dotBackSide.setParent(boardBase)
    dotsBackSide.push(dotBackSide)
  }
}

export function displayEvent(events: any[], currentEvent: number) {
  if (events.length <= 0) return
  let event = events[currentEvent]
  log(event.json_metadata.image)
  if (event.json_metadata.image) {
    imageMaterial.albedoTexture = new Texture(event.json_metadata.image[0])
    image.addComponentOrReplace(imageMaterial)
    imageBackSide.addComponentOrReplace(imageMaterial)
  }

  let eventCoords = ''
  if (event.body) {
    eventCoords = event.body
  }

  title.getComponent(TextShape).value = event.body
  titleBackSide.getComponent(TextShape).value = event.body

  coords.getComponent(TextShape).value = eventCoords
  coordsBackSide.getComponent(TextShape).value = eventCoords

  if (dots.length <= 0 && events.length > 1) {
    createDots(events.length)
  }

  if (events.length > 1) {
    for (let i = 0; i < dots.length; i++) {
      if (i === currentEvent) {
        dots[i].addComponentOrReplace(activeEventMaterial)
        dotsBackSide[i].addComponentOrReplace(activeEventMaterial)
      } else {
        dots[i].addComponentOrReplace(inactiveEventMaterial)
        dotsBackSide[i].addComponentOrReplace(inactiveEventMaterial)
      }
    }
  }
}
