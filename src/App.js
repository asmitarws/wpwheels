import { 
  BrowserRouter as Router, 
  Route, 
  Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import Themes from "./pages/themes";
import Posts from "./pages/posts";
import PricingPlan from "./pages/pricingPlan";
import ScrollToTop from "./components/scrollToTop";
import Blog from "./pages/blog";
import Support from "./pages/support";
import "animate.css";
import ThemeDetail from "./pages/themeDetail";
import Pagenotfound from "./pages/pagenotfound";
import Plugins from "./pages/plugins";
import PluginDetail from "./pages/pluginDetail";
import BlogDetail from "./pages/blogDetail";
import Login from "./SignIn/login";

function App() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Spartan:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/@icon/themify-icons/themify-icons.css"
      />

      <Router>
        <ScrollToTop />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Homepage />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/themes/:id" element={<ThemeDetail />} />
          <Route path="/plugins" element={<Plugins />} />
          <Route path="/plugins/:id" element={<PluginDetail />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/pricing" element={<PricingPlan />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
