// ─── Input ────────────────────────────────────────────────────────────────────
export function Input({ label, error, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", letterSpacing: ".01em" }}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          width: "100%",
          padding: "9px 13px",
          fontSize: 14,
          fontFamily: "inherit",
          color: "var(--text-primary)",
          background: "var(--surface)",
          border: `1.5px solid ${error ? "var(--red)" : "var(--border)"}`,
          borderRadius: "var(--radius)",
          outline: "none",
          transition: "border-color .15s, box-shadow .15s",
          boxSizing: "border-box",
          ...props.style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--accent)";
          e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? "var(--red)" : "var(--border)";
          e.target.style.boxShadow = "none";
        }}
      />
      {error && <span style={{ fontSize: 12, color: "var(--red)" }}>{error}</span>}
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
export function Select({ label, children, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", letterSpacing: ".01em" }}>
          {label}
        </label>
      )}
      <select
        {...props}
        style={{
          width: "100%",
          padding: "9px 13px",
          fontSize: 14,
          fontFamily: "inherit",
          color: "var(--text-primary)",
          background: "var(--surface)",
          border: "1.5px solid var(--border)",
          borderRadius: "var(--radius)",
          outline: "none",
          cursor: "pointer",
          boxSizing: "border-box",
        }}
      >
        {children}
      </select>
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
export function Button({ children, variant = "primary", size = "md", loading, ...props }) {
  const sizes = {
    sm: { padding: "6px 12px", fontSize: 13 },
    md: { padding: "9px 16px", fontSize: 14 },
    lg: { padding: "11px 20px", fontSize: 15 },
  };

  const variants = {
    primary: {
      background: "var(--text-primary)",
      color: "#fff",
      border: "1.5px solid var(--text-primary)",
    },
    secondary: {
      background: "var(--surface)",
      color: "var(--text-primary)",
      border: "1.5px solid var(--border)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1.5px solid transparent",
    },
    danger: {
      background: "var(--red-bg)",
      color: "var(--red)",
      border: "1.5px solid #fecaca",
    },
    accent: {
      background: "var(--accent)",
      color: "#fff",
      border: "1.5px solid var(--accent)",
    },
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        fontFamily: "inherit",
        fontWeight: 500,
        borderRadius: "var(--radius)",
        cursor: props.disabled || loading ? "not-allowed" : "pointer",
        opacity: props.disabled || loading ? 0.5 : 1,
        transition: "all .15s",
        whiteSpace: "nowrap",
        ...sizes[size],
        ...variants[variant],
        ...props.style,
      }}
      onMouseOver={(e) => {
        if (!props.disabled && !loading) e.currentTarget.style.opacity = ".82";
      }}
      onMouseOut={(e) => {
        if (!props.disabled && !loading) e.currentTarget.style.opacity = "1";
      }}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, style, className, onClick, hover }) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "20px 24px",
        boxShadow: "var(--shadow-sm)",
        transition: hover ? "box-shadow .15s, border-color .15s, transform .15s" : undefined,
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
      onMouseOver={hover ? (e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.borderColor = "var(--border-2)";
      } : undefined}
      onMouseOut={hover ? (e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.borderColor = "var(--border)";
      } : undefined}
    >
      {children}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ children, color = "default" }) {
  const colors = {
    default: { bg: "var(--surface-2)", color: "var(--text-secondary)" },
    blue:    { bg: "var(--accent-light)", color: "var(--accent)" },
    green:   { bg: "var(--green-bg)", color: "var(--green)" },
    red:     { bg: "var(--red-bg)", color: "var(--red)" },
    amber:   { bg: "var(--amber-bg)", color: "var(--amber)" },
  };

  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 8px", borderRadius: 99,
      fontSize: 12, fontWeight: 500,
      ...colors[color],
    }}>
      {children}
    </span>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      style={{ animation: "spin .7s linear infinite" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity=".25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      {label && <span style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 500 }}>{label}</span>}
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}
