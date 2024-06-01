import { analyze } from 'estree-halstead'
import { parse } from 'acorn'

const angularApp = 'angular-app/src/app/app.component.ts'
const angularCW = 'angular-app/src/app/chat-window/caht-window.component.ts'
const reactApp = 'react-app/src/App.js'
const reactCW = 'react-app/src/ChatWindow.js'
const svelteApp = 'svelte-app/src/routes/+page.svelte'
const svelteCW = 'svelte-app/src/lib/ChatWindow.svelte'
const vueApp = 'vue-app/src/App.vue'
const vueCW = 'vue-app/src/components/ChatWindow.vue'


const ast = parse(angularCW, {ecmaVersion: "latest"}); 
const result = analyze(ast)
console.log(result)
