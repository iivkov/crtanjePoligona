import React, { useState, useEffect } from 'react';

const Polygon = ({ vertices, drawing, onFinishDrawing }) => {
  const [points, setPoints] = useState(vertices);
  const svgRef = React.createRef();

  useEffect(() => {
    if (!drawing) return;

    const svgElement = svgRef.current;

    const pointsString = points
      .map(point => `${point.x},${point.y}`)
      .join(' ');

    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', pointsString);
    polygon.setAttribute('fill', 'lime');

    while (svgElement.firstChild) {
      svgElement.firstChild.remove();
    }

    svgElement.appendChild(polygon);

    onFinishDrawing();
  }, [drawing, points, onFinishDrawing, vertices]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPoints = [...points];
    updatedPoints[index] = { ...updatedPoints[index], [name]: value };
    setPoints(updatedPoints);
  };

  return (
    <div>
      {/* <svg width="400" height="400" ref={svgRef}>
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="red"
            onMouseDown={(e) => e.preventDefault()}
          />
        ))}
      </svg> */}
      <svg height="300" width="700">
        {points.map((point, index) => (
          <polygon
            key={index}
            points={Object.values(point).map((coord) => parseInt(coord)).join(',')}
            fill="lime"
            stroke="purple"
            strokeWidth="1"
            transform="scale(1, -1) translate(0, -250)"
          />
        ))}
      </svg>
    </div>
  );
};

export default Polygon;
