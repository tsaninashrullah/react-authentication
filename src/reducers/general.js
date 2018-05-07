export default function(state = {
    isLoading : false
}, action) {
    switch (action.type) {
        case 'showLoading':
            state = {
                isLoading: true
            };
            break;
        case 'hideLoading' :
            state = {
                isLoading: false
            };
            break;
    
        default:
            break;
    }
    return state;
}