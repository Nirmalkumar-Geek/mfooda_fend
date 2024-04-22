

const add_cart = (state, action) => {

    const { restarunt_name, item } = action.payload;

    if (state.restarunt_name === null) {

        state.restarunt_name = action.restarunt_name

    } else {

        state.items = null

        state.restarunt_name = restarunt_name;

    }

    let counter = 0;

    for (let x of state.items) {

        if (x.name === item.name) {

            state.items[counter].count += 1

        }

        state.items.push(item)

        counter += 1;

    }


}
