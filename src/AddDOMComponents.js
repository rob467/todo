function createHtmlEl({tag="div", parent, props={}, textContent=""}) {
    let element = document.createElement(tag);
    Object.assign(element, props);
    element.textContent = textContent;
    parent.append(element);
    return element;
}

function createHtmlLabelInput({
    parent, createDiv=false, forLabel, id, name,
    inputType="text", labelTextContent="", required=false,
    reverseInputOrder=false, labelClass="", value=""
    } = {}) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    let parentDiv;
    if (createDiv) {
        parentDiv = document.createElement("div");
        parent.appendChild(parentDiv);
    } else {
        parentDiv = parent;
    }

    label.htmlFor = forLabel;
    label.textContent = labelTextContent;
    if (labelClass) {
        label.classList.add(labelClass)
    }

    Object.assign(input, {
        id,
        name,
        type: inputType,
    })

    if (value){
        input.setAttribute("value", value)
    }

    if (required) {
        input.setAttribute("required", true)
    }

    if (!reverseInputOrder){
        parentDiv.append(label, input);
    } else {
        parentDiv.append(input, label);
    }
}

function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

export { createHtmlEl, createHtmlLabelInput, removeAllChildren }