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

const maxIndex = imgNames.length - 3;
let index = 0;

function goToImage(index) {
    const positionIndex = index - 21;
    const vw = window.innerWidth / 100;
    const imageWidth = 27*vw;
    imgContainerDiv.style = `transform: translateX(${-positionIndex * imageWidth}px);`;
}

const btnBackward = document.querySelector(".galery .btn-container.backward button");
const btnForward = document.querySelector(".galery .btn-container.forward button");

btnBackward.addEventListener("click", () => {
    index--;
    if (index < 0) index = maxIndex;
    goToImage(index);
});

btnForward.addEventListener("click", () => {
    index++;
    if (index > maxIndex) index = 0;
    goToImage(index);
});
