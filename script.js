// First load all the HTML components
Promise.all([
    fetch('sidepanel.html').then(response => response.text()),
    fetch('header.html').then(response => response.text()),
    fetch('mobilemenu.html').then(response => response.text()),
    fetch('drawer.html').then(response => response.text())
]).then(([sidepanelHtml, headerHtml, mobilemenuHtml, drawerHtml]) => {
    // Insert all the HTML
    document.getElementById('sidepanel-container').innerHTML = sidepanelHtml;
    document.getElementById('header-container').innerHTML = headerHtml;
    document.getElementById('mobile-menu-container').innerHTML = mobilemenuHtml;
    document.getElementById('drawer-container').innerHTML = drawerHtml;

    // Now that all HTML is loaded, set up the drawer functionality
    setupDrawer();
}).catch(error => {
    console.error('Error loading components:', error);
});

function setupDrawer() {
    console.log("Setting up drawer...");
    
    const desktopMenuLogo = document.getElementById('desktopMenuLogo');
    const mobileMenuTrigger = document.getElementById('mobileMenuTrigger');
    const drawer = document.getElementById('drawer');
    const closeDrawer = document.getElementById('closeDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');

    console.log("Elements found:", {
        desktopMenuLogo,
        mobileMenuTrigger,
        drawer,
        closeDrawer,
        drawerOverlay
    });

    if (!drawer) {
        console.error("Drawer element not found!");
        return;
    }

    function openDrawer() {
        console.log("Opening drawer");
        drawer.classList.remove('translate-x-full');
        if (drawerOverlay) drawerOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawerFunc() {
        console.log("Closing drawer");
        drawer.classList.add('translate-x-full');
        if (drawerOverlay) drawerOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    if (desktopMenuLogo) {
        desktopMenuLogo.addEventListener('click', openDrawer);
        console.log("Added listener to desktop menu logo");
    } else {
        console.log("Desktop menu logo not found");
    }

    if (mobileMenuTrigger) {
        mobileMenuTrigger.addEventListener('click', openDrawer);
        console.log("Added listener to mobile menu trigger");
    } else {
        console.log("Mobile menu trigger not found");
    }

    if (closeDrawer) {
        closeDrawer.addEventListener('click', closeDrawerFunc);
        console.log("Added listener to close drawer button");
    } else {
        console.log("Close drawer button not found");
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawerFunc);
        console.log("Added listener to drawer overlay");
    } else {
        console.log("Drawer overlay not found");
    }
}

const ctx = document.getElementById('myChart');

  const data = {
    labels: [
      'Pending',
      'Paid'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [70, 30],
      backgroundColor: [
        '#FEB528',
        '#59B6FC'
      ],
      hoverOffset: 2
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
  };


new Chart(ctx, config);

// Also set up the drawer when DOM is loaded in case the fetch takes too long
document.addEventListener('DOMContentLoaded', function() {
    // If the drawer HTML hasn't loaded yet, this will do nothing
    setupDrawer();
});