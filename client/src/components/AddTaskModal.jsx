import { useState, useEffect } from "react";

export default function AddTaskModal({ isOpen, onClose, onSubmit, task, dark }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (task) {
      setText(task.text);
    } else {
      setText("");
    }
  }, [task]);

  if (!isOpen) return null;

  function handleApply() {
    if (!text.trim()) return;
    onSubmit(text, task);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div
        className={
          "p-6 rounded-xl w-[350px] shadow-xl transition-colors " +
          (dark ? "bg-[#1b1b1d] text-white" : "bg-white text-black")
        }
      >
        <h2 className="text-xl font-bold text-center mb-4">
          {task ? "EDIT NOTE" : "NEW NOTE"}
        </h2>

        <input
          type="text"
          placeholder="Input your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={
            "w-full px-3 py-2 rounded-md border focus:outline-none " +
            (dark
              ? "bg-transparent border-gray-600 text-white"
              : "bg-gray-100 border-gray-300 text-black")
          }
        />

        {/* BUTTONS */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className={
              "px-4 py-2 rounded-md border " +
              (dark
                ? "border-violet-500 text-violet-400 hover:bg-violet-600/20"
                : "border-violet-600 text-violet-700 hover:bg-violet-200")
            }
          >
            CANCEL
          </button>

          <button
            onClick={handleApply}
            className={
              "px-4 py-2 rounded-md text-white " +
              (dark ? "bg-violet-600 hover:bg-violet-700" : "bg-violet-500 hover:bg-violet-600")
            }
          >
            {task ? "UPDATE" : "APPLY"}
          </button>
        </div>
      </div>
    </div>
  );
}
