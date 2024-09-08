import Navigator from "./app/router/Navigator";
import Provider from "./app/components/HOC/Provider";

const App = () => {
 return (
  <Provider>
   <Navigator />   
  </Provider>
 );
};

export default App;