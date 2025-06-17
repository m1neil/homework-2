const OrderManagementList = ({ title, list, handleStateOrder, typeList, textBtn = 'ready' }) => {
	const renderList = list => {
		let contentList
		if (!list.length) contentList = <div> The list is empty...</div>
		else {
			contentList = list.map(({ id, title }, index) =>
				<li key={index} className="list-kitchen-item" key={id}>
					<span className="list-kitchen-text">{title}</span>
					<button
						className="list-kitchen-button button button-border"
						onClick={() => handleStateOrder(id, typeList)}
						type="button"
					>
						<span>{textBtn}</span>
					</button>
				</li>
			)
		}
		return <ul className="kitchen-list list-kitchen">{contentList}</ul>
	}

	return (
		<div className="kitchen-column">
			<h3 className="kitchen-title title title-uppercase title-fz-16">{title}</h3>
			{renderList(list)}
		</div>
	)
}

export default OrderManagementList