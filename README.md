# ASSESSMENT-HANDLER
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
With the help of this Application, the mentor can enter the data of text exercises that will be used by the [las2peer-readerbench](https://github.com/rwth-acis/las2peer-readerbench) service to evaluate a readerbot user.\
To do so, he/she just needs to log in with his/her learning layer account and fill in the form that will be proposed to him/her



### `Set up Open ID variables`
Create a file called Constants.ts in the Ordner /src/helpers/ \
Add values to the following settings and add your Own open id setting\
export class Constants {
    public static stsAuthority = '';
    public static clientId = '';
    public static clientRoot = '';
    public static clientScope = '';
}
  public static apiRoot = 'https://api.learning-layers.eu/o/oauth2';

Runs the app in the development mode.\
Create a file called Constants.ts in the Ordner /src/helpers/ \

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
If you are working on a local model you can open [http://localhost:4200](http://localhost:4200) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.