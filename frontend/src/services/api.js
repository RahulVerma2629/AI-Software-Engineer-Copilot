const API_BASE_URL = "http://127.0.0.1:8000";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}


export async function analyzeRepository(repoUrl) {
  const response = await fetch(
    `${API_BASE_URL}/api/repository/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repo_url: repoUrl,
      }),
    }
  );

  return handleResponse(response);
}


export async function getRepository(repoId) {
  const response = await fetch(
    `${API_BASE_URL}/api/repository/${repoId}`
  );

  return handleResponse(response);
}


export async function askRepository(
  repoId,
  question,
  topK = 5
) {
  const response = await fetch(
    `${API_BASE_URL}/api/repository/ask`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repo_id: repoId,
        question,
        top_k: topK,
      }),
    }
  );

  return handleResponse(response);
}


export { API_BASE_URL };
