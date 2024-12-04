// Utility function to show a custom alert
export function showCustomAlert(message, type = "info", confirmMode = false) {
  return new Promise((resolve) => {
    const alertOverlay = document.createElement("div");
    alertOverlay.classList.add(
      "fixed",
      "inset-0",
      "flex",
      "items-center",
      "justify-center",
      "bg-black",
      "bg-opacity-50",
      "z-50"
    );

    const alertBox = document.createElement("div");
    alertBox.classList.add(
      "bg-white",
      "rounded-lg",
      "shadow-lg",
      "p-6",
      "text-center",
      "max-w-xs",
      "mx-4"
    );

    const messageText = document.createElement("p");
    messageText.innerText = message;
    messageText.classList.add("text-lg", "mb-4", "text-gray-800");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flex", "justify-center", "gap-4");

    // Conditional buttons for confirmation mode
    if (confirmMode) {
      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.classList.add(
        "bg-green-500",
        "text-white",
        "px-4",
        "py-2",
        "rounded",
        "font-semibold",
        "hover:bg-green-600",
        "transition-colors",
        "duration-200"
      );
      deleteButton.onclick = () => {
        document.body.removeChild(alertOverlay);
        resolve(true); // Confirmed action
      };

      // Cancel button
      const cancelButton = document.createElement("button");
      cancelButton.innerText = "Cancel";
      cancelButton.classList.add(
        "bg-gray-500",
        "text-white",
        "px-4",
        "py-2",
        "rounded",
        "font-semibold",
        "hover:bg-gray-600",
        "transition-colors",
        "duration-200"
      );
      cancelButton.onclick = () => {
        document.body.removeChild(alertOverlay);
        resolve(false); // Canceled action
      };

      buttonContainer.append(deleteButton, cancelButton);
    } else {
      // OK button for regular alerts
      const okButton = document.createElement("button");
      okButton.innerText = "OK";
      okButton.classList.add(
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
      okButton.onclick = () => {
        document.body.removeChild(alertOverlay);
        resolve(); // Alert dismissed
      };

      buttonContainer.appendChild(okButton);
    }

    alertBox.append(messageText, buttonContainer);
    alertOverlay.appendChild(alertBox);
    document.body.appendChild(alertOverlay);
  });
}
