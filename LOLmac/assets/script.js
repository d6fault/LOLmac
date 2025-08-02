document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-tag")
  const searchBox = document.getElementById("searchBox")
  const tableRows = document.querySelectorAll(".binary-row")

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")
      filterRows(filterValue, searchBox.value)
    })
  })

  // Search functionality
  searchBox.addEventListener("input", function () {
    const activeFilter = document.querySelector(".filter-tag.active").getAttribute("data-filter")
    filterRows(activeFilter, this.value)
  })

  function filterRows(filterValue, searchValue) {
    tableRows.forEach((row) => {
      const tags = row.getAttribute("data-tags").toLowerCase()
      const binaryName = row.querySelector(".binary-name").textContent.toLowerCase()

      // Check filter match
      const filterMatch = filterValue === "all" || tags.includes(filterValue)

      // Check search match
      const searchMatch =
        searchValue === "" || binaryName.includes(searchValue.toLowerCase()) || tags.includes(searchValue.toLowerCase())

      // Show/hide row based on both filter and search
      if (filterMatch && searchMatch) {
        row.style.display = ""
      } else {
        row.style.display = "none"
      }
    })
  }
})
