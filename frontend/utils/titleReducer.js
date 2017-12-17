const initial_state = {
	title_page: 'Title',
	title_head: 'Title'
}

const SET_TITLE = 'SET_TITLE'

const reducer = (state = initial_state, {type, payload}) => {
	switch(type){
		case SET_TITLE:
			const title_head = payload.title_head
			const title_page = payload.title_page || title_head
			return {
				title_head: title_head,
				title_page: title_page
			}
		default:
			return state
	}
}

export default reducer