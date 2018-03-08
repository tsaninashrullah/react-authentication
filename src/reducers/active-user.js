export default function (state=null, action) {
    switch (action.type) {
        case "SELECT_USER":
            state = action.data;
            break;

        default:
            state = null;
            break;
    }
    return state;
}