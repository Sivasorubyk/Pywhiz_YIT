import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [faqOpen, setFaqOpen] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
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
          <div className="w-1/2 pl-4">
            <div className="text-center bg-[#CCE5E5] outline outline-[#008080] p-8 rounded-lg shadow-md h-[60vh] flex flex-col justify-center">
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

                <button
                  type="submit"
                  className="mt-8 px-6 py-3 bg-[#28BEBE] text-black outline outline-[#003366] rounded-lg text-lg hover:bg-[#CCE5E5]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
