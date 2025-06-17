const WorkersList = ({ workersList }) => {
	return (
		<div className="workers">
			<div className="workers-container">
				<h2 className="workers-title title">Worker list</h2>
				<ul className="workers-list">
					{workersList.map(({ name, salary }, index) =>
						<li className="workers-list-item" key={index}>{`${name}: ${salary}`}</li>)}
				</ul>
			</div>
		</div>

	)
}

export default WorkersList