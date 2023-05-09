const globalDataReducer = ( state = {}, action ) => {
	let actionType = wp.hooks.applyFilters( 'custom_fonts_dashboard/data_reducer_action', action.type );
	switch ( actionType ) {
		case 'UPDATE_INITIAL_STATE':
			return {
				...action.payload,
			};
		case 'UPDATE_INITIAL_STATE_FLAG':
			return {
				...state,
				initialStateSetFlag: action.payload,
			};
		case 'SET_FONTS':
			return {
				...state,
				fonts: [ ...action.fonts ],
			};
		case 'SET_FONTS_DATA':
			return {
				...state,
				fonts: [ ...action.fonts ],
				fonts_pagination: action.pagination,
				found_posts: action.found_posts,
				active_fonts_count: action.active_fonts_count,
				trash_fonts_count: action.trash_fonts_count,
				draft_fonts_count: action.draft_fonts_count,
				fonts_count: action.found_posts,
				fonts_limit_over: false, // Removed the flow count condition
			};
		case 'UPDATE_SETTINGS_SAVED_NOTIFICATION':
			return {
				...state,
				settingsSavedNotification: action.payload,
			};
		default:
			return state;
	}
}

export default globalDataReducer;
