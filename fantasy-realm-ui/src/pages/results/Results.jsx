import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Results() {
  const location = useLocation();
  const result = location.state?.personalityResult;
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    if (result) {
      fetch("https://localhost:7219/api/PersonalityType")
        .then((res) => res.json())
        .then((data) => setAllTypes(data))
        .catch((err) => console.error("❌ Failed to fetch personality types:", err));
    }
  }, [result]);

  const handleSave = async () => {
    const matched = allTypes.find((p) => p.name === result.code);

    if (!matched) {
      setMessage("❌ Could not match personality code to ID.");
      return;
    }

    const payload = {
      id: 0,
      fantasyUserId: 4, // Replace this with actual user ID if available
      personalityTypeId: matched.id,
    };

    try {
      const res = await fetch("https://localhost:7219/api/FantasyUserPersonalityAssociation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("✅ Personality saved to your profile. Redirecting...");
        setTimeout(() => {
          navigate("/profile"); // Redirect after 2 seconds
        }, 2000);
      } else {
        const err = await res.json();
        setMessage(`❌ Save failed: ${err.message || "Unknown error"}`);
      }
    } catch (error) {
      setMessage("❌ Error saving personality: " + error.message);
    }
  };

  return (
    <div className="p-10 bg-white shadow-md rounded-lg max-w-[800px] w-full">
      <h1 className="text-3xl font-bold mb-6">Results</h1>
      {result ? (
        <>
          <p className="text-xl mb-4">
            🌟 Your fantasy personality type is <strong>{result.code}</strong>.
          </p>
          <p className="text-lg mb-4">
            You are composed of five distinct personalities, which together form your unique identity:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            {result.traitNames.map((trait, index) => (
              <li key={index} className="text-base text-gray-800">
                {trait}
              </li>
            ))}
          </ul>

          <p className="mb-2 text-sm text-gray-600">
            You can save your personality to your profile by clicking the button below:
          </p>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green text-black rounded hover:bg-green-200 transition"
          >
            Save Personality
          </button>

          {message && (
            <p className="mt-4 text-sm text-blue-600 font-medium">
              {message}
            </p>
          )}
        </>
      ) : (
        <p>You don’t even have a personality. Please complete the quiz first.</p>
      )}
    </div>
  );
}

export default Results;
