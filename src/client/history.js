// The history library lets you easily manage session history anywhere JavaScript runs.
// we use this package to pass the hsitory obejct to the non-react code like action creators.
//instead of BrowserRouter creating the history object, we are going to create this object.
// after creating the history object we pass this to BrowserRouter as prop

import { createBrowserHistory } from "history";
export default createBrowserHistory();
