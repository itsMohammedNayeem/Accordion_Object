import { useState } from "react";
import "./styles.css";

const DATA = {
  id: 1,
  pid: null,
  children: [
    {
      id: 2,
      pid: 1,
      children: [{ id: 4, pid: 2, children: [{ id: 6, pid: 4 }] }],
    },
    { id: 3, pid: 1, children: [{ id: 5, pid: 3 }] },
  ],
};

const NodeComponent = ({ node, activePanels, setActivePanels }) => {
  const handleExpand = (id) => {
    if (!activePanels.includes(id)) setActivePanels([...activePanels, id]);
    else setActivePanels(activePanels.filter((nodeid) => nodeid < id));
  };

  return (
    <div className="nodes-container">
      <div
        className={`node ${
          activePanels.includes(node.id) ? "active-panel" : ""
        }`}
        onClick={() => {
          handleExpand(node.id);
        }}
      >
        <div className="node-info">
          <span>{`Node id : ${node.id}`}</span>
          <span>{`Parent id : ${node.pid || "This is root"}`}</span>
        </div>
        {node.children ? <span className="arrow-icon">&#10140;</span> : null}
      </div>
      {node.children ? (
        <div
          className={`child-nodes ${
            activePanels.includes(node.id) ? "active-panel" : ""
          }`}
        >
          {node.children.map((child, idx) => (
            <NodeComponent
              key={idx}
              node={child}
              activePanels={activePanels}
              setActivePanels={setActivePanels}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default function App() {
  const [activePanels, setActivePanels] = useState([]);

  return (
    <div className="App">
      <NodeComponent
        node={DATA}
        activePanels={activePanels}
        setActivePanels={setActivePanels}
      />
    </div>
  );
}
