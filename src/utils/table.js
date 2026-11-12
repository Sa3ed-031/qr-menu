export function getTableFromUrl() {
  const value = new URLSearchParams(window.location.search).get("table");
  return value ? value.trim() : "";
}
