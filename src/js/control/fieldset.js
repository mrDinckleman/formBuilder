import control from '../control'

/**
 * Fieldset class
 * Output a <fieldset></fieldset> form element
 */
export default class controlFieldset extends control {
  static get definition() {
    return {
      i18n: {
        default: {
          fieldset: 'Fieldset',
          div: 'Div',
        },
      },
    }
  }

  /**
   * build a text DOM element, supporting other jquery text form-control's
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    const { type, repeatable, ...attrs } = this.config
    let tag = type

    // some types use an element of a different name
    const typeMap = {
      fieldset: 'fieldset',
      div: 'div',
    }

    if (typeMap[type]) {
      tag = typeMap[type]
    }

    const remove = this.markup('button', 'X', {
      type: 'button',
      className: 'remove',
    })
    this.fieldset = this.markup(tag, repeatable ? remove : '', {
      ...attrs,
      className: 'fieldset',
    })
    const content = [this.fieldset]

    if (repeatable) {
      this.repeat = this.markup('button', 'Add', {
        type: 'button',
      })
      this.repeat.addEventListener('click', () => {
        this.repeat.parentNode.insertBefore(this.fieldset.cloneNode(true), this.repeat)
      })
      content.push(this.repeat)
    }

    return {
      field: this.markup('div', content),
      layout: 'hidden',
    }
  }
}

// register the following controls
control.register('fieldset', controlFieldset)
control.register(['fieldset', 'div'], controlFieldset, 'fieldset')
