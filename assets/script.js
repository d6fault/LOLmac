document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-tag")
  const searchBox = document.getElementById("searchBox")
  const searchClear = document.getElementById("searchClear")
  const tableRows = document.querySelectorAll(".binary-row")
  const tableBody = document.getElementById("tableBody")
  const noResults = document.getElementById("noResults")
  const visibleCount = document.getElementById("visibleCount")
  const activeFilters = document.getElementById("activeFilters")

  let currentFilter = "all"
  let currentSearch = ""

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      currentFilter = this.getAttribute("data-filter")
      updateResults()
    })
  })

  // Search functionality
  searchBox.addEventListener("input", function () {
    currentSearch = this.value
    updateSearchClearButton()
    updateResults()
  })

  // Clear search functionality
  searchClear.addEventListener("click", () => {
    searchBox.value = ""
    currentSearch = ""
    updateSearchClearButton()
    updateResults()
    searchBox.focus()
  })

  // Update search clear button visibility
  function updateSearchClearButton() {
    if (currentSearch.length > 0) {
      searchClear.classList.add("visible")
    } else {
      searchClear.classList.remove("visible")
    }
  }

  // Enhanced search function
  function matchesSearch(row, searchValue) {
    if (!searchValue) return true

    const binaryName = row.getAttribute("data-binary")
    const tags = row.getAttribute("data-tags").toLowerCase()
    const searchLower = searchValue.toLowerCase()

    // Handle advanced search syntax
    if (searchValue.includes("+")) {
      const parts = searchValue.split("+").map((part) => part.trim().toLowerCase())
      const binaryPart = parts[0]
      const functionPart = parts[1]

      const binaryMatch = !binaryPart || binaryName.includes(binaryPart)
      const functionMatch = !functionPart || tags.includes(functionPart)

      return binaryMatch && functionMatch
    }

    // Simple search - check both binary name and tags
    return binaryName.includes(searchLower) || tags.includes(searchLower)
  }

  // Update results based on current filter and search
  function updateResults() {
    let visibleRows = 0
    let hasResults = false

    tableRows.forEach((row) => {
      const tags = row.getAttribute("data-tags").toLowerCase()

      // Check filter match
      const filterMatch = currentFilter === "all" || tags.includes(currentFilter)

      // Check search match
      const searchMatch = matchesSearch(row, currentSearch)

      // Show/hide row based on both filter and search
      if (filterMatch && searchMatch) {
        row.style.display = ""
        visibleRows++
        hasResults = true
        highlightSearchTerms(row, currentSearch)
      } else {
        row.style.display = "none"
      }
    })

    // Update results info
    visibleCount.textContent = visibleRows

    // Update active filters display
    if (currentFilter !== "all") {
      activeFilters.textContent = `Filtered by: ${currentFilter.replace("-", " ")}`
    } else {
      activeFilters.textContent = ""
    }

    // Show/hide no results message
    if (hasResults) {
      tableBody.style.display = ""
      noResults.style.display = "none"
    } else {
      tableBody.style.display = "none"
      noResults.style.display = "block"
    }
  }

  // Highlight search terms in results
  function highlightSearchTerms(row, searchValue) {
    if (!searchValue) return

    const binaryNameElement = row.querySelector(".binary-name")
    const functionTags = row.querySelectorAll(".function-tag")

    // Remove existing highlights
    removeHighlights(row)

    const searchLower = searchValue.toLowerCase()

    // Handle advanced search syntax
    if (searchValue.includes("+")) {
      const parts = searchValue.split("+").map((part) => part.trim())
      const binaryPart = parts[0]
      const functionPart = parts[1]

      if (binaryPart && binaryNameElement.textContent.toLowerCase().includes(binaryPart.toLowerCase())) {
        highlightText(binaryNameElement, binaryPart)
      }

      if (functionPart) {
        functionTags.forEach((tag) => {
          if (tag.getAttribute("data-tag").toLowerCase().includes(functionPart.toLowerCase())) {
            tag.style.backgroundColor = "var(--accent-white)"
            tag.style.color = "var(--bg-black)"
          }
        })
      }
    } else {
      // Simple search highlighting
      if (binaryNameElement.textContent.toLowerCase().includes(searchLower)) {
        highlightText(binaryNameElement, searchValue)
      }

      functionTags.forEach((tag) => {
        if (tag.getAttribute("data-tag").toLowerCase().includes(searchLower)) {
          tag.style.backgroundColor = "var(--accent-white)"
          tag.style.color = "var(--bg-black)"
        }
      })
    }
  }

  // Helper function to highlight text
  function highlightText(element, searchTerm) {
    const text = element.textContent
    const regex = new RegExp(`(${searchTerm})`, "gi")
    const highlightedText = text.replace(regex, '<span class="highlight">$1</span>')
    element.innerHTML = highlightedText
  }

  // Helper function to remove highlights
  function removeHighlights(row) {
    const binaryNameElement = row.querySelector(".binary-name")
    const functionTags = row.querySelectorAll(".function-tag")

    // Reset binary name
    binaryNameElement.innerHTML = binaryNameElement.textContent

    // Reset function tags
    functionTags.forEach((tag) => {
      tag.style.backgroundColor = ""
      tag.style.color = ""
    })
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Focus search box with Ctrl+F or Cmd+F
    if ((e.ctrlKey || e.metaKey) && e.key === "f") {
      e.preventDefault()
      searchBox.focus()
    }

    // Clear search with Escape
    if (e.key === "Escape" && document.activeElement === searchBox) {
      searchBox.value = ""
      currentSearch = ""
      updateSearchClearButton()
      updateResults()
    }
  })

  // Initialize
  updateResults()
})
