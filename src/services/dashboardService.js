import API from "./apiService";

const dashboardService = {
  // Fetch Counts
  getCounts: async () => {
    return API.get("/counts");
  },

  // Fetch all students
  getAllStudents: async () => {
    return API.get("/all");
  },

  // Fetch avg score
  getAvgScores: async () => {
    return API.get("/avg");
  },

  // Fetch performance
  getPerformances: async () => {
    return API.get("/performance");
  },

  // Fetch performance by gender
  getPerformanceByGender: async () => {
    return API.get("/performance/gender");
  },

  // Fetch performance by ethnicity
  getPerformanceByEthnicity: async () => {
    return API.get("/performance/ethnicity");
  },

  // Fetch performance by parental education
  getPerformanceByParents: async () => {
    return API.get("/performance/parents");
  },
};

export default dashboardService;
