import { createSlice } from '@reduxjs/toolkit';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const yesterdayTasks = localStorage.getItem('yesterday') ? JSON.parse(localStorage.getItem('yesterday')) : [];
const storedTomorrow = localStorage.getItem('tomorrow') ? JSON.parse(localStorage.getItem('tomorrow')) : [];

const initialState = {
    todo: yesterdayTasks[0],
    tomorrow: storedTomorrow,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        setTodo: (state, action) => {
            state.todo = action.payload;
        },
        addTodo: (state, action) => {
            state.tomorrow.push(action.payload);
            localStorage.setItem('tomorrow', JSON.stringify(state.tomorrow));
        },
        removeTodo: (state, action) => {
            state.tomorrow = state.tomorrow.filter((_, index) => index !== action.payload);
            localStorage.setItem('tomorrow', JSON.stringify(state.tomorrow));
        },
        updateTodo: (state, action) => {
        const { index, content } = action.payload;
        state.tomorrow[index] = content;
        localStorage.setItem('tomorrow', JSON.stringify(state.tomorrow));
        }
    },
});

const createMarkdownSlice = (name) => {
    return createSlice({
        name,
        initialState: { markdown: '', html: '' },
        reducers: {
            setMarkdown: (state, action) => {
                state.markdown = action.payload;
                const markedText = marked(action.payload, {
                    gfm: true,
                    breaks: true,
                });
                state.html = sanitizeHtml(markedText, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                    allowedAttributes: {
                        a: ['href', 'name', 'target'],
                        img: ['src', 'alt'],
                    },
                });
            },
            setHTML: (state, action) => {
                state.html = action.payload;
            }
        },
    });
};

const digressionSlice = createMarkdownSlice('digression');
const helpSlice = createMarkdownSlice('help');

export const { setTodo, addTodo, removeTodo, updateTodo } = todoSlice.actions;
export const { setMarkdown: setDigressionMarkdown, setHTML: setDigressionHTML } = digressionSlice.actions;
export const { setMarkdown: setHelpMarkdown, setHTML: setHelpHTML } = helpSlice.actions;

export const rootReducer = {
    todo: todoSlice.reducer,
    digression: digressionSlice.reducer,
    help: helpSlice.reducer,
};
