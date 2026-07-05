// Premium CalendarWidget.jsx
// NOTE:
// This file is a production-ready starter that preserves your existing API:
// props: tasks, onTaskClick
// imports: formatDate, toLocalDateKey
// Replace your current CalendarWidget.jsx with this file.
// (The component is intentionally compact enough to fit in the generated file.)

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiClock } from "react-icons/fi";
import { formatDate, toLocalDateKey } from "../../utils/taskMetrics";

const weekDays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const priorityColor={
  High:"bg-red-500",
  Medium:"bg-amber-500",
  Low:"bg-emerald-500"
};

export default function CalendarWidget({tasks=[],onTaskClick}){
  const today=new Date();
  const [view,setView]=useState(new Date(today.getFullYear(),today.getMonth(),1));
  const [selected,setSelected]=useState(today.getDate());

  const y=view.getFullYear();
  const m=view.getMonth();
  const first=new Date(y,m,1).getDay();
  const total=new Date(y,m+1,0).getDate();

  const cells=[];
  for(let i=0;i<first;i++) cells.push(null);
  for(let d=1;d<=total;d++) cells.push(d);
  while(cells.length<42) cells.push(null);

  const map=useMemo(()=>{
    const obj={};
    tasks.forEach(t=>{
      if(!t.dueDate) return;
      const k=toLocalDateKey(t.dueDate);
      obj[k]=obj[k]||[];
      obj[k].push(t);
    });
    return obj;
  },[tasks]);

  const key=toLocalDateKey(new Date(y,m,selected));
  const selectedTasks=map[key]||[];

  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
      className="rounded-3xl border border-orange-100 bg-white shadow-xl overflow-hidden">

      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 p-6 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FiCalendar size={28}/>
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                {view.toLocaleString("default",{month:"long"})}
              </h2>
              <p className="opacity-90">{y}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={()=>setView(new Date(y,m-1,1))}
              className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30">
              <FiChevronLeft className="mx-auto mt-3"/>
            </button>

            <button onClick={()=>setView(new Date(y,m+1,1))}
              className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30">
              <FiChevronRight className="mx-auto mt-3"/>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map(w=><div key={w} className="text-center font-semibold text-gray-500">{w}</div>)}

          {cells.map((d,i)=>{
            if(!d) return <div key={i} className="aspect-square"/>;

            const dt=new Date(y,m,d);
            const k=toLocalDateKey(dt);
            const list=map[k]||[];
            const isToday=today.toDateString()===dt.toDateString();
            const active=selected===d;

            return(
              <button key={i}
                onClick={()=>setSelected(d)}
                className={`aspect-square rounded-2xl border transition p-2
                ${active?"bg-orange-500 text-white shadow-xl border-orange-500":
                isToday?"bg-orange-50 border-orange-300":
                "border-gray-100 hover:border-orange-200 hover:bg-orange-50"}`}>
                <div className="flex justify-between items-start">
                  <span className="font-semibold">{d}</span>
                  {list.length>0&&(
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/80 text-orange-600">
                      {list.length}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex gap-1 flex-wrap">
                  {list.slice(0,3).map(t=>(
                    <span key={t._id}
                      className={`w-2.5 h-2.5 rounded-full ${priorityColor[t.priority]||"bg-orange-400"}`}/>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50/40 p-5">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{formatDate(new Date(y,m,selected))}</h3>
              <p className="text-gray-500">{selectedTasks.length} task(s)</p>
            </div>

            <button
              onClick={()=>{
                setView(new Date(today.getFullYear(),today.getMonth(),1));
                setSelected(today.getDate());
              }}
              className="px-5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600">
              Today
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {selectedTasks.length===0?(
              <div className="rounded-xl border border-dashed border-orange-200 bg-white p-8 text-center">
                <FiClock className="mx-auto text-3xl text-orange-400 mb-3"/>
                <p className="font-semibold text-gray-700">No tasks scheduled</p>
                <p className="text-sm text-gray-500">Enjoy your free day 🎉</p>
              </div>
            ):selectedTasks.map(task=>(
              <motion.button
                whileHover={{scale:1.01}}
                key={task._id}
                onClick={()=>onTaskClick?.(task)}
                className="w-full bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md p-4 text-left">
                <div className="flex justify-between">
                  <h4 className="font-semibold text-gray-800">{task.title}</h4>
                  <span className={`text-white text-xs px-2 py-1 rounded-full ${priorityColor[task.priority]||"bg-orange-500"}`}>
                    {task.priority}
                  </span>
                </div>

                <div className="mt-3 flex gap-2 flex-wrap text-xs">
                  <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700">{task.status}</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">{task.category}</span>
                </div>

                {task.description && (
                  <p className="mt-3 text-sm text-gray-500 line-clamp-2">{task.description}</p>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
