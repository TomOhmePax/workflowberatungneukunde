sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/RestModel"
], function (Controller, RestModel) {
	"use strict";
	var oView;

	return Controller.extend("workflowberatungneukunde.workflowberatungneukunde.controller.workflowberatungneukunde", {
		onInit: function () {
			oView = this.getView();

		}
		
		onCreateWorkflow: function(oEvent) {
			var oInputAgent = oView.byId("inputAgent");
			var newAgent = oInputAgent.getValue();
			if(newAgent.length === 0) {
				// oInputAgent.setValueState(sap.ui.core.ValueState.Error);
				// oInputAgent.setValueStateText("");
				// this.oMultiInput.setValueStateText(this.oI18nModel.getResourceBundle().getText("msgMaxTokens"));
				// oInputAgent.focus();
				// return;
			} else {
				// oInputAgent.setValueState(sap.ui.core.ValueState.None);
				// oInputAgent.setValueStateText("");
			}
			
			/*var oTable = oView.byId("workflowTable");
			var selectedIndices = oTable.getSelectedIndices();
			var tableData = oTable.getModel().getData();*/
			
			/*if(argWorkitems.length === 0) {
				sap.m.MessageToast.show("Nichts ausgewählt");
				return;
			}*/
			
			// console.debug(argWorkitems);
			
			/*RestModel.createWorkflow(workflow, newAgent).then(function () {
				oViewModel.setProperty("/busy", false);
				// getData();
			}).catch(function (oError) {
				oViewModel.setProperty("/busy", false);
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
	
				dialog.open();
			});*/
		}
		
	});
});