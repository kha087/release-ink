export default class ReleaseInk extends HTMLElement {
	static TIME_KEY = 'RELEASE_INK_TIME' 
	#time
	#updateIntervall = 1000
	#storedTime

	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.#storedTime = localStorage.getItem(ReleaseInk.TIME_KEY)
		if(!this.#storedTime) {
			this.#time = new Date()
			localStorage.setItem(ReleaseInk.TIME_KEY, this.#time.getTime())
		} else {
			this.#time = new Date(Number(this.#storedTime))
		}
	}
	connectedCallback() {
		
		this.shadowRoot.appendChild(this.#getAiStyles())
		this.shadowRoot.appendChild(this.#getAiHtml())
		this.#setOnButtonClick()
		this.#updateLoop()
	}

	#updateLoop() {
		setTimeout(() => {
			const numberElement = this.shadowRoot.querySelector('.timer__number')
			numberElement.innerText = `${this.#getSeconds(this.#getDiff())}s (${this.#getDays(this.#getDiff())} dager)`
			this.#updateLoop()

		}, this.#updateIntervall)
	}

	#getDiff() {
		return (new Date().getTime()) - this.#time.getTime()
	}

	#getSeconds(millis) {
		const seconds = (millis - (millis % 1000)) / 1000
		return seconds
	}
	#getMinutes(millis) {
		const seconds = this.#getSeconds(millis)
		const minutes = (seconds - (seconds % 60)) / 60
		return minutes
	}
	#getHours(millis) {
		const minutes = this.#getMinutes(millis)
		return (minutes - (minutes % 60)) / 60
	}

	#getDays(millis) {
		const hours = this.#getHours(millis)
		return (hours - (hours % 24)) / 24
	}

	#setOnButtonClick() {
		const btn = this.shadowRoot.getElementById('timerButton')
		btn.onclick = () => {
			this.#time = new Date()
			localStorage.setItem(ReleaseInk.TIME_KEY, this.#time.getTime())
		}
	}
	#getAiHtml() {
		const container = document.createElement('div')
		container.innerHTML = `
		    <div class="container">
			<div class="timer" id="timer">
				<span class="timer__number">0</span>
			</div>
			<button id="timerButton">Slapp en release :)</button>
		    </div>

		`
		return container
	}

	#getAiStyles() {
		const s = document.createElement('style')
		s.innerHTML = `
			body {
			    display: flex;
			    justify-content: center;
			    align-items: center;
			    min-height: 100vh;
			    margin: 0;
			    background: #1a1a1a;
			    font-family: 'Arial', sans-serif;
			}

			.container {
			    text-align: center;
			    color: #fff;
			}

			.timer {
			    font-size: 80px;
			    font-weight: bold;
			    color: #fff;
			    margin-bottom: 30px;
			    text-shadow: 0 0 10px #fff;
			    animation: glow 2s ease-in-out infinite alternate;
			}

			.timer .number {
			    display: inline-block;
			    margin: 0 10px;
			    font-size: 80px;
			}

			.timer .number::after {
			    content: '';
			    position: absolute;
			    width: 10px;
			    height: 40%;
			    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
			    right: 0;
			}

			button {
			    padding: 15px 40px;
			    font-size: 25px;
			    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
			    border: none;
			    border-radius: 50px;
			    color: white;
			    cursor: pointer;
			    transition: transform 0.3s, box-shadow 0.3s;
			    text-transform: uppercase;
			    font-weight: bold;
			    margin-bottom: 20px;
			    animation: buttonFloat 3s ease-in-out infinite alternate;
			}

			button:hover {
			    transform: scale(1.05);
			    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
			}

			@keyframes glow {
			    from {
				filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
			    }
			    to {
				filter: drop-shadow(0 0 20px rgba(255,255,255,0.8));
			    }
			}

			@keyframes buttonFloat {
			    from {
				transform: scale(1);
			    }
			    to {
				transform: scale(1.05);
			    }
			}

			.timer--running {
			    animation: none;
			    text-shadow: 0 0 20px rgba(255,255,255,0.8);
			}
		`
		return s
	}
}

customElements.define('ri-root', ReleaseInk)
