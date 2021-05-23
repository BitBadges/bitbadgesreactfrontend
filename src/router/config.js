const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/about"],
    exact: true,
    component: "About",
  },
  {
    path: ["/explore"],
    exact: true,
    component: "Explore",
  },
  {
    path: ["/issue"],
    exact: true,
    component: "Issue",
  },
  {
    path: ["/badgePage/:id"],
    exact: true,
    component: "BadgePage",
  },
  {
    path: ["/user/:id"],
    exact: true,
    component: "User",
  },
  {
    path: ["/badge/:id"],
    exact: true,
    component: "Badge",
  },
];

export default routes;
