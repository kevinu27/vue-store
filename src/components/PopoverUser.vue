<template>
<div class="popover-container"
    @click="trigger === 'click' ? togglePopover() : null"
    @mouseover="trigger === 'hover' ? showPopover() : null"
    @mouseleave="trigger === 'hover' ? hidePopover() : null"
  >
  <div class="your-account">
    <p v-if="authStore.userName" class="username"> Hola {{ authStore.userName }}</p>
    <p :class="[!authStore.userName ? 'marginpopover' : null, 'account']"
    > cuenta y pedidos <span class="dropdown-arrow">▼</span></p>
  </div>
  
    <div v-if="isPopoverVisible" class="popover">
      <div class="popover-arrow"></div>
      <div @click="ShowLoginRegister()" v-if="!authStore.userName">Identificate</div>
      <div>Mi cuenta</div>
    <div v-if="authStore.isAuthenticated" @click="authStore.logout"> Logout</div>

      <div>Pedidos</div>

    </div>
  

  </div>
  </template>
  
  <script>
import { useAuthStore } from '@/stores/authStore'

  export default {
    props: {
      trigger: {
        type: String,
        default: "hover", // Can be 'click' or 'hover'
      }
    },
    data() {
      return {
        authStore: useAuthStore(),
        isPopoverVisible: false
      };
    },
    methods: {
      togglePopover() {
        this.isPopoverVisible = !this.isPopoverVisible;
      },
      showPopover() {
        this.isPopoverVisible = true;
      },
      hidePopover() {
        this.isPopoverVisible = false;
      },
      ShowLoginRegister() {
      console.log('ShowLoginRegister')
      this.authStore.ShowloginModal()
    },
    }
  };
  </script>
  
  <style scoped>
  .popover-container {
    position: relative;
    display: inline-block;
  }
  
  .popover {
    position: absolute;
  /* top: 40px; */
  left: -150%;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  white-space: nowrap;
  border: 2px solid blue;
  width: 400%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 1rem; */
  z-index: 10;
    
  }
.marginpopover{
  padding-bottom: 0px!important;
}
  
/* Arrow styling */
.popover-arrow {
  position: absolute;
  width: 0;
  height: 0;
  top: -10px;
  left: calc(50% -  10px);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid blue; 
}

/* Inner arrow to match background color */
.popover-arrow::after {
  content: '';
  position: absolute;
  top: 2px; /* Offset to account for border width */
  left: -8px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white; /* Same as popover background */
}
.your-account{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.username{
  padding: 0;
  margin: 0;
  font-size: 12px;
}

.dropdown-button {
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.dropdown-arrow {
  font-size: 10px;
  margin-left: 5px;
  margin-top: 2px;
}
.account{
  padding-bottom: 10px;
}
  </style>
  