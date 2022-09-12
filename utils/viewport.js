
export function setViewportSize($el){
    const viewportBlockSize = getViewport()
    $el.style.blockSize = `${viewportBlockSize}px`
}

export function getViewport() {
    window.innerHeight
}

export function onVierpotResize(callback){
    window.addEventListener('resize', callback)
}

export function offVierpotResize(){
    window.removeEventListener('resize', callback)
}

export function ViewportSize($el) {
    setViewportSize($el)
    onVierpotResize(() => setViewportSize($el))

}