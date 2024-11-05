// Utility function to show a custom alert
export function showCustomAlert(message, type = "info") {
  // Create the alert container
  const alertContainer = document.createElement("div");
  alertContainer.classList.add(
    "fixed",
    "inset-0",
    "flex",
    "items-center",
    "justify-center",
    "bg-black",
    "bg-opacity-50",
    "z-50"
  );

  // Alert box styling based on type
  const alertBox = document.createElement("div");
  alertBox.classList.add(
    "bg-white",
    "rounded-lg",
    "shadow-lg",
    "p-6",
    "text-center",
    "max-w-xs",
    "mx-auto",
    "animate-fadeIn"
  );
  if (type === "success") alertBox.classList.add("border-green-500");
  else if (type === "error") alertBox.classList.add("border-red-500");
  else alertBox.classList.add("border-gray-500");

  // Alert message
  const alertMessage = document.createElement("p");
  alertMessage.innerText = message;
  alertMessage.classList.add("text-lg", "mb-4");

  // Dismiss button
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
    "duration-200"
  );

  dismissButton.onclick = () => document.body.removeChild(alertContainer);

  alertBox.appendChild(alertMessage);
  alertBox.appendChild(dismissButton);
  alertContainer.appendChild(alertBox);
  document.body.appendChild(alertContainer);
}
