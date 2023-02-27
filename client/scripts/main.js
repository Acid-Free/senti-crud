const jobPostingsList = document.querySelector(".job-postings-list");
const descriptionDivs = [
  ...jobPostingsList.querySelectorAll(".description-div"),
];
const descriptionDatas = [
  ...jobPostingsList.querySelectorAll(".description-data"),
];

// Assigns the dom elements in description to assigned div
/* eslint-disable no-param-reassign */
descriptionDivs.forEach((descriptionDiv, index) => {
  descriptionDiv.innerHTML = descriptionDatas[index].value;
});
