<template>
  <nav class="navbar">
    <div class="navbar-content">
      <router-link to="/" class="navbar-logo">
        <span class="logo-text">MCQ Exam</span>
      </router-link>

      <div class="nav-links" :class="{ 'is-open': isMenuOpen }">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <router-link to="/test-selection" @click="closeMenu">Tests</router-link>
        <router-link to="/about" @click="closeMenu">About</router-link>
      </div>

      <div class="nav-actions">
        <router-link 
          to="/signup" 
          class="nav-link"
          v-if="!isAuthenticated"
        >
          Sign Up
        </router-link>
        <router-link 
          to="/login" 
          class="nav-link"
          v-if="!isAuthenticated"
        >
          Login
        </router-link>
        <router-link to="/login" class="profile-link" @click="closeMenu">
          <svg 
            class="profile-icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>Profile</span>
        </router-link>
        
        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span class="hamburger" :class="{ 'is-active': isMenuOpen }"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    }
  }
}
</script>

<style scoped>
.navbar {
  background: var(--primary-color);
  padding: 0.5rem var(--content-padding);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
}

.navbar-logo {
  text-decoration: none;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.profile-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.profile-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--primary-color);
    flex-direction: column;
    padding: 1rem;
  }

  .nav-links.is-open {
    display: flex;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>

