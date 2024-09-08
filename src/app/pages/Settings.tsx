import {Route, Routes} from "react-router-dom";
import SettingsOption from "../components/settings/SettingsOption";
import UpdateProfile from "../components/settings/UpdateProfile";

const Settings = (): JSX.Element => {
 return (
  <div className="flex-1 dark:bg-dark_2">
   <Routes>
    <Route path="/" Component={SettingsOption} />
    <Route path="/update" Component={UpdateProfile} />
   </Routes>
  </div>
 );
};

export default Settings;