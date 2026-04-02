import { useAppContext } from "@/context/AppContext";
import { Sun, Moon, Shield, Eye } from "lucide-react";
import { Role } from "@/data/mockData";

const RoleSwitcher = () => {
  const { role, setRole, darkMode, toggleDarkMode } = useAppContext();

  return (
    <div className="flex items-center gap-3">
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-accent transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      {/* Role switcher */}
      <div className="flex items-center gap-1.5 bg-secondary rounded-lg p-1">
        {(["viewer", "admin"] as Role[]).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              role === r
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {r === "admin" ? <Shield className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            <span className="capitalize">{r}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSwitcher;
