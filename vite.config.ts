

import { md } from "./plugins/md";
import vue from '@vitejs/plugin-vue'
import { demo } from "./plugins/demo";
export default {
  base: './',
  assetsDir: 'assets',
  plugins: [vue(),demo(),md()],
};