import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { X, Plus } from "lucide-react";
import toast from "react-hot-toast";

const TodoForm = ({ todo, onSubmit, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "pending",
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        content: todo.content,
        status: todo.status,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        status: "pending",
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({ title: "", content: "", status: "pending" });
      onCancel();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save todo");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md animate-bounce-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>{todo ? "Edit Todo" : "Add New Todo"}</CardTitle>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Title *
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter todo title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="text-sm font-medium text-gray-700"
              >
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Enter todo description"
                value={formData.content}
                onChange={handleChange}
                required
                rows={4}
                className="textarea"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                {todo ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoForm;
