<template>
  <div id="performance">
    <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center text-blue-500">
          <a href="#" class="text-gray-700">Dashboard</a>
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
          <a href="#" class="text-gray-600">Performance</a>
        </li>
      </ol>
    </nav>

    <div class="flex flex-wrap -mx-3 mb-20">
      <div class="w-1/2 xl:w-1/4 px-3">
        <div
          class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 cardComponant"
        >
          <div>
            <p>Average Total Score</p>

            <p class="font-semibold text-3xl">
              {{ avg.avg_absolute.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <div class="w-1/2 xl:w-1/4 px-3">
        <div
          class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 cardComponant"
        >
          <div>
            <p>Average Math Score</p>
            <p class="font-semibold text-3xl">
              {{ avg.avg_math_score.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <div class="w-1/2 xl:w-1/4 px-3">
        <div
          class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 cardComponant"
        >
          <div>
            <p>Average Reading Score</p>
            <p class="font-semibold text-3xl">
              {{ avg.avg_reading_score.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <div class="w-1/2 xl:w-1/4 px-3">
        <div
          class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 cardComponant"
        >
          <div>
            <p>Average Writing Score</p>
            <p class="font-semibold text-3xl">
              {{ avg.avg_writing_score.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider Line -->
    <div class="w-full px-4 py-2">
      <hr class="divider-line" />
    </div>

    <div class="flex flex-wrap -mx-3">
      <div class="w-full xl:w-1/3 px-3">
        <p class="text-xl font-semibold mb-4">Performance By Gender</p>

        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <canvas
            id="genderPerformance-chart"
            width="600"
            height="400"
          ></canvas>
        </div>
      </div>

      <div class="w-full xl:w-1/3 px-3">
        <p class="text-xl font-semibold mb-4">Performance By Ethnicity</p>

        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <canvas
            id="ethnicityPerformance-chart"
            width="600"
            height="400"
          ></canvas>
        </div>
      </div>

      <div class="w-full xl:w-1/3 px-3">
        <p class="text-xl font-semibold mb-4">
          Impact of preperation Cource on Performance
        </p>

        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <canvas
            id="preperationCoursePerformance-chart"
            width="600"
            height="400"
          ></canvas>
        </div>
      </div>

      <!-- Divider Line -->
      <div class="w-full px-4 py-2">
        <hr class="divider-line" />
      </div>

      <div class="w-full xl:w-1/3 px-3">
        <p class="text-xl font-semibold mb-4">
          Impact of Lunch type on Performance
        </p>

        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <canvas id="lunchPerformance-chart" width="600" height="400"></canvas>
        </div>
      </div>

      <div class="w-full xl:w-1/3 px-3">
        <p class="text-xl font-semibold mb-4">
          Impact of Parental Education Level on Performance
        </p>

        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <canvas
            id="parentalEducationPerformance-chart"
            width="600"
            height="400"
          ></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import dashboardService from "../services/dashboardService";
const colorPalette = [
  "rgba(0, 28, 255, 0.4)", // Soft Blue
  "rgba(255, 159, 64, 0.4)", // Soft Orange
  "rgba(153, 102, 255, 0.4)", // Soft Purple
  "rgba(75, 192, 192, 0.4)", // Soft Cyan
  "rgba(255, 99, 132, 0.4)", // Soft Pink
  "rgba(255, 205, 86, 0.4)", // Soft Yellow
  "rgba(54, 162, 235, 0.4)", // Soft Sky Blue
  "rgba(101, 143, 75, 0.4)", // Soft Olive Green
  "rgba(232, 67, 147, 0.4)", // Soft Magenta
  "rgba(162, 217, 206, 0.4)", // Soft Teal
];
export default {
  name: "PerformanceDashboard",
  data() {
    return {
      counts: null,
      avg: null,
      genderChart: null,
      ethnicityChart: null,
      lunchChart: null,
      preperationCourceChart: null,
      parentalEducationChart: null,
    };
  },
  methods: {
    async fetchCounts() {
      try {
        const response = await dashboardService.getCounts();
        this.counts = response.data;
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    },
    async fetchAvgScores() {
      try {
        const response = await dashboardService.getAvgScores();
        this.avg = response.data;
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    },
    async fetchPerformances() {
      try {
        const response = await dashboardService.getPerformances();
        this.processPerformanceData(response.data);
      } catch (error) {
        console.error("Error fetching Performances:", error);
      }
    },
    processPerformanceData(data) {
      // Process your data here and update the chart data
      this.createGenderChart(data.performanceByGender);
      this.createEthnicityChart(data.performanceByEthnicity);
      this.createlunchChart(data.performanceByLunch);
      this.createPreperationCourseChart(data.performanceByPreperationCourse);
      this.createParentalEducationChart(data.performanceByParentalEducation);
    },
    createGenderChart(genderData) {
      const ctx = document
        .getElementById("genderPerformance-chart")
        .getContext("2d");
      if (this.genderChart) {
        this.genderChart.destroy();
      }
      this.genderChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Math Score", "Reading Score", "Writing Score"],
          datasets: genderData.map((item) => ({
            label: item.gender,
            backgroundColor:
              item.gender === "male"
                ? "rgba(99,179,237,0.4)"
                : "rgba(255, 105, 180, 0.4)",
            strokeColor: "#63b3ed",
            pointColor: "#fff",
            pointStrokeColor: "#63b3ed",
            data: [
              item.avg_math_score,
              item.avg_reading_score,
              item.avg_writing_score,
            ],
          })),
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
    createEthnicityChart(ethnicityData) {
      const ctx = document
        .getElementById("ethnicityPerformance-chart")
        .getContext("2d");
      if (this.ethnicityChart) {
        this.ethnicityChart.destroy();
      }
      this.ethnicityChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Math Score", "Reading Score", "Writing Score"],
          datasets: ethnicityData.map((item, index) => ({
            label: item.race_ethnicity,
            backgroundColor: colorPalette[index % colorPalette.length],
            strokeColor: "#63b3ed",
            pointColor: "#fff",
            pointStrokeColor: "#63b3ed",
            data: [
              item.avg_math_score,
              item.avg_reading_score,
              item.avg_writing_score,
            ],
          })),
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
    createlunchChart(lunchData) {
      const ctx = document
        .getElementById("lunchPerformance-chart")
        .getContext("2d");
      if (this.lunchChart) {
        this.lunchChart.destroy();
      }
      this.lunchChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Math Score", "Reading Score", "Writing Score"],
          datasets: lunchData.map((item, index) => ({
            label: item.lunch,
            backgroundColor: colorPalette[index % colorPalette.length],
            strokeColor: "#63b3ed",
            pointColor: "#fff",
            pointStrokeColor: "#63b3ed",
            data: [
              item.avg_math_score,
              item.avg_reading_score,
              item.avg_writing_score,
            ],
          })),
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
    createPreperationCourseChart(preperationData) {
      const ctx = document
        .getElementById("preperationCoursePerformance-chart")
        .getContext("2d");
      if (this.preperationCourceChart) {
        this.preperationCourceChart.destroy();
      }
      this.preperationCourceChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Math Score", "Reading Score", "Writing Score"],
          datasets: preperationData.map((item, index) => ({
            label: item.test_preparation_course,
            backgroundColor: colorPalette[index % colorPalette.length],
            strokeColor: "#63b3ed",
            pointColor: "#fff",
            pointStrokeColor: "#63b3ed",
            data: [
              item.avg_math_score,
              item.avg_reading_score,
              item.avg_writing_score,
            ],
          })),
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
    createParentalEducationChart(parentsData) {
      const ctx = document
        .getElementById("parentalEducationPerformance-chart")
        .getContext("2d");
      if (this.parentalEducationChart) {
        this.parentalEducationChart.destroy();
      }
      this.parentalEducationChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Math Score", "Reading Score", "Writing Score"],
          datasets: parentsData.map((item, index) => ({
            label: item.parental_level_of_education,
            backgroundColor: colorPalette[index % colorPalette.length],
            strokeColor: "#63b3ed",
            pointColor: "#fff",
            pointStrokeColor: "#63b3ed",
            data: [
              item.avg_math_score,
              item.avg_reading_score,
              item.avg_writing_score,
            ],
          })),
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
  },
  computed: {},
  mounted() {
    this.fetchCounts();
    this.fetchAvgScores();
    this.fetchPerformances();
  },
};
</script>
