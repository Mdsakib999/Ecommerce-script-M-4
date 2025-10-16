import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "../components/ui/Button";
export default function Faq() {
  const faqs = [
    {
      question: "What types of electronic accessories do you sell?",
      answer:
        "We offer a wide range of electronic accessories including headphones, chargers, phone cases, smartwatches, Bluetooth speakers, gaming accessories, and much more. All our products are from trusted brands with warranty support.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship our products worldwide. Shipping fees and delivery time may vary depending on your location. You can calculate shipping costs at checkout.",
    },
    {
      question: "How can I track my order?",
      answer:
        "After placing an order, you will receive a tracking number via email. You can use this number on our tracking portal to see real-time updates on your shipment.",
    },
    {
      question: "What is your return and refund policy?",
      answer:
        "We offer a 30-day return policy on all electronic accessories. Products must be unused and in original packaging. Refunds are processed within 5-7 business days after we receive the returned item.",
    },
    {
      question: "Do your products come with a warranty?",
      answer:
        "Yes, most of our electronic accessories come with a 6-month to 1-year warranty depending on the brand. Warranty details are provided with each product description.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [heights, setHeights] = useState([]);
  const contentRefs = useRef([]);

  useEffect(() => {
    setHeights(contentRefs.current.map((ref) => (ref ? ref.scrollHeight : 0)));
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
          <span className="text-2xl">💡</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Frequently Asked
          <span className="bg-gradient-to-r pl-4 from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Get quick answers to the most common questions about our products and
          services
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/60 transition-all duration-300 overflow-hidden"
          >
            {/* Question Button */}
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center p-8 text-left hover:bg-gray-50/50 transition-colors duration-300"
            >
              <div className="flex items-start space-x-4 flex-1">
                {/* Number Indicator */}
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-sm mt-1">
                  {index + 1}
                </div>

                {/* Question Text */}
                <span className="text-lg font-semibold text-gray-800 leading-relaxed group-hover:text-blue-600 transition-colors duration-300">
                  {faq.question}
                </span>
              </div>

              {/* Toggle Icon */}
              <div
                className={`flex-shrink-0 ml-6 transition-all duration-300 ${
                  openIndex === index
                    ? "text-blue-600 rotate-180"
                    : "text-gray-400 group-hover:text-blue-500"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    openIndex === index
                      ? "bg-blue-100"
                      : "bg-gray-100 group-hover:bg-blue-50"
                  }`}
                >
                  {openIndex === index ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </div>
              </div>
            </button>

            {/* Answer Content */}
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: openIndex === index ? `${heights[index]}px` : "0px",
              }}
            >
              <div className="px-8 pb-8">
                <div className="flex space-x-4">
                  {/* Vertical Accent Line */}
                  <div className="flex-shrink-0 w-1 bg-gradient-to-b from-blue-200 to-indigo-200 rounded-full"></div>

                  {/* Answer Text */}
                  <div className="flex-1">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="text-center mt-16 pt-12 border-t border-gray-200/60">
        <p className="text-gray-600 mb-6 text-lg">Still have questions?</p>
        <Button to="/contact" className="">
          Contact Our Support Team
        </Button>
      </div>
    </div>
  );
}
