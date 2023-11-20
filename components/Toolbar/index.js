'use client'
import './styles.css';
import { BsSquare, BsCircle, BsPen, BsCardImage } from 'react-icons/bs';
import { FaEraser } from 'react-icons/fa';
import { useState } from "react";

const ICON_WIDTH_HEIGHT = 18;


export default function Toolbar({ canvas, setLayers, layers, activeLayer }) {

    const [isDrawing, setIsDrawing] = useState(false);
    const [isErasing, setIsErasing] = useState(false);
    const [fileNameValue, setFileNameValue] = useState("Drawing name");

    console.log(layers)

    const addRectangle = () => {
        if(isErasing)
            toggleEraserMode();
        const rect = new fabric.Rect({
            selectable: true,
            left: 10,
            top: 10,
            width: 50,
            height: 50,
            fill: 'rgba(0,0,0,0)',
            stroke: 'black',
            strokeWidth: 2,
        });
        canvas.add(rect);
        console.log(rect)
        let _layers = layers;
        _layers[activeLayer].objects.push(rect);
    };

    const addCircle = () => {
        if(isErasing)
            toggleEraserMode();
        const circle = new fabric.Circle({
            selectable: true,
            left: 70,
            top: 10,
            radius: 25,
            fill: 'blue',
        });
        canvas.add(circle);
        let _layers = layers;
        _layers[activeLayer].objects.push(circle);
    };

    const toggleDrawingMode = () => {
        setIsErasing(false);
        setIsDrawing((prev) => !prev);
        if (!isDrawing) {
            canvas.isDrawingMode = true;
        } else {
            canvas.isDrawingMode = false;
        }
    };

    const toggleEraserMode = () => {
        setIsErasing((prev) => !prev);
        setIsDrawing(false); // Turn off drawing mode when eraser mode is activated
        if (!isErasing) {
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.color = '#ffffff'; // Set eraser color to background color
            canvas.freeDrawingBrush.width = 20;
        } else {
            canvas.isDrawingMode = false;
            groupObjects();
        }
    };

    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;

                img.onload = function () {
                    const fabricImage = new fabric.Image(img, {
                        visible: true,
                        selectable: true,
                        left: 10,
                        top: 10,
                        scaleX: 0.5,
                        scaleY: 0.5,
                    });

                    canvas.add(fabricImage);
                    let _layers = layers;
                    _layers[activeLayer].objects.push(fabricImage);
                };
            };

            reader.readAsDataURL(file);
        };

        input.click();
    };

    const groupObjects = () => {
        const activeObjects = canvas.getActiveObjects();

        if (activeObjects.length > 1) {
            const group = new fabric.Group(activeObjects, {
                isErasable: true, // Set isErasable property to true for the group
            });

            canvas.discardActiveObject();
            canvas.add(group);
        }
    };

    return (
        <header className="flex gap-2 relative">
            <div role="button" className="icon" title="Rectangle tool" onClick={addRectangle}>
                <BsSquare width={ICON_WIDTH_HEIGHT} height={ICON_WIDTH_HEIGHT} />
            </div>
            <div role="button" className="icon" title="Cricle tool" onClick={addCircle}>
                <BsCircle width={ICON_WIDTH_HEIGHT} height={ICON_WIDTH_HEIGHT} />
            </div>
            <div role="button" className={`icon ${isDrawing ? 'bg-black' : ''}`} title="Pen tool" onClick={toggleDrawingMode}>
                <BsPen width={ICON_WIDTH_HEIGHT} height={ICON_WIDTH_HEIGHT} />
            </div>
            <div role="button" className={`icon ${isErasing ? 'bg-black' : ''}`} title="Eraser tool" onClick={toggleEraserMode}>
                <FaEraser width={ICON_WIDTH_HEIGHT} height={ICON_WIDTH_HEIGHT} />
            </div>
            <div role="button" className="icon" title="Image tool" onClick={addImage}>
                <BsCardImage width={ICON_WIDTH_HEIGHT} height={ICON_WIDTH_HEIGHT} />
            </div>
            <input className="file-name " value={fileNameValue} onchange={(e)=>setFileNameValue(e.target.value)} />
        </header>
    )
}
