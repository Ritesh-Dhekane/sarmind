<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Footer
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #2c5364;
  --secondary-color: #203a43;
  --accent-color: #0f2027;
  --text-color: #fff;
  --background-color: #1a1a1a;
  --max-width: 1400px;
  --content-padding: 1rem;
  --card-bg: #2a2a2a;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  line-height: 1.6;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--content-padding);
}

@media (max-width: 768px) {
  :root {
    --content-padding: 0.5rem;
  }
}
</style>
