import { createSlice, combineReducers } from "@reduxjs/toolkit";

const session = createSlice({
    name: "Session",
    initialState: {
        isAuthenticated: false,
        accessToken: null,
    },
    reducers: {

        setIsAuthenticated: (state, action) => {

            state.isAuthenticated = action.payload

        },
        setAccessToken: (state, action) => {

            state.accessToken = action.payload

        }

    }


})

const login = createSlice({
    name: "Login",
    initialState: {
        email: "",
        password: "",
    },
    reducers: {

        setLoginEmail: (state, action) => {

            state.email = action.payload

        },
        setLoginPassword: (state, action) => {

            state.password = action.payload

        }

    }
});

const registration = createSlice({

    name: "registration",
    initialState: {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
    },
    reducers: {

        setRegUsername: (state, action) => {

            state.username = action.payload

        },
        setRegEmail: (state, action) => {

            state.email = action.payload

        },
        setRegPassword: (state, action) => {

            state.password = action.payload

        },
        setConfirmPassword: (state, action) => {

            state.confirmpassword = action.payload

        }

    }


})

const profile = createSlice({

    name: "profile",
    initialState: {
        user_id: "",
        username: "",
        email: "",
    },
    reducers: {

        setUserID: (state, action) => {

            state.user_id = action.payload

        },
        setUserName: (state, action) => {

            state.username = action.payload

        },
        setEmail: (state, action) => {

            state.email = action.payload

        }

    }


})

const restaurants = createSlice({

    name: "restaurant",
    initialState: {
        restaurants: {}
    },
    reducers: {

        setRestaurants: (state, actions) => {

            state.restaurants = actions.payload

        }

    }

})

const menu = createSlice({

    name: "menu",
    initialState: {
        menuItems: {}
    },
    reducers: {

        setMenuItems: (state, actions) => {

            state.menuItems = actions.payload

        }

    }

})

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        restaurant_name: null,
        restaurant_id: null,
        items: {},
        total: 0,
    },
    reducers: {

        add_item: (state, action) => {


            const id = action.payload.restaurant_id
            const item = action.payload.item

        
            if (state.restaurant_id === null) {

                console.log("from condition")

                state.restaurant_id = id

            } else {

                if (state.restaurant_id !== id) {

                    console.log("items updated")

                    state.items = {}
                    state.total = 0
                    state.restaurant_id = id;

                }
            }

            state.total += item.price

            if (Object.keys(state.items).length === 0) {

                state.items[item.id] = item
                


            } else {

                let flag = false;

                for (let key in state.items) {

                    if (state.items[key].id === item.id) {

                        state.items[key].count += 1
                        flag = true;

                    }

                }

                if (!flag) {

                    state.items[item.id] = item

                }

                

            }

        },
        remove_item: (state, action) => {

            const item_id = action.payload.index

            console.log(item_id)

            state.total -= state.items[item_id].price

            if (state.items[item_id].count === 1) {

                console.log(state.items)
                console.log(state.items[item_id])
                delete state.items[item_id]

            } else {

                state.items[item_id].count -= 1

            }

        },
        clearCart: (state) =>{

            state.restaurant_name = null
            state.restaurant_id = null
            state.items = {}
            state.total = 0

        }


    }
});




const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    profile: profile.reducer,
    registration: registration.reducer,
    session: session.reducer,
    login: login.reducer,
    restaurant: restaurants.reducer,
    menu: menu.reducer,
});

export const { setIsAuthenticated, setAccessToken } = session.actions
export const { add_item, remove_item, clearCart } = cartSlice.actions
export const { setEmail, setUserID, setUserName, } = profile.actions
export const { setRegEmail, setRegUsername, setRegPassword, setConfirmPassword } = registration.actions
export const { setLoginEmail, setLoginPassword } = login.actions
export const { setRestaurants } = restaurants.actions
export const { setMenuItems } = menu.actions

export default rootReducer;




