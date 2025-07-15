import { createHtmlEl, createHtmlLabelInput } from './AddDOMComponents.js';
import deleteBtnSVG from './svgs/trash-solid.svg';

function createModal({
  id,
  parent,
  formProps = {},
  content = [],
  buttons = {},
}) {
  const dialog = createHtmlEl({
    tag: 'dialog',
    parent: parent,
    props: { id: id, className: 'form-dialog' },
  });

  const form = createHtmlEl({
    tag: 'form',
    parent: dialog,
    props: { ...formProps },
  });

  form.method = 'dialog';

  content.forEach((item) => {
    if (item.type === 'input') {
      const inputEl = createHtmlLabelInput({
        parent: form,
        inputType: item.inputType,
        inputProps: item.inputProps,
        labelText: item.labelText,
        dateDefault: item.dateDefault,
        reverseOrder: item.reverseOrder || false,
        required: item.required || false,
        wrapperProps: item.wrapperProps || {},
      });
    } else if (item.type === 'radio-group') {
      const radioDiv = createHtmlEl({
        parent: form,
        props: { className: item.wrapperClass || 'radio-group' },
      });

      item.options.forEach((option) => {
        createHtmlLabelInput({
          parent: radioDiv,
          inputType: 'radio',
          inputProps: {
            id: `${item.name}-${option.value}`,
            value: option.value,
            name: item.name,
          },
          labelText: option.label,
          required: item.required || false,
          reverseOrder: item.reverseOrder || false,
        });
      });
    } else if (item.type === 'select') {
      const selectGroup = createHtmlEl({
        tag: 'select',
        parent: createHtmlEl({ parent: form }),
        props: item.props,
      });

      item.options.forEach((option) => {
        createHtmlEl({
          tag: 'option',
          parent: selectGroup,
          textContent: option.label,
          props: { value: option.value },
        });
      });
    } else if (item.type === 'textarea') {
      const descriptionDiv = createHtmlEl({ parent: form });
      const descriptionLabel = createHtmlEl({
        tag: 'label',
        parent: descriptionDiv,
        textContent: 'Description: ',
      });
      createHtmlEl({
        tag: 'textarea',
        parent: descriptionDiv,
        props: item.props,
      });

      descriptionLabel.htmlFor = item.props.id;
    } else {
      createHtmlEl({
        tag: item.tag,
        parent: form,
        textContent: item.textContent || '',
        props: item.props || {},
      });
    }
  });
  const buttonsDiv = createHtmlEl({
    parent: form,
    props: { className: 'btns-div' },
  });

  Object.entries(buttons).forEach(([label, callback]) => {
    let button = '';
    if (label === 'delete') {
      button = createHtmlEl({
        tag: 'img',
        parent: buttonsDiv,
        props: {
          id: 'delete-btn',
          src: deleteBtnSVG,
          className: 'logo-svg-small',
        },
      });
    } else {
      button = createHtmlEl({
        tag: 'button',
        parent: buttonsDiv,
        textContent: label,
        props: { type: 'button' },
      });
    }

    button.onclick = (e) => {
      e.preventDefault();
      callback?.({
        dialog,
        form,
        open,
        close,
        getFormData: () => Object.fromEntries(new FormData(form)),
      });
    };
  });

  function setContent(newContent) {
    while (form.firstChild && !form.firstChild.classList.contains('btns-div')) {
      form.removeChild(form.firstChild);
    }
    const buttonsDiv = form.querySelector('.btns-div');
    newContent.forEach((item) => {
      let newElement;
      if (item.type === 'input') {
        newElement = createHtmlLabelInput({
          parent: null,
          inputType: item.inputType,
          inputProps: item.inputProps,
          labelText: item.labelText,
          dateDefault: item.dateDefault,
          reverseOrder: item.reverseOrder || false,
          required: item.required || false,
          wrapperProps: item.wrapperProps || {},
        });
      } else if (item.type === 'custom' && typeof item.render === 'function') {
        newElement = item.render();
      } else {
        newElement = createHtmlEl({
          tag: item.tag,
          parent: form,
          textContent: item.textContent || '',
          props: item.props || {},
        });
      }
      form.insertBefore(newElement, buttonsDiv);
    });
  }

  return {
    open: () => dialog.showModal(),
    close: () => dialog.close(),
    getFormData: () => Object.fromEntries(new FormData(form)),
    form,
    setContent,
  };
}

export default createModal;
