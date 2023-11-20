import './styles.css';
import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

const DrawingOptions = ({ canvas }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [strokeColor, setStrokeColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [fillColor, setFillColor] = useState('rgba(0,0,0,0)');
  const [radius, setRadius] = useState(0);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleStrokeColorChange = (color) => {
    setStrokeColor(color);
    updateCanvas();
  };

  const handleStrokeWidthChange = (width) => {
    setStrokeWidth(width);
    updateCanvas();
  };

  const handleFillColorChange = (color) => {
    setFillColor(color);
    updateCanvas();
  };

  const handleRadius = (radius) => {
    setRadius(radius);
    updateCanvas();
  };

  const updateCanvas = () => {
    const activeObject = canvas.getActiveObject();

    if (activeObject) {
      activeObject.set({
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        fill: fillColor,
        selectionRadius: radius,
      });

      canvas.renderAll();
    }
  };

  return (
    <div className="drawing-options">
      <button onClick={handleMenuToggle}>
        <IoMdArrowDropdown/>
      </button>
      {isMenuOpen && (
        <div className="options-menu">
          <label>
            Stroke Color:
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => handleStrokeColorChange(e.target.value)}
            />
          </label>
          <label>
            Stroke Width:
            <input
              type="number"
              value={strokeWidth}
              onChange={(e) => handleStrokeWidthChange(e.target.value)}
            />
          </label>
          <label>
            Radius :
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            />
          </label>
          <label>
            Fill Color:
            <input
              type="color"
              value={fillColor}
              onChange={(e) => handleFillColorChange(e.target.value)}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default DrawingOptions;
