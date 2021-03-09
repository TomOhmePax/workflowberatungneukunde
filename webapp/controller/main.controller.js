/* eslint no-console: ["error", { allow: ["warn", "debug"] }] */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
	"../model/RestModel"
], function (Controller, MessageToast, JSONModel, RestModel) {
	"use strict";

	return Controller.extend("pax.workflowberatungneukunde.controller.main", {
		
		onInit: function () {
			this.oForm = this.getView().byId("form");
			this.oI18nModel = this.getView().getModel("i18n");
			
			this.oConstsModel = new JSONModel();
        	this.oConstsModel.setData({ 
        		"sprasEntries": [
        			{ key: "D", value: "Deutsch" },
        			{ key: "I", value: "Italiano" },
        			{ key: "F", value: "Français" }
        		]
        	});
        	this.aLanguages = [];
			this.oConstsModel.getData().sprasEntries.forEach(function (oSpras) {
				this.aLanguages.push(oSpras.key);
			}, this);
			this.getView().setModel(this.oConstsModel, "inputValuesModel");
        	
        	this.oFormModel = new JSONModel();
        	this.getView().setModel(this.oFormModel, "form");
		},
		
	    onAfterRendering: function(){
        	this.getView().byId("input_name").focus();
	    },
		
		onSprasChange: function(oEvent) {
			var oComboBox = this.getView().byId("input_sprache");
			this.oFormModel.setProperty("/spras", oComboBox.getSelectedKey());
		},
		
		onResetFormData: function(oEvent) {
			var oComboBox = this.getView().byId("input_sprache");
			oComboBox.setValue("");
			oComboBox.clearSelection();
			
			this.oFormModel.setData({});
			var aInputIds = [
				"input_name",
				"input_vorname",
				"input_sprache",
				"input_email",
				"input_telefon",
				"input_kundenanliegen"
			];
			aInputIds.forEach(function (sInputId) {
				var oElement = this.getView().byId(sInputId);
				oElement.setValueState(sap.ui.core.ValueState.None);
			}, this);
		},
		
		onSendFormData: function(oEvent) {
			// validate input
			var aInputIds = [
				"input_name",
				"input_vorname",
				"input_sprache",
				"input_email",
				"input_telefon",
				"input_kundenanliegen"
			];
			var bValidationError = false;
			aInputIds.forEach(function (sInputId) {
				bValidationError = this._validateInput(sInputId);
			}, this);
				
			if (bValidationError) {
				return;
			}
			
			RestModel.startWorflow(this.oFormModel.getData()).then(function () {
				sap.ui.core.BusyIndicator.hide();
				var sMessage = this.oI18nModel.getProperty("msg_wf_started");
				sap.m.MessageToast.show(sMessage, {
				    duration: 3000,                  // default
				    width: "30em",                   // default
				    my: "center bottom",             // default
				    at: "center bottom",             // default
				    of: window,                      // default
				    offset: "200 200",                   // default
				    collision: "fit fit",            // default
				    onClose: null,                   // default
				    autoClose: true,                 // default
				    animationTimingFunction: "ease", // default
				    animationDuration: 1000,         // default
				    closeOnBrowserNavigation: true   // default
				});
			}.bind(this)).catch(function (oError) {
				sap.ui.core.BusyIndicator.hide();
				var oErrorPayload = JSON.parse(oError.error);
				console.debug(oErrorPayload);
				
				var dialog = new sap.m.Dialog({
					title: "Error",
					type:  sap.m.DialogType.Message,
					state: sap.ui.core.ValueState.Error,
					content: new sap.m.Text({ text: oErrorPayload.error.message.value}),
					beginButton: new sap.m.Button({
						type: sap.m.ButtonType.Emphasized,
						text: "OK",
						press: function () {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});
			}.bind(this));
		},
		
		_validateInput: function (sInputId) {
			var oInput = this.getView().byId(sInputId);
			oInput.setValueState(sap.ui.core.ValueState.None);
			
			var bValidationError = oInput.getValue() === undefined || oInput.getValue().length === 0;
			if (["input_email", "input_telefon"].includes(sInputId)) {
				var oData = this.oFormModel.getData();
				bValidationError = ( oData.email === undefined || oData.email === "" ) && ( oData.tel === undefined || oData.tel === "" );
			} else if (sInputId === "input_sprache") {
				bValidationError = oInput.getSelectedKey() === "" ;
			} 
			
			var oBinding = oInput.getBinding("value");
			if(oBinding !== undefined && !bValidationError) {
				try {
					var oBindingType = oBinding.getType();
					if(oBindingType !== undefined) {
						oBindingType.validateValue(oInput.getValue());
					}
				} catch (oException) {
					bValidationError = true;
				}
			}
			
			if (bValidationError) {
				oInput.setValueState(sap.ui.core.ValueState.Error);
			}
			return bValidationError;
			
		}
		
	});
});