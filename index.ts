import { IPropBag, StandardControl } from "CustomControls/Models/CustomControlExposedInterfaces";
import { Dictionary } from "CustomControls/Utilities/Dictionary";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ButtonDefaultExample, IButtonExampleProps} from "./Buttonexample";



const qrcode = require('qrcode');

export class sample implements StandardControl<IInputs, IOutputs> {

	private _container: HTMLDivElement;
	// Reference to ComponentFramework Context object
	private _context: IPropBag<IInputs>;
	// PCF framework delegate which will be assigned to this object which would be called whenever any update happens
	private _notifyOutputChanged: () => void;
	// Simple label used to render a title for this control
	private _contentLabel = "Deeplink Control";

	// Containers to store and display guid input

	
	private deeplink: HTMLAnchorElement;
	private clienturl: string;
	private guid: string;
	private deeplinkurl: string;
	private urlbase: string;
	private _qrc: HTMLImageElement;

	private props: IButtonExampleProps;
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: IPropBag<IInputs>, notifyOutputChanged: () => void, state: Dictionary, container:HTMLDivElement): void
	{
		// Add control initialization code
		this._context = context;
		this._container = container;
		this._notifyOutputChanged = notifyOutputChanged;
		const contentContainer = document.createElement("div");


		// Add title label to control
		const contentLabel = document.createElement("label");
		contentLabel.textContent = this._contentLabel;
		contentContainer.appendChild(contentLabel);

		contentContainer.append(document.createElement("br"));
		contentContainer.append(document.createElement("br"));
		this.deeplink = document.createElement("a");
		this.deeplink.textContent = " ";
		contentContainer.appendChild(this.deeplink);

		// Formatting for ease of view


		contentContainer.append(document.createElement("br"));
		contentContainer.append(document.createElement("br"));


		this._qrc = document.createElement("img");
		contentContainer.appendChild(this._qrc);
		//this.fullurl = context.page.getClientUrl();
		//this.guid = "23d3-5cg-45hbc3-ercb";
/*
		this.props = {
			helloWorld: {
				message: 'Hello from PCF'
			}
		}
*/
		ReactDOM.render(
			React.createElement(
				ButtonDefaultExample,
				this.props
			),
			this._container
		);
		this._container.appendChild(contentContainer);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public async updateView(context: IPropBag<IInputs>): Promise<void>
	{
		// Add code to update control view

		this._context = context;
		this.guid = context.parameters.sampleProperty.raw?.toString() ?? " ";
		// this.clienturl = context.page.getClientUrl();
		this.clienturl = "https://org55232.crm.dynamics.com";
		this.urlbase = this.clienturl.substr(5, this.clienturl.length);
		this.deeplinkurl = `ms-guides${this.urlbase}/g/${this.guid}`;

		this.deeplink.textContent = this.deeplinkurl;
		this.deeplink.href = this.deeplinkurl;

		const deeplinkuri = await qrcode.toDataURL(this.deeplinkurl);
		this._qrc.src = deeplinkuri;

		

	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		ReactDOM.unmountComponentAtNode(this._container);
	}
}
