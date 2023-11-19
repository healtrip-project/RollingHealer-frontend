// import { Node } from '@tiptap/core'

// const CustomNode = Node.create({
//  name: 'customNode',

//  addCommands() {
//   return {
//     insertCustomNode: () => ({ commands }) => {
//       // Open a modal for text input
//       const input = prompt('Enter some text')

//       // Insert a custom node at the current selection with the entered text
//       return commands.insertContent({
//         type: 'customNode',
//         text: input,
//       })
//     },
//   }
//  },

//  // Add the rest of your custom node definition here
// })

import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import EditorPlan from './EditorPlan.vue'

export default Node.create({
  name: 'editorPlan',

  group: 'block',
  
  content: '(block*|list)',
  atom:true,
  addCommands() {
    return {
      insertPlanNode:()=> ({commands}) => {
        return commands.insertContent('<editor-plan></editor-plan>')
      }
    }
  },

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'editor-plan',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['editor-plan', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(EditorPlan)
  },
})