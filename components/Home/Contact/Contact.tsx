import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactInfo, socialLinks } from "@/data";
import { Send } from "lucide-react";
import React from "react";

const Contact = () => {
  return (
    <div id="contact" className="scroll-mt-24 py-24 bg-surface-soft dark:bg-navy-soft">
      {/* Section heading (editorial serif, scoped to this section) */}
      <div className="text-center mb-16 px-6">
        <h2 className="font-serif font-normal tracking-[-0.02em] text-4xl md:text-5xl text-ink dark:text-on-dark mb-4">
          Get In <span className="text-coral">Touch</span>
        </h2>
        <p className="text-warm-muted dark:text-on-dark-soft max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? I&apos;d love to hear from you.
        </p>
      </div>
      <div className="w-[80%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* contact info */}
          <div
            data-aos="fade-right"
            data-aos-delay="0"
            data-aos-anchor-placement="top-center"
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-serif font-normal tracking-[-0.02em] text-2xl text-ink dark:text-on-dark mb-4">Let&apos;s talk</h3>
                <p className="text-ink-body dark:text-on-dark-soft">
                  I&apos;m always open to discussing new projects, creative
                  ideas, or opportunities to be part of your vision.
                </p>
              </div>
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  return (
                    <a
                      href={item.href}
                      key={item.label}
                      target="_blank"
                      className="flex items-center gap-4 p-4 bg-surface-card dark:bg-navy-elevated border border-hairline dark:border-white/10 rounded-lg transition-colors hover:bg-cream-strong dark:hover:bg-navy group"
                    >
                      <div className="w-12 h-12 rounded-md bg-canvas dark:bg-navy border border-hairline dark:border-white/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-sm text-warm-muted dark:text-on-dark-soft">
                          {item.label}
                        </p>
                        <p className="font-medium text-ink dark:text-on-dark">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
              {/* social icons */}
              <div>
                <h4 className="text-lg font-medium text-ink dark:text-on-dark mb-4">Follow Me</h4>
                <div className="flex gap-3">
                  {socialLinks.map((link) => {
                    return (
                      <a
                        href={link.href}
                        key={link.label}
                        target="_blank"
                        className="w-12 h-12 rounded-md bg-surface-card dark:bg-navy-elevated border border-hairline dark:border-white/10 flex items-center justify-center text-warm-muted dark:text-on-dark-soft transition-colors hover:text-coral"
                      >
                        <link.icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* contact form */}
          <div
            data-aos="fade-left"
            data-aos-delay="150"
            data-aos-anchor-placement="top-center"
          >
            <form className="bg-surface-card dark:bg-navy-elevated border border-hairline dark:border-white/10 rounded-lg p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-ink dark:text-on-dark">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Lebron James"
                    required
                    className="bg-canvas dark:bg-navy border-hairline dark:border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-ink dark:text-on-dark">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="lebron@example.com"
                    required
                    className="bg-canvas dark:bg-navy border-hairline dark:border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-ink dark:text-on-dark">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  required
                  className="bg-canvas dark:bg-navy border-hairline dark:border-white/10"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-ink dark:text-on-dark">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project...."
                  rows={5}
                  required
                  className="bg-canvas dark:bg-navy border-hairline dark:border-white/10 h-40"
                />
              </div>
              <Button
                type="submit"
                size={"lg"}
                className="w-full cursor-pointer bg-coral text-white hover:bg-coral-active"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
