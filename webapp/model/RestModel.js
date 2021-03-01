sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";
	var oModel;
	var baseUrl = "/sap/opu/odata/pax/WORKFLOW_???/";

	return {
		createModel: function () {
			oModel = new JSONModel();
			oModel.setDefaultBindingMode("TwoWay");
			return oModel;
		},
		
		createWorkflow: function(workflow, newAgent) { 
			return new Promise(function (resolve, reject) {
				var sUrl = baseUrl + `createWorkflow?User='${ newAgent }'&Workflow='${ workflow }'`;
				var sToken;
				
				// Retrieve CSRF-Token for subsequent POST-Request
				$.ajax({
					url: sUrl,
					type: "GET",
					async: false,
					beforeSend: function(xhr){ xhr.setRequestHeader("X-CSRF-Token", "Fetch") ; },
					complete: function(xhr){ sToken = xhr.getResponseHeader("X-CSRF-Token"); }
				});
				
				// Dispatch actual function call
				$.ajax({
					url: sUrl,
					type: "POST",
					dataType: "json", 
					contentType: "application/json",
					//data: { 'Workflow': '${ workflow }', 'User': newAgent },
					
					beforeSend: function(xhr) { xhr.setRequestHeader('X-CSRF-Token', sToken); },
					success: function (data) { resolve(); },
					error: function (jqXHR) {
						var err = { error: jqXHR.responseText };
						reject(err);
					}
				});
			});
		}
	};
});