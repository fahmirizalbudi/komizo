import { Icon } from './icon'

export type Navigation = {
  label: string
  url: string
  segment?: string | null
  icon?: Icon
}
