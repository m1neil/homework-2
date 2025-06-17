import { useCallback, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import OrderManagementList from "./OrderManagementList"
import OrderForm from "./OrderForm"
import OrderHistory from "./OrderHistory";

const OrderManagement = () => {
	const [waitingList, setWaitingList] = useState([])
	const [processingList, setProcessingList] = useState([])
	const [completedList, setCompletedList] = useState([])
	const [history, setHistory] = useState([])

	const TYPE_WAITING_LIST = 'waiting-list'
	const TYPE_PROCESSING_LIST = 'processing-list'
	const TYPE_COMPLETED_LIST = 'completed-list'
	const TYPE_HISTORY_LIST = 'history-list'
	const KEY_STORAGE = 'order-manager'

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(KEY_STORAGE))
		if (!data) return
		data.forEach(({ typeList, list }) => {
			switch (typeList) {
				case TYPE_WAITING_LIST:
					setWaitingList([...list])
					break
				case TYPE_PROCESSING_LIST:
					setProcessingList([...list])
					break
				case TYPE_COMPLETED_LIST:
					setCompletedList([...list])
					break
				case TYPE_HISTORY_LIST:
					setHistory([...list])
					break
			}
		})
	}, [])

	useEffect(() => {
		if (
			!waitingList.length && !processingList.length &&
			!completedList.length && !history.length
		) return
		saveListsData()
	}, [waitingList, processingList, completedList, history])

	const saveListsData = () => {
		const data = [
			{
				typeList: TYPE_WAITING_LIST,
				list: [...waitingList]
			},
			{
				typeList: TYPE_PROCESSING_LIST,
				list: [...processingList]
			},
			{
				typeList: TYPE_COMPLETED_LIST,
				list: [...completedList]
			},
			{
				typeList: TYPE_HISTORY_LIST,
				list: [...history]
			},
		]
		localStorage.setItem(KEY_STORAGE, JSON.stringify(data))
	}

	const addNewOrder = text => {
		const newOrder = {
			id: uuidv4(),
			title: text,
			status: 'waiting'
		}
		setWaitingList(prevWaitingList => [...prevWaitingList, newOrder])
	}

	const clearHistory = useCallback(() => {
		setHistory([])
		saveListsData()
	}, [])

	const handleStateOrder = (id, typeList) => {
		switch (typeList) {
			case TYPE_WAITING_LIST: {
				const searchOrder = findElementList(waitingList, id)
				if (!searchOrder) return
				const modifyOrder = { ...searchOrder, status: 'processing' }
				setProcessingList(prevPrecessingList => [...prevPrecessingList, modifyOrder])
				removeElementList(setWaitingList, id)
			} break
			case TYPE_PROCESSING_LIST: {
				const searchOrder = findElementList(processingList, id)
				if (!searchOrder) return
				const modifyOrder = { ...searchOrder, status: 'ready' }
				setCompletedList(prevPrecessingList => [...prevPrecessingList, modifyOrder])
				removeElementList(setProcessingList, id)
			} break
			case TYPE_COMPLETED_LIST: {
				const searchOrder = findElementList(completedList, id)
				if (!searchOrder) return
				const modifyOrder = { ...searchOrder, status: 'done', dateComplete: getDateFinishOrder() }
				setHistory(prevHistory => [...prevHistory, modifyOrder])
				removeElementList(setCompletedList, id)
			} break
		}
	}

	const getDateFinishOrder = () => {
		const date = new Date()
		return `${addZeroVal(date.getDay())}/${addZeroVal(date.getMonth())}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
	}

	const addZeroVal = (value, maxLength = 2, placeholder = '0') => {
		return value.toString().padStart(maxLength, placeholder)
	}

	const findElementList = (list, id) => {
		return list.find(item => item.id === id)
	}

	const removeElementList = (setList, id) => {
		setList(prevList => prevList.filter(item => item.id !== id))
	}

	return (
		<div className="kitchen">
			<div className="kitchen-container">
				<OrderForm addNewOrder={addNewOrder} />
				<div className="kitchen-row">
					<OrderManagementList
						list={waitingList}
						title="Expected to be implemented"
						textBtn="Prepare"
						typeList={TYPE_WAITING_LIST}
						handleStateOrder={handleStateOrder}
					/>
					<OrderManagementList
						list={processingList}
						title="In progress"
						textBtn="Cooked"
						typeList={TYPE_PROCESSING_LIST}
						handleStateOrder={handleStateOrder}
					/>
					<OrderManagementList
						list={completedList}
						title="Ready for serving"
						textBtn="Submitted"
						typeList={TYPE_COMPLETED_LIST}
						handleStateOrder={handleStateOrder}
					/>
				</div>
				<OrderHistory list={history} clearHistory={clearHistory} />
			</div>
		</div>
	)
}

export default OrderManagement