

export const getSessionId = (searchParams: URLSearchParams) => {
    let sessionId
    try {
      sessionId = typeof window !== 'undefined' &&  searchParams.get("token") || localStorage.getItem("sessionIDStripe") as string || "";
    } catch (error) { return ""}
    return sessionId
}