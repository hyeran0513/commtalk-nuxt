import { defineNuxtPlugin } from '#app';
import Grid from 'tui-grid';
import 'tui-grid/dist/tui-grid.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('toastGrid', Grid);

  Grid.applyTheme('clean');
});
