import SectionHeading from '@/components/Helper/SectionHeading'
import React from 'react'
import Image from "next/image";
import { highlights } from '@/data';
import { stats } from '@/data'

const About = () => {
  return (
    <div id = "about" className="scroll-mt-24 py-16 bg-gray-100 dark:bg-gray-900">
      {/*Section heading */}
      <SectionHeading
        title_1='About'
        title_2='Me'
        description='Get to know the developer behind the code'
      />
      {/* Image */}
      <div data-aos="fade-right" data-aos-delay="0" data-aos-anchor-placement="top-center" className="flex flex-col lg:flex-row items-center gap-16 w-[90%] xl:w-[80%] mx-auto mt-16">
        <div className="relative w-full lg:w-[45%] h-112.5 lg:h-137.5 overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/images/user.jpg"
            alt="profile"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div data-aos="fade-left" data-aos-delay="150" data-aos-anchor-placement="top-center" className="space-y-6 max-w-2xl text-center lg:text-left">

          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            Always learning. Always building.
          </h3>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            I’m a computer science and applied maths student focused on building scalable systems and
            thoughtful digital experiences. My journey began with curiosity about how
            technology works, and it has grown into a drive to engineer clean,
            efficient, and reliable software.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            Beyond coding, I’m drawn to performance, system design, and the kind of
            mathematical thinking that powers backend infrastructure and quantitative
            systems. I enjoy solving problems where correctness, efficiency, and
            clarity matter.
          </p>
          {/* highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {highlights.map((item) => {
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              )
            })}

          </div>
        </div>
      </div>
      {/* stats */}
      <div className="mt-16 w-[80%] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" >
          {stats.map((stat) => {
            return (
              <div
                data-aos="zoom-in"
                data-aos-delay="300"
                data-aos-anchor-placement="top-center"
                key={stat.label}
                className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center">

                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })};
        </div>
      </div>
    </div>


  )
}

export default About