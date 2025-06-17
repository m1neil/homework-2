import { useState } from 'react'
import eyeShow from '../assets/icons/eye-show.png'
import eyeClose from '../assets/icons/eye-hide.png'
import smile from '../assets/smile.png'

const LoginForm = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [errorLogin, setErrorLogin] = useState('')
	const [errorPassword, setErrorPassword] = useState('')
	const [isShowPassword, setIsShowPassword] = useState(false)
	const [isCorrectData, setIsCorrectData] = useState(false)

	const FIXED_LOGIN = 'Іван'
	const CORRECT_LOGIN = 'loginCorrect'
	const CORRECT_PASSWORD = '123456'

	const handleLoginChange = e => {
		setLogin(e.target.value)
	}

	const handlePasswordChange = e => {
		setPassword(e.target.value)
	}

	const handleShowPassword = () => {
		setIsShowPassword(prevIsShowPass => !prevIsShowPass)
	}

	const removeError = e => {
		const nameField = e.target.name
		if (nameField === 'login')
			setErrorLogin('')
		else setErrorPassword('')
	}

	const checkLogin = e => {
		e.preventDefault()
		if (!isValidData()) return

		if (login === CORRECT_LOGIN)
			setErrorLogin('')
		else {
			setErrorLogin('Not the right login!')
			setIsCorrectData(false)
			return
		}

		if (password === CORRECT_PASSWORD)
			setErrorPassword('')
		else {
			setErrorPassword('Not the right password!')
			setIsCorrectData(false)
			return
		}

		setIsCorrectData(true)
	}

	const isValidData = () => {
		if (!login) setErrorLogin('Required field!')
		else setErrorLogin('')

		if (!password) setErrorPassword('Required field!')
		else setErrorPassword('')

		return login && password ? true : false
	}

	const content = isCorrectData ?
		<div className='login-img'><img src={smile} alt="smile" /></div> : null

	let classError
	if (errorLogin && login === FIXED_LOGIN)
		classError = 'error blue'
	else if (errorLogin)
		classError = 'error'

	const classShowPassword = isShowPassword ? '--show' : ''
	const typeFieldPassword = isShowPassword ? 'text' : 'password'

	return (
		<div className="login">
			<div className="login-container">
				<h2 className="login-title title">LOGIN</h2>
				<form className="login-form form" action="#" onSubmit={checkLogin}>
					<div className="form-row">
						<label htmlFor='login' className="form-label">Login</label>
						<div className="form-input input">
							<input
								id="login"
								name="login"
								type="text"
								placeholder="Please Enter your login"
								autoComplete="true"
								value={login}
								onChange={handleLoginChange}
								onFocus={removeError}
							/>
						</div>
						{errorLogin && <div className={classError}>{errorLogin}</div>}
					</div>
					<div className="form-row">
						<label htmlFor='password' className="form-label">Password</label>
						<div className="form-input input">
							<input
								id="password"
								name="password"
								type={typeFieldPassword}
								placeholder='Please Enter your Password'
								autoComplete="true"
								value={password}
								onChange={handlePasswordChange}
								onFocus={removeError}
							/>
							<button
								type="button"
								onClick={handleShowPassword}
								className={`input-button ${classShowPassword}`}
								aria-label="show or hide password"
							>
								<img src={eyeShow} alt="icon eye open" className="input-icon" />
								<img src={eyeClose} alt="icon eye close" aria-hidden="true" className="input-icon" />
							</button>
						</div>
						{errorPassword && <div className='error'>{errorPassword}</div>}
					</div>
					<button type="submit" className="form-button button"><span>Login</span></button>
				</form>
				{content}
			</div>
		</div>
	)
}

export default LoginForm