import { LOAD_TRUE } from "../action-types/action-types";

const initialState = {
	name: "Calvin",
	loading: false,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TRUE:
			return { ...state, loading: true };
		default:
			return state;
	}
};
