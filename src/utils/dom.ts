import classNames from 'classnames'

import { isObject } from './validators'

type Modifiers = Record<string, boolean>

function generateEnhancedModifiers(
  baseClassName: string,
  modifiers: Modifiers
) {
  const enhancedModifiers: Modifiers = {}

  Object.entries(modifiers).forEach(([key, value]) => {
    enhancedModifiers[`${baseClassName}--${key}`] = value
  })

  return enhancedModifiers
}

export function classNameFactory(blockClassName: string) {
  return function classNameBuilder(
    elementClassName: string | Modifiers,
    modifiers: Modifiers = {}
  ) {
    let baseClassName = ''
    let updatedModifiers = {}

    if (isObject(elementClassName) || !elementClassName) {
      baseClassName = `${blockClassName}`
      updatedModifiers = generateEnhancedModifiers(
        baseClassName,
        elementClassName as Modifiers
      )
    } else {
      baseClassName = `${blockClassName}__${elementClassName}`
      updatedModifiers = generateEnhancedModifiers(baseClassName, modifiers)
    }

    return classNames(baseClassName, updatedModifiers)
  }
}
