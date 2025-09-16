<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} MCQ Exam. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: var(--primary-color);
  color: white;
  padding: 0.75rem var(--content-padding);
  margin-top: auto;
}

.footer-content {
  max-width: var(--max-width);
  margin: 0 auto;
  text-align: center;
}
</style>