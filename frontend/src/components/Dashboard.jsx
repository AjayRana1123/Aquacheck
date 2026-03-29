import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const [formData, setFormData] = useState({
    ph: '',
    Hardness: '',
    Solids: '',
    Chloramines: '',
    Sulfate: '',
    Conductivity: '',
    Organic_carbon: '',
    Trihalomethanes: '',
    Turbidity: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fetchHistory = async () => {
    if (!user) return;
    setHistoryLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/history/${user.uid}`);
      if (res.data.success) {
        setHistoryData(res.data.history);
      }
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleToggleHistory = () => {
    if (!showHistory) {
      fetchHistory();
    }
    setShowHistory(!showHistory);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    // Convert strings to float, fallback to 0 if empty
    const features = {
      ph: parseFloat(formData.ph) || 0,
      Hardness: parseFloat(formData.Hardness) || 0,
      Solids: parseFloat(formData.Solids) || 0,
      Chloramines: parseFloat(formData.Chloramines) || 0,
      Sulfate: parseFloat(formData.Sulfate) || 0,
      Conductivity: parseFloat(formData.Conductivity) || 0,
      Organic_carbon: parseFloat(formData.Organic_carbon) || 0,
      Trihalomethanes: parseFloat(formData.Trihalomethanes) || 0,
      Turbidity: parseFloat(formData.Turbidity) || 0
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/predict`, {
        userId: user?.uid,
        features
      });

      if (response.data.success) {
        setResult(response.data.drinkable);
      } else {
        setError(response.data.error || 'Failed to analyze water data');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Server error. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div style={{color:'white', textAlign:'center', marginTop:'5rem'}}>Loading...</div>;

  const placeholders = {
    ph: "e.g. 7.0 (0-14)",
    Hardness: "e.g. 200 mg/L",
    Solids: "e.g. 20000 ppm",
    Chloramines: "e.g. 7.3 ppm",
    Sulfate: "e.g. 333 mg/L",
    Conductivity: "e.g. 400 μS/cm",
    Organic_carbon: "e.g. 14 ppm",
    Trihalomethanes: "e.g. 66 μg/L",
    Turbidity: "e.g. 4.0 NTU"
  };

  return (
    <div className="dashboard-container fade-in">
      <nav className="navbar">
        <div className="navbar-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          AquaCheck
        </div>
        <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
          <span style={{color: 'var(--text-muted)', fontSize: '0.875rem'}}>
            Welcome, {user.email}
          </span>
          <button onClick={handleToggleHistory} className="btn" style={{marginRight: '0.5rem', background: 'var(--bg-glass)', color: 'white'}}>
            {showHistory ? 'Back to Predict' : 'View History'}
          </button>
          <button onClick={handleLogout} className="btn btn-logout">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="glass-panel" style={{maxWidth: '800px', margin: '0 auto'}}>
        {showHistory ? (
          <div>
            <h2 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Your Past Predictions</h2>
            {historyLoading ? (
              <p style={{textAlign: 'center', color: 'var(--text-muted)'}}>Loading history...</p>
            ) : historyData.length === 0 ? (
              <p style={{textAlign: 'center', color: 'var(--text-muted)'}}>No past predictions found.</p>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {historyData.map((item, idx) => (
                  <div key={idx} style={{padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{flex: 1}}>
                      <p style={{margin: '0 0 0.5rem 0', fontWeight: 'bold'}}>{new Date(item.timestamp).toLocaleString()}</p>
                      <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem'}}>
                        <span>pH: {item.features.ph}</span>
                        <span>Hardness: {item.features.Hardness}</span>
                        <span>Solids: {item.features.Solids}</span>
                        <span>Chloramines: {item.features.Chloramines}</span>
                        <span>Sulfate: {item.features.Sulfate}</span>
                        <span>Cond: {item.features.Conductivity}</span>
                        <span>Org C: {item.features.Organic_carbon}</span>
                        <span>Trihals: {item.features.Trihalomethanes}</span>
                        <span>Turbidity: {item.features.Turbidity}</span>
                      </div>
                    </div>
                    <div style={{marginLeft: '1rem', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', background: item.drinkable ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: item.drinkable ? '#10b981' : '#ef4444'}}>
                      {item.drinkable ? '✅ Safe' : '❌ Unsafe'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <h2 style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>Water Quality Predictor</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>
          Enter the following 9 water properties to determine if the water is safe for consumption using our AI model.
        </p>

        {error && <div style={{color: 'var(--danger)', marginBottom: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px'}}>{error}</div>}

        <form onSubmit={handlePredict}>
          <div className="grid-form">
            {Object.keys(formData).map((key) => (
              <div className="input-group" key={key}>
                <label className="input-label" style={{textTransform: 'capitalize'}}>
                  {key.replace('_', ' ')}
                </label>
                <input 
                  type="number" 
                  step="any"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="input-field"
                  placeholder={placeholders[key]}
                  required
                />
              </div>
            ))}
          </div>
          
          <button type="submit" className="btn btn-primary" style={{width: '200px'}} disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Drinkability'}
          </button>
        </form>

        {result !== null && (
          <div className={`prediction-result ${result ? 'result-drinkable' : 'result-not-drinkable'}`}>
            <h3 className="result-title">
              {result ? '✅ Safe to Drink' : '❌ Not Drinkable'}
            </h3>
            <p>
              {result 
                ? 'The AI model predicts the water meets safety standards for potability.'
                : 'The AI model predicts the water is unsafe and requires treatment before consumption.'}
            </p>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
