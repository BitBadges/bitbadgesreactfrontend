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
    path: ["/issuead"],
    exact: true,
    component: "IssueAd",
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
    path: ["/user/:id/edit"],
    exact: true,
    component: "EditUser",
  },
  {
    path: ["/badge/:id"],
    exact: true,
    component: "Badge",
  },
  {
    path: ["/tutorial"],
    exact: true,
    component: "Tutorial",
  },
  {
    path: ["/vision"],
    exact: true,
    component: "Vision",
  },
  {
    path: ["/view"],
    exact: true,
    component: "ViewProfile",
  },
  {
    path: ["/community"],
    exact: true,
    component: "Community",
  },
  {
    path: ["/policies"],
    exact: true,
    component: "Policies",
  },
  {
    path: ["/whitepaper"],
    exact: true,
    component: "Whitepaper",
  },
  {
    path: ["/faq"],
    exact: true,
    component: "Faq",
  },
  {
    path: ["/signin"],
    exact: true,
    component: "SignIn",
  },
];

export default routes;
