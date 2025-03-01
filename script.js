// DOM Elements
const keywordInput = document.getElementById('keyword-input');
const searchButton = document.getElementById('search-button');
const resultsList = document.getElementById('results');
const seoContent = document.getElementById('seo-content');

// Mock Data
const mockResults = [
    { keyword: "Drake Type Beat 2025", score: 85 },
    { keyword: "Trap Type Beat 2025", score: 65 },
    { keyword: "Sad Type Beat 2025", score: 45 },
    { keyword: "R&B Type Beat 2025", score: 90 },
    { keyword: "Chill Type Beat 2025", score: 75 },
    { keyword: "Hard Type Beat 2025", score: 30 },
    { keyword: "Freestyle Type Beat 2025", score: 50 },
    { keyword: "Pop Type Beat 2025", score: 80 },
    { keyword: "Lo-fi Type Beat 2025", score: 95 },
    { keyword: "Dark Type Beat 2025", score: 25 }
];

const mockSEOTips = {
  title: "Include the keyword in your video title.",
  description: "Use the keyword naturally in the first two lines of your description.",
  tags: "Add relevant tags like 'Type Beat', 'Drake', and '2023'."
};

// Event Listeners
searchButton.addEventListener('click', () => {
  const query = keywordInput.value.trim();
  if (query) {
    displayResults(query);
    displaySEOTips();
  } else {
    alert("Please enter a keyword!");
  }
});

// Display Mock Results
function displayResults(query) {
  resultsList.innerHTML = mockResults
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
function displaySEOTips() {
  seoContent.innerHTML = `
    <h3>SEO Tips for Your Video</h3>
    <p><strong>Title:</strong> ${mockSEOTips.title}</p>
    <p><strong>Description:</strong> ${mockSEOTips.description}</p>
    <p><strong>Tags:</strong> ${mockSEOTips.tags}</p>
  `;
}

// Mock Data for Recommended Keywords
const recommendedKeywords = [
    { keyword: "Drake Type Beat 2025", score: 85 },
    { keyword: "Trap Type Beat 2025", score: 65 },
    { keyword: "Sad Type Beat 2025", score: 45 },
    { keyword: "R&B Type Beat 2025", score: 90 },
  ];

  //determine color of score
  function getScoreColor(score) {
    if (score >= 71) return "green";
    if (score >= 31) return "yellow";
    return "red";
  }
  
  // DOM Element for Keyword List
  const keywordList = document.getElementById('keyword-list');
  
  // Function to Display Recommended Keywords
  function displayRecommendedKeywords() {
    keywordList.innerHTML = recommendedKeywords
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
  
  // Call the Function to Display Keywords on Page Load
  displayRecommendedKeywords();