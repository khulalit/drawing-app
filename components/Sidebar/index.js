'use client';
import React, { useEffect } from 'react';
import { IoCloseSharp, IoAddSharp } from 'react-icons/io5'

export default function Sidebar({ canvas, setLayers, layers, setActiveLayer, activeLayer }) {

    useEffect(()=>{
        for(let i = 0; i < layers.length; i++){
            if(i !== activeLayer){
                layers[i].objects.map((obj)=>{
                    // obj.visible = false;
                    obj.selectable = false;
                })
            }
            else {
                layers[i].objects.map((obj)=>{
                    // obj.visible = true;
                    obj.selectable = true;
                })
            }
        }
    },[activeLayer])


    function deleteLayerHandler(index){
        if(layers.length <= 1) return;
        layers[index].objects.map((ele)=>{
            canvas.remove(ele);
        })

        let _layer = [...layers.slice(0,index), ...layers.slice(index)];

        setLayers(_layer);
    }
    return (
        <div className='max-w-80 w-[130px]'>
            <h1 className='text-center text-white bg-[#2c2c2c] p-2'>
                Layers
            </h1>
            <ul>
                {layers.map((ele, index) =>
                    <li key={ele.name} className={` flex justify-between p-2 font-[600] ${activeLayer === index ? 'bg-blue-500' : ''}`} onClick={() => {
                        setActiveLayer(index);
                    }}>
                        {ele.name}
                        <button onClick={()=>deleteLayerHandler(index)}>
                            <IoCloseSharp/>
                        </button>
                    
                    </li>
                )}
            </ul>
            <button className='w-full flex justify-center mt-2' onClick={() => {
                setLayers([...layers, {
                    name: `Layer ${layers.length + 1}`,
                    objects: []
                }])
            }}>
                <IoAddSharp/>
            </button>
        </div>
    )
}
