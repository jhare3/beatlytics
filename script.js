// DOM Elements
const keywordInput = document.getElementById('keyword-input');
const searchButton = document.getElementById('search-button');
const resultsList = document.getElementById('results');
const seoContent = document.getElementById('seo-content');
const keywordList = document.getElementById('keyword-list');
const keywordChartCanvas = document.getElementById('keywordChart').getContext('2d');

// Initialize Chart
let keywordChart;

// Event Listeners
searchButton.addEventListener('click', () => {
  const query = keywordInput.value.trim();
  if (query) {
    const mockResults = generateMockResults(query); // Generate results based on the query
    displayResults(mockResults);
    displaySEOTips(query);
    updateChart(query);
  } else {
    alert('Please enter a keyword!');
  }
});

// Generate Mock Results
function generateMockResults(query) {
  const types = ["Type Beat", "Chill Beat", "Sad Beat", "Freestyle Beat", "Lo-fi Beat"];
  return types.map(type => {
    const keyword = `${query} ${type} 2025`;
    const score = Math.floor(Math.random() * 100) + 1; // Random score between 1 and 100
    return { keyword, score };
  });
}

// Display Results
function displayResults(results) {
  resultsList.innerHTML = results
    .map(item => {
      const color = getScoreColor(item.score);
      return `
        <li class="d-flex justify-content-between align-items-center">
          <span>${item.keyword}</span>
          <span class="badge bg-${color}">${item.score}</span>
        </li>
      `;
    })
    .join('');
}

// Display SEO Tips
function displaySEOTips(query) {
  seoContent.innerHTML = `
    <h3>SEO Tips for Your Video</h3>
    <p><strong>Title:</strong> Include the keyword in your video title.</p>
    <p><strong>Description:</strong> Use the keyword naturally in the first two lines of your description.</p>
    <p><strong>Tags:</strong> Add relevant tags like '${query}', 'Type Beat', and '2025'.</p>
  `;
}

// Determine color of score
function getScoreColor(score) {
  if (score >= 71) return "green";
  if (score >= 31) return "yellow";
  return "red";
}

// Display Recommended Keywords
function displayRecommendedKeywords() {
  const mockResults = generateMockResults("Default"); // Default keyword for initial load
  keywordList.innerHTML = mockResults
    .map(item => {
      const color = getScoreColor(item.score);
      return `
        <li class="d-flex justify-content-between align-items-center">
          <span>${item.keyword}</span>
          <span class="badge bg-${color}">${item.score}</span>
        </li>
      `;
    })
    .join('');
}

// Update Chart
function updateChart(query) {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const data = {
    labels: labels,
    datasets: [{
      label: `Search Volume for "${query}"`,
      data: [65, 59, 80, 81, 56, 55, 40], // Mock data
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const config = {
    type: 'line', // Use 'line', 'bar', or 'pie'
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Search Volume'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Month'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.raw || 0;
              return `${label}: ${value}`;
            }
          }
        }
      }
    }
  };

  // Destroy existing chart if it exists
  if (keywordChart) {
    keywordChart.destroy();
  }

  // Create new chart
  keywordChart = new Chart(keywordChartCanvas, config);
}

// Call the Function to Display Keywords on Page Load
displayRecommendedKeywords();