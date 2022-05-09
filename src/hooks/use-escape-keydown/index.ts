import { onBeforeUnmount, onMounted } from 'vue'
import { off, on } from '../../utils'
import { EVENT_CODE } from '../../constants'

export const useEscapeKeydown = (handler?: (e: KeyboardEvent) => void) => {
  const cachedHandler = (e: Event) => {
    const event = e as KeyboardEvent
    if (event.key === EVENT_CODE.esc) {
      handler?.(event)
    }
  }
  onMounted(() => {
    on(document, 'keydown', cachedHandler)
  })

  onBeforeUnmount(() => {
    off(document, 'keydown', cachedHandler)
  })
}
