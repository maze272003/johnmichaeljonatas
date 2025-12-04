import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const formRef = useRef();
  
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    // I-paste mo dito ang iyong EmailJS keys
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
            <h2 className="number">06. What's Next?</h2>
            <h3 className="title">Get In Touch</h3>
            <p className="description">
            I'm currently open to new opportunities and my inbox is always open.
            Fill out the form below or send an email directly!
            </p>
        </div>

        <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
                <input type="text" name="user_name" placeholder="Name" required className="form-input" />
                <input type="email" name="user_email" placeholder="Email" required className="form-input" />
            </div>
            <textarea name="message" placeholder="Message" rows="5" required className="form-textarea"></textarea>

            <div className="form-footer">
                {/* Left Side: Button */}
                <button type="submit" className="cta-button submit-btn" disabled={isLoading}>
                    {isLoading ? (
                        <> <Loader2 className="animate-spin" size={18} /> Sending... </>
                    ) : (
                        <> Send Message <Send size={18} /> </>
                    )}
                </button>

                {/* Right Side: Email OR Status Message */}
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

                    {/* Ipakita lang ang email kung walang status message (o pwede rin pagsamahin) */}
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
