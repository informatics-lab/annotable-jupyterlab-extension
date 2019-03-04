import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  Widget
} from '@phosphor/widgets';

import '../style/index.css';

import {
  NotebookActions
} from '@jupyterlab/notebook'


/////////////////////////
// uploadImage('https://ikaf6tvl9d.execute-api.eu-west-1.amazonaws.com/dev', image)
//   .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
//   .catch(error => console.error(error));

function uploadImage(image: any) {
    image = (image as String);
    var mime_type = image.split(",")[0].split("data:")[1];
    var data = image.split(",")[1];
    return fetch('https://zpf8m2yw3d.execute-api.eu-west-1.amazonaws.com/dev/upload', {
      method: "POST",
      body: JSON.stringify({"data": data,
                            "content_name": "adfsa",
                            "mime_type": mime_type})
      // body: {"user_file": image},
      // dataType: "bytes"
    })
    // .then(response => response.json()); // parses response to JSON
    console.log("WAHAAYA WERE IN THE UPLOAD IMAGE SAFD;IAJHS;FIJASFD!!")
}

/**
 * Initialization data for the jupyter-extension-new extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyter-extension-new',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyter-extension-new is activated!');
    // Create a single widget
		let widget: Widget = new Widget();
		widget.id = 'annotable-jupyterlab';
		widget.title.label = 'annotable';
		widget.title.closable = true;

		// Add an application command
		const command: string = 'annotable:open';
		app.commands.addCommand(command, {
		label: 'Annotable',
		execute: () => {
		  if (!widget.isAttached) {
		    // Attach the widget to the main work area if it's not there
		    app.shell.addToMainArea(widget);
		  }
		  // Activate the widget
		  app.shell.activateById(widget.id);
			}
		});
		// Add the command to the palette.
  	palette.addItem({command, category: 'Tutorial'});

    // STUFF HAPPENS

    // declare var notebookactions = NotebookActions;

    console.log(NotebookActions)
    console.log('---')
    console.log(NotebookActions.executed)
    // document.addEventListener('NotebookActions.executed.emit', function(event){
    //   console.log('NotebookActions.executed did a !')
    //   // findPictures()
    // })
    NotebookActions.executed.connect(function(sender, args){
      var cellElement = args.cell.node.getElementsByClassName("jp-RenderedImage");
      if (cellElement.length > 0){
        var thisImage = cellElement[0].getElementsByTagName("img")[0].getAttribute("src"); // DANGER WILL ROBINSON - HACKY TO ASSUMER LEN 1
        console.log(thisImage)
        var thisImageDiv = cellElement[0];

        var button = document.createElement("button");
        button.innerHTML = "Send to the Annotable";
        var myRunner = function(event: any){
            uploadImage(thisImage)
        };
        button.onclick = myRunner;
        thisImageDiv.appendChild(button)
      }
    })



  	// setInterval(findPictures, 10000);
    // uploadImage('https://ngj8pqd220.execute-api.eu-west-1.amazonaws.com/dev', 'image')
  }

}



export default extension;
