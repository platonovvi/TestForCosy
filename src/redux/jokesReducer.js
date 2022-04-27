import {JOKE_CREATE, JOKE_UPDATE, JOKE_DELETE, JOKES_LOAD, JOKE_LIKE} from './types';

const intialState = {
    jokes: [],
    selected: []
}
export const jokesReducer = (state = intialState, action) => {
    switch (action.type) {
        case JOKE_CREATE:
            const itemIndex = state.jokes.findIndex(res => res.id === action.data.id_joke);
            const nextJokes = [
                ...state.jokes.slice(0, itemIndex),
                {...state.jokes[itemIndex], added: !state.jokes[itemIndex].added},
                ...state.jokes.slice(itemIndex + 1)
            ];
            return {
                ...state,
                selected: [...state.selected, action.data],
                jokes: [...nextJokes],
            }
        case JOKES_LOAD:
            const jokesNew = action.data.map(res => {
                return {
                    text: res.setup + ' ' + res.punchline,
                    id: res.id,
                    like: res.like,
                    added: res.added,
                }
            })
            return {
                ...state,
                jokes: jokesNew
            }

        /* case JOKE_UPDATE:
             const {data} = action;
             const {jokes} = state;
             const itemIndex = jokes.findIndex(res => res.id === data.id);
             const nextJokes = [
                 ...jokes.slice(0, itemIndex),
                 data,
                 ...jokes.slice(itemIndex + 1)
             ];
             return {
                 ...state,
                 //jokes: [...state.jokes, action.data]
             }*/
        case JOKE_LIKE:
            return (() => {
                const {data} = action;
                const {selected} = state;
                const itemIndex = selected.findIndex(res => res.id === data.id);
                const nextJokes = [
                    ...selected.slice(0, itemIndex),
                    {...selected[itemIndex], like: !selected[itemIndex].like},
                    ...selected.slice(itemIndex + 1)
                ];
                return {
                    ...state,
                    selected: nextJokes,
                }
            })();
        case JOKE_DELETE:
            return (() => {
                const {data} = action;
                const {selected} = state;

                const itemIndex = selected.findIndex(res => res.id === data.id);
                const nextJokes = [
                    ...selected.slice(0, itemIndex),
                    ...selected.slice(itemIndex + 1)
                ];
                const itemIndex2 = state.jokes.findIndex(res => res.id === action.data.id_joke);
                const nextJokes2 = [
                    ...state.jokes.slice(0, itemIndex2),
                    {...state.jokes[itemIndex2], added: !state.jokes[itemIndex2].added},
                    ...state.jokes.slice(itemIndex2 + 1)
                ];
                return {
                    ...state,
                    selected: nextJokes,
                    jokes: nextJokes2
                }
            })();
        default:
            return state;
    }
}

