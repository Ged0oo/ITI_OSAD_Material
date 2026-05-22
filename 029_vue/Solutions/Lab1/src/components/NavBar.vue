<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["toggleSidebar"]);
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div
          @click="emits('toggleSidebar')"
          tabindex="0"
          role="button"
          class="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li v-for="navItem in navItems">
            <a v-if="navItem.type == 'single'" :href="navItem.url">{{
              navItem.name
            }}</a>
            <details v-else>
              <summary>Parent</summary>
              <ul class="p-2 bg-base-100 w-40 z-1">
                <li v-for="childItem in navItem.childItems">
                  <a>{{ childItem.name }}</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl">{{ title }}</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li v-for="navItem in navItems">
          <a v-if="navItem.type == 'single'" :href="navItem.url">{{
            navItem.name
          }}</a>
          <details v-else>
            <summary>Parent</summary>
          </details>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <a class="btn">Button</a>
    </div>
  </div>
</template>
