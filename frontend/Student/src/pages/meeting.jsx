import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Meeting = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    advisorId: "",
    date: "",
    time: "",
    agenda: "",
    place: ""
  });
  const [bookedMeetings, setBookedMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        let endpoint = '';
        if (activeTab === 'scheduled') {
          endpoint = `/api/students/${user.id}/schedules`;
        } else {
          endpoint = `/api/students/${user.id}/requests`;
        }

        const res = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!res.ok) throw new Error('Failed to fetch meetings');
        
        const data = await res.json();
        setBookedMeetings(data.schedules || data.requests || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMeetings();
  }, [user.id, activeTab]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await fetch(`/api/students/${user.id}/schedules`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setBookedMeetings(data.schedules || []);
      } catch (err) {
        setError("Failed to load meetings");
      }
    };
    fetchMeetings();
  }, [user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`).toISOString();

      const res = await fetch('/api/createmeeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          advisorId: formData.advisorId,
          dateTime,
          agenda: formData.agenda,
          place: formData.place
        })
      });

      if (!res.ok) throw new Error('Meeting request failed');
      
      // Refresh meetings list
      const newRes = await fetch(`/api/students/${user.id}/schedules`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const newData = await newRes.json();
      setBookedMeetings(newData.schedules);
      
      setFormData({ advisorId: "", date: "", time: "", agenda: "", place: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 font-sans">
      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="flex gap-12">
        {/* Meeting Form */}
        <div className="w-1/2">
          <h1 className="font-semibold mb-6 text-lg">Book a Meeting</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="w-28 font-medium">Advisor ID:</label>
              <input
                type="text"
                required
                value={formData.advisorId}
                onChange={(e) => setFormData({...formData, advisorId: e.target.value})}
                className="border rounded px-2 py-1 w-full"
                placeholder="Enter advisor ID"
              />
            </div>

            {/* Date and Time inputs */}
            <div className="flex items-center space-x-4">
              <label className="w-28 font-medium">Date:</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="border rounded px-2 py-1 w-full"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-28 font-medium">Time:</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="border rounded px-2 py-1 w-full"
              />
            </div>

            {/* Agenda and Place inputs */}
            <div className="flex items-center space-x-4">
              <label className="w-28 font-medium">Agenda:</label>
              <input
                type="text"
                value={formData.agenda}
                onChange={(e) => setFormData({...formData, agenda: e.target.value})}
                className="border rounded px-2 py-1 w-full"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-28 font-medium">Place:</label>
              <input
                type="text"
                value={formData.place}
                onChange={(e) => setFormData({...formData, place: e.target.value})}
                className="border rounded px-2 py-1 w-full"
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

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Advisor ID</th>
                <th className="py-2">Date</th>
                <th className="py-2">Time</th>
                <th className="py-2">Location</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookedMeetings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No {activeTab === 'scheduled' ? 'scheduled' : 'pending'} meetings
                  </td>
                </tr>
              ) : (
                bookedMeetings.map(meeting => (
                  <tr key={meeting._id} className="border-b">
                    <td className="py-2">{meeting.advisorId}</td>
                    <td className="py-2">
                      {new Date(meeting.dateTime).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-2">
                      {new Date(meeting.dateTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-2">{meeting.place}</td>
                    <td className="py-2">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          meeting.status === 'approved' 
                            ? 'bg-green-100 text-green-800'
                            : meeting.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {meeting.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Meeting;