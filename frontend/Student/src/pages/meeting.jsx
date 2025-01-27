import axios from "axios";
import React, { useEffect, useState } from "react";

const Meeting = () => {
  const [tasks, setTasks] = useState(["", "", ""]);
  const [formData, setFormData] = useState({
    supervisor: "",
    date: "",
    time: "",
    agenda: "",
    place: "",
  });
  const [bookedMeetings, setBookedMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch approved meetings for the student
  useEffect(() => {
    const fetchApprovedMeetings = async () => {
      try {
        console.log("Fetching approved meetings...");
        const response = await axios.get("http://localhost:3000/api/meetings/students/student123/schedules");
        console.log("Approved Meetings Response:", response.data);

        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setBookedMeetings(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setError("Failed to fetch approved meetings. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching approved meetings:", error);
        setError("Failed to fetch approved meetings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedMeetings();
  }, []);

  const handleInputChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = value;
    setTasks(updatedTasks);
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const meetingData = {
      studentName: "John Doe",
      studentId: "student123",
      instructorId: formData.supervisor,
      dateTime: new Date(`${formData.date}T${formData.time}`).toISOString(),
      agenda: formData.agenda,
      place: formData.place,
    };

    try {
      console.log("Sending meeting request...");
      const response = await axios.post("http://localhost:3000/api/meetings/createmeeting", meetingData);
      console.log("Meeting request sent:", response.data);
      alert("Meeting request sent successfully!");
      setFormData({ supervisor: "", date: "", time: "", agenda: "", place: "" });
    } catch (error) {
      console.error("Error sending meeting request:", error);
      alert("Failed to send meeting request.");
    }
  };

  console.log("Rendering Meeting component...");

  return (
    <div className="p-8 font-sans">
      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="flex gap-12">
        {/* Meeting Form */}
        <div className="w-1/2">
          <h1 className="font-semibold mb-6 text-lg">Book a date for a meeting</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center space-x-4">
              <label className="w-28 font-medium">Advisor ID:</label>
              <input
                type="text"
                id="supervisor"
                value={formData.supervisor}
                onChange={handleFormChange}
                className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Date and Time inputs */}
            <div className="flex items-center space-x-4">
              <label className="w-28 font-medium">Date:</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleFormChange}
                className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-28 font-medium">Time:</label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={handleFormChange}
                className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Agenda and Place inputs */}
            <div className="flex items-center space-x-4">
              <label className="w-28 font-medium">Agenda:</label>
              <input
                type="text"
                id="agenda"
                value={formData.agenda}
                onChange={handleFormChange}
                className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-28 font-medium">Place:</label>
              <input
                type="text"
                id="place"
                value={formData.place}
                onChange={handleFormChange}
                className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              {loading ? 'Submitting...' : 'Request Meeting'}
            </button>
          </form>
        </div>

        {/* Booked Meetings Table */}
        <div className="w-1/2">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'scheduled' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200'
              }`}
            >
              Scheduled Meetings
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'requests' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200'
              }`}
            >
              Pending Requests
            </button>
          </div>

      {/* Booked Meetings */}
      <div className="mt-12">
        <h1 className="font-semibold mb-4 text-lg">Booked Meetings</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : bookedMeetings.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Advisor Name</th>
                <th className="py-2">Date</th>
                <th className="py-2">Time</th>
                <th className="py-2">Place</th>
              </tr>
            </thead>
            <tbody>
              {bookedMeetings.map((meeting, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{meeting.instructorId}</td>
                  <td className="py-2">{new Date(meeting.dateTime).toLocaleDateString()}</td>
                  <td className="py-2">{new Date(meeting.dateTime).toLocaleTimeString()}</td>
                  <td className="py-2">{meeting.place}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No booked meetings found.</p>
        )}
      </div>
    </div>
  );
};

export default Meeting;