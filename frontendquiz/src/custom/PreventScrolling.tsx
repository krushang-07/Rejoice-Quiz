import { useEffect } from "react";

// Custom Hook to prevent scrolling and set minHeight
const PreventScrolling = () => {
  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = "hidden";
    document.body.style.minHeight = "100vh"; // Ensure the body takes the full height

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.minHeight = "";
    };
  }, []); // Empty dependency array ensures it runs once when the component mounts
};

export default PreventScrolling;
