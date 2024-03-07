"use client"

import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <div className="flex flex-col items-center mt-4 space-y-5 ">
      <h2 className="text-4xl font-medium">Personal Chef, Personalized Meals.</h2>
      <p className="text-xl">You can find and store your favorite recipes</p>
      <Image
        src="/jimmy-dean-Yn0l7uwBrpw-unsplash.jpg"
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
  );
};

export default About