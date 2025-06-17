const TaskBlock = ({ title, description, component, imgSrc, isActive }) => {
	const taskClass = isActive ? 'task -active' : 'task'
	return (
		<div className={taskClass}>
			<div className="task-top">
				<div className="task-container">
					<h2 className="task-title title title-fz-18">{title}</h2>
					<div className='task-text'>
						{description.map((text, i) => <p key={i}>{text}</p>)}
					</div>
					{imgSrc && <img src={imgSrc} alt={title} />}
				</div>
			</div>
			{component}
		</div>
	)
}

export default TaskBlock