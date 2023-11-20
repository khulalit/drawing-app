'use client'
import './styles.css';
import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { useCanvas } from '@/context/canvasCurrentContext';
import * as fabricLayer from '@arch-inc/fabricjs-layer';

const CanvasComponent = ({ setCanvas }) => {
    const canvasRef = useRef(null);
    const con = useCanvas();
    console.log(con)
    const [dimentions, setDimentions] = useState({
        height: 400,
        width: 400,
    })

    const wrapperRef = useRef(null);

    const canvas = useRef(null); // Ref to store the fabric.js canvas instance
    const layer = useRef(null);


    useEffect(() => {

        canvas.current = new fabric.Canvas(canvasRef.current);

        layer.current = new fabricLayer.LayerManager(canvas.current);

        setCanvas(canvas.current)

        console.log(wrapperRef)
        const height = wrapperRef.current.offsetHeight;
        const width = wrapperRef.current.offsetWidth;

        canvas.current.setWidth(width);
        canvas.current.setHeight(height);

        setDimentions({
            height, width
        })

        fabric.Canvas.prototype._erase = function (target, pointer) {
            if (target && target.isErasable) {
                this.remove(target);
            }
        };

        return () => {
            canvas.current.dispose(); // Clean up Fabric.js canvas when component unmounts
        };
    }, []);

    // console.log(canvas.current.getActiveObjects())

    return (
        <div className='grow bg--600 canvas-wrapper' ref={wrapperRef}>
            <canvas ref={canvasRef} className=' canvas border-2 border-gray-400'></canvas>
        </div>
    );
};

export default CanvasComponent;