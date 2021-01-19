<template>
  <div>
    <p>msg-reactive: {{msgReactive}}</p>
    <p>msg-ref: {{refMsg}}</p>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  isReactive,
  isRef
} from 'vue'
export default {
  setup() {
    const msgReactive = reactive({
      value: 'hello vue3.0'
    })
    const refMsg = ref('hello vue3.0')

    console.log('类型检查')
    console.log('msgReactive', isReactive(msgReactive))
    console.log('refMsg', isReactive(refMsg))
    console.log('----------------------------')
    console.log('msgReactive', isReactive(msgReactive))
    console.log('refMsg', isReactive(refMsg))

    return {
      refMsg,
      msgReactive
    }
  }
};
</script>
