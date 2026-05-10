import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, completed: false, priority }]);
    setInput("");
    setPriority("Medium");
  };

  const toggleTodo = (index) => {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const priorityColor = (p) => {
    if (p === "High") return "#EF4444";
    if (p === "Medium") return "#F59E0B";
    if (p === "Low") return "#10B981";
  };

  const priorityBg = (p) => {
    if (p === "High") return "rgba(239,68,68,0.15)";
    if (p === "Medium") return "rgba(245,158,11,0.15)";
    if (p === "Low") return "rgba(16,185,129,0.15)";
  };

  const high = todos.filter((t) => t.priority === "High").length;
  const medium = todos.filter((t) => t.priority === "Medium").length;
  const low = todos.filter((t) => t.priority === "Low").length;
  const completed = todos.filter((t) => t.completed).length;

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.avatar}>S</div>
          <div>
            <h1 style={styles.heading}>Sultana's Task Manager</h1>
            <p style={styles.subheading}>Stay organised. Stay productive. 💪</p>
          </div>
        </div>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          {[
            { label: "Total", value: todos.length, color: "#0EA5E9" },
            { label: "Completed", value: completed, color: "#10B981" },
            { label: "High", value: high, color: "#EF4444" },
            { label: "Pending", value: todos.length - completed, color: "#F59E0B" },
          ].map((stat) => (
            <div key={stat.label} style={{ ...styles.statBox, borderColor: stat.color }}>
              <div style={{ ...styles.statNum, color: stat.color }}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Input Row */}
        <div style={styles.inputSection}>
          <input
            style={styles.input}
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <select
            style={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">🔴 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
          <button style={styles.addBtn} onClick={addTodo}>
            + Add
          </button>
        </div>

        {/* Priority Filter Labels */}
        <div style={styles.filterRow}>
          {["High", "Medium", "Low"].map((p) => (
            <div key={p} style={{
              ...styles.filterBadge,
              background: priorityBg(p),
              border: `1px solid ${priorityColor(p)}`,
              color: priorityColor(p),
            }}>
              {p === "High" ? "🔴" : p === "Medium" ? "🟡" : "🟢"} {p} ({p === "High" ? high : p === "Medium" ? medium : low})
            </div>
          ))}
        </div>

        {/* Task List */}
        {todos.length === 0 && (
          <div style={styles.empty}>
            <p style={{ fontSize: 32 }}>📝</p>
            <p>No tasks yet. Add one above!</p>
          </div>
        )}

        <ul style={styles.list}>
          {todos.map((todo, index) => (
            <li key={index} style={{
              ...styles.item,
              borderLeft: `4px solid ${priorityColor(todo.priority)}`,
              opacity: todo.completed ? 0.6 : 1,
            }}>
              <div style={styles.itemLeft}>
                <span
                  onClick={() => toggleTodo(index)}
                  style={styles.checkbox}
                >
                  {todo.completed ? "✅" : "⬜"}
                </span>
                <div>
                  <p style={{
                    ...styles.taskText,
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#64748B" : "#F1F5F9",
                  }}>
                    {todo.text}
                  </p>
                  <span style={{
                    ...styles.priorityTag,
                    background: priorityBg(todo.priority),
                    color: priorityColor(todo.priority),
                    border: `1px solid ${priorityColor(todo.priority)}`,
                  }}>
                    {todo.priority === "High" ? "🔴" : todo.priority === "Medium" ? "🟡" : "🟢"} {todo.priority} Priority
                  </span>
                </div>
              </div>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteTodo(index)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        {todos.length > 0 && (
          <div style={styles.footer}>
            <p style={styles.footerText}>
              {completed} of {todos.length} tasks completed
            </p>
            <div style={styles.progressBar}>
              <div style={{
                ...styles.progressFill,
                width: `${todos.length ? (completed / todos.length) * 100 : 0}%`,
              }} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#060D1F",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 16px",
  },
  container: {
    width: "100%",
    maxWidth: "560px",
    background: "#0A0F1E",
    borderRadius: "20px",
    padding: "28px 24px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
    border: "1px solid #1E293B",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "24px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #0EA5E9, #6366F1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#fff",
    flexShrink: 0,
  },
  heading: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "800",
    color: "#F1F5F9",
    fontFamily: "Segoe UI, sans-serif",
  },
  subheading: {
    margin: "2px 0 0",
    fontSize: "12px",
    color: "#64748B",
    fontFamily: "Segoe UI, sans-serif",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "10px",
    marginBottom: "20px",
  },
  statBox: {
    background: "#1E293B",
    borderRadius: "10px",
    padding: "12px 8px",
    textAlign: "center",
    border: "1px solid",
  },
  statNum: {
    fontSize: "22px",
    fontWeight: "800",
    fontFamily: "Segoe UI, sans-serif",
  },
  statLabel: {
    fontSize: "10px",
    color: "#94A3B8",
    marginTop: "2px",
    fontFamily: "Segoe UI, sans-serif",
  },
  inputSection: {
    display: "flex",
    gap: "8px",
    marginBottom: "14px",
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #1E293B",
    background: "#1E293B",
    color: "#F1F5F9",
    fontSize: "14px",
    outline: "none",
    fontFamily: "Segoe UI, sans-serif",
  },
  select: {
    padding: "10px 10px",
    borderRadius: "10px",
    border: "1px solid #1E293B",
    background: "#1E293B",
    color: "#F1F5F9",
    fontSize: "13px",
    cursor: "pointer",
    outline: "none",
  },
  addBtn: {
    padding: "10px 16px",
    background: "linear-gradient(135deg, #0EA5E9, #6366F1)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  filterRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  filterBadge: {
    fontSize: "11px",
    padding: "4px 10px",
    borderRadius: "20px",
    fontWeight: "600",
    fontFamily: "Segoe UI, sans-serif",
  },
  empty: {
    textAlign: "center",
    color: "#475569",
    padding: "30px 0",
    fontSize: "14px",
    fontFamily: "Segoe UI, sans-serif",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#1E293B",
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #334155",
    transition: "all 0.2s",
  },
  itemLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
  },
  checkbox: {
    fontSize: "20px",
    cursor: "pointer",
    flexShrink: 0,
  },
  taskText: {
    margin: "0 0 6px",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "Segoe UI, sans-serif",
  },
  priorityTag: {
    fontSize: "10px",
    padding: "2px 8px",
    borderRadius: "20px",
    fontWeight: "600",
    fontFamily: "Segoe UI, sans-serif",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "10px",
    flexShrink: 0,
  },
  footer: {
    marginTop: "20px",
  },
  footerText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: "12px",
    marginBottom: "8px",
    fontFamily: "Segoe UI, sans-serif",
  },
  progressBar: {
    width: "100%",
    height: "6px",
    background: "#1E293B",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #0EA5E9, #10B981)",
    borderRadius: "10px",
    transition: "width 0.4s ease",
  },
};

export default App;