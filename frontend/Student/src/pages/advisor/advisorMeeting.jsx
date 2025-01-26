import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const AdvisorMeeting = () => {
  const { user } = useAuth()
  const [pendingRequests, setPendingRequests] = useState([])
  const [approvedMeetings, setApprovedMeetings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch advisor's meeting data
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true)
        const [requestsRes, schedulesRes] = await Promise.all([
          fetch(`/api/advisors/${user.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch(`/api/advisors/${user.id}/schedules`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        ])

        const requestsData = await requestsRes.json()
        const schedulesData = await schedulesRes.json()
        
        setPendingRequests(requestsData.requests || [])
        setApprovedMeetings(schedulesData.schedules || [])
      } catch (err) {
        setError('Failed to load meetings')
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) fetchMeetings()
  }, [user.id])

  const handleRequestAction = async (requestId, action) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/${requestId}/${action}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!res.ok) throw new Error(`Failed to ${action} request`)

      // Refresh data after action
      const [requestsRes, schedulesRes] = await Promise.all([
        fetch(`/api/advisors/${user.id}`),
        fetch(`/api/advisors/${user.id}/schedules`)
      ])
      
      const requestsData = await requestsRes.json()
      const schedulesData = await schedulesRes.json()
      
      setPendingRequests(requestsData.requests || [])
      setApprovedMeetings(schedulesData.schedules || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 font-sans">
      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="flex gap-12">
        {/* Pending Requests Section */}
        <div className="w-1/2">
          <h1 className="font-semibold mb-6 text-lg">Pending Meeting Requests</h1>
          
          {loading ? (
            <div>Loading...</div>
          ) : pendingRequests.length === 0 ? (
            <div className="text-gray-500">No pending requests</div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map(request => (
                <div key={request._id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{request.studentName}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(request.dateTime).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRequestAction(request._id, 'approve')}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRequestAction(request._id, 'decline')}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                  <p className="text-sm"><strong>Agenda:</strong> {request.agenda}</p>
                  <p className="text-sm"><strong>Place:</strong> {request.place}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Approved Meetings Schedule */}
        <div className="w-1/2">
          <h1 className="font-semibold mb-6 text-lg">Approved Meetings Schedule</h1>
          
          {loading ? (
            <div>Loading...</div>
          ) : approvedMeetings.length === 0 ? (
            <div className="text-gray-500">No scheduled meetings</div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Student</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Time</th>
                  <th className="py-2">Location</th>
                </tr>
              </thead>
              <tbody>
                {approvedMeetings.map(meeting => (
                  <tr key={meeting._id} className="border-b">
                    <td className="py-2">{meeting.studentName}</td>
                    <td className="py-2">
                      {new Date(meeting.dateTime).toLocaleDateString()}
                    </td>
                    <td className="py-2">
                      {new Date(meeting.dateTime).toLocaleTimeString()}
                    </td>
                    <td className="py-2">{meeting.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdvisorMeeting