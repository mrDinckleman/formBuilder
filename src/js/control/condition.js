import control from '../control'
import { trimObj } from '../utils'

export default class controlCondition extends control {
  static get definition() {
    return {
      i18n: {
        default: {
          condition: 'Condition',
        },
      },
    }
  }

  /**
   * build a select DOM element, supporting other jquery text form-control's
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    const options = []
    const { values, value, placeholder, ...data } = this.config
    // const optionType = type.replace('-group', '')
    const isSelect = true

    delete data.title

    if (values) {
      // if a placeholder is specified, add it to the top of the option list
      if (placeholder && isSelect) {
        options.push(
          this.markup('option', placeholder, {
            disabled: null,
            selected: null,
          }),
        )
      }

      // process the rest of the options
      for (let i = 0; i < values.length; i++) {
        let option = values[i]
        if (typeof option === 'string') {
          option = { label: option, value: option }
        }
        const { label = '', ...optionAttrs } = option
        optionAttrs.id = `${data.id}-${i}`

        // don't select this option if a placeholder is defined
        if (!optionAttrs.selected || placeholder) {
          delete optionAttrs.selected
        }

        // if a value is defined at select level, select this attribute
        if (typeof value !== 'undefined' && optionAttrs.value === value) {
          optionAttrs.selected = true
        }

        const o = this.markup('option', document.createTextNode(label), optionAttrs)
        options.push(o)
      }
    }

    const attrs = trimObj(data, true)
    attrs.events = {
      change: evt => {
        const element = evt.target
        element.childNodes.forEach(opt => {
          document.querySelector(opt.value).style.display = 'none'
        })
        document.querySelector(element.value).style.display = 'block'
      }
    }
    // build & return the DOM elements
    this.dom = this.markup('select', options, attrs)
    return this.dom
  }
}

// register this control for the following types & text subtypes
control.register(['condition'], controlCondition)
