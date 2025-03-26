"use client";
import { Link } from "react-router-dom";
import React from "react";
import { CanvasRevealEffect } from "../../components/ui/canvas-reveal-effect";
import { Card } from "../../components/ui/card";
import { AceternityIcon } from "../../components/ui/aceternityIcon";
import VMHFT from "../../assets/images/VMHFT.png";
import VMHFR from "../../assets/images/VMHFR.png";
import VMHGT from "../../assets/images/VMHGT.png";
import VMHGR from "../../assets/images/VMHGR.png";
import VMXFT from "../../assets/images/VMXFT.png";
import VMXFR from "../../assets/images/VMXFR.png";
import VMXGT from "../../assets/images/VMXGT.png";
import VMXGR from "../../assets/images/VMXGR.png";
import VWHFT from "../../assets/images/VWHFT.png";
import VWHFR from "../../assets/images/VWHFR.png";
import VWHGT from "../../assets/images/VWHGT.png";

export function Home() {
  const cardData = [
    { 
      title: "VMHFT",
      icon: <AceternityIcon />, 
      bgImage: VMHFT,
      containerClassName: "bg-pink-300",
      // Neon: Pink, White
      colors: [
        [255, 20, 147],  // Neon Pink
        [255, 255, 255]  // White
      ]
    },
    { 
      title: "VMHFR", 
      icon: <AceternityIcon />,
      bgImage: VMHFR,
      containerClassName: "bg-orange-500",
      // Neon: Neon Yellow, Neon Orange, White
      colors: [
        [255, 255, 51],  // Neon Yellow
        [255, 140, 0],   // Neon Orange
        [255, 255, 255]  // White
      ]
    },
    { 
      title: "VMHGT", // green, yellow
      icon: <AceternityIcon />,
      bgImage: VMHGT,
      containerClassName: "bg-yellow-500",
      // Neon: Neon Green, Neon Yellow
      colors: [
        [57, 255, 20],   // Neon Green
        [255, 255, 51]   // Neon Yellow
      ]
    },
    { 
      title: "VMHGR", // red, white
      icon: <AceternityIcon />,
      bgImage: VMHGR,
      containerClassName: "bg-red-500",
      // Neon: Neon Red, White
      colors: [
        [255, 0, 0],     // Neon Red
        [255, 255, 255]  // White
      ]
    },
    { 
      title: "VMXFT", // black, blue
      icon: <AceternityIcon />, 
      bgImage: VMXFT,
      containerClassName: "bg-blue-800",
      // Neon: Black remains as is, Neon Blue
      colors: [
        [0, 0, 0],       // Black
        [0, 191, 255]    // Neon Blue
      ]
    },
    { 
      title: "VMXFR", // grey, purple
      icon: <AceternityIcon />, 
      bgImage: VMXFR,
      containerClassName: "bg-blue-500",
      // Neon: Neon Grey (light grey) and Neon Purple
      colors: [
        [211, 211, 211], // Neon Grey
        [148, 0, 211]    // Neon Purple
      ]
    },
    { 
      title: "VMXGT", // brown, white
      icon: <AceternityIcon />,
      bgImage: VMXGT,
      containerClassName: "bg-yellow-200",
      // Neon: Bright Chocolate (neon brown) and White
      colors: [
        [210, 105, 30],  // Neon Brown (approximated)
        [255, 255, 255]  // White
      ]
    },
    { 
      title: "VMXGR", // gold, white
      icon: <AceternityIcon />,
      bgImage: VMXGR,
      containerClassName: "bg-yellow-500",
      // Neon: Neon Gold and White
      colors: [
        [255, 223, 0],   // Neon Gold
        [255, 255, 255]  // White
      ]
    },
    { 
      title: "VWHFT", // blue, white
      icon: <AceternityIcon />, 
      bgImage: VWHFT,
      containerClassName: "bg-blue-300",
      // Neon: Neon Blue and White
      colors: [
        [0, 191, 255],   // Neon Blue
        [255, 255, 255]  // White
      ]
    },
    { 
      title: "VWHFR", // pink, purple, white
      icon: <AceternityIcon />, 
      bgImage: VWHFR,
      containerClassName: "bg-purple-300",
      // Neon: Neon Pink, Neon Purple, White
      colors: [
        [255, 20, 147],  // Neon Pink
        [148, 0, 211],   // Neon Purple
        [255, 255, 255]  // White
      ]
    },
    { 
      title: "VWHGT", // green, brown, white
      icon: <AceternityIcon />,
      bgImage: VWHGT,
      containerClassName: "bg-green-500",
      // Neon: Neon Green, Neon Brown, White
      colors: [
        [57, 255, 20],   // Neon Green
        [210, 105, 30],  // Neon Brown
        [255, 255, 255]  // White
      ]
    },
  ];

  return (
    <>
      <div className="relative w-full overflow-hidden dark:bg-black pt-23 py-20 bg-black">
        <div className="flex gap-5 w-max" style={{ animation: 'slide 40s linear infinite' }}>
          {[...cardData, ...cardData].map((card, index) => (
            <Link key={index} to={`/personality/${card.title}`}>
              <Card title={card.title} icon={card.icon} bgImage={card.bgImage}>
                <CanvasRevealEffect
                  animationSpeed={5.1}
                  containerClassName={card.containerClassName}
                  colors={card.colors}
                />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}