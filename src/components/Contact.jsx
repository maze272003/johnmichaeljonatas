import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Loader2, CheckCircle, AlertCircle, Github, Linkedin } from 'lucide-react';

function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const formRef = useRef();
  
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const SERVICE_ID = 'service_zws3vqp';
    const TEMPLATE_ID = 'template_t60p9ap';
    const PUBLIC_KEY = 'WLPxc3Te83ApJHsOr';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
          setIsLoading(false);
          setStatus('success');
          e.target.reset();
          setTimeout(() => setStatus(null), 5000);
      }, (error) => {
          setIsLoading(false);
          setStatus('error');
          console.log(error.text);
      });
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <motion.div 
        className="contact-container"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="contact-header">
            <h2 className="number">07. What&apos;s Next?</h2>
            <h3 className="title">Let&apos;s Work Together</h3>
            <p className="description">
            I&apos;m open to new opportunities where I can contribute to meaningful 
            projects and grow alongside a strong team. Whether you have a question, 
            a project idea, or just want to connect—I&apos;d love to hear from you.
            </p>
        </div>

        {/* Contact Links */}
        <div className="contact-links">
          <a href="https://github.com/maze272003" target="_blank" rel="noopener noreferrer" className="contact-link-item" aria-label="GitHub Profile">
            <Github size={20} />
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/john-michael-jonatas-683405390" target="_blank" rel="noopener noreferrer" className="contact-link-item" aria-label="LinkedIn Profile">
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
        </div>

        <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input id="contact-name" type="text" name="user_name" placeholder="Name" required className="form-input" />
                <label htmlFor="contact-email" className="sr-only">Email</label>
                <input id="contact-email" type="email" name="user_email" placeholder="Email" required className="form-input" />
            </div>
            <label htmlFor="contact-message" className="sr-only">Message</label>
            <textarea id="contact-message" name="message" placeholder="Message" rows="5" required className="form-textarea"></textarea>

            <div className="form-footer">
                <button type="submit" className="cta-button submit-btn" disabled={isLoading}>
                    {isLoading ? (
                        <> <Loader2 className="animate-spin" size={18} /> Sending... </>
                    ) : (
                        <> Send Message <Send size={18} /> </>
                    )}
                </button>

                <div className="footer-right">
                    {status === 'success' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="status-msg success">
                            <CheckCircle size={18} /> Message Sent!
                        </motion.div>
                    )}
                    
                    {status === 'error' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="status-msg error">
                            <AlertCircle size={18} /> Failed to send.
                        </motion.div>
                    )}

                    {!status && (
                        <p className="email-text">
                            Or email me at: <a href="mailto:jmjonatas4@gmail.com" className="email-link">jmjonatas4@gmail.com</a>
                        </p>
                    )}
                </div>
            </div>
        </form>
      </motion.div>
    </section>
  );
}

export default Contact;
