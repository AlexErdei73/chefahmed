const imgNames = ["ahmed.png"];

const nameInfoObjs = [
	{
		name: "carving",
		maxIndex: 7,
	},
	{
		name: "dish",
		maxIndex: 27,
	},
	{
		name: "team",
		maxIndex: 10,
	},
];

function generateFileNames() {
	for (let obj of nameInfoObjs) {
		const { name, maxIndex } = obj;
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
	const imgElement = document.createElement("img");
	imgElement.setAttribute("src", `./asset/Galery/${fileName}`);
	imgElement.setAttribute("alt", fileName);
	imgElement.setAttribute("loading", "lazy");
	return imgElement;
}

const imagesDiv = document.querySelector("#galery div.row");

function addImgElements() {
	imgNames.forEach((fileName) => {
		const imgElement = createImgElement(fileName);
		const imgContainerDiv = document.createElement("div");
		imgContainerDiv.classList.add("img-container");
		imgContainerDiv.appendChild(imgElement);
		imagesDiv.appendChild(imgContainerDiv);
	});
}

generateFileNames();
addImgElements();

const maxIndex = imgNames.length - 3;
let index = 0;

const imgElements = imagesDiv.querySelectorAll("img");
const imgContainers = imagesDiv.querySelectorAll(".img-container");
const galerySection = document.querySelector(".galery");

function sizeImgContainers() {
	const onePercent = galerySection.offsetWidth / 100;
	const style = window.getComputedStyle(galerySection, null).getPropertyValue('font-size');
	const fontSize = parseFloat(style);
	imgContainers.forEach((container) => {
		container.style = `width: ${25 * onePercent - fontSize}px; height: ${27 * onePercent - fontSize}px;`;
	});
}

function goToImage(index) {
	const positionIndex = index;
	const imageWidth = imagesDiv.clientWidth / imgNames.length;
	const position = -(positionIndex - 0.35) * imageWidth;
	imagesDiv.style = `transform: translateX(${position}px);`;
}

function removeClickable(index) {
	for (let i = index; i < index + 3; i++) {
		imgContainers[i].tabIndex = -1;
		imgContainers[i].classList.remove("clickable");
	}
}

function addClickable(index) {
	for (let i = index; i < index + 3; i++) {
		imgContainers[i].tabIndex = 0;
		imgContainers[i].classList.add("clickable");
	}
}

addClickable(index);
sizeImgContainers();
//Browser needs time to apply the styles, hence we run the goToImage asynchronously
setTimeout(() => goToImage(index), 0);

const btnBackward = document.querySelector(
	".galery .btn-container.backward button"
);
const btnForward = document.querySelector(
	".galery .btn-container.forward button"
);

btnBackward.addEventListener("click", () => {
	removeClickable(index);
	index--;
	if (index < 0) index = maxIndex;
	goToImage(index);
	addClickable(index);
});

btnForward.addEventListener("click", () => {
	removeClickable(index);
	index++;
	if (index > maxIndex) index = 0;
	goToImage(index);
	addClickable(index);
});

const dialogElement = document.querySelector("dialog");
const dialogImg = dialogElement.querySelector(".picture");
const closeBtn = dialogElement.querySelector("button");

function handleClick(event) {
	const src = event.target.src;
	const alt = event.target.alt;
	dialogImg.src = src;
	dialogImg.alt = alt;
	dialogElement.showModal();
}

imgElements.forEach((img) => {
	img.addEventListener("click", handleClick);
	img.addEventListener("keydown", (event) => {
		if (event.key == "Enter") {
			event.preventDefault();
			handleClick(event);
		}
	});
});

closeBtn.addEventListener("click", () => {
	dialogElement.close();
});

let isNavOpen = false;
const navButton = document.querySelector("nav button");
const orderedList = document.querySelector("nav ol");

navButton.addEventListener("click", () => {
	isNavOpen = !isNavOpen;
	if (isNavOpen) orderedList.classList.remove("close");
	else orderedList.classList.add("close");
});

let debounce;
window.addEventListener("resize", () => {
	imgElements.forEach((img) => {
		if (!img.classList.contains("hidden")) img.classList.add("hidden");
	});

	if (!debounce) {
		// browser needs time to apply the styles, hence we do it before the setTimeout callback
		sizeImgContainers();
		debounce = setTimeout(() => {
			goToImage(index);
			imgElements.forEach((img) => img.classList.remove("hidden"));
			clearTimeout(debounce);
			debounce = null;
		}, 300);
	}
});
