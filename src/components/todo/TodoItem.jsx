import { useState } from "react";
import { CheckCircle, Circle, Edit, Trash2, MoreVertical } from "lucide-react";
import Button from "../ui/Button";
import { cn } from "../../utils/cn";
import toast from "react-hot-toast";

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const handleToggle = async () => {
    try {
      await onToggle(todo._id);
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleEdit = () => {
    onEdit(todo);
    setShowActions(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await onDelete(todo._id);
        toast.success("Todo deleted successfully");
      } catch (error) {
        toast.error("Failed to delete todo");
      }
    }
    setShowActions(false);
  };

  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 animate-slide-up">
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className="flex-shrink-0 mt-1 text-gray-400 hover:text-primary-600 transition-colors"
        >
          {todo.status === "completed" ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "text-sm font-medium text-gray-900 mb-1",
              todo.status === "completed" && "line-through text-gray-500"
            )}
          >
            {todo.title}
          </h3>
          <p
            className={cn(
              "text-sm text-gray-600",
              todo.status === "completed" && "line-through text-gray-400"
            )}
          >
            {todo.content}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                todo.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              )}
            >
              {todo.status === "completed" ? "Completed" : "Pending"}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showActions && (
            <div className="absolute right-0 top-8 z-10 bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[120px] animate-bounce-in">
              <button
                onClick={handleEdit}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close actions */}
      {showActions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default TodoItem;
