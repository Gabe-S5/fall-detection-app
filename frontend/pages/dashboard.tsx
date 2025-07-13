import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase/clientApp";
import { getIdToken } from "firebase/auth";
import { getIncidents, createIncident, summarizeIncident } from "../api/incidents";

interface Incident {
  id: number;
  type: string;
  description: string;
  summary?: string;
  createdAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [incidentList, setIncidentList] = useState<any[]>([]);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        handleGetIncidents();
      } else {
        router.push("/");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleGetIncidents = async () => {
    if (!user) return;
    const token = await getIdToken(user);
    const data = await getIncidents(token);
    setIncidentList(data);
  };

  const handleCreateIncident = async () => {
    if (!user) return;
    const token = await getIdToken(user);
    try {
      const data = await createIncident(token, {
        type,
        description,
      });
      alert("Incident created!");
      await handleGetIncidents();
    } catch (err) {
      console.error("Failed to create incident", err);
    }
  };

  const handleSummarize = async (id: number) => {
    if (!user) return;
    const token = await getIdToken(user);
    try {
      await summarizeIncident(token, id);
      await handleGetIncidents();
      alert("Incident summarized!");
    } catch (err) {
      console.error("Failed to summarize incident", err);
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={handleLogout} style={{ padding: 8, marginTop: 20 }}>
        Logout
      </button>
      <div style={{ marginTop: 40 }}>
        <h2>Create New Incident</h2>
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        ></input>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        ></textarea>
        <button onClick={handleCreateIncident} style={{ marginRight: 12 }}>
          Create Incident
        </button>
        <button onClick={handleGetIncidents}>Get Incidents</button>
      </div>

      {incidentList.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h3>Incidents:</h3>
          {incidentList.map((incident) => (
            <div key={incident.id} style={{ borderBottom: "1px solic #ccc", padding: 10 }}>
              <p>
                <strong>Type: </strong>
                {incident.type}
              </p>
              <p>
                <strong>Description: </strong>
                {incident.description}
              </p>
              <strong>Summary: </strong>
              {incident.summary || <button onClick={() => handleSummarize(incident.id)}>Summarize</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
