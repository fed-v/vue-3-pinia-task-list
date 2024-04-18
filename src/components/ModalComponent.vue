<template>

  <div v-if="isOpen" class="overlay" aria-modal="true" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalContent">

    <div class="modal-wrapper">
  
      <div class="modal-container" ref="target">
  
        <div class="close-btn-container">
          <button class="close-btn" @click.stop="emit('modal-close')" aria-label="Close modal">
            <i class="material-icons btn">close</i>
          </button>
        </div>
  
        <div class="modal-header">
          <slot name="header"> default header </slot>
        </div>
  
        <div class="modal-body">
          <slot name="content"> default content </slot>
        </div>
  
      </div>
  
    </div>
  
  </div>  

</template>

<script setup>

  import { defineEmits, ref } from "vue";
  import { onClickOutside } from '@vueuse/core';

  const props = defineProps({
    isOpen: Boolean,
  });

  // Define the emit function the parent component will use to close the modal
  const emit = defineEmits(["modal-close"]);

  // Create a reference to the modal container used to close the modal when clicked outside of it
  const target = ref(null);

  // Close the modal when clicked outside of it
  onClickOutside( target, () => emit('modal-close') );

</script>

<style scoped>

  .overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-container {
    width: 400px;
    margin: 150px auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 10px;
  }
  
  .modal-wrapper {
    margin: -120px;
  }

  .close-btn-container {
    display: flex;
    justify-content: flex-end;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 20px;
  }


  /* Small devices (tablets, 576px and up) */
  @media (min-width: 576px) {

  }

  /* Medium devices (desktops, 768px and up) */
  @media (min-width: 768px) {
    .modal-wrapper {
      margin: -100px;
    }
  }

  /* Large devices (large desktops, 992px and up) */
  @media (min-width: 992px) {
    .modal-wrapper {
      margin: -50px;
    }
  }

  /* Extra large devices (1200px and up) */
  @media (min-width: 1200px) { 
    
  }

</style>