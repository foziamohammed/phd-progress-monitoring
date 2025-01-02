import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Issues = () => {
  return (
    <div className="font-sans p-8">
      {/* Heading */}
      <h1 className="text-center font-semibold text-2xl mb-8">Hi, How can we help?</h1>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
        {/* Left Section: Contact Information */}
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-md w-full md:w-1/3">
          <h2 className="text-2xl font-medium mb-4">Contact Information</h2>
          <p className="text-sm mb-6">Ask anything you want!</p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaPhone size={20} />
              <span className="text-lg">+251 974 859 55</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope size={20} />
              <span className="text-lg">aait@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt size={20} />
              <span className="text-lg">5 kilo Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="bg-white shadow-md p-8 rounded-lg w-full md:w-2/3">
          <form>
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-gray-700 font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="John"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-gray-700 font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Doe"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+251 987 456 56"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Select Subject */}
            <div className="mt-6">
              <label className="block text-gray-700 font-medium mb-2">Select Subject?</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="subject" className="form-radio text-blue-500" />
                  <span>General Inquiry</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="subject" className="form-radio text-blue-500" />
                  <span>Support</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="subject" className="form-radio text-blue-500" />
                  <span>Feedback</span>
                </label>
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Send Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Issues;
