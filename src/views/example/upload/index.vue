<template>
  <div class="components-container">
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <div class="editor-content" v-html="content"></div>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  export default {
    name: 'Upload',
    components: { Tinymce },
    data() {
      return {
        content: ''
      }
    }
  }
</script>

<style scoped>

</style>
