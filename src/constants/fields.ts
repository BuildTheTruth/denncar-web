export const CAR_PROP_NAMES = [
  'model',
  'manufacturer',
  'price',
  'color',
  'mileage',
  'launch'
] as const

export type CarPropName = (typeof CAR_PROP_NAMES)[number]
