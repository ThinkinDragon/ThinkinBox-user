
export const useTitle = () => useState<String>('title', () => '')
export const useNavRoute = () => useState<string>('route', () => '')
export const usePin = () => useState<Object| null>('pin', () => null)
export const useIsNavDeactive = () => useState<boolean>('isNavDeactive', () => false)
export const useIsNavActive = () => useState<boolean>('isNavActive', () => false)
export const useSheetToggle = () => useState<boolean>('SheetToggle', () => true)