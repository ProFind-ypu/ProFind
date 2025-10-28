document.addEventListener("DOMContentLoaded", function () {
   var dropdownButton = document.getElementById("dropdownButton");
   var dropdownMenu = document.getElementById("dropdownMenu");

   // Toggle dropdown when button is clicked
   dropdownButton.addEventListener("click", function () {
      dropdownMenu.classList.toggle("hidden");

      // Add simple animation when showing
      if (!dropdownMenu.classList.contains("hidden")) {
         dropdownMenu.style.opacity = "0";
         dropdownMenu.style.transform = "scaleY(0.95)";
         setTimeout(() => {
            dropdownMenu.style.opacity = "1";
            dropdownMenu.style.transform = "scaleY(1)";
         }, 10);
      }
   });

   // Close dropdown when clicking outside
   document.addEventListener("click", function (event) {
      if (
         !dropdownButton.contains(event.target) &&
         !dropdownMenu.contains(event.target)
      ) {
         dropdownMenu.classList.add("hidden");
      }
   });

   // Handle keyboard navigation
   dropdownButton.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
         e.preventDefault();
         dropdownButton.click();
      }
   });
});
