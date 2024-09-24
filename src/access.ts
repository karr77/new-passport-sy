/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser } | undefined
) {
  const data = localStorage.getItem("user") || ''
  const userInfo = data && JSON.parse(data);
  return {
    canAdmin: userInfo && userInfo.role === "ADMIN",
  };
}
