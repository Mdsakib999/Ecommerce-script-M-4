import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "../components/ui/Button";
export default function Faq() {
  const faqs = [
    {
      question: "How do I find my correct shoe size?",
      answer:
        "We recommend checking our detailed Size Guide available on every product page. If you are between sizes, we generally suggest sizing up for running shoes and sticking to your true size for casual sneakers. You can also measure your foot length and compare it with our chart for the best fit.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship Strideora footwear to over 50 countries worldwide. Shipping fees and estimated delivery times will be calculated at checkout based on your location. Standard international shipping typically takes 7-14 business days.",
    },
    {
      question: "What is your return and refund policy?",
      answer:
        "We want you to love your shoes! We offer a hassle-free 30-day return policy for all unworn items in their original packaging. Once we receive your return, refunds are processed within 5-7 business days to your original payment method.",
    },
    {
      question: "How do I clean and care for my Strideora shoes?",
      answer:
        "For most of our sneakers, we recommend using a soft brush or cloth with mild soap and warm water. Avoid machine washing as it may damage the specialized materials. For leather items, use a high-quality leather cleaner and conditioner.",
    },
    {
      question: "Are your materials sustainable?",
      answer:
        "Sustainability is at our core. Many of our models feature recycled upper materials and eco-friendly soles. We are continuously working to increase the percentage of sustainable components in our footwear without compromising on performance.",
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
