import SectionHeading from "@/components/Helper/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactInfo, socialLinks } from "@/data";
import { Send } from "lucide-react";
import React from "react";

const Contact = () => {
  return (
    <div id="contact" className="scroll-mt-24 py-16 bg-gray-100 dark:bg-gray-950">
      <SectionHeading
        title_1="Get In"
        title_2="Touch"
        description="Have a project in mind or just want to say hi? I'd love to hear from you."
      />
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
                <h3 className="text-2xl font-semibold mb-4">Let&apos;s talk</h3>
                <p className="text-muted-foreground">
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
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl hover:scale-105 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                        <item.icon className="w-5 h-5 text-blue-500 dark:text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground ">
                          {item.label}
                        </p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
              {/* social icons */}
              <div>
                <h4 className="text-lg font-medium mb-4">Follow Me</h4>
                <div className="flex gap-3">
                  {socialLinks.map((link) => {
                    return (
                      <a
                        href={link.href}
                        key={link.label}
                        target="_blank"
                        className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-muted-foreground hover:text-blue-500 transition-colors"
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
            <form className="bg-white dark:bg-gray-800 rounded-2xl p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Lebron James"
                    required
                    className="bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="lebron@example.com"
                    required
                    className="bg-gray-100"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  required
                  className="bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project...."
                  rows={5}
                  required
                  className="bg-gray-100 h-40"
                />
              </div>
              <Button
                type="submit"
                size={"lg"}
                className="w-full cursor-pointer"
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
