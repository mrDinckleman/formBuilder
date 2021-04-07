import control from '../control'

/**
 * Fieldset class
 * Output a <fieldset></fieldset> form element
 */
export default class controlFieldset extends control {
  static get definition() {
    return {
      i18n: {
        default: 'Fieldset',
      },
    }
  }

  /**
   * build a text DOM element, supporting other jquery text form-control's
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    const { type, ...attrs } = this.config
    let tag = type

    // some types use an element of a different name
    const typeMap = {
      fieldset: 'fieldset',
      div: 'div',
    }

    if (typeMap[type]) {
      tag = typeMap[type]
    }

    return {
      field: this.markup(tag, '', attrs),
      layout: 'hidden',
    }
  }
}

// register the following controls
control.register('fieldset', controlFieldset)
control.register(['fieldset', 'div'], controlFieldset, 'fieldset')
