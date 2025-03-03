// DOM Elements
const keywordInput = document.getElementById('keyword-input');
const searchButton = document.getElementById('search-button');
const resultsList = document.getElementById('results');
const seoContent = document.getElementById('seo-content');
const keywordList = document.getElementById('keyword-list');
const keywordChartCanvas = document.getElementById('keywordChart').getContext('2d');

// Initialize Chart
let keywordChart;

// Mock Data for Search Results
function generateMockResults(query) {
  const types = ["Type Beat", "Type Beat 2025", "Type Beat Free", "Freestyle Type Beat"];
  return types.map(type => {
    const keyword = `${query} ${type}`;
    const score = Math.floor(Math.random() * 100) + 1; // Random score between 1 and 100
    return { keyword, score };
  });
}

// Mock Data for Top Keywords
const topKeywords = [
  { keyword: "Mac Miller Type Beat", score: 95 },
  { keyword: "Earl Sweatshirt Type Beat", score: 70 },
  { keyword: "Faces Type Beat", score: 45 },
  { keyword: "Chill Type Beat", score: 20 },
];

// Event Listeners
searchButton.addEventListener('click', () => {
  const query = keywordInput.value.trim();
  if (query) {
    const mockResults = generateMockResults(query); // Generate results based on the query
    displayResults(mockResults);
    displaySEOTips(query);

    // Compare search volume for 3 keywords
    const keywordsToCompare = [query, "Drake", "Kendrick Lamar"]; // Example keywords
    updateChart(keywordsToCompare);
  } else {
    alert('Please enter a keyword!');
  }
});

// Display Search Results
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
    <p><strong>Title:</strong> [Free] ${query} Type Beat 2025</p>
    <p><strong>Description:</strong> Use the keyword in the first two lines of your description.</p>
    <p><strong>Tags:</strong> Add only relevant tags like '${query}', 'Type Beat', and '2025'.</p>
  `;
}

// Determine color of score
function getScoreColor(score) {
  if (score >= 75) return "green";
  if (score >= 50) return "yellow";
  if (score >= 25) return "orange";
  return "red";
}

// Display Top Keywords
function displayTopKeywords() {
  keywordList.innerHTML = topKeywords
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

// Update Chart to Compare Multiple Keywords
function updateChart(keywords) {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const colors = ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(153, 102, 255, 0.2)'];
  const borderColors = ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(153, 102, 255, 1)'];

  const datasets = keywords.map((keyword, index) => ({
    label: `Search Volume for "${keyword}" Type Beat`,
    data: labels.map(() => Math.floor(Math.random() * 100) + 1), // Mock data
    backgroundColor: colors[index],
    borderColor: borderColors[index],
    borderWidth: 1
  }));

  const data = {
    labels: labels,
    datasets: datasets
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

// Call the Function to Display Top Keywords on Page Load
displayTopKeywords();