import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sendMessage } from "../services/api";
import { GreenButton } from "../components/Buttons";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [faqOpen, setFaqOpen] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const faqs = [
    {
      question: "What is this website about?",
      answer:
        "We provide interactive Python learning experiences for children.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact us by filling out the form on the right side of this page.",
    },
    {
      question: "Can I access the content for free?",
      answer: "Yes! We offer free access to all of our learning modules.",
    },
    // Add more questions and answers here
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendMessage(formData);
      setFeedbackMessage("Message sent successfully!");
      setFormData({ fullName: "", email: "", message: "" });
    } catch (error) {
      setFeedbackMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex mt-6">
          {/* Left Section: Q&A */}
          <div className="w-1/2 pr-4">
            <div className="mt-8">
              <h2 className="text-xl font-bold text-center">
                Frequently Asked Questions
              </h2>
              <div className="mt-4 space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-[#CCE5E5] outline outline-[#008080] p-4 rounded-lg cursor-pointer"
                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  >
                    <h3 className="font-semibold">{faq.question}</h3>
                    {faqOpen === index && <p className="mt-2">{faq.answer}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section: Contact Form Styled Like the PyWhiz Section */}
          <div className="w-1/2 pl-2">
            <div className="text-center bg-[#CCE5E5] outline outline-[#008080] p-8 rounded-lg shadow-md h-[80vh] flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-6">Get In Touch</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="mb-4">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="4"
                    placeholder="Type your message here"
                    required
                  ></textarea>
                </div>

                <GreenButton
                  type="submit"
                  text="Send Message"
                  className="mt-8"
                />
              </form>
              {feedbackMessage && (
                <p
                  className={`mt-4 ${
                    feedbackMessage.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  } font-bold`}
                >
                  {feedbackMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
