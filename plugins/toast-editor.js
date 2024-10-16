import { defineNuxtPlugin } from '#app';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('editor', Editor);
});