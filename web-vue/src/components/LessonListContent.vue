<template>
  <main class="main-content">
    <!-- Tabs 置顶栏 - 与之前页面样式保持一致 -->
    <div class="tabs-bar">
      <div class="content-tabs">
        <div
          v-for="(tab, index) in contentTabs"
          :key="tab.id"
          :class="['tab-pill', { 'tab-pill--active': tab.active }]"
          @click="setActiveTab(index)"
        >
          <span>{{ tab.label }}</span>
          <svg class="tab-close" width="14" height="14" viewBox="0 0 14 14" @click.stop="closeTab(index)">
            <path d="M4 4l6 6M10 4l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Page Content Card -->
    <div class="lesson-list-card">
      <div class="lesson-list-card-head">
      <!-- Page Header: Title + Manage Columns + Add Filter -->
      <div class="lesson-list-header">
        <h1 class="lesson-list-title">Lesson List</h1>
        <div class="lesson-list-actions">
          <button class="btn-link-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="1" y="3" width="12" height="8" rx="1"/>
              <path d="M4 7h6M4 9h4"/>
            </svg>
            <span>Manage Columns</span>
          </button>
          <button class="btn-link-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M1 4h12M1 8h8M5 12h4"/>
            </svg>
            <span>Add Filter</span>
          </button>
        </div>
      </div>

      <!-- Filter Section - 与设计稿一致 -->
      <div class="filter-section">
        <div class="filter-row">
          <div class="filter-item">
            <label class="filter-label">Lesson Name</label>
            <input type="text" class="filter-input" placeholder="Input" />
          </div>
          <div class="filter-item">
            <label class="filter-label">Lesson Type</label>
            <select class="filter-select">
              <option value="">Select</option>
            </select>
          </div>
          <div class="filter-item">
            <label class="filter-label">Product Category</label>
            <select class="filter-select">
              <option value="">Select</option>
            </select>
          </div>
          <div class="filter-item">
            <label class="filter-label">Subject Group</label>
            <select class="filter-select">
              <option value="">Select</option>
            </select>
          </div>
          <div class="filter-item filter-item--btn">
            <label class="filter-label">&nbsp;</label>
            <button class="btn-clear-filter">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 7a6 6 0 11-6-6v2M1 7a6 6 0 016 6v-2"/>
              </svg>
              <span>Clear Filter</span>
            </button>
          </div>
        </div>
        <div class="filter-row">
          <div class="filter-item">
            <label class="filter-label">Student</label>
            <input type="text" class="filter-input" placeholder="Input" />
          </div>
          <div class="filter-item">
            <label class="filter-label">Instructor</label>
            <select class="filter-select">
              <option value="">Select</option>
            </select>
          </div>
          <div class="filter-item filter-item--composite">
            <label class="filter-label">PA</label>
            <div class="filter-pa-group">
              <select class="filter-select">
                <option value="">Type</option>
              </select>
              <select class="filter-select">
                <option value="">Name</option>
              </select>
            </div>
          </div>
          <div class="filter-item">
            <label class="filter-label">Class Time</label>
            <div class="filter-date">
              <svg class="filter-date-icon filter-date-icon--left" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="1" y="2" width="12" height="10" rx="1"/>
                <path d="M1 5h12M4 1v3M10 1v3"/>
              </svg>
              <input type="text" class="filter-input" placeholder="Start date - End date" />
            </div>
          </div>
        </div>
        <div class="filter-row">
          <div class="filter-item">
            <label class="filter-label">Class Day</label>
            <select class="filter-select">
              <option value="">Select</option>
            </select>
          </div>
        </div>
      </div>
      </div>
      <!-- Data Table: 左侧可滚动 + 右侧固定 Operation，左右各 20px 留白 -->
      <div class="table-section">
      <div class="table-container">
        <div class="table-scroll">
          <table class="lesson-table">
            <thead>
              <tr>
                <th class="col-checkbox"><input type="checkbox" /></th>
                <th class="col-name">Lesson Name</th>
                <th class="col-type">Type</th>
                <th class="col-tutor">Tutor</th>
                <th class="col-student">Student</th>
                <th class="col-dept">Department</th>
                <th class="col-app">Application</th>
                <th class="col-pa">Main PA</th>
                <th class="col-cover">Cover PA</th>
                <th class="col-scheduled sortable">
                  Scheduled Time
                  <svg class="sort-icon" width="12" height="12" viewBox="0 0 12 12"><path d="M6 3v6M3 6l3 3 3-3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                </th>
                <th class="col-actual sortable">
                  Actual Start
                  <svg class="sort-icon" width="12" height="12" viewBox="0 0 12 12"><path d="M6 3v6M3 6l3 3 3-3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                </th>
                <th class="col-duration">Duration (Scheduled/Actual)</th>
                <th class="col-status">Status</th>
                <th class="col-tool">Tool</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in tableData" :key="i">
                <td class="col-checkbox"><input type="checkbox" v-model="row.checked" /></td>
                <td class="col-name">
                  <span v-if="row.hasWarning" class="cell-warning">!</span>
                  <span v-else-if="row.isSuccess" class="cell-success">
                    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M12 4L5 11 2 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                  </span>
                  {{ row.lessonName }}
                </td>
                <td class="col-type">{{ row.type }}</td>
                <td class="col-tutor">{{ row.tutor }}</td>
                <td class="col-student">{{ row.student }}</td>
                <td class="col-dept">{{ row.department }}</td>
                <td class="col-app">{{ row.application }}</td>
                <td class="col-pa">{{ row.mainPA }}</td>
                <td class="col-cover">{{ row.coverPA }}</td>
                <td class="col-scheduled">
                  <div class="cell-datetime">{{ row.scheduledTime }}</div>
                  <div v-if="row.scheduledTime2" class="cell-datetime-sub">{{ row.scheduledTime2 }}</div>
                </td>
                <td class="col-actual">
                  <span v-if="row.actualStart === '-'">{{ row.actualStart }}</span>
                  <template v-else>
                    <div class="cell-datetime">{{ row.actualStart }}</div>
                    <div v-if="row.actualStart2" class="cell-datetime-sub">{{ row.actualStart2 }}</div>
                  </template>
                </td>
                <td class="col-duration" :class="{ 'text-danger': row.durationDanger }">{{ row.duration }}</td>
                <td class="col-status">
                  <span :class="['tag', 'tag--status', 'tag--' + row.statusClass]">{{ row.status }}</span>
                </td>
                <td class="col-tool">{{ row.tool }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-op-fixed">
          <table class="lesson-table lesson-table--op">
            <thead>
              <tr>
                <th class="col-op">Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in tableData" :key="i">
                <td class="col-op">
                  <div class="op-btns">
                    <button v-if="row.showEdit" class="op-btn" title="查看详情" @click="goToDetail(row)">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 2l3 3-8 8H3v-3l8-8z"/></svg>
                    </button>
                    <button v-if="row.showReschedule" class="op-btn" title="Reschedule">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M2 6h12M6 2v4"/></svg>
                    </button>
                    <button v-if="row.showVideo" class="op-btn" title="Video">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="3,2 3,14 13,8"/><rect x="1" y="1" width="14" height="14" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                    </button>
                    <button v-if="row.showSchedule" class="op-btn" title="Schedule">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M2 6h12M5 1v3M11 1v3"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>

      <!-- Footer: Batch + Pagination -->
      <div class="lesson-list-footer">
        <div class="footer-left">
          <span class="footer-stat">Selected : 2</span>
          <button class="btn-batch-cancel">Batch Cancel Lessons</button>
        </div>
        <div class="footer-pagination">
          <span class="pagination-total">Total 234</span>
          <div class="pagination-controls">
            <button class="pagination-btn"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 11L5 7l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
            <button v-for="p in 6" :key="p" :class="['pagination-num', { 'pagination-num--active': p === 1 }]">{{ p }}</button>
            <button class="pagination-btn pagination-btn--more">...</button>
            <button class="pagination-num">100</button>
            <button class="pagination-btn"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
          </div>
          <div class="pagination-jump">
            <span>跳至</span>
            <input type="number" class="pagination-input" value="1" />
            <span>页</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'LessonListContent',
  data() {
    return {
      contentTabs: [
        { id: 1, label: '课时列表', active: true },
        { id: 2, label: '全部', active: false },
        { id: 3, label: '待处理', active: false }
      ],
      tableData: [
        { id: 1, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '-', actualStart2: null, duration: '1.5', status: 'Not Started', statusClass: 'gray', tool: 'Zoom', hasWarning: false, isSuccess: false, showEdit: true, showReschedule: false, showVideo: false, showSchedule: true, durationDanger: false, checked: false },
        { id: 2, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '-', actualStart2: null, duration: '1.5', status: 'Pending Cancellation', statusClass: 'orange', tool: 'Zoom', hasWarning: false, isSuccess: false, showEdit: true, showReschedule: false, showVideo: false, showSchedule: true, durationDanger: false, checked: false },
        { id: 3, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '2025/12/22 15:02:14', actualStart2: '2025/12/22 15:02:14', duration: '2/1.5', status: 'Cancelled', statusClass: 'red', tool: 'Zoom', hasWarning: false, isSuccess: true, showEdit: true, showReschedule: true, showVideo: true, showSchedule: false, durationDanger: true, checked: false },
        { id: 4, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '2025/12/22 15:02:14', actualStart2: '2025/12/22 15:02:14', duration: '1.5', status: 'Ongoing', statusClass: 'blue', tool: 'Zoom', hasWarning: false, isSuccess: false, showEdit: true, showReschedule: true, showVideo: true, showSchedule: false, durationDanger: false, checked: false },
        { id: 5, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '2025/12/22 15:02:14', actualStart2: '2025/12/22 15:02:14', duration: '1.5/1', status: 'Finished', statusClass: 'green', tool: 'Zoom', hasWarning: false, isSuccess: false, showEdit: true, showReschedule: true, showVideo: true, showSchedule: false, durationDanger: true, checked: false },
        { id: 6, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '2025/12/22 15:02:14', actualStart2: '2025/12/22 15:02:14', duration: '1.5', status: 'Cancelled', statusClass: 'red', tool: 'Zoom', hasWarning: false, isSuccess: false, showEdit: true, showReschedule: true, showVideo: true, showSchedule: false, durationDanger: false, checked: false },
        { id: 7, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '2025/12/22 15:02:14', actualStart2: '2025/12/22 15:02:14', duration: '1/1', status: 'Finished', statusClass: 'green', tool: 'Zoom', hasWarning: false, isSuccess: true, showEdit: true, showReschedule: true, showVideo: true, showSchedule: false, durationDanger: true, checked: false },
        { id: 8, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '2025/12/22 15:02:14', actualStart2: '2025/12/22 15:02:14', duration: '2/1.5', status: 'Ongoing', statusClass: 'blue', tool: 'Zoom', hasWarning: false, isSuccess: true, showEdit: true, showReschedule: true, showVideo: true, showSchedule: false, durationDanger: true, checked: false },
        { id: 9, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '2025/12/22 15:02:14', actualStart2: '2025/12/22 15:02:14', duration: '1.5', status: 'Not Started', statusClass: 'gray', tool: 'Zoom', hasWarning: false, isSuccess: false, showEdit: true, showReschedule: false, showVideo: true, showSchedule: true, durationDanger: false, checked: false },
        { id: 10, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '-', actualStart2: null, duration: '1.5', status: 'Pending Cancellation', statusClass: 'orange', tool: 'Zoom', hasWarning: false, isSuccess: false, showEdit: true, showReschedule: false, showVideo: false, showSchedule: true, durationDanger: false, checked: false },
        { id: 11, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '2025/12/22 15:02:14', actualStart2: '2025/12/22 15:02:14', duration: '2/1.5', status: 'Cancelled', statusClass: 'red', tool: 'Zoom', hasWarning: false, isSuccess: false, showEdit: true, showReschedule: true, showVideo: true, showSchedule: false, durationDanger: true, checked: false },
        { id: 12, lessonName: 'Oxbridge Planning Sessio...', type: '1v1', tutor: 'Serena', student: 'Serena', department: 'Humanities', application: 'Career Planning', mainPA: 'Matthew', coverPA: 'Jessica', scheduledTime: '2025/12/22 15:02:14', scheduledTime2: '2025/12/22 15:02:14', actualStart: '2025/12/22 15:02:14', actualStart2: '2025/12/22 15:02:14', duration: '1.5', status: 'Finished', statusClass: 'green', tool: 'Zoom', hasWarning: false, isSuccess: false, showEdit: true, showReschedule: true, showVideo: true, showSchedule: false, durationDanger: false, checked: false }
      ]
    }
  },
  methods: {
    goToDetail(row) {
      this.$router.push({ name: 'LessonDetail', params: { id: row.id } })
    },
    setActiveTab(index) {
      this.contentTabs.forEach((t, i) => {
        this.$set(t, 'active', i === index)
      })
    },
    closeTab(index) {
      if (this.contentTabs[index].active && this.contentTabs.length > 1) {
        const next = this.contentTabs[index + 1] || this.contentTabs[index - 1]
        if (next) next.active = true
      }
      this.contentTabs.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.lesson-table thead th,
.lesson-table thead th * {
  font-weight: 500 !important;
}
.lesson-table td {
  font-weight: 400 !important;
}
</style>
