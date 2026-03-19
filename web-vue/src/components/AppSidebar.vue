<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <a
        v-for="item in navItems"
        :key="item.key"
        href="#"
        :class="getNavClass(item)"
        @click.prevent="handleNavClick(item)"
      >
        <svg v-if="item.icon" class="nav-icon" width="16" height="16" viewBox="0 0 24 24">
          <use :href="'#' + item.icon"></use>
        </svg>
        <span>{{ item.label }}</span>
        <svg v-if="item.hasSub" class="nav-chevron" width="12" height="12" viewBox="0 0 24 24">
          <use href="#icon-chevron"></use>
        </svg>
      </a>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar',
  methods: {
    getNavClass(item) {
      const isActive = item.route && this.$route.name === item.route.name
      return {
        'nav-item': true,
        'nav-item--active': isActive,
        'nav-item--no-icon': !item.icon,
        'has-sub': item.hasSub
      }
    },
    handleNavClick(item) {
      if (item.route) {
        this.$router.push(item.route).catch(err => {
          if (err.name !== 'NavigationDuplicated') throw err
        })
      }
    }
  },
  data() {
    return {
      navItems: [
        { key: 'home', icon: 'icon-home', label: 'Home', hasSub: false },
        { key: 'todo', icon: 'icon-todo', label: 'Todo List', hasSub: false },
        { key: 'director', icon: 'icon-gauge', label: 'Director Desk', hasSub: false },
        { key: 'pa', icon: 'icon-pie', label: 'PA Desk', hasSub: false },
        { key: 'personnel', icon: 'icon-user', label: 'Personnel', hasSub: false },
        { key: 'lesson-mgmt', icon: 'icon-lesson', label: 'Lesson Management', hasSub: true },
        { key: 'lesson-list', icon: null, label: 'Lesson List', hasSub: false, route: { name: 'LessonList' } },
        { key: 'mock', icon: 'icon-mock', label: 'Mock Tests', hasSub: false },
        { key: 'question', icon: 'icon-question', label: 'Question Management', hasSub: true },
        { key: 'school', icon: 'icon-school', label: 'School Management', hasSub: true },
        { key: 'teaching', icon: 'icon-teaching', label: 'Teaching', hasSub: true },
        { key: 'financial', icon: 'icon-financial', label: 'Financial', hasSub: true },
        { key: 'system', icon: 'icon-system', label: 'System', hasSub: true },
        { key: 'crm', icon: 'icon-crm', label: 'CRM', hasSub: true },
        { key: 'statistical', icon: 'icon-statistical', label: 'Statistical', hasSub: true }
      ]
    }
  }
}
</script>
