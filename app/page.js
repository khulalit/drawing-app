'use client'
// import Shapes from '@/components/shapes'
import Sidebar from '@/components/Sidebar'
import Toolbar from '@/components/Toolbar'
import CanvasComponent from '@/components/Canvas'
import Image from 'next/image'
import { useState } from 'react'
import { canvasCurrentProvider } from '@/context/canvasCurrentContext'
import DrawingOptions from '@/components/DrawingOptions'

export default function Home() {

  const [canvas, setCanvas] = useState(null);

  const [layers, setLayers] = useState([{
    name: 'Layer 1',
    objects: []
  }]);

  const [activeLayer, setActiveLayer] = useState(0);

  return (
    // <canvasCurrentProvider>
      <div className=' h-screen flex flex-col'>
        <Toolbar canvas = {canvas} setLayers={setLayers} activeLayer={activeLayer} layers={layers}/>
        <main className="flex grow">
          <CanvasComponent canvas={canvas} setCanvas={setCanvas} />
          <Sidebar canvas={canvas} setLayers={setLayers} layers={layers} setActiveLayer={setActiveLayer} activeLayer={activeLayer} />
          <DrawingOptions canvas={canvas}/>
        </main>
      </div>
    // </canvasCurrentProvider>
  )
}
