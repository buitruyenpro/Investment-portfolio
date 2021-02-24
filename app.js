// Test if our JS file is properly linked to the HTML File
// console.log(123);

// Grabbing the target elements from the HTML File
const list = document.querySelector(".gallery-carousel__img-container--list");
const imgs = Array.from(list.children);
const nextButton = document.querySelector(".gallery-carousel__btn--right");
const prevButton = document.querySelector(".gallery-carousel__btn--left");
const carouselNav = document.querySelector(".gallery-carousel__nav");
const dots = Array.from(carouselNav.children);
let runFlag = "left";

// console.log(list);
// console.log(imgs);
// console.log(nextButton);
// console.log(prevButton);
// console.log(carouselNav);

// Getting the width of our images
// const imgWidth = imgs[0].getBoundingClientRect();
// const imgWidth = imgs[0].getBoundingClientRect().height;
const imgWidth = imgs[0].getBoundingClientRect().width;
// console.log(imgWidth);

// Arranging the images next to one another
// function setImgPosition(img, index) {
//   img.style.left = imgWidth * index + "px";
// }

// Arrow Function
const setImgPosition = (img, index) => {
	img.style.left = imgWidth * index + "px";
};
imgs.forEach(setImgPosition);

// moveToImg Function
const moveToImg = (list, currentImg, targetImg) => {
	list.style.transform = "translateX(-" + targetImg.style.left + ")";
	currentImg.classList.remove("current--img");
	targetImg.classList.add("current--img");
};

// Updating the color of the dots on click
const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove("current--img");
	targetDot.classList.add("current--img");
};

// Hide/Show Arrows
const hideShowArrows = (imgs, prevButton, nextButton, targetIndex) => {
	if (targetIndex === 0) {
		prevButton.classList.add("hidden");
		nextButton.classList.remove("hidden");
		runFlag = "left";
	} else if (targetIndex === imgs.length - 1) {
		prevButton.classList.remove("hidden");
		nextButton.classList.add("hidden");
		runFlag = "right";
	} else {
		prevButton.classList.remove("hidden");
		nextButton.classList.remove("hidden");
	}
};

/* 
--------*-*-*-*-*-*-*-*-*-*-*-*-*-*-*---------------------------------------------------
When we click on the right button, move images to the left
-----------*-*--*-*-*-*-*-*-*--*-*-*-*-*------------------------------------------------
*/

setInterval(function (event) {
	list.classList.remove("notransition");
	let scroll = this.scrollY;
	if (scroll > 2400 && scroll < 3200) {
		if (runFlag == "left") {
			const currentImg = list.querySelector(".current--img");
			const nextImg = currentImg.nextElementSibling;
			const currentDot = carouselNav.querySelector(".current--img");
			const nextDot = currentDot.nextElementSibling;
			const nextIndex = imgs.findIndex((img) => img === nextImg);
			moveToImg(list, currentImg, nextImg);
			updateDots(currentDot, nextDot);
			hideShowArrows(imgs, prevButton, nextButton, nextIndex, runFlag);
		} else {
			const currentImg = list.querySelector(".current--img");
			let prevImg = currentImg.previousElementSibling;
			const currentDot = carouselNav.querySelector(".current--img");
			let prevDot = currentDot.previousElementSibling;
			let prevIndex = imgs.findIndex((img) => img === prevImg);
			if (prevIndex == imgs.length - 2) {
				prevImg = imgs[0];
				prevDot = dots[0];
				prevIndex = 0;
				let value = parseInt(imgs[imgs.length - 1].style.left);
				for (let i = 1; i < imgs.length; i++) {
					imgs[i - 1].style.left = value + imgWidth * i + "px";
					setTimeout(function () {
						imgs[imgs.length - 1].style.left =
							value + imgWidth * (i + 1) + "px";
					}, 600);
				}
			}

			moveToImg(list, currentImg, prevImg);
			updateDots(currentDot, prevDot);
			hideShowArrows(imgs, prevButton, nextButton, prevIndex, runFlag);
		}
	}
}, 3000);

nextButton.addEventListener("click", (e) => {
	const currentImg = list.querySelector(".current--img");
	const nextImg = currentImg.nextElementSibling;
	const currentDot = carouselNav.querySelector(".current--img");
	const nextDot = currentDot.nextElementSibling;
	const nextIndex = imgs.findIndex((img) => img === nextImg);
	runFlag = "left";
	moveToImg(list, currentImg, nextImg);
	updateDots(currentDot, nextDot);
	hideShowArrows(imgs, prevButton, nextButton, nextIndex, runFlag);
});

/* 
--------*-*-*-*-*-*-*-*-*-*-*-*-*-*-*---------------------------------------------------
When we click on the left button, move images to the right
-----------*-*--*-*-*-*-*-*-*--*-*-*-*-*------------------------------------------------
*/

prevButton.addEventListener("click", (e) => {
	const currentImg = list.querySelector(".current--img");
	const prevImg = currentImg.previousElementSibling;
	const currentDot = carouselNav.querySelector(".current--img");
	const prevDot = currentDot.previousElementSibling;
	const prevIndex = imgs.findIndex((img) => img === prevImg);

	runFlag = "right";
	moveToImg(list, currentImg, prevImg);
	updateDots(currentDot, prevDot);
	hideShowArrows(imgs, prevButton, nextButton, prevIndex, runFlag);
});

/* 
--------*-*-*-*-*-*-*-*-*-*-*-*-*-*-*---------------------------------------------------
When we click on the Carousel Nav, switch the images
-----------*-*--*-*-*-*-*-*-*--*-*-*-*-*------------------------------------------------
*/

carouselNav.addEventListener("click", (e) => {
	list.classList.add("notransition");
	// what dot was clicked on
	// const targetDot = e;
	// console.log(targetDot.target);
	const targetDot = e.target.closest("button");
	// console.log(targetDot);
	if (!targetDot) return;
	runFlag = "left";
	const currentImg = list.querySelector(".current--img");
	const currentDot = carouselNav.querySelector(".current--img");
	const targetIndex = dots.findIndex((dot) => dot === targetDot);
	if (targetIndex == imgs.length - 1) {
		let value = parseInt(imgs[imgs.length - 1].style.left);
		imgs[imgs.length - 1].style.left = value + imgWidth * imgs.length + "px";
	}
	const targetImg = imgs[targetIndex];
	moveToImg(list, currentImg, targetImg);
	updateDots(currentDot, targetDot);
	hideShowArrows(imgs, prevButton, nextButton, targetIndex);
});
