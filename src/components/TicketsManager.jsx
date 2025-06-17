import { useState } from "react"
import FlightService from "./FlightService"
import cabin from '../assets/cabin.webp'
import clouds from '../assets/clouds.webp'
import airport from '../assets/airport.webp'


const TicketsManager = () => {
	const [services, setServices] = useState({})

	const servicesChange = (typeService, name, value) => {
		setServices(prevServices => {
			const newServices = { ...prevServices }
			newServices[typeService] = { ...prevServices[typeService], [name]: value }

			if (name === 'cognac' && value !== '#')
				newServices[typeService].snacks = false
			else if (
				name === 'cognac' && value === '#' &&
				'snacks' in newServices[typeService]
			) delete newServices[typeService].snacks

			return newServices
		})
	}

	const handleTypeTicketChange = e => {
		const target = e.target
		const { name, value } = target
		setServices({ [name]: value })
	}

	const handleSnacksChange = e => {
		const target = e.target
		const { name, checked } = target

		servicesChange('business', name, checked)
	}

	const createBackground = () => {
		const classState = !services['type-ticket'] ? '--default' :
			services['type-ticket'] === 'business' ? '--business' : '--economy'

		const background =
			<div className={`tickets-bg ${classState}`} >
				<img
					className="tickets-bg-cabin"
					src={cabin}
					alt="background"
					aria-hidden="true"
				/>
				<img
					className="tickets-bg-clouds"
					src={clouds}
					alt="background"
					aria-hidden="true"
				/>
				<img
					className="tickets-bg-airport"
					src={airport}
					alt="background"
					aria-hidden="true"
				/>
			</div >

		return background
	}


	const businessService = [
		{
			id: 1,
			name: 'newspaper',
			products: [
				"The Financial Times",
				"Le Monde",
				"El País",
				"Die Zeit",
				"The Wall Street Journal"
			]
		},
		{
			id: 2,
			name: 'cognac',
			products: [
				"Hennessy XO",
				"Rémy Martin VSOP",
				"Courvoisier VS",
				"Camus Borderies XO",
				"Martell Cordon Bleu"
			]
		}
	]

	const economyService = [
		{
			id: 1,
			name: 'beers',
			products: [
				"Heineken",
				"Budweiser",
				"Carlsberg",
				"Corona Extra",
				"Stella Artois"
			]
		},
		{
			id: 2,
			name: 'chips',
			products: [
				"Lay's Classic",
				"Pringles Original",
				"Doritos Nacho Cheese",
				"Ruffles Sour Cream & Onion",
				"Cheetos Crunchy"
			]
		}
	]

	let content = null

	if (services['type-ticket'] === 'business')
		content = businessService
	else if (services['type-ticket'] === 'economy')
		content = economyService

	let isPreventSnacks = false
	if (services?.business && 'snacks' in services.business)
		isPreventSnacks = true

	return (
		<div className="tickets">
			<div className="tickets-container">
				<div className="tickets-body">
					<div className="tickets-row">
						<div className="tickets-wrap-label">
							<label htmlFor="type-ticket" className="tickets-label">Оберіть клас квитку:</label>
						</div>
						<select name="type-ticket" defaultValue="#" onChange={handleTypeTicketChange} id="type-ticket" className="tickets-select select">
							<option value="#" disabled>Тип квитка</option>
							<option value="business">Бізнес</option>
							<option value="economy">Економ</option>
						</select>
					</div>
					{content &&
						<FlightService
							products={content}
							values={services}
							typeService={services['type-ticket']}
							servicesChange={servicesChange}
						/>}
					{isPreventSnacks &&
						<div className="tickets-snacks input-checkbox">
							<label htmlFor="snacks">Потрібна закуски?</label>
							<input type="checkbox" name="snacks" id="snacks" onChange={handleSnacksChange} />
						</div>
					}
					{createBackground()}
				</div>
			</div>

		</div>
	)
}

export default TicketsManager