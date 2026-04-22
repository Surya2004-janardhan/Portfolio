import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaPaperPlane } from "react-icons/fa";

const SUCCESS_MESSAGE = "Message Sent Successfully! 🚀";
const FALLBACK_EMAIL_MESSAGE =
  "Automatic send failed. Opening your email app so you can send directly.";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const contactEmail =
    process.env.REACT_APP_CONTACT_EMAIL || "chintalajanardhan2004@gmail.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openMailFallback = (data) => {
    const subject = `Portfolio Contact from ${data.name || "Visitor"}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\nMobile: ${data.mobile}\n\nMessage:\n${data.message}`;
    const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const sendViaFormSubmit = async (data) => {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          message: data.message,
          _subject: `Portfolio Contact from ${data.name || "Visitor"}`,
          _template: "table",
        }),
      }
    );

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false || result.success === "false") {
      throw new Error(result.message || "FormSubmit request failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);

    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    const cleanedFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      message: formData.message.trim(),
    };

    if (
      !cleanedFormData.name ||
      !cleanedFormData.email ||
      !cleanedFormData.mobile ||
      !cleanedFormData.message
    ) {
      alert(
        "All fields are required and cannot be empty or contain only spaces."
      );
      setIsSending(false);
      return;
    }

    const templateParams = {
      ...cleanedFormData,
      from_name: cleanedFormData.name,
      from_email: cleanedFormData.email,
      reply_to: cleanedFormData.email,
      phone: cleanedFormData.mobile,
    };

    let formSubmitAttempted = false;
    try {
      if (serviceID && templateID && publicKey) {
        await emailjs.send(serviceID, templateID, templateParams, publicKey);
      } else {
        formSubmitAttempted = true;
        await sendViaFormSubmit(cleanedFormData);
      }

      alert(SUCCESS_MESSAGE);
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (primaryError) {
      console.error("Primary contact send failed:", primaryError);
      if (!formSubmitAttempted) {
        try {
          await sendViaFormSubmit(cleanedFormData);
          alert(SUCCESS_MESSAGE);
          setFormData({ name: "", email: "", mobile: "", message: "" });
        } catch (secondaryError) {
          console.error("Fallback contact send failed:", secondaryError);
          alert(FALLBACK_EMAIL_MESSAGE);
          openMailFallback(cleanedFormData);
        }
      } else {
        alert(FALLBACK_EMAIL_MESSAGE);
        openMailFallback(cleanedFormData);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="px-2 w-full mx-auto">
      {/* Heading - Consistent with other sections */}

      <h2 className="text-[clamp(2.2rem,8vw,60px)] font-bold mb-6 md:mb-16 text-white leading-tight text-center md:text-left uppercase">
        Contact <span className="text-primary">Me</span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Side: Contact Info */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-[#1a1a1a] border border-white/10 p-6 rounded-3xl transition-all duration-500 hover:border-primary/40">
            <h3 className="text-primary font-semibold text-lg mb-2">
              Let's Talk
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Have a project in mind or just want to say hi? My inbox is always
              open.
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 p-6 rounded-3xl transition-all duration-500 hover:border-primary/40">
            <h3 className="text-primary font-semibold text-lg mb-2">Email</h3>
            <p className="text-white/90 break-all font-medium">
              {contactEmail}
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 p-6 rounded-3xl transition-all duration-500 hover:border-primary/40">
            <h3 className="text-primary font-semibold text-lg mb-2">Mobile</h3>
            <p className="text-white/90 break-all font-medium">
              +91 9391469392
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-2/3 bg-[#1a1a1a] border border-white/10 p-8 md:p-10 rounded-3xl transition-all duration-500 hover:border-white/20 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">
                  Your Role
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="founder/hr of..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none transition-all duration-300 focus:border-primary focus:bg-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="+91 00000 00000"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none transition-all duration-300 focus:border-primary focus:bg-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="hr@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none transition-all duration-300 focus:border-primary focus:bg-white/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">
                Your Message
              </label>
              <textarea
                name="message"
                placeholder="You Are Hired!"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white h-32 resize-none outline-none transition-all duration-300 focus:border-primary focus:bg-white/10"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full md:w-auto px-10 py-4 bg-primary text-black font-bold rounded-2xl transition-all duration-500 hover:bg-white hover:text-black flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSending ? "Sending..." : "Send Message"}
              <FaPaperPlane
                className={`text-sm transition-transform duration-500 ${isSending ? "translate-x-10 opacity-0" : "group-hover:-translate-y-1 group-hover:translate-x-1"}`}
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
