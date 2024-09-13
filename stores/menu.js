import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    showWriteButton: false,
    backButtonConfig: null,
  }),
  actions: {
    updateButtons(route) {
      this.showWriteButton = route.path.startsWith('/board');
      this.backButtonConfig = this.getBackButtonForRoute(route);
    },
    getBackButtonForRoute(route) {
      if (route.path.startsWith('/post')) {
        return { label: 'board', route: `/board/${route.query.boardId}` };
      } else if (route.path.startsWith('/board')) {
        return { label: 'home', route: '/' };
      }

      return null;
    }
  }
});