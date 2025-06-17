const FlightService = ({ products, typeService, servicesChange, values }) => {

	const handleSelectChange = e => {
		const { name, value } = e.target
		servicesChange(typeService, name, value)
	}

	const createSelect = (name, id, list, defaultValue = 'Не обрано') => {
		let value
		if (typeService in values && name in values[typeService])
			value = values[typeService][name]
		else value = '#'

		return (
			<select name={name} value={value} id={id} className="service-select select" onChange={handleSelectChange}>
				{defaultValue && <option value="#">{defaultValue}</option>}
				{list.map((item, i) =>
					<option key={i} value={item}>{item}</option>)}
			</select>
		)
	}

	return (
		<div className="service">
			{
				products.map(item => {
					return (
						<div key={item.id} className="service-column">
							<div className="service-wrap-label">
								<label htmlFor={item.name} className="service-label">Chose {item.name}</label>
							</div>
							{createSelect(item.name, item.name, item.products)}
						</div>
					)
				})
			}
		</div>
	)
}

export default FlightService