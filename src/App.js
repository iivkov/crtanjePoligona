import './App.css';
import React, { useState } from 'react';

function App() {
  const [outerPolygon, setOuterPolygon] = useState(Array(9).fill({ x: '', y: '' }));
  const [innerPolygons, setInnerPolygons] = useState(Array(5).fill(Array(4).fill({ x: '', y: '' })));
  const [drawnOuterPolygon, setDrawnOuterPolygon] = useState(false);
  const [drawnInnerPolygons, setDrawnInnerPolygons] = useState(Array(5).fill(false));

  const handleOuterPolygonChange = (e, index, coord) => {
    const { value } = e.target;
    setOuterPolygon(prev => {
      const updatedPolygon = [...prev];
      updatedPolygon[index] = { ...updatedPolygon[index], [coord]: value };
      return updatedPolygon;
    });
  };

  const handleInnerPolygonChange = (e, outerIndex, innerIndex, coord) => {
    const { value } = e.target;
    setInnerPolygons(prev => {
      const updatedPolygons = prev.map((polygon, oIndex) => {
        if (oIndex === outerIndex) {
          return polygon.map((point, iIndex) => {
            if (iIndex === innerIndex) {
              return { ...point, [coord]: value };
            }
            return point;
          });
        }
        return polygon;
      });
      return updatedPolygons;
    });
  };

  const drawOuterPolygon = () => {
    const points = outerPolygon.map(point => `${point.x},${point.y}`).join(' ');
    return <polygon points={points} fill="none" stroke="red" />;
  };

  const drawInnerPolygon = (polygon, outerIndex) => {
    const points = polygon.map(point => `${point.x},${point.y}`).join(' ');
    // return <polygon key={outerIndex} points={points} fill="lime" stroke="blue" />;
    return <polygon points={points} fill="lime" stroke="blue" />;
  };

  const handleDrawOuterPolygon = () => {
    setDrawnOuterPolygon(true);
  };

  const handleDrawInnerPolygon = (index) => {
    setDrawnInnerPolygons(prev => {
      const updatedDrawnInnerPolygons = [...prev];
      updatedDrawnInnerPolygons[index] = true;
      return updatedDrawnInnerPolygons;
    });
  };

  return (
    <div>
      <h1>SVG poligoni</h1>
      <div>
        <h2>Vanjski poligon</h2>
        {outerPolygon.map((point, index) => (
          <div key={index}>
            <input type="number" step="0.1" value={point.x} onChange={e => handleOuterPolygonChange(e, index, 'x')} placeholder="X" />
            <input type="number" step="0.1" value={point.y} onChange={e => handleOuterPolygonChange(e, index, 'y')} placeholder="Y" />
          </div>
        ))}
        <button onClick={handleDrawOuterPolygon}>Nacrtaj vanjski poligon</button>
      </div>

      <div>
        <h2>Unutarnji poligoni</h2>
        {innerPolygons.map((polygon, outerIndex) => (
          <div key={outerIndex}>
            {polygon.map((point, innerIndex) => (
              <div key={innerIndex}>
                <input
                  type="number"
                  step="0.1"
                  value={point.x}
                  onChange={e => handleInnerPolygonChange(e, outerIndex, innerIndex, 'x')}
                  placeholder="X"
                />
                <input
                  type="number"
                  step="0.1"
                  value={point.y}
                  onChange={e => handleInnerPolygonChange(e, outerIndex, innerIndex, 'y')}
                  placeholder="Y"
                />
              </div>
            ))}
            <button onClick={() => handleDrawInnerPolygon(outerIndex)}>Nacrtaj unutarnji poligon {outerIndex + 1}</button>
            {drawnInnerPolygons[outerIndex] && drawInnerPolygon(innerPolygons[outerIndex], outerIndex)}
          </div>
        ))}
      </div>

      <svg width="658" height="180" transform="scale(1, -1)" viewBox="-4 -22 654 192">
        {drawnOuterPolygon && drawOuterPolygon()}
        {drawnInnerPolygons.map((drawn, index) => drawn && drawInnerPolygon(innerPolygons[index], index))}
      </svg>
    </div>
  );
}

export default App;

{/* <svg width="650" height="200" transform="scale(1, -1)" viewBox="0 0 630 200"></svg>
<svg width="750" height="200" transform="scale(1, -1)" viewBox="0 0 630 150"></svg> */}