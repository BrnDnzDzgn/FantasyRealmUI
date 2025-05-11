export async function fetchWrapper(url, options = {}) {
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  const authOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(url, authOptions);

  // If token expired, try refreshing
  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch("https://localhost:7244/api/FantasyUserRefreshTokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    const refreshData = await refreshRes.json();

    if (!refreshRes.ok) {
      alert("Session expired. Please log in again.");
      localStorage.clear();
      window.location.href = "/";
      return;
    }

    // Save new tokens and retry original request
    localStorage.setItem("accessToken", refreshData.accessToken);
    localStorage.setItem("refreshToken", refreshData.refreshToken);

    authOptions.headers.Authorization = `Bearer ${refreshData.accessToken}`;
    res = await fetch(url, authOptions);
  }

  return res;
}
