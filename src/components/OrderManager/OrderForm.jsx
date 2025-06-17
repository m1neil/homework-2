import { useState } from "react"

const OrderForm = ({ addNewOrder }) => {

	const [text, setText] = useState('')
	const [error, setError] = useState('')

	const onSubmitForm = e => {
		e.preventDefault()

		if (!text.trim()) {
			setError('Required Field')
			return
		} else setError('')

		addNewOrder(text.trim())
		setText('')
	}

	const handleTextChange = e => {
		setText(e.target.value)
	}

	const removeError = () => {
		setError('')
	}

	return (
		<form onSubmit={onSubmitForm} action="#" className="kitchen-form form">
			<div className="form-row form-row-flex">
				<div className="form-wrap">
					<label htmlFor='order' className="form-label form-label-mb-none">New ordered dish</label>
				</div>
				<div className="form-input form-input-mb-none input">
					<input
						value={text}
						id="order"
						name="order"
						type="text"
						placeholder="Please Enter New Order"
						onChange={handleTextChange}
						onFocus={removeError}
					/>
				</div>
				<button type="submit" className="form-button button"><span>Add</span></button>
			</div>
			{error && <div className="error">{error}</div>}
		</form>
	)
}

export default OrderForm