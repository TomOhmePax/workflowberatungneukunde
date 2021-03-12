/* eslint no-console: ["error", { allow: ["warn", "debug"] }] */
sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";
	var oModel;
	var baseUrl = "/sap/opu/odata/pax/WORKFLOW_REPORTING_SRV/";

	return {
		createModel: function () {
			oModel = new JSONModel();
			oModel.setDefaultBindingMode("TwoWay");
			return oModel;
		},
		
		startWorflow: function(oFormData) { 
			return new Promise(function (resolve, reject) {
				sap.ui.core.BusyIndicator.show(0);
				var sJson = encodeURI(JSON.stringify(oFormData));
				var sUrl = baseUrl + "workflowStart?input='" + sJson + "'";
				// Retrieve CSRF-Token for subsequent POST-Request
				var sToken;
				$.ajax({
					url: sUrl,
					type: "GET",
					async: false,
					beforeSend: function(xhr){ xhr.setRequestHeader("X-CSRF-Token", "Fetch"); },
					complete: function(xhr){ sToken = xhr.getResponseHeader("X-CSRF-Token"); }
				});
				// Dispatch actual function call
				$.ajax({
					url: sUrl,
					type: "POST",
					dataType: "json", 
					contentType: "application/json",
					
					beforeSend: function(xhr) { xhr.setRequestHeader("X-CSRF-Token", sToken); },
					success: function (data) { resolve(); },
					error: function (jqXHR) { var err = { error: jqXHR.responseText }; reject(err); }
				});
			});
		}
	};
});