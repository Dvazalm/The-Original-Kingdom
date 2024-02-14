export function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === "block") {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  }
  

  export function toggleVisibilityRegisterAndLogin(elementId) {
    const element = document.getElementById(elementId);
    const otherElementId = elementId === "registerForm" ? "loginForm" : "registerForm";
    const otherElement = document.getElementById(otherElementId);

    if (element.style.display === "block") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
        otherElement.style.display = "none"; // Oculta el otro elemento si está visible
    }
}

