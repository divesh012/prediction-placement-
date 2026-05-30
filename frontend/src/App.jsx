import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    ssc_p: "",
    hsc_p: "",
    degree_p: "",
    workex: 0,
    etest_p: "",
    specialisation: 1,
    mba_p: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "https://prediction-placement.onrender.com/predict",
        {
          ssc_p: Number(formData.ssc_p),
          hsc_p: Number(formData.hsc_p),
          degree_p: Number(formData.degree_p),
          workex: Number(formData.workex),
          etest_p: Number(formData.etest_p),
          specialisation: Number(formData.specialisation),
          mba_p: formData.mba_p ? Number(formData.mba_p) : 60        }
      );

      setResult(response.data.prediction);
    } catch (error) {
      console.log(error);
      alert("Prediction Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-6">

      {/* Heading Outside Form */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-red-700">
          AI Placement Predictor
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Predict your placement chances using Machine Learning
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8">

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >
          <input
            type="number"
            name="ssc_p"
            placeholder="10th Percentage"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="hsc_p"
            placeholder="12th Percentage"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="degree_p"
            placeholder="Degree Percentage"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="etest_p"
            placeholder="Aptitude Test Score (%)"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="mba_p"
            placeholder="MBA Percentage"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={handleChange}
            required
          />

          <select
            name="workex"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={handleChange}
          >
            <option value="0">No Work Experience</option>
            <option value="1">Work Experience</option>
          </select>

          <select
            name="specialisation"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={handleChange}
          >
            <option value="0">Marketing & HR</option>
            <option value="1">Marketing & Finance</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition duration-300"
          >
            {loading ? "Predicting..." : "Predict Placement"}
          </button>
        </form>

        {result && (
          <div className="mt-8 text-center">
            <div
              className={`inline-block px-8 py-4 rounded-2xl font-bold text-xl ${
                result === "Placed"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              Prediction Result: {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
