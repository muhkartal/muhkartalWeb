import { motion } from "motion/react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
} from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form submitted:", { email, message });
  };

  return (
    <footer className="transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Section Header */}
        <motion.div
          className="mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-black dark:text-white transition-colors duration-300 mb-2"
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
          >
            Get In Touch
          </h2>
          <motion.div
            className="h-px w-12 sm:w-16 bg-black dark:bg-white"
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16">
          {/* Left Column - Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-neutral-700 dark:text-neutral-300 transition-colors duration-300 leading-relaxed"
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "14px",
              }}
            >
              I'm always open to discussing new projects,
              creative ideas, or opportunities to be part of
              your vision. Feel free to reach out!
            </p>

            {/* Email Card */}
            <motion.a
              href="mailto:contact@muhammedkartal.com"
              className="group flex items-center gap-3 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300 relative overflow-hidden"
              whileHover={{ y: -2 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Mouse Spotlight */}
              {isHovered && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(128, 128, 128, 0.1), transparent 40%)`,
                    opacity: isHovered ? 1 : 0,
                  }}
                />
              )}

              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors duration-300 relative z-10">
                <Mail
                  size={20}
                  className="text-neutral-600 dark:text-neutral-400"
                />
              </div>
              <div className="flex-1 relative z-10">
                <div
                  className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300"
                  style={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "11px",
                  }}
                >
                  Email
                </div>
                <div
                  className="text-black dark:text-white transition-colors duration-300"
                  style={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "13px",
                  }}
                >
                  contact@muhammedkartal.com
                </div>
              </div>
            </motion.a>

            {/* Social Links */}
            <div className="space-y-3">
              <div
                className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300"
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: "12px",
                }}
              >
                Connect with me
              </div>
              <div className="flex items-center gap-3">
                <motion.a
                  href="https://github.com/muhkartal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  aria-label="GitHub"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github
                    size={20}
                    className="text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                  />
                </motion.a>

                <motion.a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  aria-label="LinkedIn"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin
                    size={20}
                    className="text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                  />
                </motion.a>

                <motion.a
                  href="https://github.com/muhkartal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  aria-label="Twitter"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter
                    size={20}
                    className="text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                  />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-neutral-600 dark:text-neutral-400 mb-2 transition-colors duration-300"
                  style={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "12px",
                  }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all duration-300"
                  style={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "13px",
                  }}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-neutral-600 dark:text-neutral-400 mb-2 transition-colors duration-300"
                  style={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "12px",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-all duration-300 resize-none"
                  style={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "13px",
                  }}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="relative w-full px-6 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-black dark:bg-white text-white dark:text-black overflow-hidden group"
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: "13px",
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient background on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(200, 200, 200, 0.2), rgba(150, 150, 150, 0.1), rgba(100, 100, 100, 0.2))",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: [
                      "0% 50%",
                      "100% 50%",
                      "0% 50%",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <Send size={16} />
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-neutral-200 dark:border-neutral-700 pt-8 transition-colors duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div
              className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300 text-center sm:text-left"
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "12px",
              }}
            >
              © 2025 Muhammed Kartal. All rights reserved.
            </div>
            <div
              className="text-neutral-400 dark:text-neutral-500 transition-colors duration-300"
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "11px",
              }}
            >
              Built by Muhammed İbrahim Kartal
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
