<template>
  <div id="students">
    <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center text-blue-500">
          <a href="#" class="text-gray-700">Main</a>
          <svg
            class="fill-current w-3 h-3 mx-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
            />
          </svg>
        </li>
        <li class="flex items-center">
          <a href="#" class="text-gray-600">Students</a>
        </li>
      </ol>
    </nav>

    <div class="flex flex-wrap items-center -mx-2">
      <p class="text-xl font-semibold mb-4 px-2">Students Records</p>

      <div class="mb-6 w-full lg:w-1/4 px-2">
        <!-- Increased bottom margin -->
        <input
          type="text"
          class="input input-bordered bg-white text-gray-700 border-gray-300"
          placeholder="Search..."
          v-model="searchQuery"
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-1" v-if="!isLoading">
      <div class="overflow-x-auto w-full">
        <table class="table table-xs w-full text-gray-700">
          <thead>
            <tr>
              <th></th>
              <th>Gender</th>
              <th>Race Ethnicity</th>
              <th>Parental Level of Education</th>
              <th>Lunch</th>
              <th>Test Preparation Course</th>
              <th>Math Score</th>
              <th>Reading Score</th>
              <th>Writing Score</th>
            </tr>
          </thead>
          <tbody>
            <!-- data rows -->
            <tr v-for="student in paginatedStudents" :key="student.id">
              <td class="text-nowrap">{{ student.id }}</td>
              <td class="text-nowrap">{{ student.gender }}</td>
              <td class="text-nowrap">{{ student.race_ethnicity }}</td>
              <td class="text-nowrap">
                {{ student.parental_level_of_education }}
              </td>
              <td class="text-nowrap">{{ student.lunch }}</td>
              <td class="text-nowrap">{{ student.test_preparation_course }}</td>
              <td class="text-nowrap">{{ student.math_score }}</td>
              <td class="text-nowrap">{{ student.reading_score }}</td>
              <td class="text-nowrap">{{ student.writing_score }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="filteredStudents.length === 0" class="text-center py-4">
          No results found.
        </div>
      </div>
      <div class="flex justify-center mt-4">
        <button
          class="btn btn-xs btn-outline mr-2"
          v-for="page in paginatedButtons"
          :key="page"
          :class="{ 'btn-active': page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <p>Results Found: {{ filteredStudents.length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import dashboardService from "../services/dashboardService";

export default {
  name: "studentsHome",
  data() {
    return {
      isLoading: true,
      students: [],
      searchQuery: "",
      currentPage: 1,
      pageSize: 20,
    };
  },
  computed: {
    filteredStudents() {
      if (!this.searchQuery) {
        return this.students;
      }
      return this.students.filter((student) => {
        // Adjust this logic based on what fields you want to search
        return Object.values(student).some((value) =>
          value
            .toString()
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      });
    },
    paginatedStudents() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredStudents.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.students.length / this.pageSize);
    },
    paginatedButtons() {
      let startPage, endPage;
      if (this.totalPages <= 5) {
        // Less than 5 total pages, show all
        startPage = 1;
        endPage = this.totalPages;
      } else {
        // More than 5 total pages
        if (this.currentPage <= 3) {
          startPage = 1;
          endPage = 5;
        } else if (this.currentPage + 2 >= this.totalPages) {
          startPage = this.totalPages - 4;
          endPage = this.totalPages;
        } else {
          startPage = this.currentPage - 2;
          endPage = this.currentPage + 2;
        }
      }
      let pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    async fetchAllStudents() {
      try {
        const response = await dashboardService.getAllStudents();
        this.students = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching students:", error);
        this.isLoading = false;
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
  },
  mounted() {
    this.fetchAllStudents();
  },
};
</script>
