export const init_state = {
    name: "",
    age: 0,
    maritalStatus: "single",
    address: "",
    role: "",
    biography: "",
    photo: "",
}

export const formReducer = (state, action) => {
    switch (action.type) {
        case "handleInput":
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }
        case "saveFormCanggih":
            localStorage.setItem("formCanggih", JSON.stringify(state))
        case "fetchSavedData":
                let savedData = JSON.parse(localStorage.getItem("formCanggih"))
                return {
                    ...state, //Inital data
                    ...savedData //Saved data from local storage
                }
        default:
            return state
    }
}