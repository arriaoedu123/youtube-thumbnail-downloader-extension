/*
# Creator: Aryon Rabello
# GitHub: https://github.com/arriaoedu123/
# Creation date: 18/11/2021
# Version: 1.0
*/

var buttons = document.querySelectorAll(".ripple").length

for (let i = 0; i < buttons; i++) {
	document.querySelectorAll(".ripple")[i].addEventListener("click" , (event) => {
		const button = event.target
		const wave = document.createElement("span")

		wave.classList.add("wave")
		button.insertAdjacentElement("beforeend", wave)

		const buttonPosition = button.getBoundingClientRect()
		const top = event.clientY - buttonPosition.top
		const left =  event.clientX - buttonPosition.left 
		const scale = Math.min(buttonPosition.height, buttonPosition.width) 

		wave.style.setProperty("--top", `${top}px`)
		wave.style.setProperty("--left", `${left}px`)
		wave.style.setProperty("--opacity", 1)
		wave.style.setProperty("--scale", scale)

		function clearRipple() {
			wave.style.setProperty("--opacity", 0)
			wave.removeEventListener("transitionend", clearRipple)

			wave.addEventListener("transitionend", () => {
				wave.remove()
			})
		}

		wave.addEventListener("transitionend", clearRipple)

	})
}
