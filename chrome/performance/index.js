const redBox = document.getElementById('redBox');
const yellowBox = document.getElementById('yellowBox');

function changYellowBoxColor() {
    yellowBox.style.backgroundColor = 'blue';
}

async function changeRedBoxHeight() {
    redBox.style.height = '150px';
    await setTimeout(() => {
        redBox.style.height = '100px';
    }, 100)
    changYellowBoxColor()
}

redBox.onclick = function() {
    changeRedBoxHeight()
}

