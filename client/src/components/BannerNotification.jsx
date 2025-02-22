import React, { useState, useEffect } from "react";

const BannerNotification = () => {
  const maxDismissCount = 3;
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Get the number of times the banner has been dismissed from localStorage.
    const dismissCount = Number(localStorage.getItem("bannerDismissCount")) || 0;
    if (dismissCount < maxDismissCount) {
      setShowBanner(true);
    }
  }, []);

  const handleClose = () => {
    // Update the dismiss count in localStorage.
    const dismissCount = Number(localStorage.getItem("bannerDismissCount")) || 0;
    localStorage.setItem("bannerDismissCount", dismissCount + 1);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="bg-yellow-200 p-4 flex justify-between items-center">
      <span>
        This app uses a free hosting service which can be slow specially on first load while fetching data from the database.
      </span>
      <button onClick={handleClose} className="font-bold text-xl">
        X
      </button>
    </div>
  );
};

export default BannerNotification;
