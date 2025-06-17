import { memo } from "react";

const OrderHistory = ({ list, clearHistory }) => {

	const createHistoryList = () => {
		if (!list.length)
			return <div>The history is empty...</div>

		const listItems = list.map(({ id, title, status, dateComplete }) => {
			return (
				<li className="list-history-item" key={id}>
					<div className="list-history-text">
						<span>Title:</span>
						<span>{title}</span>
					</div>
					<div className="list-history-text">
						<span>Status order:</span>
						<span>{status}</span>
					</div>
					<div className="list-history-text">
						<span>Date of execution:</span>
						<span>{dateComplete}</span>
					</div>
				</li>
			)
		})

		return <ul className="history-list list-history">{listItems}</ul>
	}

	return (
		<div className="kitchen-history history">
			<h3 className="history-title title">History</h3>
			{createHistoryList()}
			<button
				style={{ display: list.length ? 'inline-block' : 'none' }}
				onClick={clearHistory} className="history-button button" type="button">
				<span>Clear history</span>
			</button>
		</div>
	)
}

export default memo(OrderHistory)