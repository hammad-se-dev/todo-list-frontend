import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { todoAPI } from "../../services/api";
import { Card, CardContent } from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import TodoItem from "../todo/TodoItem";
import TodoForm from "../todo/TodoForm";
import {
  Plus,
  Search,
  LogOut,
  User,
  CheckCircle,
  Clock,
  Target,
  BarChart3,
} from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, [searchTerm, statusFilter]);

  const fetchTodos = async () => {
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (statusFilter) params.status = statusFilter;

      const response = await todoAPI.getAll(params);
      setTodos(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await todoAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleCreateTodo = async (todoData) => {
    try {
      const response = await todoAPI.create(todoData);
      setTodos((prev) => [response.data.data, ...prev]);
      fetchStats();
      toast.success("Todo created successfully");
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateTodo = async (todoData) => {
    try {
      const response = await todoAPI.update(editingTodo._id, todoData);
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === editingTodo._id ? response.data.data : todo
        )
      );
      fetchStats();
      toast.success("Todo updated successfully");
    } catch (error) {
      throw error;
    }
  };

  const handleToggleTodo = async (todoId) => {
    try {
      const response = await todoAPI.toggleStatus(todoId);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === todoId ? response.data.data : todo))
      );
      fetchStats();
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await todoAPI.delete(todoId);
      setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
      fetchStats();
    } catch (error) {
      throw error;
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setShowTodoForm(true);
  };

  const handleSubmitTodo = async (todoData) => {
    if (editingTodo) {
      await handleUpdateTodo(todoData);
    } else {
      await handleCreateTodo(todoData);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || todo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Todo App</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.fullname}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Todos</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.total || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.pending || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.completed || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.completionRate ? `${stats.completionRate}%` : "0%"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input min-w-[120px]"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <Button
              onClick={() => {
                setEditingTodo(null);
                setShowTodoForm(true);
              }}
              className="whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Todo
            </Button>
          </div>
        </div>

        {/* Todos List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading todos...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No todos found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by creating your first todo"}
                </p>
                {!searchTerm && !statusFilter && (
                  <Button
                    onClick={() => {
                      setEditingTodo(null);
                      setShowTodoForm(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Todo
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggleTodo}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </div>
      </div>

      {/* Todo Form Modal */}
      <TodoForm
        todo={editingTodo}
        onSubmit={handleSubmitTodo}
        onCancel={() => {
          setShowTodoForm(false);
          setEditingTodo(null);
        }}
        isOpen={showTodoForm}
      />
    </div>
  );
};

export default Dashboard;
