import React, { useState, useEffect } from "react";

const MilestoneProgress = () => {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    // Fetch milestones from backend to display
    const fetchMilestones = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/milestones");
        const data = await response.json();

        if (response.ok) {
          // Sort milestones to display the most recent one on top
          setMilestones(data.milestones.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)));
        } else {
          console.error("Error fetching milestones:", data.message);
        }
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    fetchMilestones();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Milestone Progress</h2>
      {milestones.length === 0 ? (
        <div>No milestones available.</div>
      ) : (
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <div
              key={milestone._id}
              className="p-4 border rounded-md border-gray-300 shadow-md"
            >
              {/* Display Title and Description in the desired format */}
              <div className="text-gray-700 mt-2">
                <strong>Title:</strong> {milestone.title}
              </div>
              <div className="text-gray-700 mt-2">
                <strong>Description:</strong> {milestone.description}
              </div>

              {/* Display Due Date */}
              <p className="text-gray-500 mt-2">
                <strong>Due Date:</strong> {new Date(milestone.dueDate).toLocaleDateString()}
              </p>

              {/* Display Status */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MilestoneProgress;
