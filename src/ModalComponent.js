import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"

function createModal({ id, parent, content=[], buttons = {} }) {
    const dialog = createHtmlEl({
        tag: "dialog",
        parent: parent,
        props: {id: id}
    })

    const form = createHtmlEl({tag: "form", parent: dialog})
    form.method = "dialog";

    content.forEach((item) => {
        if (item.type === "input") {
            createHtmlLabelInput({
                parent: form,
                inputProps: item.inputProps,
                labelProps: item.labelText,
                labelText: item.labelText,
                reverseOrder: item.reverseOrder || false,
                required: item.required || false,
                wrapperProps: item.wrapperProps || {},
            })
        } else {
            createHtmlEl({
                tag: item.tag,
                parent: form,
                textContent: item.textContent || "",
                props: item.props || {}
            })
        }
    })

    Object.entries(buttons).forEach(([label, callback]) => {
        createHtmlEl({
            tag: "button",
            parent: form,
            textContent: label,
            props: { type: "button" },
            children: [],
            appendOrder: "normal"
        }).onclick = (e) => {
            e.preventDefault();
            callback?.({
                dialog,
                form,
                open,
                close,
                getFormData: () => Object.fromEntries(new FormData(form))})
        }
    })

    createHtmlEl({
        tag: "button",
        parent: form,
        textContent: "Cancel",
        props: {type: "button"}
    }).onclick = () => dialog.close()

    return {
        open: () => dialog.showModal(),
        close: () => dialog.close(),
        getFormData: () => Object.fromEntries(new FormData(form))
    }
}

export default createModal