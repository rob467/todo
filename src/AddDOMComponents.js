function createHtmlEl({tag="div", parent, props={}, textContent=""}) {
    let element = document.createElement(tag);
    Object.assign(element, props);
    element.textContent = textContent;
    parent.append(element);
    return element;
}

function createHtmlLabelInput({parent, createDiv=true, forLabel, id, name,
    inputType="text", labelTextContent="", required=false} = {}) {
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.htmlFor = forLabel;
    label.textContent = labelTextContent;

    Object.assign(input, {
        id,
        name,
        type: inputType,
        required
    })

    if (createDiv) {
        const labelInputDiv = document.createElement("div");
        labelInputDiv.append(label, input);
        parent.appendChild(labelInputDiv)
    } else {
        parent.append(label, input);
    }
}


export { createHtmlEl, createHtmlLabelInput }