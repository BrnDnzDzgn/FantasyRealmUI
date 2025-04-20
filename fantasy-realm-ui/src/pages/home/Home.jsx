"use client";
import { Link } from "react-router-dom";
import React from "react";
import { CanvasRevealEffect } from "../../components/ui/canvas-reveal-effect";
import { Card } from "../../components/ui/card";
import { AceternityIcon } from "../../components/ui/aceternityIcon";
import { useEffect, useState } from "react";
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
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://localhost:7219/api/PersonalityType");
        const data = await res.json();
  
        const mergedData = data.map((item) => {
          const visuals = visualMap[item.name];
          if (!visuals) return null;
  
          return {
            id: item.id,
            title: item.name,
            ...visuals
          };
        }).filter(Boolean);
  
        setCardData(mergedData);
      } catch (err) {
        console.error("⚠️ Failed to fetch card data:", err);
      }
    };
  
    fetchData();
  }, []);
  
  const visualMap = {
    PERA: {
      icon: <AceternityIcon />,
      bgImage: VMHFT,
      containerClassName: "bg-pink-300",
      colors: [[255, 20, 147], [255, 255, 255]]
    },
    VMHFR: {
      icon: <AceternityIcon />,
      bgImage: VMHFR,
      containerClassName: "bg-orange-500",
      colors: [[255, 255, 51], [255, 140, 0], [255, 255, 255]]
    },
    VMHGT: {
      icon: <AceternityIcon />,
      bgImage: VMHGT,
      containerClassName: "bg-yellow-500",
      colors: [[57, 255, 20], [255, 255, 51]]
    },
    VMHGR: {
      icon: <AceternityIcon />,
      bgImage: VMHGR,
      containerClassName: "bg-red-500",
      colors: [[255, 0, 0], [255, 255, 255]]
    },
    VMXFT: {
      icon: <AceternityIcon />,
      bgImage: VMXFT,
      containerClassName: "bg-blue-800",
      colors: [[0, 0, 0], [0, 191, 255]]
    },
    VMXFR: {
      icon: <AceternityIcon />,
      bgImage: VMXFR,
      containerClassName: "bg-blue-500",
      colors: [[211, 211, 211], [148, 0, 211]]
    },
    VMXGT: {
      icon: <AceternityIcon />,
      bgImage: VMXGT,
      containerClassName: "bg-yellow-200",
      colors: [[210, 105, 30], [255, 255, 255]]
    },
    VMXGR: {
      icon: <AceternityIcon />,
      bgImage: VMXGR,
      containerClassName: "bg-yellow-500",
      colors: [[255, 223, 0], [255, 255, 255]]
    },
    VWHFT: {
      icon: <AceternityIcon />,
      bgImage: VWHFT,
      containerClassName: "bg-blue-300",
      colors: [[0, 191, 255], [255, 255, 255]]
    },
    VWHFR: {
      icon: <AceternityIcon />,
      bgImage: VWHFR,
      containerClassName: "bg-purple-300",
      colors: [[255, 20, 147], [148, 0, 211], [255, 255, 255]]
    },
    VWHGT: {
      icon: <AceternityIcon />,
      bgImage: VWHGT,
      containerClassName: "bg-green-500",
      colors: [[57, 255, 20], [210, 105, 30], [255, 255, 255]]
    }
  };
  

  return (
    <>
      <div className="relative w-full overflow-hidden dark:bg-black pt-23 py-20 bg-black">
        <div className="flex gap-5 w-max" style={{ animation: 'slide 40s linear infinite' }}>
          {[...cardData, ...cardData].map((card, index) => (
            <Link key={index} to={`/personality/${card.id}`}>
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