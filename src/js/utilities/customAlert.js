// Utility function to show a custom alert
export function showCustomAlert(message, type = "info") {
  const alertOverlay = document.createElement("div");
  alertOverlay.classList.add(
    "fixed",
    "inset-0",
    "flex",
    "items-center",
    "justify-center",
    "bg-black",
    "bg-opacity-50",
    "z-50",
    "animate-fadeIn"
  );

  const alertBox = document.createElement("div");
  alertBox.classList.add(
    "bg-white",
    "rounded-lg",
    "shadow-lg",
    "p-6",
    "text-center",
    "max-w-xs",
    "mx-4",
    "relative",
    "transition-transform",
    "duration-300",
    "ease-out",
    "transform",
    "scale-100"
  );

  if (type === "success") {
    alertBox.classList.add("border-l-4", "border-green-500", "text-green-600");
  } else if (type === "error") {
    alertBox.classList.add("border-l-4", "border-red-500", "text-red-600");
  } else {
    alertBox.classList.add("border-l-4", "border-gray-500", "text-gray-600");
  }

  const alertMessage = document.createElement("p");
  alertMessage.innerText = message;
  alertMessage.classList.add("text-lg", "mb-4", "text-gray-800");

  const dismissButton = document.createElement("button");
  dismissButton.innerText = "OK";
  dismissButton.classList.add(
    "bg-blue-500",
    "text-white",
    "px-4",
    "py-2",
    "rounded",
    "font-semibold",
    "hover:bg-blue-600",
    "transition-colors",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-blue-300",
    "focus:ring-offset-2",
    "focus:ring-offset-gray-800"
  );

  // Close alert on click with fade-out animation
  dismissButton.onclick = () => {
    alertOverlay.classList.replace("animate-fadeIn", "animate-fadeOut");
    setTimeout(() => document.body.removeChild(alertOverlay), 300);
  };

  alertBox.append(alertMessage, dismissButton);
  alertOverlay.appendChild(alertBox);
  document.body.appendChild(alertOverlay);
  dismissButton.focus();
}
