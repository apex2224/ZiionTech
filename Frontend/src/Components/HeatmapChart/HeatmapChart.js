import React, { useState, useEffect } from "react";

const HeatmapChart = ({ username = "apex2224" }) => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubContributions();
  }, [username]);

  const fetchGitHubContributions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user's public events from GitHub API
      const response = await fetch(
        `https://api.github.com/users/${username}/events?per_page=100`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch GitHub data");
      }

      const events = await response.json();

      // Process events into contribution map
      const contributionMap = {};
      events.forEach((event) => {
        const date = new Date(event.created_at).toISOString().split("T")[0];
        contributionMap[date] = (contributionMap[date] || 0) + 1;
      });

      // Generate full year grid with actual contribution data
      const gridData = [];
      const today = new Date();

      for (let week = 0; week < 52; week++) {
        const weekData = [];
        for (let day = 0; day < 7; day++) {
          const date = new Date(today);
          date.setDate(date.getDate() - ((51 - week) * 7 + (6 - day)));
          const dateStr = date.toISOString().split("T")[0];
          weekData.push({
            date: dateStr,
            value: contributionMap[dateStr] || 0,
            day: day,
          });
        }
        gridData.push(weekData);
      }

      setData(gridData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      setError(err.message);
      // Fallback to sample data
      setData(generateSampleData());
      setLoading(false);
    }
  };

  const generateSampleData = () => {
    const data = [];
    const today = new Date();

    for (let week = 0; week < 52; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() - ((51 - week) * 7 + (6 - day)));
        const value = Math.floor(Math.random() * 30);
        weekData.push({
          date: date.toISOString().split("T")[0],
          value: value,
          day: day,
        });
      }
      data.push(weekData);
    }
    return data;
  };

  // Get color based on contribution level
  const getColor = (value) => {
    if (value === 0) return "rgba(255, 255, 255, 0.05)";
    if (value < 8) return "rgba(239, 68, 68, 0.3)";
    if (value < 16) return "rgba(239, 68, 68, 0.5)";
    if (value < 24) return "rgba(239, 68, 68, 0.7)";
    return "rgba(239, 68, 68, 1)";
  };

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get month labels positioned correctly
  const getMonthPositions = () => {
    const positions = [];
    let currentMonth = -1;

    data.forEach((week, weekIndex) => {
      const month = new Date(week[0].date).getMonth();
      if (month !== currentMonth) {
        currentMonth = month;
        positions.push({ month: monthLabels[month], week: weekIndex });
      }
    });

    return positions;
  };

  const monthPositions = getMonthPositions();

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#e4e4e7",
            fontFamily: "'Figtree', sans-serif",
            fontSize: "1.25rem",
          }}
        >
          Loading GitHub contributions...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <div style={{ overflowX: "auto", overflowY: "visible" }}>
        <div style={{ display: "inline-block", minWidth: "100%" }}>
          {/* Month labels */}
          <div
            style={{
              display: "flex",
              marginBottom: "4px",
              marginLeft: "30px",
              position: "relative",
              height: "20px",
            }}
          >
            {monthPositions.map((pos, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: `${pos.week * 15}px`,
                  color: "#a1a1aa",
                  fontSize: "12px",
                  fontFamily: "'Figtree', sans-serif",
                }}
              >
                {pos.month}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "4px" }}>
            {/* Day labels */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                paddingTop: "0px",
                marginRight: "4px",
              }}
            >
              {[1, 3, 5].map((dayIndex) => (
                <div
                  key={dayIndex}
                  style={{
                    height: "11px",
                    fontSize: "10px",
                    color: "#a1a1aa",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "'Figtree', sans-serif",
                    lineHeight: "11px",
                  }}
                >
                  {dayLabels[dayIndex]}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div style={{ display: "flex", gap: "2px" }}>
              {data.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  {week.map((cell, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      onMouseEnter={() => setHoveredCell(cell)}
                      onMouseLeave={() => setHoveredCell(null)}
                      style={{
                        width: "11px",
                        height: "11px",
                        backgroundColor: getColor(cell.value),
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "2px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        transform:
                          hoveredCell === cell ? "scale(1.3)" : "scale(1)",
                        boxShadow:
                          hoveredCell === cell
                            ? "0 0 10px rgba(239, 68, 68, 0.5)"
                            : "none",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            background: "rgba(0, 0, 0, 0.8)",
            borderRadius: "8px",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            display: "inline-block",
          }}
        >
          <p
            style={{
              color: "#e4e4e7",
              fontFamily: "'Figtree', sans-serif",
              fontSize: "0.875rem",
              margin: 0,
            }}
          >
            <strong>{hoveredCell.value} contributions</strong> on{" "}
            {new Date(hoveredCell.date).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default HeatmapChart;
