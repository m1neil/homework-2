import { useEffect, useRef, useState } from "react"
import spinner from '../assets/spinner.svg'

const EnglishSimulator = () => {
	const [translationWord, setTranslationWord] = useState('')
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(null)
	const [error, setError] = useState('')
	const [currentWord, setCurrentWord] = useState(null)
	const refPrevWord = useRef(null)
	const englishWords = [
		{ translate: 'яблуко', word: "apple", image: "https://static.vecteezy.com/system/resources/thumbnails/024/526/183/small_2x/apple-isolated-red-apple-on-transparent-background-with-full-depth-of-field-apple-png.png" },
		{ translate: 'кіт', word: "cat", image: "https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-isolated-cat-on-white-background-png-image_7094927.png" },
		{ translate: 'сонце', word: "sun", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkYZCJ4e1huthCPnxxIXeLKVhKzSWEgfBfTA&s" },
		{ translate: 'книга', word: "book", image: "https://pngimg.com/d/book_PNG51090.png" },
		{ translate: 'дерево', word: "tree", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe19--q7wiM8T8zb-kvtuuC3WeGDhqqPNmXw&s" },
		{ translate: 'собака', word: "dog", image: "https://png.pngtree.com/png-vector/20250111/ourmid/pngtree-golden-retriever-dog-pictures-png-image_15147078.png" }
	]

	const handleTranslationWordChange = e => {
		setTranslationWord(e.target.value)
	}

	const getRandomWord = () => {
		const randomIndex = generateRandomValue(0, englishWords.length - 1)
		return englishWords[randomIndex]
	}

	const generateRandomValue = (minValue, maxValue) => {
		return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
	}

	useEffect(() => {
		setCurrentWord(getRandomWord())
	}, [])

	useEffect(() => {
		if (!isCorrectAnswer) return
		const timeout = setTimeout(() => {
			let newRandomWord
			do {
				newRandomWord = getRandomWord()
			} while (newRandomWord.word === refPrevWord.current.word);

			refPrevWord.current = newRandomWord
			setCurrentWord(newRandomWord)
			setIsCorrectAnswer(null)
			setTranslationWord('')
		}, 1500);

		return () => clearTimeout(timeout)
	}, [isCorrectAnswer])

	const getImageWord = () => {
		let content
		if (!currentWord)
			content = <img className="spinner" src={spinner} alt="spinner" />
		else {
			const { word, image } = currentWord
			content = <img className="simulator-word" src={image} alt={word} />
		}
		return content
	}

	const checkTranslation = () => {
		if (!translationWord) {
			setError('Required field!')
			return
		}
		else setError('')

		const isCorrectTranslation = translationWord.trim().toLowerCase() === currentWord.translate.toLowerCase()

		if (!isCorrectTranslation) {
			setError('Wrong, try again!')
			return
		} else {
			refPrevWord.current = currentWord
			setError('')
		}

		setIsCorrectAnswer(isCorrectTranslation)
	}

	const classState = error ? '--wrang' : isCorrectAnswer ? '--correct' : ''

	return (
		<div className="simulator">
			<div className="simulator-container">
				<div className={`simulator-body ${classState}`}>
					<div className="simulator-img">
						{getImageWord()}
					</div>
					<h3 className="simulator-title title">{currentWord?.word ?? ''}</h3>
					<div className="simulator-row">
						<div className="simulator-input input">
							<input
								value={translationWord}
								type="text"
								name="translation-word"
								id="translation-word"
								onChange={handleTranslationWordChange}
								placeholder="Translation of the word..."
							/>
						</div>
						{error && <div className="simulator-error error">{error}</div>}
						{isCorrectAnswer && <div className="simulator-success success">OK. Great!</div>}
						<button disabled={isCorrectAnswer} onClick={checkTranslation} className="simulator-button button">
							<span>Check</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)


}

export default EnglishSimulator