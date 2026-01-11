import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({ feature1: "", feature2: "", feature3: "", feature4: "", feature5: "", feature6: "", feature7: "", feature8: "" });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:8000/predict", {
      feature1: parseFloat(formData.feature1),
      feature2: parseFloat(formData.feature2),
      feature3: parseFloat(formData.feature3),
      feature4: parseFloat(formData.feature4),
      feature5: parseFloat(formData.feature5),
      feature6: parseFloat(formData.feature6),
      feature7: parseFloat(formData.feature7),
      feature8: parseFloat(formData.feature8),
      
    });
    setPrediction(res.data.predicted_price);
  };

  return (
    <div>
      <h1>House Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input name="feature1" placeholder="Feature 1" onChange={handleChange} />
        <input name="feature2" placeholder="Feature 2" onChange={handleChange} />
        <input name="feature3" placeholder="Feature 3" onChange={handleChange} />
        <input name="feature4" placeholder="Feature 4" onChange={handleChange} />
        <input name="feature5" placeholder="Feature 5" onChange={handleChange} />
        <input name="feature6" placeholder="Feature 6" onChange={handleChange} />
        <input name="feature7" placeholder="Feature 7" onChange={handleChange} />
        <input name="feature8" placeholder="Feature 8" onChange={handleChange} />
        
        <button type="submit">Predict</button>
      </form>
      {prediction && <h2>Predicted Price: ${prediction*1000}</h2>}
    </div>
  );
}

export default App;
