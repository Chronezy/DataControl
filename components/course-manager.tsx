"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus, X } from "lucide-react";

interface Course {
  id: number;
  code: string;
  title: string;
  instructor: string;
  credits: number;
  max_students: number;
  start_date: string;
  end_date: string;
}

interface CourseManagerProps {
  onUpdate: () => void;
}

export function CourseManager({ onUpdate }: CourseManagerProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    instructor: "",
    credits: 3,
    max_students: 25,
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({
          code: "",
          title: "",
          instructor: "",
          credits: 3,
          max_students: 25,
          start_date: "",
          end_date: "",
        });
        setShowForm(false);
        await fetchCourses();
        onUpdate();
      }
    } catch (error) {
      console.error("Failed to add course:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (confirm("Удалить курс?")) {
      try {
        const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
        if (res.ok) {
          await fetchCourses();
          onUpdate();
        }
      } catch (error) {
        console.error("Failed to delete course:", error);
      }
    }
  }

  // Функция для обработки числовых полей
  const handleNumberChange = (
    field: "credits" | "max_students",
    value: string
  ) => {
    if (value === "") {
      setFormData((prev) => ({ ...prev, [field]: "" }));
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        setFormData((prev) => ({ ...prev, [field]: numValue }));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Курсы</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить курс
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 border border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Новый курс</h3>
            <button type="button" onClick={() => setShowForm(false)}>
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Код курса"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Название курса"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Преподаватель"
              value={formData.instructor}
              onChange={(e) =>
                setFormData({ ...formData, instructor: e.target.value })
              }
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Кредиты"
              min="1"
              value={formData.credits || ""}
              onChange={(e) => handleNumberChange("credits", e.target.value)}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Макс. студентов"
              min="1"
              value={formData.max_students || ""}
              onChange={(e) =>
                handleNumberChange("max_students", e.target.value)
              }
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="date"
              placeholder="Дата начала"
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="date"
              placeholder="Дата окончания"
              value={formData.end_date}
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Добавление..." : "Добавить"}
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {courses.length === 0 ? (
          <p className="text-slate-400 text-center py-8">
            Нет курсов в системе
          </p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-white font-semibold">{course.title}</h3>
                  <p className="text-slate-400 text-sm">Код: {course.code}</p>
                </div>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-slate-400">
                <div>Преподаватель: {course.instructor}</div>
                <div>Кредиты: {course.credits}</div>
                <div>Мест: {course.max_students}</div>
                <div>
                  Начало:{" "}
                  {new Date(course.start_date).toLocaleDateString("ru-RU")}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
