import React, { useState } from "react";

const AddMilestone = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    stage: "Not Started", // Default stage
    studentId: "6794898505a1de3211cb0ce2", // Replace with actual student ID when applicable
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/milestones/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate,
          studentId: formData.studentId,
          stage: formData.stage,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Milestone added successfully!");
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          stage: "Not Started",
          studentId: "6794898505a1de3211cb0ce2",
        });
      } else {
        console.error("Error adding milestone:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting milestone:", error);
      alert("An error occurred while submitting the milestone.");
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Add Milestone</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Milestone Title"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <div className="space-y-2">
          <div className="font-bold">Milestone Stage</div>
          <div>
            <input
              type="radio"
              id="notStarted"
              name="stage"
              value="Not Started"
              checked={formData.stage === "Not Started"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="notStarted">Not Started</label>
          </div>
          <div>
            <input
              type="radio"
              id="inProgress"
              name="stage"
              value="In Progress"
              checked={formData.stage === "In Progress"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="inProgress">In Progress</label>
          </div>
          <div>
            <input
              type="radio"
              id="completed"
              name="stage"
              value="Completed"
              checked={formData.stage === "Completed"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="completed">Completed</label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Milestone
        </button>
      </form>
    </div>
  );
};

export default AddMilestone;
