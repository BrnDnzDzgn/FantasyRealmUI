"use client";
import React from "react";
import { CanvasRevealEffect } from "../../components/ui/canvas-reveal-effect";
import {Card} from "../../components/ui/card"
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
  { title: "VMHFT", icon: <AceternityIcon />, bgImage: VMHFT },
  { title: "VMHFR", icon: <AceternityIcon />, bgImage: VMHFR },
  { title: "VMHGT", icon: <AceternityIcon />, bgImage: VMHGT },
  { title: "VMHGR", icon: <AceternityIcon />, bgImage: VMHGR },
  { title: "VMXFT", icon: <AceternityIcon />, bgImage: VMXFT },
  { title: "VMXFR", icon: <AceternityIcon />, bgImage: VMXFR },
  { title: "VMXGT", icon: <AceternityIcon />, bgImage: VMXGT },
  { title: "VMXGR", icon: <AceternityIcon />, bgImage: VMXGR },
  { title: "VWHFT", icon: <AceternityIcon />, bgImage: VWHFT },
  { title: "VWHFR", icon: <AceternityIcon />, bgImage: VWHFR },
  { title: "VWHGT", icon: <AceternityIcon />, bgImage: VWHGT },

];

return (
    <>
<div className="relative w-full overflow-hidden dark:bg-black py-20 bg-black">
  <div className="flex gap-4 w-max" style={{ animation: 'slide 40s linear infinite' }}>
    {[...cardData, ...cardData].map((card, index) => (
      <Card key={index} title={card.title} icon={card.icon} bgImage={card.bgImage}>
        <CanvasRevealEffect animationSpeed={5.1} containerClassName="bg-emerald-900" />
      </Card>
    ))}
  </div>
</div>
    </>
);
}