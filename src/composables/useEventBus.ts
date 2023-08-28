import mitt from 'mitt'
import { EmitEventValues } from '../helpers/types'

const emitter = mitt()

export function useEventBus() {
    function $emit(
        value: typeof EmitEventValues[number]
    ){
        emitter.emit(value)
    }
    
    function $on<V extends typeof EmitEventValues[number], F extends () => void>(
        value: V, 
        cb: F
    ){
        emitter.on(value, cb)
    }
    
    function $off<V extends typeof EmitEventValues[number], F extends () => void>(
        value: V, 
        cb: F
    ){
        emitter.off(value, cb)
    }

    return {
        emitter,
        $emit,
        $on,
        $off
    }
}