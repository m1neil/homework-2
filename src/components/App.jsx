import { useState } from 'react'
import EnglishSimulator from './EnglishSimulator'
import LoginForm from './LoginForm'
import OrderManagement from './OrderManager/OrderManagement'
import SearchSystem from './SearchSystem'
import TicketsManager from './TicketsManager'
import WorkersList from './WorkersList'
import TaskBlock from './TaskBlock'
import imgTask1 from '../assets/tasks/task-1.jpg'
import imgTask3 from '../assets/tasks/task-3.jpg'
import imgTask5 from '../assets/tasks/task-5.jpg'
import imgTask6 from '../assets/tasks/task-6.jpg'

const App = () => {

	const workersList = [
		{
			id: '111',
			name: 'Іванов',
			salary: 10000,
		},
		{
			id: '111',
			name: 'Петров',
			salary: 20000,
		},
		{
			id: '111',
			name: 'Сидоров',
			salary: 50000,
		},
	]

	const [tabIndex, setTabIndex] = useState(() => {
		let index = parseInt(localStorage.getItem('tab-index'))
		if (!index) {
			index = 0
			localStorage.setItem('tab-index', index)
		}
		return index
	})

	const tasks = [
		{
			title: 'Задача 1. Вводимо логіна і пароль. Якщо логін вірний відображаємо смайл. Якщо ні, то:',
			description: [
				'1) якщо логін = Іван – колір повідомлення про помилку синій',
				'2) якщо хтось інший, то колір повідомлення червоний',
				'Логін: loginCorrect',
				'Пароль: 123456'
			],
			imgSrc: imgTask1,
			component: <LoginForm />
		},
		{
			title: 'Задача 2. З випадаючого списку вибираємо клас квитка у літаку. Якщо',
			description: [
				'1) бізнес -  виводимо елементи для вибору газети та коньяку (якщо вибрано коньяк, то запропонувати закуску (так/ні)), на фоні зображення бізнес кают',
				'2) економ – виводимо елементи для вибору типу пива і чипсів, на фоні хмарки.'
			],
			imgSrc: '',
			component: <TicketsManager />
		},
		{
			title: 'Задача 3. Елемент тренажера англійської. Виводимо зображення елемента і слово.',
			description: [
				'Користувач вводить відповідь. Якщо вірно – відтворюємо фразу «Добре. Молодець!» (і додаємо зелену рамку до елемента), якщо ні - то відтворюємо фразу «Невірно, спробуйте ще раз» (і додаємо червону рамку).',
			],
			imgSrc: imgTask3,
			component: <EnglishSimulator />
		},
		{
			title: '4. Вивести список як маркований список з елементами у форматі (name: salary)',
			description: [],
			imgSrc: '',
			component: <WorkersList workersList={workersList} />
		},
		{
			title: 'Задача 5. Самостійно сформуйте масив даних та виведіть фрагмент на зразок поданого (дані не обов’язково повинні співпадати',
			description: [],
			imgSrc: imgTask5,
			component: <SearchSystem />
		},
		{
			title: 'Задача 6. На кухню поступають замовлення.',
			description: [
				'Спочатку ми додаємо їх у список “Очікують на виконання”, якщо повар береться робити — замовлення переходить у список “Виконуються”,   якщо замовлення виконано — переходить у список “Готові до виносу”. Якщо натиснути на “Подано” - страва зникає з таблиці'
			],
			imgSrc: imgTask6,
			component: <OrderManagement />
		}
	]

	const tabsButtons = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5', 'Task 6']

	const handleTabIndex = index => {
		setTabIndex(index)
		localStorage.setItem('tab-index', index)
	}

	const createNavTabs = () => {
		const buttons = tabsButtons.map((text, index) => {
			const activeClass = tabIndex === index ? '-active' : ''
			return (
				<button
					type='button'
					key={index}
					className={`tabs-title button button-border ${activeClass}`}
					onClick={() => handleTabIndex(index)}>{text}
				</button>
			)
		})

		return <div className="tabs-buttons">{buttons}</div>
	}

	return (
		<div className='app'>
			<div className="tabs">
				<nav className="tabs-nav">
					<div className="tabs-container">{createNavTabs()}</div>
				</nav>
			</div>
			<div className="tabs-body">
				{tasks.map((task, index) => (
					<TaskBlock key={index} isActive={tabIndex === index} {...task} />
				))}
			</div>
		</div>
	)
}

export default App