# Streaming-Video
This is a front-end react project to implement video streaming app upon a request.

- We Open Broadcaster Software OBS running in my computer. OBS is not only used for streaming video but also used for recording your desktop to a video file as well. So while I stream video on OBS, i push the streaming to my app. One way of putting this video streaming service together is to create something called a **Real Time Messaging Protocol (RTMP) Server**. This is a specialized server that is going to receive an incoming video feed and then broadcast that video feed out to users who visit my website. RTMP server is not limited to just one stream at a time. So we could potentially have several different streamers, all sending video to our single server RTMP and then many different viewers could be watching each of these different streamers at the same time. We are going to create an RTMP server but we are going to use a third party package. 

- But we also have some other information that we want to share with our users. For example, a user needs to know what streams are currently broadcasting or what streams exist inside of our application. So we are going to have a separate Api server that is essentially just going to store a list of all the different streams or channels that are available inside of our application. So a user is essentially going to first inside the browser visit that server and see the list of streams that are available. Once they see the appropriate stream they can then select that stream and that will essentially make a request over to the RTMP server to  get the live video feed and then show it on the screen to the user inside their browser. So in total we are really going to have three different folders in src. client, api-server and RTMP server.

- api-server, will keep the list of streams. instead of creating express-server, I used [json-server](https://www.npmjs.com/package/json-server). 
 in this directory, i have initialized another package.json.
 
       "scripts": {
          "start": "json-server -p 3001 -w db.json"
        },
        
  here, I am saying that serve the db.json file at port 3001. When I create a new stream from client directory, i send the post request here. here is the createStream action in clinet/actions directory.
  
      export const createStream = (formValues) => async (dispatch, getState) => {
      try {
        //when we are creating a new stream, we are adding the userId property to the store.
        const { userId } = await getState().auth;
        const response = await streams.post("/streams", { ...formValues, userId });
        dispatch({ type: CREATE_STREAM, payload: response.data });
        //programmatically navigation after we successfully submitted the form
        history.push("/");
      } catch (e) {
        console.log(e);
      }
    };

   Internally BrowserRouter creates the history object. Anytime BrowserRouter renders some component, browserRouter passes that history object as a prop down to the components. Inside of any component that gets rendered directly by react router, it is going receive history object. That component could easily trigger some navigation inside of it. But in our case we are not trying to do navigation from a component, we are trying to do navigation from an action creator. Getting access to the history object inside of a action creator or any non react component essentially is a little bit challenging. So instead of having BrowserRouter creates the history object, we are gonna create it with the [history](https://www.npmjs.com/package/history) package. 

- In home page, we are going to fetch all the avaiable streams from json-server. once user clicks on title, it will make a request to RTMP server. 

         renderList() {
            return this.props.streams.map((stream) => {
              return (
                <div className="item" key={stream.id}>
                  {this.renderAdmin(stream)}
                  <i className="large middle aligned icon camera" />
                  <StyledDiv className="content">
                    <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
                    <div className="description">{stream.description}</div>
                  </StyledDiv>
                </div>
              );
            });
          }
          
    In the above code snippet, if we click on `stream.title`. we will be navigated to `/streams/${stream.id}` which is where we render StreamShow page. this is where I created the player and it every bit of code is explained in there.
   
 - src is the main source of the app. 
  for google oauth service, I used the cdn :
  
  `<script src="https://apis.google.com/js/api.js"></script>
`
  We do not need client secret for browser applications. It is only for the server apps.
  
  this is my redux-store:
  
       export default combineReducers({
         auth: authReducer,
         form: formReducer,
         streams: streamReducer,
     });
    
   form is the for redux-form.
   auth is where I keep the authentication info.
   streams is where i get all the streams from json-server. 
     

    
