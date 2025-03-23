interface Label {
    value: string
}

function printLabel(labelObject: Label):void {
    console.log(labelObject.value);
}

const param = { value: 'label is me' }

printLabel(param)


