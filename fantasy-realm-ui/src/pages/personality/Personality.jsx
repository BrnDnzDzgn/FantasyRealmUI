import { useParams } from "react-router-dom";
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

const visualMap = {
  PERA: VMHFT,
  VMHFR: VMHFR,
  VMHGT: VMHGT,
  VMHGR: VMHGR,
  VMXFT: VMXFT,
  VMXFR: VMXFR,
  VMXGT: VMXGT,
  VMXGR: VMXGR,
  VWHFT: VWHFT,
  VWHFR: VWHFR,
  VWHGT: VWHGT,
};

export function Personality() {
  const { id } = useParams();
  const [personality, setPersonality] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonality = async () => {
      try {
        const res = await fetch(`https://localhost:7219/api/PersonalityType/${id}`);
        const data = await res.json();
        setPersonality(data);
      } catch (error) {
        console.error("❌ Failed to fetch personality:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonality();
  }, [id]);

  if (loading) {
    return (
      <div className="relative w-full overflow-hidden dark:bg-black py-20 bg-black text-white text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!personality) {
    return (
      <div className="relative w-full overflow-hidden dark:bg-black py-20 bg-black text-white text-center">
        <p>Personality not found.</p>
      </div>
    );
  }

  const bgImage = visualMap[personality.name];

  return (
    <div className="w-full h-full text-white text-center overflow-x-hidden">
      <div
        className="w-screen h-screen bg-cover bg-top bg-fixed flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <h1 className="text-5xl font-extrabold bg-black/60 px-6 py-3 rounded-xl shadow-lg">
          {personality.name}
        </h1>
      </div>
  
      <div className="w-full bg-black px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed">
            {personality.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
  
}
