import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    toast.success(
      <h1 className="font-serif text-center text-lg">
        ✅ Message sent successfully!
      </h1>,
      { position: "bottom-right" }
    );
    reset();
  };

  return (
    <section className="min-h-screen bg-transparent flex items-center justify-center py-16 px-6">
      <div className="max-w-6xl w-full bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 border border-white/40">
        {/* LEFT SIDE: Contact Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-gray-700 mb-10 text-base leading-relaxed">
              We’d love to hear from you! Whether you have a question about our
              products, shipping, or anything else, our friendly team is ready
              to help.
            </p>

            <div className="space-y-5 text-gray-700">
              <div className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                <MapPin className="w-6 h-6 text-blue-600" />
                <span>123 Street, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                <Phone className="w-6 h-6 text-blue-600" />
                <span>+880 123 456 789</span>
              </div>
              <div className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                <Mail className="w-6 h-6 text-blue-600" />
                <span>support@yourstore.com</span>
              </div>
              <div className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                <Clock className="w-6 h-6 text-blue-600" />
                <span>Sat - Thu: 10AM - 8PM</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-10">
            <iframe
              title="map"
              className="w-full h-56 rounded-2xl shadow-lg border border-gray-200"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.814205679748!2d91.8120790755546!3d22.360643179643297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9005629cff9%3A0x134782e81960acf0!2sSM%20IT%20SOLUTION!5e0!3m2!1sen!2sbd!4v1757483636275!5m2!1sen!2sbd"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* RIGHT SIDE: Contact Form */}
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/40">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2 border-gray-200">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                {...register("subject", { required: "Subject is required" })}
                placeholder="Enter subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-32 resize-none"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex mx-auto cursor-pointer items-center ease-in-out duration-300 transition-all  text-md justify-center w-full rounded-md bg-transparent py-2  px-4 border border-indigo-400 text-indigo-400 hover:bg-indigo-400 font-semibold hover:text-white hover:border-transparent"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
