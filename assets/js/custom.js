tailwind.config = {
  darkMode: 'class',
};

const extensionsData = [
  { "logo": "./assets/images/logo-devlens.svg", "name": "DevLens", "description": "Quickly inspect page layouts and visualize element boundaries.", "isActive": true },
  { "logo": "./assets/images/logo-style-spy.svg", "name": "StyleSpy", "description": "Instantly analyze and copy CSS from any webpage element.", "isActive": true },
  { "logo": "./assets/images/logo-speed-boost.svg", "name": "SpeedBoost", "description": "Optimizes browser resource usage to accelerate page loading.", "isActive": false },
  { "logo": "./assets/images/logo-json-wizard.svg", "name": "JSONWizard", "description": "Formats, validates, and prettifies JSON responses in-browser.", "isActive": true },
  { "logo": "./assets/images/logo-tab-master-pro.svg", "name": "TabMaster Pro", "description": "Organizes browser tabs into groups and sessions.", "isActive": true },
  { "logo": "./assets/images/logo-viewport-buddy.svg", "name": "ViewportBuddy", "description": "Simulates various screen resolutions directly within the browser.", "isActive": false },
  { "logo": "./assets/images/logo-markup-notes.svg", "name": "Markup Notes", "description": "Enables annotation and notes directly onto webpages for collaborative debugging.", "isActive": true }
];

function renderExtensions() {
  const container = document.getElementById("extensionsContainer");
  container.innerHTML = "";
  
  extensionsData.forEach(extension => {
      const card = document.createElement("div");
      card.className = `extension-card p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col justify-between h-40 border border-gray-300 dark:border-gray-700`;
      card.setAttribute("data-status", extension.isActive ? "active" : "inactive");
      
      card.innerHTML = `
          <div class="flex items-center gap-2">
              <img src="${extension.logo}" alt="${extension.name}" class="w-12 h-12">
              <div>
                  <h2 class="font-semibold">${extension.name}</h2>
                  <p class="text-sm">${extension.description}</p>
              </div>
          </div>
          <div class="flex justify-between items-center mt-4">
              <button onclick="removeExtension('${extension.name}')" class="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded">Remove</button>
              <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" ${extension.isActive ? "checked" : ""} class="sr-only peer" onchange="toggleStatus(this, '${extension.name}')">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
          </div>
      `;
      container.appendChild(card);
  });
}

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  const themeIcon = document.getElementById('themeIcon');
  themeIcon.src = document.documentElement.classList.contains('dark') ? './assets/images/icon-moon.svg' : './assets/images/icon-sun.svg';
}

function filterExtensions(status, btn) {
  document.querySelectorAll('.extension-card').forEach(card => {
      if (status === 'all' || card.getAttribute('data-status') === status) {
          card.style.display = 'flex';
      } else {
          card.style.display = 'none';
      }
  });
  document.querySelectorAll(".flex button").forEach(button => button.classList.remove("active-btn"));
  btn.classList.add("active-btn");
}

function toggleStatus(checkbox, name) {
  const extension = extensionsData.find(ext => ext.name === name);
  extension.isActive = checkbox.checked;
  renderExtensions();
}

function removeExtension(name) {
  const index = extensionsData.findIndex(ext => ext.name === name);
  if (index !== -1) {
      extensionsData.splice(index, 1);
      renderExtensions();
  }
}

document.getElementById("allBtn").classList.add("active-btn");
renderExtensions();