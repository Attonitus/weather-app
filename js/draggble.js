
const defaultConfig = {
    open: true,
    debug: true,
    animatable: true,
}
export default function draggble($element, config = defaultConfig) {
    if(!($element instanceof HTMLElement)){
        return console.warn(`Elemento invalido se esperaba un html element ${$element}`)
    }
    debugger
}