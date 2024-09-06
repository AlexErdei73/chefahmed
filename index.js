const imgNames = ["ahmed.png"];

const nameInfoObjs = [
    {
        name: "carving",
        maxIndex: 7
    },
    {
        name: "dish",
        maxIndex: 27
    },
    {
        name: "team",
        maxIndex: 10
    },
]

function generateFileNames() {
    for (let obj of nameInfoObjs) {
        const {name, maxIndex} = obj;
        let fileName = "";
        for (let i = 1; i <= maxIndex; i++) {
            fileName = name;
            if (i < 10) fileName += "0";
            fileName += `${i}.jpg`;
            imgNames.push(fileName);
        }
    }
}

function createImgElement(fileName) {
    const imgElement = document.createElement('img');
    imgElement.setAttribute("src", `./asset/Galery/${fileName}`);
    imgElement.setAttribute("alt", fileName);
    return imgElement;
}

const imgContainerDiv = document.querySelector("#galery div.row");

function addImgElements() {
    imgNames.forEach((fileName) => {
        const imgElement = createImgElement(fileName);
        imgContainerDiv.appendChild(imgElement);
    })
}

generateFileNames();
addImgElements();