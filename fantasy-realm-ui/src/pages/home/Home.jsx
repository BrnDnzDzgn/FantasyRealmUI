"use client";
import React from "react";
import { CanvasRevealEffect } from "../../components/ui/canvas-reveal-effect";
import {Card} from "../../components/ui/card"
import { AceternityIcon } from "../../components/ui/aceternityIcon";

export function Home() {
const cardData = [
  { title: "VMHFT", icon: <AceternityIcon /> },
  { title: "VMHFR", icon: <AceternityIcon /> },
  { title: "VMHGT", icon: <AceternityIcon /> },
  { title: "VMHGR", icon: <AceternityIcon /> },
  { title: "VMXFT", icon: <AceternityIcon /> },
  { title: "VMXFR", icon: <AceternityIcon /> },
  { title: "VMXGT", icon: <AceternityIcon /> },
  { title: "VMXGR", icon: <AceternityIcon /> },
  { title: "VWHFT", icon: <AceternityIcon /> },

];

return (
    <>
        <div className="relative w-full overflow-hidden bg-white dark:bg-black py-20 bg-black">
            <div className="flex gap-4 w-max" style={{ animation: 'slide 20s linear infinite' }}>
                {[...cardData].map((card, index) => (
                  <Card key={index} title={card.title} icon={card.icon}>
                    <CanvasRevealEffect animationSpeed={5.1} containerClassName="bg-emerald-900" />
                  </Card>
                ))}
            </div>
        </div>
    </>
);
}