<template>
  <div id="distribution">
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
          <a href="#" class="text-gray-600">Distribution & Correlation</a>
        </li>
      </ol>
    </nav>

    <div class="flex flex-wrap -mx-3 mb-20">
      <div class="w-1/2 xl:w-1/4 px-3">
        <div
          class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 cardComponant"
        >
          <div>
            <p>Total Students</p>

            <p class="font-semibold text-3xl">{{ counts.totalCount }}</p>
          </div>
        </div>
      </div>

      <div class="w-1/2 xl:w-1/4 px-3">
        <div
          class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0 cardComponant"
        >
          <div>
            <p>Completed Preperation Course</p>
            <p class="font-semibold text-3xl">
              {{ counts.countByCourse }}
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
      <!-- Pie chart for Gender Distribution -->
      <div class="w-full lg:w-1/2 px-4 py-2">
        <p class="text-xl font-semibold mb-4">Gender Distribution</p>
        <div class="bg-white p-6 rounded-lg shadow-lg" v-if="!isLoading">
          <gender-pie-chart :chart-data="genderChartData" />
        </div>
      </div>

      <!-- Pie chart for Ethnicity Distribution -->
      <div class="w-full lg:w-1/2 px-4 py-2">
        <p class="text-xl font-semibold mb-4">Ethnicity Distribution</p>
        <div class="bg-white p-6 rounded-lg shadow-lg" v-if="!isLoading">
          <ethnicity-pie-chart :chart-data="ethnicityChartData" />
        </div>
      </div>
    </div>
    <!-- Divider Line -->
    <div class="w-full px-4 py-2">
      <hr class="divider-line" />
    </div>
    <!-- scatter plots -->
    <div class="flex flex-wrap -mx-3">
      <div class="w-full lg:w-1/2 px-4 py-2">
        <p class="text-xl font-semibold mb-4">Math Vs Reading By Gender</p>
        <!-- scatter plots -->
        <div class="px-4 py-2">
          <canvas
            id="math-reading-scatter-chart"
            width="400"
            height="200"
          ></canvas>
        </div>
      </div>
      <div class="w-full lg:w-1/2 px-4 py-2">
        <p class="text-xl font-semibold mb-4">Math Vs Writing By Gender</p>
        <!-- scatter plots -->
        <div class="px-4 py-2">
          <canvas
            id="math-writing-scatter-chart"
            width="400"
            height="200"
          ></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import Chart from "chart.js";

import dashboardService from "../services/dashboardService";
const colorPalette = [
  "rgba(0, 28, 255, 0.4)", // Soft Blue
  "rgba(255, 99, 132, 0.4)", // Soft Pink
  "rgba(255, 159, 64, 0.4)", // Soft Orange
  "rgba(153, 102, 255, 0.4)", // Soft Purple
  "rgba(75, 192, 192, 0.4)", // Soft Cyan
  "rgba(255, 205, 86, 0.4)", // Soft Yellow
  "rgba(54, 162, 235, 0.4)", // Soft Sky Blue
  "rgba(101, 143, 75, 0.4)", // Soft Olive Green
  "rgba(232, 67, 147, 0.4)", // Soft Magenta
  "rgba(162, 217, 206, 0.4)", // Soft Teal
];
export default {
  components: {
    "gender-pie-chart": {
      extends: Pie,
      props: ["chartData"],
      mounted() {
        this.renderChart(this.chartData, {
          responsive: true,
          maintainAspectRatio: false,
        });
      },
    },
    "ethnicity-pie-chart": {
      extends: Pie,
      props: ["chartData"],
      mounted() {
        this.renderChart(this.chartData, {
          responsive: true,
          maintainAspectRatio: false,
        });
      },
    },
  },
  name: "DistributionDashboard",
  data() {
    return {
      isLoading: true,
      counts: {},
      avg: {},
      students: [],
      genderChartData: {
        labels: ["Male", "Female"],
        datasets: [
          {
            backgroundColor: [colorPalette[0], colorPalette[1]],
            data: [],
          },
        ],
      },
      ethnicityChartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: colorPalette,
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    async fetchAllStudents() {
      try {
        const response = await dashboardService.getAllStudents();
        this.students = response.data;
        this.renderMathReadingScatterPlot();
        this.renderMathWritingScatterPlot();
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    },
    async fetchCounts() {
      try {
        const response = await dashboardService.getCounts();
        this.counts = response.data;
        console.log("Counts:", this.counts);
        this.genderChartData.datasets[0].data = [
          this.counts.countByGender[0].count,
          this.counts.countByGender[1].count,
        ];
        this.ethnicityChartData.labels = this.counts.countByEthnicity.map(
          (e) => e.race_ethnicity
        );
        this.ethnicityChartData.datasets[0].data =
          this.counts.countByEthnicity.map((e) => e.count);
        this.ethnicityChartData.datasets[0].backgroundColor =
          colorPalette.slice(0, this.counts.countByEthnicity.length);
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching counts:", error);
        this.isLoading = false;
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
    renderMathReadingScatterPlot() {
      // Extracting math and reading scores from each student object
      const scatterDataMale = [];
      const scatterDataFemale = [];
      // Iterate over the students array and separate the data based on gender
      this.students.forEach((student) => {
        const dataPoint = {
          x: student.math_score,
          y: student.reading_score,
        };

        if (student.gender === "male") {
          scatterDataMale.push(dataPoint);
        } else if (student.gender === "female") {
          scatterDataFemale.push(dataPoint);
        }
      });

      console.log(scatterDataMale);
      // Prepare scatter plot data
      const data = {
        datasets: [
          {
            label: "Male",
            data: scatterDataMale,
            backgroundColor: colorPalette[0],
          },
          {
            label: "Female",
            data: scatterDataFemale,
            backgroundColor: colorPalette[1],
          },
        ],
      };
      // Chart.js configuration options
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom",
              scaleLabel: {
                display: true,
                labelString: "Math Score",
              },
            },
          ],
          yAxes: [
            {
              type: "linear",
              position: "left",
              scaleLabel: {
                display: true,
                labelString: "Reading Score",
              },
            },
          ],
        },
      };

      // Create the scatter plot chart
      const ctx = document
        .getElementById("math-reading-scatter-chart")
        .getContext("2d");
      new Chart(ctx, {
        type: "scatter",
        data: data,
        options: options,
      });
    },
    renderMathWritingScatterPlot() {
      // Extracting math and reading scores from each student object
      const scatterDataMale = [];
      const scatterDataFemale = [];
      // Iterate over the students array and separate the data based on gender
      this.students.forEach((student) => {
        const dataPoint = {
          x: student.math_score,
          y: student.writing_score,
        };

        if (student.gender === "male") {
          scatterDataMale.push(dataPoint);
        } else if (student.gender === "female") {
          scatterDataFemale.push(dataPoint);
        }
      });

      // Prepare scatter plot data
      const data = {
        datasets: [
          {
            label: "Male",
            data: scatterDataMale,
            backgroundColor: colorPalette[0],
          },
          {
            label: "Female",
            data: scatterDataFemale,
            backgroundColor: colorPalette[1],
          },
        ],
      };
      // Chart.js configuration options
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom",
              scaleLabel: {
                display: true,
                labelString: "Math Score",
              },
            },
          ],
          yAxes: [
            {
              type: "linear",
              position: "left",
              scaleLabel: {
                display: true,
                labelString: "Writing Score",
              },
            },
          ],
        },
      };

      // Create the scatter plot chart
      const ctx = document
        .getElementById("math-writing-scatter-chart")
        .getContext("2d");
      new Chart(ctx, {
        type: "scatter",
        data: data,
        options: options,
      });
    },
  },
  mounted() {
    this.fetchAllStudents();
    this.fetchCounts();
    this.fetchAvgScores();
    // this.renderScatterPlot();
  },
};
</script>
